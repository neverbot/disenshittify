// Selectors are candidates — verify against live X/Twitter DOM.
// The home timeline tab strip (ScrollSnap-List) holds two tabs: "For you"
// (first) and "Following". Hide the first so only Following remains. Twitter
// remembers the last selected timeline, so once on Following it stays.
export default {
  id: "twitter.force-following",
  platform: "twitter",
  title: "Hide For you tab",
  description: "Removes the algorithmic For you timeline tab, leaving Following.",
  defaultEnabled: true,
  probe: '[data-testid="ScrollSnap-List"] > div[role="presentation"]:first-child',
  css: `
    [data-testid="ScrollSnap-List"] > div[role="presentation"]:first-child {
      display: none !important;
    }
  `,
};
