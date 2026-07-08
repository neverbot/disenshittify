// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-home-feed",
  platform: "youtube",
  title: "Hide home feed",
  description: "Removes the recommendation wall on the YouTube home page.",
  defaultEnabled: true,
  probe: 'ytd-browse[page-subtype="home"] ytd-rich-grid-renderer',
  css: `
    ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,
    ytd-browse[page-subtype="home"] #contents.ytd-rich-grid-renderer {
      display: none !important;
    }
  `,
};
