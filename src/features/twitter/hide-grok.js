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
    [aria-label="Explica esta publicación"],
    /* The "Profile Summary" Grok button in profile HoverCards. It carries no
       testid/aria (the follow button does), so target the testid-less button. */
    [data-testid="HoverCard"] button:not([data-testid]) {
      display: none !important;
    }
  `,
};
