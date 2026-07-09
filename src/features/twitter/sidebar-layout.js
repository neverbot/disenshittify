// alwaysOn layout tweak (no toggle): group the left navigation and the account
// section together and center them vertically, leaving equal top/bottom room,
// instead of nav-at-top / account-pinned-to-bottom. The nav column is
// header[role="banner"] > div > div > div, a flex column whose first child is
// the nav block and last child is the account switcher.
export default {
  id: "twitter.sidebar-layout",
  platform: "twitter",
  alwaysOn: true,
  title: "Compact left sidebar",
  description: "Groups the left nav with the account section, centered vertically.",
  css: `
    header[role="banner"] > div > div > div {
      justify-content: center !important;
      gap: 6px !important;
    }
    header[role="banner"] > div > div > div > div:first-child {
      flex-grow: 0 !important;
      margin-bottom: 0 !important;
    }
    header[role="banner"] > div > div > div > div:last-child {
      margin-top: 0 !important;
    }

    /* Desktop layout: pin the left nav out of flow at the window's left edge so
       it no longer offsets the main region, collapse the (now widget-less) right
       column so it doesn't pull the centering, and center the tweet column in
       the window. Mobile collapses the sidebar and is left untouched. */
    @media (min-width: 1000px) {
      header[role="banner"] {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        align-items: flex-start !important;
      }
      /* Collapse the (widget-less) right column to nothing, including the gutter
         between columns, so it adds no width; its search box is position:fixed
         and stays. Then center the tweet column in the full-width main. */
      [data-testid="sidebarColumn"] {
        width: 0 !important;
        min-width: 0 !important;
        margin: 0 !important;
      }
      main[role="main"] {
        align-items: center !important;
      }
      main[role="main"] [data-testid="primaryColumn"] {
        margin-left: auto !important;
        margin-right: auto !important;
      }
    }
  `,
};
