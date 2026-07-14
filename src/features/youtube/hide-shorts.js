// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-shorts",
  platform: "youtube",
  title: "Hide Shorts",
  description: "Removes Shorts shelves, the sidebar entry, and search results.",
  defaultEnabled: true,
  probe:
    'ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts], grid-shelf-view-model:has(ytm-shorts-lockup-view-model), a[title="Shorts"], ytd-guide-entry-renderer:has(a[href^="/shorts"])',
  css: `
    /* Shorts shelves in feed and search (older reel/rich shelves). */
    ytd-reel-shelf-renderer,
    ytd-rich-shelf-renderer[is-shorts],
    ytd-rich-section-renderer:has(ytd-reel-shelf-renderer),
    ytd-rich-section-renderer:has([overlay-style="SHORTS"]),

    /* Newer search/grid Shorts: ytm-shorts-lockup-view-model lives in a
       grid-shelf-view-model inside a dedicated ytd-item-section-renderer. Hide the
       whole shorts section (with its title) when it holds no regular video result,
       plus the grid shelf and the lockups themselves as fallbacks. */
    ytd-item-section-renderer:has(ytm-shorts-lockup-view-model):not(:has(ytd-video-renderer)),
    grid-shelf-view-model:has(ytm-shorts-lockup-view-model),
    ytm-shorts-lockup-view-model,
    ytm-shorts-lockup-view-model-v2,

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
