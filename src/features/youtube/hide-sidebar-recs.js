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

    /* Drive the player size from YouTube's own width variable (the value it
       reads when sizing the video), so toggling live during playback reflows
       correctly. Target ~80% of the available width, guarded by 90vh worth of
       16:9 so it never grows taller than the viewport on wide screens. */
    ytd-watch-flexy:not([theater]):not([fullscreen]) {
      --ytd-watch-flexy-max-player-width: min(
        calc((100vw - 48px) * 0.8),
        calc(90vh * 16 / 9)
      ) !important;
    }

    /* Match the primary column to that same width and center it, so the video
       and its container agree (no size mismatch) and it sits with air on both
       sides. */
    ytd-watch-flexy:not([theater]):not([fullscreen]) #primary.ytd-watch-flexy {
      max-width: min(calc((100vw - 48px) * 0.8), calc(90vh * 16 / 9)) !important;
      margin-inline: auto !important;
    }

    /* Hard guarantee: never allow a horizontal scroll area to exist on the
       watch page. Even if the width math is imperfect, clip (not scroll)
       means the arrow keys can never move a page scroll and hide the video. */
    ytd-app {
      overflow-x: clip !important;
    }
  `,
};
