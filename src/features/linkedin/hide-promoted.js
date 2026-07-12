// css toggle: hide Promoted (ad) feed posts. LinkedIn strips every machine
// marker from ads (no urn / data-ad / sponsored attribute) and the "Promoted" /
// "Promoted by X" label is localized, so neither is usable. The reliable
// text-free signal is the actor's visibility line: a real post always shows a
// visibility icon (public = globe, connections = people), an ad shows "Promoted"
// with no icon. So match a real feed post — anchored on the per-post "..." control
// menu (`svg#overflow-web-ios-small`), which every post/ad has but the icon-less
// "Recommended for you" carousel lacks — that carries NO visibility icon.
// (An earlier version keyed on `data-testid="expandable-text-box"`, but ads with
// no expandable body text lack it and slipped through; the control menu does not.)
export default {
  id: "linkedin.hide-promoted",
  platform: "linkedin",
  title: "Hide promoted posts",
  description: "Removes Promoted (advertised) posts from the feed.",
  defaultEnabled: true,
  // One combined :not(:has(a, b)) instead of two, so the browser scans a
  // listitem's svg subtree once per style recalc, not twice (matters on the
  // churn-heavy feed where every added post re-evaluates these :has rules).
  probe:
    '[role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id*="globe"], svg[id*="people"]))',
  css: `
    [role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id*="globe"], svg[id*="people"])) {
      display: none !important;
    }
  `,
};
