// Promoted posts carry a placementTracking wrapper AROUND the tweet article, so
// hide the whole timeline cell that holds one. Note: X also injects a
// placementTracking node INSIDE a tweet's own media as impression instrumentation
// when a video is played — matching a bare placementTracking would collapse any
// video tweet (e.g. the focused tweet on a status page) the moment you hit play.
// Disambiguate by requiring the placementTracking to CONTAIN the tweet article
// (the promoted-cell shape); the video's instrumentation sits inside the article,
// so it never matches.
export default {
  id: "twitter.hide-ads",
  platform: "twitter",
  title: "Hide ads",
  description: "Removes promoted posts from the timeline.",
  defaultEnabled: true,
  probe: 'div[data-testid="cellInnerDiv"]:has([data-testid="placementTracking"] article[data-testid="tweet"])',
  css: `
    div[data-testid="cellInnerDiv"]:has([data-testid="placementTracking"] article[data-testid="tweet"]) {
      display: none !important;
    }
  `,
};
