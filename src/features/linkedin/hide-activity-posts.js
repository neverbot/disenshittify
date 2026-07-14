// css toggle: hide feed posts injected because of YOUR OWN activity ("From your
// activity"). Every feed post card is `<h2>Feed post</h2> + <reason> + <hr> +
// <actor>`; injected posts (activity + reaction) are exactly the ones with that
// reason header followed by an <hr>, which normal posts lack. The activity
// reason header, unlike a reaction one, carries NO reactor profile link, so
// exclude posts whose reason header links to a person/company (those are
// reactions, handled by hide-reaction-posts). Anchored on tag/structure/href
// only — the "From your activity" copy is localized and never matched.
// (`:not(:has())` sits on the listitem, not inside another :has — Firefox rejects
// nested :has.)
export default {
  id: "linkedin.hide-activity-posts",
  platform: "linkedin",
  title: "Hide From your activity posts",
  description: "Removes feed posts surfaced from your own activity.",
  defaultEnabled: true,
  probe:
    '[role="listitem"]:has(h2 + div + hr):not(:has(h2 + div a[href*="/in/"], h2 + div a[href*="/company/"]))',
  // Hide the listitem AND its [data-lazy-mount-id] flex-item wrapper, so a run of
  // hidden posts doesn't inflate the 8px flex gap between the visible ones around
  // them (see hide-recommended.js). Same conditions on the wrapper — no nested
  // :has. The listitem rule stays as a fallback.
  css: `
    [role="listitem"]:has(h2 + div + hr):not(:has(h2 + div a[href*="/in/"], h2 + div a[href*="/company/"])),
    [data-lazy-mount-id]:has(h2 + div + hr):not(:has(h2 + div a[href*="/in/"], h2 + div a[href*="/company/"])) {
      display: none !important;
    }
  `,
};
