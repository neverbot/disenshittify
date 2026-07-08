// Selectors are candidates — verify against live X/Twitter DOM.
export default {
  id: "twitter.hide-grok",
  platform: "twitter",
  title: "Hide Grok",
  description: "Removes Grok from the sidebar, the floating button, and the per-post Grok/Explain actions.",
  defaultEnabled: true,
  probe:
    'a[href="/i/grok"], button[aria-label="Grok"], button[aria-label="Grok actions"], [aria-label="Explain this post"]',
  css: `
    header nav a[href="/i/grok"],
    button[aria-label="Grok"],
    button[aria-label="Grok actions"],
    [aria-label="Explain this post"],
    [aria-label="Explica esta publicación"] {
      display: none !important;
    }
  `,
};
