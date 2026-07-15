// Selectors are candidates — verify against live X/Twitter DOM.
export default {
  id: "twitter.hide-premium",
  platform: "twitter",
  title: "Hide Premium",
  description: "Removes the Subscribe to Premium box and the Premium nav item.",
  defaultEnabled: true,
  // The upsell box is the sidebar aside that holds the premium sign-up link;
  // anchor on that href, not the localized aria-label "Subscribe to Premium".
  probe:
    '[data-testid="sidebarColumn"] aside:has(a[href*="premium_sign_up"]), a[href="/i/premium_sign_up"]',
  css: `
    [data-testid="sidebarColumn"] aside:has(a[href*="premium_sign_up"]),
    header nav a[href="/i/premium_sign_up"] {
      display: none !important;
    }
  `,
};
