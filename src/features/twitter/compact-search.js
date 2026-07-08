// alwaysOn (no toggle): pin the right-sidebar search box to the top-right corner
// of the window; keep it half-ish width while idle and widen it on focus. Fixed
// positioning is used so it hugs the window edge (past X's own page margin)
// instead of only the sidebar edge. Desktop only (>=1000px), where the sidebar
// search exists.
export default {
  id: "twitter.compact-search",
  platform: "twitter",
  alwaysOn: true,
  title: "Compact search box",
  description: "Pins search to the top-right corner, widening on focus.",
  css: `
    @media (min-width: 1000px) {
      [data-testid="sidebarColumn"] form:has([data-testid="SearchBox_Search_Input"]) {
        position: fixed !important;
        top: 10px !important;
        right: 14px !important;
        width: 200px !important;
        z-index: 20 !important;
        transition: width 160ms cubic-bezier(0.22, 1, 0.36, 1) !important;
      }
      [data-testid="sidebarColumn"] form:has([data-testid="SearchBox_Search_Input"]):focus-within {
        width: 360px !important;
      }
    }
  `,
};
