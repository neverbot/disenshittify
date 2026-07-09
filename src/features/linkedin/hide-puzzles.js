// css toggle: remove the "Today's puzzles" card (Wend / Patches / Zip / Mini
// Sudoku games) from the right sidebar. The card is a hashed-class div with no
// testid, and it shares an ancestor wrapper with the "Add to your feed" card, so
// anchoring on /games/ alone would take both down. The puzzles card is the only
// right-rail block that holds /games/ links but no follow links (/company/, /in/,
// which belong to Add-to-your-feed), so exclude those to land on it exactly.
export default {
  id: "linkedin.hide-puzzles",
  platform: "linkedin",
  title: "Hide Today's puzzles",
  description: "Removes the Today's puzzles games box.",
  defaultEnabled: true,
  probe: 'aside div:has(a[href*="/games/"]):not(:has(a[href*="/company/"])):not(:has(a[href*="/in/"]))',
  css: `
    aside div:has(a[href*="/games/"]):not(:has(a[href*="/company/"])):not(:has(a[href*="/in/"])) {
      display: none !important;
    }
  `,
};
