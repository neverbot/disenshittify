// css toggle: remove the "Explore more topics" chips shelf that intermittently
// appears in the home feed. It is a generic ytd-rich-section-renderer, but the
// only home section whose content is a ytd-chips-shelf-with-video-shelf-renderer
// (topic chips that expand into a video shelf) — anchor on that tag, which is
// language-independent, and hide the whole section (with its header). The bare
// renderer is a fallback.
export default {
  id: "youtube.hide-explore-topics",
  platform: "youtube",
  title: "Hide Explore more topics",
  description: "Removes the Explore more topics chips shelf from the home feed.",
  defaultEnabled: true,
  probe: "ytd-rich-section-renderer:has(ytd-chips-shelf-with-video-shelf-renderer)",
  css: `
    ytd-rich-section-renderer:has(ytd-chips-shelf-with-video-shelf-renderer),
    ytd-chips-shelf-with-video-shelf-renderer {
      display: none !important;
    }
  `,
};
