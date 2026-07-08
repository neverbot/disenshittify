// Selectors are candidates — verify against live X/Twitter DOM.
// The right sidebar holds algorithmic widgets: trends / Today's News (the
// "Trending" module) and "Who to follow". Search box is left intact.
export default {
  id: "twitter.hide-sidebar-widgets",
  platform: "twitter",
  title: "Hide sidebar widgets",
  description: "Removes trends, Today's News, and Who to follow from the right sidebar.",
  defaultEnabled: true,
  probe:
    '[data-testid="sidebarColumn"] div[aria-label="Trending"], aside[aria-label="Who to follow"]',
  css: `
    [data-testid="sidebarColumn"] div[aria-label="Trending"],
    [data-testid="sidebarColumn"] div[aria-label="Timeline: Trending now"],
    aside[aria-label="Who to follow"] {
      display: none !important;
    }
  `,
};
