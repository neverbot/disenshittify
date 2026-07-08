import hideHomeFeed from "../features/youtube/hide-home-feed.js";
import hideShorts from "../features/youtube/hide-shorts.js";
import hideSidebarRecs from "../features/youtube/hide-sidebar-recs.js";
import hideComments from "../features/youtube/hide-comments.js";
import hideAds from "../features/youtube/hide-ads.js";
import hideExplore from "../features/youtube/hide-explore.js";
import hideMoreFromYoutube from "../features/youtube/hide-more-from-youtube.js";
import hideSubscriptionRecs from "../features/youtube/hide-subscription-recs.js";

export const features = [
  hideHomeFeed,
  hideShorts,
  hideSidebarRecs,
  hideComments,
  hideAds,
  hideExplore,
  hideMoreFromYoutube,
  hideSubscriptionRecs,
];

export function featuresByPlatform(platform) {
  return features.filter((feature) => feature.platform === platform);
}
