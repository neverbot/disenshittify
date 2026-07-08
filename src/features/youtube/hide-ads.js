// Selectors are candidates — verify against live YouTube DOM (see build task).
export default {
  id: "youtube.hide-ads",
  platform: "youtube",
  title: "Hide ads",
  description: "Removes sponsored items, promo banners, and the masthead ad from the feed.",
  defaultEnabled: true,
  probe:
    "ytd-ad-slot-renderer, ytd-in-feed-ad-layout-renderer, ytd-statement-banner-renderer, ytd-brand-video-singleton-renderer, ytd-brand-video-shelf-renderer, #masthead-ad",
  css: `
    /* Masthead + in-feed sponsored ad cells. */
    #masthead-ad,
    ytd-ad-slot-renderer,
    ytd-in-feed-ad-layout-renderer,
    ytd-rich-item-renderer:has(ytd-ad-slot-renderer),
    ytd-rich-item-renderer:has(ytd-in-feed-ad-layout-renderer),
    ytd-rich-section-renderer:has(ytd-ad-slot-renderer),

    /* Full-width promo banners ("YouTube featured", Premium offers, brand promos). */
    ytd-statement-banner-renderer,
    ytd-brand-video-singleton-renderer,
    ytd-brand-video-shelf-renderer,
    ytd-rich-section-renderer:has(ytd-statement-banner-renderer),
    ytd-rich-section-renderer:has(ytd-brand-video-singleton-renderer),
    ytd-rich-section-renderer:has(ytd-brand-video-shelf-renderer) {
      display: none !important;
    }
  `,
};
