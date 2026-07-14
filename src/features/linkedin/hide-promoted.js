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
  description: "Replaces Promoted (advertised) posts with an empty placeholder.",
  defaultEnabled: true,
  // One combined :not(:has(a, b)) instead of two, so the browser scans a
  // listitem's svg subtree once per style recalc, not twice (matters on the
  // churn-heavy feed where every added post re-evaluates these :has rules).
  probe:
    '[role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id*="globe"], svg[id*="people"]))',
  // Replace each ad with a fixed-height placeholder card instead of removing it.
  // display:none collapses the post to 0 height, so a feed that is mostly ads
  // shrinks to almost nothing and LinkedIn's infinite scroll keeps fetching the
  // next (also ad-heavy) page in a runaway loop. A constant 200px placeholder
  // keeps the feed tall enough that infinite scroll behaves. The children are
  // display:none'd (their svg still lives in the DOM, so the :has match stays
  // stable — no oscillation) and the label is drawn with ::after.
  // No margin here: the feed list is a flex column with gap:8px, so adding a
  // margin would stack on top of that gap and make the space below placeholders
  // bigger than between normal posts.
  css: `
    [role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id*="globe"], svg[id*="people"])) {
      height: 200px !important;
      min-height: 200px !important;
      max-height: 200px !important;
      box-sizing: border-box !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
      background: #ffffff !important;
      border: 1px dashed #c7c7c7 !important;
      border-radius: 8px !important;
    }
    [role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id*="globe"], svg[id*="people"])) > * {
      display: none !important;
    }
    [role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id*="globe"], svg[id*="people"]))::after {
      content: "This was promoted content" !important;
      color: #6b6b6b !important;
      font-size: 14px !important;
    }
  `,
};
