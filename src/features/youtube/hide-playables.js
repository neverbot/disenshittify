// The "YouTube Playables" shelf appears mid-feed on the home page: a
// ytd-rich-shelf-renderer wrapped in a ytd-rich-section-renderer, holding links
// to /playables. Anchor on the href (language-invariant), never the "Playables"
// title. Hide the whole rich-section wrapper so no empty gap is left behind.
export default {
  id: "youtube.hide-playables",
  platform: "youtube",
  title: "Hide Playables",
  description: "Removes the YouTube Playables games shelf from the home feed.",
  defaultEnabled: true,
  probe: 'ytd-rich-section-renderer:has(a[href^="/playables"])',
  css: `
    ytd-rich-section-renderer:has(a[href^="/playables"]) {
      display: none !important;
    }
  `,
};
