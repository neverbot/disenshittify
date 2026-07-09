// css toggle: hide Promoted (ad) feed posts. LinkedIn strips every machine
// marker from ads (no urn / data-ad / sponsored attribute) and the "Promoted" /
// "Promoted by X" label is localized, so neither is usable. The reliable
// text-free signal is the actor's visibility line: a real post always shows a
// visibility icon (public = globe, connections = people), an ad shows "Promoted"
// with no icon. So match a post that has body text (`data-testid=
// "expandable-text-box"`, a stable testid — excludes the icon-less "Recommended
// for you" carousel) but carries NO visibility icon.
// Trade-off: rare image-only ads with no text body are missed (acceptable — the
// alternative risks hiding real posts). See maintaining-linkedin-features.md.
export default {
  id: "linkedin.hide-promoted",
  platform: "linkedin",
  title: "Hide promoted posts",
  description: "Removes Promoted (advertised) posts from the feed.",
  defaultEnabled: true,
  probe:
    '[role="listitem"]:has([data-testid="expandable-text-box"]):not(:has(svg[id*="globe"])):not(:has(svg[id*="people"]))',
  css: `
    [role="listitem"]:has([data-testid="expandable-text-box"]):not(:has(svg[id*="globe"])):not(:has(svg[id*="people"])) {
      display: none !important;
    }
  `,
};
