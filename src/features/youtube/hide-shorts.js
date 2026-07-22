// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-shorts",
  platform: "youtube",
  title: "Hide Shorts",
  description: "Removes Shorts shelves, the sidebar entry, and search results.",
  defaultEnabled: true,
  probe:
    'ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts], grid-shelf-view-model:has(ytm-shorts-lockup-view-model), ytd-guide-entry-renderer:has(a[href^="/shorts"], a[title="Shorts"])',
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

    /* Sidebar entry, both the full guide and the mini guide.

       The mini guide entry still links to /shorts. The full guide entry lost its
       href (verified: a#endpoint has no href attribute, only title="Shorts"), so
       it needs two href-free anchors:
         - title="Shorts" — a brand name YouTube ships untranslated in every
           locale, same class of anchor as [aria-label*="Grok"] on X.
         - the Shorts glyph path data — fully language-invariant, covers the case
           where the brand name ever gets localized. */
    ytd-guide-entry-renderer:has(a[href^="/shorts"]),
    ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]),
    ytd-guide-entry-renderer:has(a[title="Shorts"]),
    ytd-mini-guide-entry-renderer:has(a[title="Shorts"]),
    ytd-guide-entry-renderer:has(path[d^="m13.467 1.19-8 4.7"]),
    ytd-mini-guide-entry-renderer:has(path[d^="m13.467 1.19-8 4.7"]) {
      display: none !important;
    }
  `,
};
