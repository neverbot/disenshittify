// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-sidebar-recs",
  platform: "youtube",
  title: "Hide sidebar recommendations",
  description: "Removes the recommended-videos column on the watch page.",
  defaultEnabled: true,
  css: `
    #secondary #related,
    ytd-watch-next-secondary-results-renderer {
      display: none !important;
    }
  `,
};
