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

    /* On wide screens X widens the banner and right-aligns the nav against the
       main column. Float it to the LEFT edge of the banner instead, so it hugs
       the far left of the window (analogous to the search box hugging the right).
       Desktop only; the narrow layout already sits flush left. */
    @media (min-width: 1000px) {
      header[role="banner"] {
        align-items: flex-start !important;
      }
    }
  `,
};
