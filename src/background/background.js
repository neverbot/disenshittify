import { FEEDBACK } from "../shared/feedback.js";

const api = typeof browser !== "undefined" ? browser : chrome;

// Per-tab hit report, so the popup can ask "what did we hide on the active tab?"
const reports = new Map(); // tabId -> { counts, activeHitCount, totalHidden }

function badgeEnabled() {
  return new Promise((resolve) => {
    const area = api.storage.sync || api.storage.local;
    area.get(FEEDBACK.badge, (items) => resolve((items || {})[FEEDBACK.badge] !== false));
  });
}

api.action.setBadgeBackgroundColor({ color: "#1f6feb" });

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
