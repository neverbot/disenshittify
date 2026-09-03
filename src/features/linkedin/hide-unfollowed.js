// css toggle: hide organic feed posts from accounts you do NOT follow (LinkedIn's
// algorithmic "suggested" content — posts from 2nd/3rd+ degree people you have no
// connection with, injected into the home feed with no "Promoted" badge and no
// reaction reason header, so they look like normal posts). LinkedIn strips every
// textual marker (the degree badge "2nd"/"3rd+" and the "Follow <name>" button
// label are both localized) AND strips the `data-view-name` tracking attributes a
// few seconds after render (so a `data-view-name="edge-creation-follow-action"`
// anchor un-matches once hydration completes — do NOT use it). The persistent,
// language-invariant tell is the inline **Follow** button's icon `svg#add-small`:
//   1. a post whose author you do NOT follow carries a Follow button (icon
//      `svg#add-small`); a followed/connected author's post has none. This is the
//      core discriminator (verified: followed-author posts match nothing here).
//   2. require a visibility icon (`svg#globe-*` public / `svg#people-*`
//      connections) — real posts carry one, PROMOTED posts do not, so this
//      excludes ads (hide-promoted owns those via its 200px placeholder).
//   3. `:not(:has(h2 + div + hr))` excludes injected reaction/activity posts
//      (whose own Follow button lives in the reason header) — hide-reaction-posts
//      / hide-activity-posts own those.
//   4. `:not(:has(svg[id="trending-small"]))` excludes "Recommended for you"
//      follow-suggestion modules — hide-recommended owns those.
// Verified live: this set is exactly the 2nd/3rd+ organic posts, disjoint from
// promoted, reactions, recommended, and posts by accounts you follow. Every
// :has/:not(:has) sits on the listitem, none nested (Firefox rejects nested
// :has — see maintaining-linkedin-features.md rule 3). Cost ~2ms (plain
// `:has(svg#add-small)`, same class as hide-promoted's overflow anchor; the
// scoped `:has(h2 + div svg#add-small)` variant was dropped — it timed out).
//
// display:none + [data-lazy-mount-id] wrapper collapse (rule 13) to avoid the 8px
// flex-gap inflation of a hidden run. Caveat: if the feed is DOMINATED by these,
// display:none can shrink the visible feed enough to trip LinkedIn's infinite-
// scroll runaway (rule 12) — if a user reports that, switch these to the 200px
// placeholder treatment hide-promoted uses. Second caveat: if a followed author's
// post ever embeds an `svg#add-small` in its body (e.g. an inline "follow a
// mentioned page" affordance) it could be caught; none observed.
const MATCH =
  '[role="listitem"]:has(svg[id="add-small"]):has(svg[id*="globe"], svg[id*="people"]):not(:has(h2 + div + hr)):not(:has(svg[id="trending-small"]))';
const WRAPPER =
  '[data-lazy-mount-id]:has(svg[id="add-small"]):has(svg[id*="globe"], svg[id*="people"]):not(:has(h2 + div + hr)):not(:has(svg[id="trending-small"]))';

export default {
  id: "linkedin.hide-unfollowed",
  platform: "linkedin",
  title: "Hide posts from accounts you don't follow",
  description:
    "Removes suggested feed posts from people you aren't connected to or following.",
  defaultEnabled: true,
  probe: MATCH,
  css: `
    ${MATCH},
    ${WRAPPER} {
      display: none !important;
    }
  `,
};
