import { boot } from "./boot.js";

// LinkedIn is a SPA with no public navigation event; boot() detects URL changes
// via its MutationObserver. All LinkedIn features target the home feed, so gate
// them to `/feed…` — a profile's `/in/…` Activity section reuses the same
// feed-post DOM and would otherwise trip hide-promoted & co. (see boot.js).
boot("linkedin", { activeWhen: (loc) => loc.pathname.startsWith("/feed") });
