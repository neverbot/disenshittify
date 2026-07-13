// JS feature (not css): LinkedIn resets the feed sort to "Most relevant first"
// (its algorithmic order) on every load. Default it to "Most recent first"
// instead, once per load. The sort control is the single [role="button"] with
// aria-expanded that sits BEFORE the first feed post; opening it shows a
// floating [role="menu"] whose two [role="menuitem"]s are, in order, "Most
// relevant first" (index 0) and "Most recent first" (index 1). We pick by
// POSITION — the option copy is localized and never matched. If the user
// configures "relevant" we do nothing, since that is already LinkedIn's default.
const MODE_KEY = "linkedin.default-feed-sort.mode";
let timer;
let done = false;

function findTrigger() {
  const firstPost = document.querySelector('[role="listitem"]');
  if (!firstPost) return null; // wait until the feed exists
  return (
    [...document.querySelectorAll('[role="button"][aria-expanded]')].find(
      (b) => b.compareDocumentPosition(firstPost) & Node.DOCUMENT_POSITION_FOLLOWING,
    ) || null
  );
}

function enforce(ctx) {
  if (done) return true;
  // "relevant" is LinkedIn's own default — nothing to enforce.
  if (ctx.getOption(MODE_KEY, "recent") !== "recent") {
    done = true;
    return true;
  }
  const trigger = findTrigger();
  if (!trigger) return false; // not ready yet

  done = true;
  trigger.click(); // open the sort menu
  setTimeout(() => {
    const items = [
      ...document.querySelectorAll('[data-floating-ui-portal] [role="menu"] [role="menuitem"]'),
    ];
    // index 1 = "Most recent first" (0 = "Most relevant first").
    if (items[1]) items[1].click();
    else document.body.click(); // close the menu if the layout changed
  }, 400);
  return true;
}

export default {
  id: "linkedin.default-feed-sort",
  platform: "linkedin",
  title: "Default to Most recent",
  description: "Sets the feed to Most recent first instead of Most relevant first.",
  defaultEnabled: true,
  options: [
    {
      key: MODE_KEY,
      label: "Feed sort",
      choices: [
        { value: "recent", label: "Most recent" },
        { value: "relevant", label: "Most relevant" },
      ],
      default: "recent",
    },
  ],
  apply(ctx) {
    done = false;
    if (enforce(ctx)) return;
    timer = setInterval(() => {
      if (enforce(ctx)) clearInterval(timer);
    }, 500);
    setTimeout(() => clearInterval(timer), 12000);
  },
  cleanup() {
    clearInterval(timer);
    done = false;
  },
};
