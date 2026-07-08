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
  `,
};
