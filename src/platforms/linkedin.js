import { boot } from "./boot.js";

// LinkedIn is a SPA with no public navigation event; boot() detects URL changes
// via its MutationObserver.
boot("linkedin");
