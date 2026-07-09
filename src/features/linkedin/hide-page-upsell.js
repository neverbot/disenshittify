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
    /* Try Premium Page row (wraps the premium upsell-slot anchor). */
    div:has(> a[href*="PREMIUM_PAGE_FEED_PAGE_CARD"]),
    /* "Grow your business faster" label: the 2nd row after the Visitors link
       (Visitors, hr, label). Anchored on the stable Visitors href by position,
       since the label itself carries only localized text. */
    a[href*="/admin/analytics/visitors"] + div + div,
    /* Leading separator: the hr row right after the Visitors analytics link.
       (Firefox rejects nested :has(), so anchor the hr on the stable Visitors
       href rather than on the upsell block that follows it.) */
    a[href*="/admin/analytics/visitors"] + div:has(> hr) {
      display: none !important;
    }
  `,
};
