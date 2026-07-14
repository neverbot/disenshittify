import hideHomeFeed from "../features/youtube/hide-home-feed.js";
import hideShorts from "../features/youtube/hide-shorts.js";
import hideRecommendations from "../features/youtube/hide-recommendations.js";
import hideComments from "../features/youtube/hide-comments.js";
import hideAds from "../features/youtube/hide-ads.js";
import hideExplore from "../features/youtube/hide-explore.js";
import hideMoreFromYoutube from "../features/youtube/hide-more-from-youtube.js";
import hideSubscriptionRecs from "../features/youtube/hide-subscription-recs.js";
import hideExploreTopics from "../features/youtube/hide-explore-topics.js";
import twitterHideAds from "../features/twitter/hide-ads.js";
import twitterDefaultFollowing from "../features/twitter/default-following.js";
import twitterHidePremium from "../features/twitter/hide-premium.js";
import twitterHideSidebarWidgets from "../features/twitter/hide-sidebar-widgets.js";
import twitterHideGrok from "../features/twitter/hide-grok.js";
import twitterHideChat from "../features/twitter/hide-chat.js";
import twitterHideVerified from "../features/twitter/hide-verified.js";
import twitterSidebarLayout from "../features/twitter/sidebar-layout.js";
import twitterHideCompose from "../features/twitter/hide-compose.js";
import twitterFloatPostButton from "../features/twitter/float-post-button.js";
import twitterCompactSearch from "../features/twitter/compact-search.js";
import linkedinHidePageUpsell from "../features/linkedin/hide-page-upsell.js";
import linkedinHidePuzzles from "../features/linkedin/hide-puzzles.js";
import linkedinHideFeedRecs from "../features/linkedin/hide-feed-recs.js";
import linkedinHideActivityPosts from "../features/linkedin/hide-activity-posts.js";
import linkedinHideReactionPosts from "../features/linkedin/hide-reaction-posts.js";
import linkedinHidePromoted from "../features/linkedin/hide-promoted.js";
import linkedinHideRecommended from "../features/linkedin/hide-recommended.js";
import linkedinDefaultFeedSort from "../features/linkedin/default-feed-sort.js";

export const features = [
  hideHomeFeed,
  hideShorts,
  hideRecommendations,
  hideComments,
  hideAds,
  hideExplore,
  hideMoreFromYoutube,
  hideSubscriptionRecs,
  hideExploreTopics,
  twitterDefaultFollowing,
  twitterHideAds,
  twitterHidePremium,
  twitterHideSidebarWidgets,
  twitterHideGrok,
  twitterHideChat,
  twitterHideVerified,
  twitterSidebarLayout,
  twitterHideCompose,
  twitterFloatPostButton,
  twitterCompactSearch,
  linkedinDefaultFeedSort,
  linkedinHidePageUpsell,
  linkedinHidePuzzles,
  linkedinHideFeedRecs,
  linkedinHideActivityPosts,
  linkedinHideReactionPosts,
  linkedinHidePromoted,
  linkedinHideRecommended,
];

export function featuresByPlatform(platform) {
  return features.filter((feature) => feature.platform === platform);
}
