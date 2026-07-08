// Selectors are candidates — verify against live YouTube DOM (see build task).
// The "More from YouTube" guide section is title-localized, so anchor on the
// stable off-site hrefs unique to it (Premium, Music, Kids). Note: the Studio
// link lives in the "You" section, so it must NOT be used as an anchor here.
export default {
  id: "youtube.hide-more-from-youtube",
  platform: "youtube",
  title: "Hide More from YouTube",
  description: "Removes the whole More from YouTube section from the left sidebar.",
  defaultEnabled: false,
  probe: 'ytd-guide-section-renderer:has(a[href="/premium"])',
  css: `
    ytd-guide-section-renderer:has(a[href="/premium"]),
    ytd-guide-section-renderer:has(a[href*="music.youtube.com"]),
    ytd-guide-section-renderer:has(a[href*="youtubekids.com"]) {
      display: none !important;
    }
  `,
};
