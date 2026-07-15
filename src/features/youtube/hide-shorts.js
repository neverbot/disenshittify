// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-shorts",
  platform: "youtube",
  title: "Hide Shorts",
  description: "Removes Shorts shelves, the sidebar entry, and search results.",
  defaultEnabled: true,
  probe:
    'ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts], grid-shelf-view-model:has(ytm-shorts-lockup-view-model), ytd-guide-entry-renderer:has(a[href^="/shorts"])',
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

    /* Sidebar entry, both the full guide and the mini guide. Anchored purely on
       the /shorts href (the Shorts nav entry always links there); the entries
       carry no aria-label="Shorts" (verified), so no localized-text anchor. */
    ytd-guide-entry-renderer:has(a[href^="/shorts"]),
    ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]) {
      display: none !important;
    }
  `,
};
