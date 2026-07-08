// Selectors are candidates — verify against live X/Twitter DOM.
export default {
  id: "twitter.hide-premium",
  platform: "twitter",
  title: "Hide Premium",
  description: "Removes the Subscribe to Premium box and the Premium nav item.",
  defaultEnabled: true,
  probe: 'aside[aria-label="Subscribe to Premium"], a[href="/i/premium_sign_up"]',
  css: `
    aside[aria-label="Subscribe to Premium"],
    header nav a[href="/i/premium_sign_up"] {
      display: none !important;
    }
  `,
};
