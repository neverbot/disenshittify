// css toggle: hide organic feed posts from accounts you do NOT follow (LinkedIn's
// algorithmic "suggested" content — posts from 2nd/3rd+ degree people you have no
// connection with, injected into the home feed with no "Promoted" badge and no
// reaction reason header, so they look like normal posts). These only appear on
// the "Most relevant" (algorithmic) feed; the chronological "Most recent" feed
// (default-feed-sort's default) has essentially none.
//
// LinkedIn strips every textual marker (the degree badge "2nd"/"3rd+" and the
// "Follow"/"Connect <name>" button label are localized) AND strips the
// `data-view-name` tracking attributes a few seconds after render (a
// `data-view-name="edge-creation-follow-action"` anchor un-matches once hydration
// completes — do NOT use it). The persistent, language-invariant tell is the
// inline relationship button's icon: **Follow** (`svg#add-small`) OR **Connect**
// (`svg#connect-small`) — present only when you have no relationship with the
// author (a followed/connected author's post has neither). Catch both (an add-only
// anchor left Connect-button posts visible — a shipped leak). Then:
//   - require a visibility icon (`svg#globe-*` public / `svg#people-*`
//     connections) — real posts carry one, PROMOTED posts do not, so this excludes
//     ads (hide-promoted owns those);
//   - `:not(:has(h2 + div + hr))` excludes injected reaction/activity posts (whose
//     relationship button lives in the reason header) — hide-reaction-posts /
//     hide-activity-posts own those;
//   - `:not(:has(svg[id="trending-small"]))` excludes "Recommended for you"
//     modules — hide-recommended owns those.
// Verified live: exactly the 2nd/3rd+ organic posts, disjoint from promoted,
// reactions, recommended, and posts by accounts you follow. Every :has/:not(:has)
// sits on the listitem, none nested (Firefox rejects nested :has — see
// maintaining-linkedin-features.md rule 3). Cost ~2ms (plain `:has(svg…)`).
//
// PLACEHOLDER, not display:none (rule 12). Since these dominate the relevant feed,
// display:none'ing them collapses it to near-zero height and LinkedIn's infinite
// scroll refetches the next (also non-followed-heavy) page in a runaway loop that
// spikes CPU (measured ~95% recurring bursts on the relevant feed). A constant
// 200px placeholder keeps the feed tall so infinite scroll behaves — the exact
// treatment hide-promoted uses. Children are display:none'd (their svg stays in the
// DOM so the :has match is stable) and the label is drawn with ::after. No wrapper
// collapse (rule 13) and no margin: the placeholder has real height, and the feed's
// flex gap:8px already spaces it.
const MATCH =
  '[role="listitem"]:has(svg[id="add-small"], svg[id="connect-small"]):has(svg[id*="globe"], svg[id*="people"]):not(:has(h2 + div + hr)):not(:has(svg[id="trending-small"]))';

export default {
  id: "linkedin.hide-unfollowed",
  platform: "linkedin",
  title: "Hide posts from accounts you don't follow",
  description:
    "Replaces suggested posts from people you aren't connected to or following with an empty placeholder.",
  defaultEnabled: true,
  probe: MATCH,
  css: `
    ${MATCH} {
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
    ${MATCH} > * {
      display: none !important;
    }
    ${MATCH}::after {
      content: "Hidden — post from an account you don't follow" !important;
      color: #6b6b6b !important;
      font-size: 14px !important;
    }
  `,
};
