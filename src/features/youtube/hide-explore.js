// Selectors are candidates — verify against live YouTube DOM (see build task).
// The "Explore" guide section is title-localized, so anchor on the stable
// hrefs unique to it: the storefront (Movies) feed and the global Gaming
// channel id.
export default {
  id: "youtube.hide-explore",
  platform: "youtube",
  title: "Hide Explore",
  description: "Removes the whole Explore section from the left sidebar.",
  defaultEnabled: false,
  probe: 'ytd-guide-section-renderer:has(a[href^="/feed/storefront"])',
  css: `
    ytd-guide-section-renderer:has(a[href^="/feed/storefront"]),
    ytd-guide-section-renderer:has(a[href="/channel/UC4R8DWoMoI7CAwX8_LjQHig"]) {
      display: none !important;
    }
  `,
};
