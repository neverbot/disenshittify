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
    /* The right-sidebar modules (Today's News, What's happening / trends) all
       live as sibling children inside div[aria-label="Trending"], next to the
       search box which sits in its own child. Hide every module that does NOT
       contain the search input, so the search stays and everything else goes.
       Who to follow is a separate aside. */
    [data-testid="sidebarColumn"] div[aria-label="Trending"] > div > div:not(:has([data-testid="SearchBox_Search_Input"])),
    [data-testid="sidebarColumn"] aside[aria-label="Who to follow"] {
      display: none !important;
    }
  `,
};
