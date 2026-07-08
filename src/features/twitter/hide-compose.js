// alwaysOn (no toggle): remove the inline tweet composer under the home tabs;
// the Post button already covers composing. Scoped to home via the presence of
// the timeline tab strip (ScrollSnap-List) so reply composers on status pages
// are left intact. The composer is every ancestor of the textarea that does not
// also contain timeline cells; hiding them removes exactly the composer subtree.
export default {
  id: "twitter.hide-compose",
  platform: "twitter",
  alwaysOn: true,
  title: "Hide inline composer",
  description: "Removes the What's happening composer under the home tabs.",
  css: `
    [data-testid="primaryColumn"]:has([data-testid="ScrollSnap-List"])
      div:has([data-testid="tweetTextarea_0"]):not(:has([data-testid="cellInnerDiv"])) {
      display: none !important;
    }
  `,
};
