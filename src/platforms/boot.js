import { createEngine } from "../engine/engine.js";
import { featuresByPlatform } from "../shared/registry.js";
import { resolveEnabled } from "../shared/config.js";
import { getConfig, onConfigChanged } from "../shared/storage.js";
import { countHits, summarize } from "../shared/hits.js";
import { FEEDBACK, feedbackOn } from "../shared/feedback.js";
import { showToast } from "./toast.js";

const api = typeof browser !== "undefined" ? browser : chrome;

// Shared content-script boot for any platform. Applies the platform's active
// features, reports hit counts (badge/toast/popup), and re-reports as the SPA
// mutates or navigates. navEvents are platform-specific SPA navigation events
// (e.g. YouTube's "yt-navigate-finish"); URL changes are also detected via the
// observer so platforms without such an event (X/Twitter) still reset the
// once-per-navigation toast.
// `activeWhen(location)` gates the whole platform's features by URL: when it
// returns false the engine is synced with an all-disabled map, so every injected
// <style> is removed and no JS feature runs. LinkedIn uses this to confine its
// feed features to the home feed — a profile's `/in/…` Activity section (and
// other pages) reuses the exact feed-post DOM, so without a gate hide-promoted &
// co. fire there as false positives (and add needless :has recalc cost). The gate
// is re-evaluated on SPA navigation (URL change), so styles come and go as you
// move between /feed and a profile without a reload.
export function boot(platform, { navEvents = [], activeWhen = () => true } = {}) {
  // Idempotency guard: never let two content-script instances run in the same
  // document (each would add its own MutationObserver, <style> tags and report
  // loop — doubling our footprint on a heavy SPA).
  if (window.__disenshittifyBooted) return;
  window.__disenshittifyBooted = true;

  const engine = createEngine({ doc: document });
  const features = featuresByPlatform(platform);

  let currentConfig = {};
  let active = true;
  let toastShownForNav = false;
  let lastUrl = location.href;

  // Enabled map honoring both the user's config and the URL gate: outside the
  // active URL everything is off (styles removed, counts zero).
  function currentEnabled() {
    return active ? resolveEnabled(features, currentConfig) : {};
  }

  function report() {
    const enabled = currentEnabled();
    const counts = countHits(features, enabled);
    const summary = summarize(counts);
    try {
      api.runtime.sendMessage({ type: "dsh:report", payload: { counts, ...summary } });
    } catch {
      /* background may be waking up; next report will land */
    }
    if (
      !toastShownForNav &&
      feedbackOn(currentConfig, FEEDBACK.toast) &&
      summary.activeHitCount > 0
    ) {
      toastShownForNav = true;
      showToast(document, summary);
    }
  }

  async function apply() {
    currentConfig = await getConfig();
    active = !!activeWhen(location);
    engine.sync(features, currentEnabled(), () => currentConfig);
    report();
  }

  // Re-report is cosmetic (badge/toast counts), so debounce generously: on a
  // churn-heavy SPA the observer fires constantly, and we only need to settle
  // once activity pauses. A longer window means fewer countHits passes.
  let debounce;
  const observer = new MutationObserver(() => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        toastShownForNav = false;
        // URL changed (SPA nav): re-evaluate the gate and re-sync styles for the
        // new page — features may switch on (entering /feed) or off (a profile).
        apply();
      } else {
        report();
      }
    }, 800);
  });

  onConfigChanged(() => apply());

  // The popup asks the active tab's content script for live counts (robust
  // against the MV3 background event page unloading its in-memory report).
  api.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg && msg.type === "dsh:getCounts") {
      const enabled = currentEnabled();
      const counts = countHits(features, enabled);
      sendResponse({ counts, ...summarize(counts) });
    }
  });

  for (const ev of navEvents) {
    window.addEventListener(ev, () => {
      toastShownForNav = false;
      apply();
    });
  }

  apply();
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
