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

    /* Cap the watch column at ~80% of the available width and center it, so
       the player has breathing room instead of filling edge to edge. Clamped
       against the aspect-derived max so it never overshoots. Selector kept
       loose (no [flexy]/[is-two-columns_] requirement) so it survives the
       layout variants YouTube serves to signed-in accounts. */
    ytd-watch-flexy:not([theater]):not([fullscreen]) #primary.ytd-watch-flexy {
      max-width: min(
        calc((100vw - 48px) * 0.8),
        calc(
          var(--ytd-watch-flexy-chat-max-height) *
          var(--ytd-watch-flexy-width-ratio) /
          var(--ytd-watch-flexy-height-ratio)
        )
      ) !important;
      margin-inline: auto !important;
      flex-grow: 0 !important;
    }

    /* Let the player fill the (now capped) primary column. */
    ytd-watch-flexy:not([theater]):not([fullscreen]) {
      --ytd-watch-flexy-max-player-width: 100vw !important;
    }

    /* Hard guarantee: never allow a horizontal scroll area to exist on the
       watch page. Even if the width math is imperfect, clip (not scroll)
       means the arrow keys can never move a page scroll and hide the video. */
    ytd-app {
      overflow-x: clip !important;
    }
  `,
};
