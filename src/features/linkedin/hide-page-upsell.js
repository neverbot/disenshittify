// alwaysOn (no toggle): remove the "Grow your business faster" upsell block
// (Try Premium Page + Advertise on LinkedIn) inside a Page box in the left rail.
// LinkedIn class names are hashed and componentkeys are random, so anchor on the
// stable href of the section's own premium-card upsell link, and exclude the
// surrounding Page box (which also holds the admin/profile links) so only the
// upsell sub-section is hidden.
export default {
  id: "linkedin.hide-page-upsell",
  platform: "linkedin",
  alwaysOn: true,
  title: "Hide Page upsell",
  description: "Removes the Grow your business faster block from a Page box.",
  css: `
    /* Advertise on LinkedIn (Campaign Manager) row. */
    a[href*="/campaignmanager"],
    /* The upsell block sits right after the Visitors analytics link, in order:
       Visitors, [hr], [label], [Try Premium row], Advertise, [hr], analytics.
       Reach the leading hr, the "Grow your business faster" label and the Try
       Premium row purely by position from the stable Visitors href — no :has(),
       whose broad div:has(> a...) subject the browser would re-check on churn. */
    a[href*="/admin/analytics/visitors"] + div,
    a[href*="/admin/analytics/visitors"] + div + div,
    a[href*="/admin/analytics/visitors"] + div + div + div {
      display: none !important;
    }
  `,
};
