// css toggle: hide Promoted (ad) feed posts. LinkedIn strips every machine
// marker from ads (no urn / data-ad / sponsored attribute) and the "Promoted" /
// "Promoted by X" label is localized, so neither is usable. The reliable
// text-free signal is the per-post **dismiss "X"** control, icon `svg#close-small`:
// every ORGANIC feed post (yours, followed people/companies, reactions) carries it,
// but an AD does not (you can't dismiss an ad the same way). So match a feed post —
// anchored on the per-post "..." control menu (`svg#overflow-web-ios-small`), which
// every post/ad has but the "Recommended for you" carousel lacks — that has NO
// dismiss "X". Verified live: this matches exactly the text-"Promoted" posts
// (6/6, zero false positives) across recent and relevant feeds.
// History (2026-09): the previous anchor keyed on the actor's VISIBILITY icon
// (`svg#globe-*`/`svg#people-*`: "a real post shows one, an ad doesn't"). LinkedIn
// then REMOVED the visibility icon from every feed post, so `:not(:has(globe,
// people))` became true for the WHOLE feed and hid followed people/companies
// (GitHub etc.) and reactions too. `close-small` is the replacement. (An even
// earlier version keyed on `data-testid="expandable-text-box"`, which short-text
// ads lacked.)
export default {
  id: "linkedin.hide-promoted",
  platform: "linkedin",
  title: "Hide promoted posts",
  description: "Replaces Promoted (advertised) posts with an empty placeholder.",
  defaultEnabled: true,
  probe:
    '[role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id="close-small"]))',
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
    [role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id="close-small"])) {
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
    [role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id="close-small"])) > * {
      display: none !important;
    }
    [role="listitem"]:has(svg[id="overflow-web-ios-small"]):not(:has(svg[id="close-small"]))::after {
      content: "This was promoted content" !important;
      color: #6b6b6b !important;
      font-size: 14px !important;
    }
  `,
};
