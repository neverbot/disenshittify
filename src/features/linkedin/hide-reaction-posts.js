// css toggle: hide feed posts injected because someone in your network reacted to
// them ("X likes this", "X celebrates this", "X follows this page", "X commented
// on this", etc.). These share the injected-post shape `<h2>Feed post</h2> +
// <reason> + <hr> + <actor>`, and their reason header — unlike the "From your
// activity" one — links to the reactor's profile or company page. So match the
// reason header (the div right after the SR heading, followed by an <hr>) that
// contains a /in/ or /company/ link. Text-free: the reaction copy is localized
// and never matched; the reactor href is the anchor. See hide-activity-posts.js.
export default {
  id: "linkedin.hide-reaction-posts",
  platform: "linkedin",
  title: "Hide reaction posts",
  description: "Removes feed posts surfaced because someone liked, followed, or commented.",
  defaultEnabled: true,
  probe:
    '[role="listitem"]:has(h2 + div + hr):has(h2 + div a[href*="/in/"]), [role="listitem"]:has(h2 + div + hr):has(h2 + div a[href*="/company/"])',
  // Hide the listitem AND its [data-lazy-mount-id] flex-item wrapper, so a run of
  // hidden posts doesn't inflate the 8px flex gap between the visible ones around
  // them (see hide-recommended.js). Same conditions on the wrapper — no nested
  // :has. The listitem rules stay as a fallback.
  css: `
    [role="listitem"]:has(h2 + div + hr):has(h2 + div a[href*="/in/"]),
    [role="listitem"]:has(h2 + div + hr):has(h2 + div a[href*="/company/"]),
    [data-lazy-mount-id]:has(h2 + div + hr):has(h2 + div a[href*="/in/"]),
    [data-lazy-mount-id]:has(h2 + div + hr):has(h2 + div a[href*="/company/"]) {
      display: none !important;
    }
  `,
};
