// Honest hit-counting: for each active feature with a `probe` selector, count
// how many matching elements exist in the document (i.e. what it is hiding).
export function countHits(features, enabledMap, doc = document) {
  const counts = {};
  for (const feature of features) {
    if (!enabledMap[feature.id] || !feature.probe) continue;
    try {
      counts[feature.id] = doc.querySelectorAll(feature.probe).length;
    } catch {
      counts[feature.id] = 0;
    }
  }
  return counts;
}

// Roll a counts map up into headline numbers for badge/toast.
export function summarize(counts) {
  const ids = Object.keys(counts);
  const totalHidden = ids.reduce((n, id) => n + counts[id], 0);
  const activeHitCount = ids.filter((id) => counts[id] > 0).length;
  return { activeHitCount, totalHidden };
}
