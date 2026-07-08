// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-sidebar-recs",
  platform: "youtube",
  title: "Hide sidebar recommendations",
  description: "Removes the recommended-videos column on the watch page and grows the player to fill the freed space.",
  defaultEnabled: true,
  probe: "#secondary.ytd-watch-flexy",
  css: `
    /* Hide the whole secondary column (recommendations, playlists, chat). */
    #secondary.ytd-watch-flexy {
      display: none !important;
    }

    /* Grow the player into the freed width, but clamp against the viewport so
       the width can never overshoot. Scoped away from theater/fullscreen. */
    ytd-watch-flexy[flexy][is-two-columns_]:not([theater]):not([fullscreen]) {
      --ytd-watch-flexy-max-player-width: min(
        calc(100vw - 40px),
        calc(
          var(--ytd-watch-flexy-chat-max-height) *
          var(--ytd-watch-flexy-width-ratio) /
          var(--ytd-watch-flexy-height-ratio)
        )
      ) !important;
    }

    /* Hard guarantee: never allow a horizontal scroll area to exist on the
       watch page. Even if the width math is imperfect, clip (not scroll)
       means the arrow keys can never move a page scroll and hide the video. */
    ytd-app {
      overflow-x: clip !important;
    }
  `,
};
