// JS feature (not css): on the home page, prefer the Following timeline over the
// algorithmic "For you". The home tabs live in a [data-testid="ScrollSnap-List"]
// and always render in a fixed order: [0] For you, [1] Following — so pick by
// POSITION, never by text (the labels are localized). The Following tab, once
// selected, is also the only tab with aria-haspopup="menu"; clicking it while
// selected opens a two-item menu whose order is fixed: [0] Popular, [1] Recent.
// We only act when Following is not already selected, then set the chosen sort
// once, so we never fight the user or reopen the menu on every visit.
const MODE_KEY = "twitter.default-following.mode";
let timer;

function homeTabs() {
  return [...document.querySelectorAll('[data-testid="ScrollSnap-List"] [role="tab"]')];
}

function followingTab() {
  const tabs = homeTabs();
  return tabs.length >= 2 ? tabs[1] : null; // [1] = Following
}

function onHome() {
  return location.pathname === "/home" || location.pathname === "/";
}

function enforce(ctx) {
  if (!onHome()) return false;
  const following = followingTab();
  if (!following) return false; // tabs not ready yet
  if (following.getAttribute("aria-selected") === "true") return true; // respect current state

  // Switch to Following, then set the sort mode once.
  following.click();
  const mode = ctx.getOption(MODE_KEY, "recent");
  setTimeout(() => {
    const tab = followingTab();
    if (!tab || tab.getAttribute("aria-selected") !== "true") return;
    tab.click(); // open the Popular/Recent menu
    setTimeout(() => {
      const items = [...document.querySelectorAll('[role="menuitem"]')];
      // Fixed order: [0] Popular, [1] Recent.
      const item = items[mode === "popular" ? 0 : 1];
      if (item) item.click();
      else document.body.click(); // close the menu if the layout changed
    }, 450);
  }, 500);
  return true;
}

export default {
  id: "twitter.default-following",
  platform: "twitter",
  title: "Default to Following",
  description: "Opens the Following timeline instead of For you.",
  defaultEnabled: true,
  options: [
    {
      key: MODE_KEY,
      label: "Sort",
      choices: [
        { value: "recent", label: "Recent" },
        { value: "popular", label: "Popular" },
      ],
      default: "recent",
    },
  ],
  apply(ctx) {
    // Poll briefly until the tabs exist, act once, then stop.
    if (enforce(ctx)) return;
    timer = setInterval(() => {
      if (enforce(ctx)) clearInterval(timer);
    }, 500);
    setTimeout(() => clearInterval(timer), 10000);
  },
  cleanup() {
    clearInterval(timer);
  },
};
