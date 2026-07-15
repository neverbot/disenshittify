import { FEEDBACK } from "../shared/feedback.js";
import { MASTER_KEY } from "../shared/constants.js";

const api = typeof browser !== "undefined" ? browser : chrome;

// Toolbar icon reflects the master switch: blue when enabled, grey when off.
function applyIcon() {
  const area = api.storage.sync || api.storage.local;
  area.get(MASTER_KEY, (items) => {
    const on = (items || {})[MASTER_KEY] !== false;
    api.action.setIcon({
      path: on
        ? { 16: "icons/icon-16.png", 32: "icons/icon-32.png", 48: "icons/icon-48.png" }
        : { 16: "icons/icon-off-16.png", 32: "icons/icon-off-32.png", 48: "icons/icon-off-48.png" },
    });
  });
}

// Per-tab hit report, so the popup can ask "what did we hide on the active tab?"
const reports = new Map(); // tabId -> { counts, activeHitCount, totalHidden }

function badgeEnabled() {
  return new Promise((resolve) => {
    const area = api.storage.sync || api.storage.local;
    area.get(FEEDBACK.badge, (items) => resolve((items || {})[FEEDBACK.badge] !== false));
  });
}

api.action.setBadgeBackgroundColor({ color: "#1f6feb" });
applyIcon();

api.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || !msg.type) return;

  if (msg.type === "dsh:report" && sender.tab) {
    const tabId = sender.tab.id;
    reports.set(tabId, msg.payload);
    badgeEnabled().then((on) => {
      const n = msg.payload.activeHitCount;
      api.action.setBadgeText({ tabId, text: on && n > 0 ? String(n) : "" });
    });
    return;
  }

  if (msg.type === "dsh:getReport") {
    sendResponse(reports.get(msg.tabId) || null);
    return true;
  }
});

api.tabs.onRemoved.addListener((tabId) => reports.delete(tabId));

api.storage.onChanged.addListener((changes) => {
  if (changes[MASTER_KEY]) applyIcon();
});
