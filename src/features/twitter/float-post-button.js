// alwaysOn (no toggle): on desktop, float the left-sidebar Post button to the
// bottom-right corner (like Minimal Theme). Scoped to >=1000px (X's large-screen
// breakpoint) so the mobile layout, where the button lives elsewhere, is left
// untouched.
export default {
  id: "twitter.float-post-button",
  platform: "twitter",
  alwaysOn: true,
  title: "Float the Post button",
  description: "Moves the Post button to the bottom-right corner on desktop.",
  css: `
    @media (min-width: 1000px) {
      header[role="banner"] a[data-testid="SideNav_NewTweet_Button"] {
        position: fixed !important;
        right: 24px !important;
        bottom: 24px !important;
        width: auto !important;
        min-width: 0 !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
        z-index: 10 !important;
        box-shadow: 0 4px 16px oklch(0.2 0.02 258 / 0.35) !important;
      }
    }
  `,
};
