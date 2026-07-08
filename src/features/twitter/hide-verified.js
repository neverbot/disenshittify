// Selectors are candidates — verify against live X/Twitter DOM.
// The paid "verified" blue check appears as [data-testid="icon-verified"]
// wherever a username is shown (timeline, hovercards, profiles, sidebar).
export default {
  id: "twitter.hide-verified",
  platform: "twitter",
  title: "Hide verified checks",
  description: "Removes the blue verified badge from usernames everywhere.",
  defaultEnabled: true,
  probe: '[data-testid="icon-verified"]',
  css: `
    [data-testid="icon-verified"] {
      display: none !important;
    }
  `,
};
