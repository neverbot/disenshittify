// alwaysOn (no toggle): remove the inline "What's happening?" composer that
// sits above the home timeline; the Post button already covers composing.
//
// The old scope ":has(ScrollSnap-List)" broke: X now renders the tab strip on
// status pages too, so it no longer distinguishes home from a tweet detail. And
// on a status page the reply composer's tweetTextarea_0 lives INSIDE the focal
// tweet's cellInnerDiv, so the old ":not(:has(cellInnerDiv))" match collapsed the
// focal tweet itself (the cell is a cellInnerDiv with no nested cell inside it).
//
// Anchor structurally instead: the home composer is the DIRECT child of the
// timeline column (a div that has cells) whose own subtree has neither a cell nor
// a tweet article. Reply composers on status fail this: they are buried inside a
// cell, not a direct child of the cell-bearing column, and the focal cell carries
// an article. All anchors are testids/tags, never copy. The two :has() clauses
// sit on separate compounds joined by ">", so this is not a nested :has()
// (which Firefox rejects).
export default {
  id: "twitter.hide-compose",
  platform: "twitter",
  alwaysOn: true,
  title: "Hide inline composer",
  description: "Removes the What's happening composer under the home tabs.",
  css: `
    [data-testid="primaryColumn"]
      div:has([data-testid="cellInnerDiv"])
      > div:has([data-testid="tweetTextarea_0"]):not(:has([data-testid="cellInnerDiv"])):not(:has(article[data-testid="tweet"])) {
      display: none !important;
    }
  `,
};
