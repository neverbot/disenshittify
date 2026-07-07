import hideHomeFeed from "../features/youtube/hide-home-feed.js";
import hideShorts from "../features/youtube/hide-shorts.js";
import hideSidebarRecs from "../features/youtube/hide-sidebar-recs.js";
import hideComments from "../features/youtube/hide-comments.js";

export const features = [
  hideHomeFeed,
  hideShorts,
  hideSidebarRecs,
  hideComments,
];

export function featuresByPlatform(platform) {
  return features.filter((feature) => feature.platform === platform);
}
