// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-recommendations",
  platform: "youtube",
  title: "Hide recommendations",
  description: "Removes recommended videos from the watch-page sidebar and the end-of-video overlay, and grows the player to fill the freed space.",
  defaultEnabled: true,
  probe: "#secondary.ytd-watch-flexy, .html5-endscreen",
  css: `
    /* Hide the whole secondary column (recommendations, playlists, chat). */
    #secondary.ytd-watch-flexy {
      display: none !important;
    }

    /* Hide the end-of-playback recommendations: the auto video-wall grid and
       the creator-placed end-screen elements (video/playlist cards overlaid on
       the player in the final seconds). */
    .html5-endscreen,
    .ytp-endscreen-content,
    .ytp-videowall-still,
    .ytp-ce-element,
    .ytp-ce-covering-overlay,
    .ytp-ce-element-shadow {
      display: none !important;
    }

    /* Drive the player size from YouTube's own width variable (the value it
       reads when sizing the video), so toggling live during playback reflows
       correctly. Target ~80% of the available width, guarded by 90vh worth of
       16:9 so it never grows taller than the viewport on wide screens.
       Vertical/Short videos (is-vertical-video_) are excluded — widening them
       makes a portrait player overflow the viewport, so we leave YouTube's own
       narrow sizing untouched for those. */
    ytd-watch-flexy:not([theater]):not([fullscreen]):not([is-vertical-video_]) {
      --ytd-watch-flexy-max-player-width: min(
        calc((100vw - 48px) * 0.8),
        calc(90vh * 16 / 9)
      ) !important;
    }

    /* Match the primary column to that same width and center it, so the video
       and its container agree (no size mismatch) and it sits with air on both
       sides. */
    ytd-watch-flexy:not([theater]):not([fullscreen]):not([is-vertical-video_]) #primary.ytd-watch-flexy {
      max-width: min(calc((100vw - 48px) * 0.8), calc(90vh * 16 / 9)) !important;
      margin-inline: auto !important;
    }
  `,
};
