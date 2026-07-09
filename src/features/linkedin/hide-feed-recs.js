// css toggle: remove the "Add to your feed" follow-recommendations card from the
// right sidebar. It shares an ancestor wrapper with the "Today's puzzles" card,
// so anchor on what only IT holds: the "View all recommendations" link
// (/mynetwork/discover-hub/, unique to this card and absent from the left rail),
// and exclude /games/ so the shared wrapper (which also holds the puzzles) is not
// matched. See hide-puzzles.js for the mirror-image case.
export default {
  id: "linkedin.hide-feed-recs",
  platform: "linkedin",
  title: "Hide Add to your feed",
  description: "Removes the Add to your feed follow suggestions from the right sidebar.",
  defaultEnabled: true,
  probe: 'aside div:has(a[href*="/mynetwork/discover-hub/"]):not(:has(a[href*="/games/"]))',
  css: `
    aside div:has(a[href*="/mynetwork/discover-hub/"]):not(:has(a[href*="/games/"])) {
      display: none !important;
    }
  `,
};
