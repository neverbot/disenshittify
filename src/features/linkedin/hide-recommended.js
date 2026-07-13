// css toggle: hide "Recommended for you" suggestion modules injected into the
// feed (a header card plus a carousel of people/company follow suggestions).
// Their reason icon is `svg#trending-small`, which real posts never carry, and
// unlike real posts these modules have NO per-post "..." control menu — so match
// a listitem with the trending icon and no overflow menu. Text-free: the
// "Recommended for you" copy is localized and never matched.
// Unlike hide-promoted, these are infrequent (they don't dominate the feed), so
// display:none is safe here — it won't shrink the feed enough to trip LinkedIn's
// infinite-scroll runaway (see maintaining-linkedin-features.md rule 12).
export default {
  id: "linkedin.hide-recommended",
  platform: "linkedin",
  title: "Hide Recommended for you posts",
  description: "Removes Recommended for you follow suggestions from the feed.",
  defaultEnabled: true,
  probe:
    '[role="listitem"]:has(svg[id="trending-small"]):not(:has(svg[id="overflow-web-ios-small"]))',
  css: `
    [role="listitem"]:has(svg[id="trending-small"]):not(:has(svg[id="overflow-web-ios-small"])) {
      display: none !important;
    }
  `,
};
