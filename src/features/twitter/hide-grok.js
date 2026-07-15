// "Grok" is a brand name — it stays literally "Grok" in every language — so
// matching aria-label*="Grok" is language-independent (unlike the old exact
// "Grok actions" / "Explain this post" labels, which localize). Structural
// anchors where they exist: the /i/grok nav link and the GrokDrawer testid.
export default {
  id: "twitter.hide-grok",
  platform: "twitter",
  title: "Hide Grok",
  description: "Removes Grok from the sidebar, the floating button, and the per-post Grok actions.",
  defaultEnabled: true,
  probe: 'a[href="/i/grok"], [data-testid="GrokDrawer"], button[aria-label*="Grok"]',
  css: `
    a[href="/i/grok"],
    [data-testid="GrokDrawer"],
    button[aria-label*="Grok"],
    [role="button"][aria-label*="Grok"],
    /* The "Profile Summary" Grok button in profile HoverCards. It carries no
       testid/aria (the follow button does), so target the testid-less button. */
    [data-testid="HoverCard"] button:not([data-testid]) {
      display: none !important;
    }
  `,
};
