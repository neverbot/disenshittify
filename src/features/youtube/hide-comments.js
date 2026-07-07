// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-comments",
  platform: "youtube",
  title: "Hide comments",
  description: "Removes the comments section on the watch page.",
  defaultEnabled: false,
  css: `
    ytd-comments#comments,
    #comments.ytd-watch-flexy {
      display: none !important;
    }
  `,
};
