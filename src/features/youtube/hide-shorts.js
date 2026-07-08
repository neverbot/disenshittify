// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-shorts",
  platform: "youtube",
  title: "Hide Shorts",
  description: "Removes Shorts shelves, the sidebar entry, and search results.",
  defaultEnabled: true,
  probe:
    'ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts], a[title="Shorts"], ytd-guide-entry-renderer:has(a[href^="/shorts"])',
  css: `
    /* Shorts shelves in feed and search. */
    ytd-reel-shelf-renderer,
    ytd-rich-shelf-renderer[is-shorts],
    ytd-rich-section-renderer:has(ytd-reel-shelf-renderer),
    ytd-rich-section-renderer:has([overlay-style="SHORTS"]),

    /* Sidebar entry, both the full guide and the mini guide. Anchored on the
       /shorts href (reliable) plus the title as a fallback. */
    ytd-guide-entry-renderer:has(a[href^="/shorts"]),
    ytd-guide-entry-renderer:has(a[title="Shorts"]),
    ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]),
    ytd-mini-guide-entry-renderer[aria-label="Shorts"],
    a[title="Shorts"] {
      display: none !important;
    }
  `,
};
