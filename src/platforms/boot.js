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
export function boot(platform, { navEvents = [] } = {}) {
  const engine = createEngine({ doc: document });
  const features = featuresByPlatform(platform);

  let currentConfig = {};
  let toastShownForNav = false;
  let lastUrl = location.href;

  function report() {
    const enabled = resolveEnabled(features, currentConfig);
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
    engine.sync(features, resolveEnabled(features, currentConfig));
    report();
  }

  let debounce;
  const observer = new MutationObserver(() => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        toastShownForNav = false;
      }
      report();
    }, 500);
  });

  onConfigChanged(() => apply());

  for (const ev of navEvents) {
    window.addEventListener(ev, () => {
      toastShownForNav = false;
      apply();
    });
  }

  apply();
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
