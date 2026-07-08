// Selectors are candidates — verify against live X/Twitter DOM.
// The bottom-right floating dock holds the Grok button and the Messages/DM
// drawer. Hiding the buttons/drawers is enough; their empty fixed wrappers
// render nothing.
export default {
  id: "twitter.hide-floating-buttons",
  platform: "twitter",
  title: "Hide floating buttons",
  description: "Removes the bottom-right floating dock (Grok and Chat).",
  defaultEnabled: true,
  probe: 'button[aria-label="Grok"], [data-testid="DMDrawer"]',
  css: `
    button[aria-label="Grok"],
    [data-testid="DMDrawer"],
    [data-testid="DMDrawerHeader"] {
      display: none !important;
    }
  `,
};
