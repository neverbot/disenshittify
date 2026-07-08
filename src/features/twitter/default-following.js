// JS feature (not css): on the home page, prefer the Following timeline over the
// algorithmic "For you". The Following tab is a [role="tab"] with
// aria-haspopup="menu"; clicking it while already selected opens a menu with two
// [role="menuitem"]s, "Popular" and "Recent". We only act when For you is the
// selected tab (a fresh state), then switch to Following and set the chosen mode
// once. If Following is already selected we leave it alone, so we never fight the
// user or reopen the menu on every visit (X remembers the choice).
const MODE_KEY = "twitter.default-following.mode";
let timer;

function findTab(re) {
  return [...document.querySelectorAll('[role="tab"]')].find((t) => re.test(t.textContent));
}

function onHome() {
  return location.pathname === "/home" || location.pathname === "/";
}

function enforce(ctx) {
  if (!onHome()) return false;
  const following = findTab(/Following/i);
  if (!following) return false; // tabs not ready yet
  if (following.getAttribute("aria-selected") === "true") return true; // respect current state
  const forYou = findTab(/For you/i);
  if (!forYou || forYou.getAttribute("aria-selected") !== "true") return true;

  // For you is selected: switch to Following, then set the mode once.
  following.click();
  const mode = ctx.getOption(MODE_KEY, "recent");
  setTimeout(() => {
    const tab = findTab(/Following/i);
    if (!tab || tab.getAttribute("aria-selected") !== "true") return;
    tab.click(); // open the Popular/Recent menu
    setTimeout(() => {
      const want = mode === "popular" ? /popular/i : /recent/i;
      const item = [...document.querySelectorAll('[role="menuitem"]')].find((m) =>
        want.test(m.textContent)
      );
      if (item) item.click();
      else document.body.click(); // close the menu if the item wasn't found
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
