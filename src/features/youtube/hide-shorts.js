// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-shorts",
  platform: "youtube",
  title: "Hide Shorts",
  description: "Removes Shorts shelves, the sidebar entry, and search results.",
  defaultEnabled: true,
  probe: 'ytd-reel-shelf-renderer, ytd-guide-entry-renderer:has(a[title="Shorts"]), a[title="Shorts"]',
  css: `
    ytd-reel-shelf-renderer,
    ytd-rich-shelf-renderer[is-shorts],
    ytd-rich-section-renderer:has([overlay-style="SHORTS"]),
    ytd-guide-entry-renderer:has(a[title="Shorts"]),
    ytd-mini-guide-entry-renderer[aria-label="Shorts"],
    a[title="Shorts"] {
      display: none !important;
    }
  `,
};
