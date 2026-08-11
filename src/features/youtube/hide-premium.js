// The floating "YouTube Premium — get YouTube without the ads" promo that pops
// up bottom-left is a yt-mealbar-promo-renderer (inside a tp-yt-paper-dialog in
// ytd-popup-container). Anchor on the renderer tag plus its /premium link
// (language-invariant href), never the "Premium" copy. Hiding the renderer
// collapses the floating card with no leftover backdrop.
export default {
  id: "youtube.hide-premium",
  platform: "youtube",
  title: "Hide Premium upsells",
  description: "Removes the floating YouTube Premium promo popup.",
  defaultEnabled: true,
  probe: 'yt-mealbar-promo-renderer:has(a[href*="premium"])',
  css: `
    yt-mealbar-promo-renderer:has(a[href*="premium"]) {
      display: none !important;
    }
  `,
};
