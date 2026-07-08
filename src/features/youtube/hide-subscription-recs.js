// Selectors are candidates — verify against live YouTube DOM (see build task).
// The Subscriptions feed sometimes injects a "Most relevant" recommendation
// shelf into the chronological grid. It is a ytd-rich-shelf-renderer WITHOUT
// is-shorts (the Shorts shelf has is-shorts; the "Latest" header section has no
// shelf at all), so target the section that wraps a non-Shorts shelf.
export default {
  id: "youtube.hide-subscription-recs",
  platform: "youtube",
  title: "Hide Most relevant",
  description: "Removes the injected recommendation shelf from the Subscriptions feed.",
  defaultEnabled: true,
  probe:
    'ytd-browse[page-subtype="subscriptions"] ytd-rich-section-renderer:has(ytd-rich-shelf-renderer:not([is-shorts]))',
  css: `
    ytd-browse[page-subtype="subscriptions"]
      ytd-rich-section-renderer:has(ytd-rich-shelf-renderer:not([is-shorts])) {
      display: none !important;
    }
  `,
};
