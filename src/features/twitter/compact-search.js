// alwaysOn (no toggle): shrink the right-sidebar search box to half width and
// align it to the right while it is idle; expand to full width on focus.
export default {
  id: "twitter.compact-search",
  platform: "twitter",
  alwaysOn: true,
  title: "Compact search box",
  description: "Half-width, right-aligned search until focused.",
  css: `
    [data-testid="sidebarColumn"] form:has([data-testid="SearchBox_Search_Input"]) {
      width: 50% !important;
      margin-left: auto !important;
      transition: width 160ms cubic-bezier(0.22, 1, 0.36, 1) !important;
    }
    [data-testid="sidebarColumn"] form:has([data-testid="SearchBox_Search_Input"]):focus-within {
      width: 100% !important;
    }
  `,
};
