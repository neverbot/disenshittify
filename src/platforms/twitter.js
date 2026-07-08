import { boot } from "./boot.js";

// X/Twitter is a SPA with no public navigation event; boot() detects URL
// changes via its MutationObserver.
boot("twitter");
