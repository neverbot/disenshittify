import { boot } from "./boot.js";

// YouTube is a SPA that fires yt-navigate-finish on route changes.
boot("youtube", { navEvents: ["yt-navigate-finish"] });
