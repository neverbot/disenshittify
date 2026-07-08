// Selectors are candidates — verify against live X/Twitter DOM.
// Promoted posts are marked with a placementTracking testid; hide the whole
// timeline cell that contains one.
export default {
  id: "twitter.hide-ads",
  platform: "twitter",
  title: "Hide ads",
  description: "Removes promoted posts from the timeline.",
  defaultEnabled: true,
  probe: '[data-testid="placementTracking"]',
  css: `
    div[data-testid="cellInnerDiv"]:has([data-testid="placementTracking"]) {
      display: none !important;
    }
  `,
};
