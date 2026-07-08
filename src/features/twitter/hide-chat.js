// Selectors are candidates — verify against live X/Twitter DOM.
// Chat lives in the sidebar (nav link to /i/chat) and as a bottom-right
// floating dock (the DM drawer).
export default {
  id: "twitter.hide-chat",
  platform: "twitter",
  title: "Hide Chat",
  description: "Removes Chat from the sidebar and the floating chat dock.",
  defaultEnabled: true,
  probe: 'a[href="/i/chat"], [data-testid="DMDrawer"]',
  css: `
    header nav a[href="/i/chat"],
    [data-testid="DMDrawer"] {
      display: none !important;
    }
  `,
};
