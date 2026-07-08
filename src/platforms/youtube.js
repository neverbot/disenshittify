import { createEngine } from "../engine/engine.js";
import { featuresByPlatform } from "../shared/registry.js";
import { resolveEnabled } from "../shared/config.js";
import { getConfig, onConfigChanged } from "../shared/storage.js";
import { countHits, summarize } from "../shared/hits.js";
import { FEEDBACK, feedbackOn } from "../shared/feedback.js";
import { showToast } from "./toast.js";

const api = typeof browser !== "undefined" ? browser : chrome;
const engine = createEngine({ doc: document });
const features = featuresByPlatform("youtube");

let currentConfig = {};
let toastShownForNav = false;

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

// Re-report as YouTube lazily fills the page (debounced).
let debounce;
const observer = new MutationObserver(() => {
  clearTimeout(debounce);
  debounce = setTimeout(report, 500);
});

onConfigChanged(() => apply());

// YouTube is a SPA: reset the once-per-page toast and re-apply on navigation.
window.addEventListener("yt-navigate-finish", () => {
  toastShownForNav = false;
  apply();
});

apply();
observer.observe(document.documentElement, { childList: true, subtree: true });
