// Selectors are candidates — verify against live X/Twitter DOM.
export default {
  id: "twitter.hide-grok",
  platform: "twitter",
  title: "Hide Grok",
  description: "Removes the Grok nav item and the per-post Grok actions button.",
  defaultEnabled: true,
  probe: 'a[href="/i/grok"], button[aria-label="Grok actions"]',
  css: `
    header nav a[href="/i/grok"],
    button[aria-label="Grok actions"] {
      display: none !important;
    }
  `,
};
