// The right sidebar holds algorithmic widgets: trends / Today's News (the
// "What's happening" module) and "Who to follow". Search box is left intact.
// Anchored on stable testids, not the localized aria-labels ("Trending", "Who to
// follow"): the trends/news modules are the sidebar sections that hold a
// [data-testid="trend"] / [data-testid="news_sidebar"] (and never the search
// input), and Who to follow is the aside holding [data-testid="UserCell"]s.
export default {
  id: "twitter.hide-sidebar-widgets",
  platform: "twitter",
  title: "Hide sidebar widgets",
  description: "Removes trends, Today's News, and Who to follow from the right sidebar.",
  defaultEnabled: true,
  probe:
    '[data-testid="sidebarColumn"] section:has([data-testid="trend"]), [data-testid="sidebarColumn"] aside:has([data-testid="UserCell"])',
  css: `
    [data-testid="sidebarColumn"] section:has([data-testid="trend"]):not(:has([data-testid="SearchBox_Search_Input"])),
    [data-testid="sidebarColumn"] section:has([data-testid="news_sidebar"]):not(:has([data-testid="SearchBox_Search_Input"])),
    [data-testid="sidebarColumn"] aside:has([data-testid="UserCell"]) {
      display: none !important;
    }
  `,
};
