import { features as allFeatures } from "../shared/registry.js";
import { resolveEnabled, resolveOption } from "../shared/config.js";
import { MASTER_KEY } from "../shared/constants.js";
import { FEEDBACK, feedbackOn } from "../shared/feedback.js";
import { getConfig, setValue } from "../shared/storage.js";
import { makeIcon, PLATFORM_LABELS } from "./icons.js";

const SETTINGS_TAB = "settings";

const api =
  typeof browser !== "undefined"
    ? browser
    : typeof chrome !== "undefined"
      ? chrome
      : undefined;

const FEEDBACK_ROWS = [
  { key: FEEDBACK.toast, title: "On-page toast", description: "A brief confirmation on the page when cleanups run." },
  { key: FEEDBACK.badge, title: "Toolbar badge", description: "A count on the extension icon for the current tab." },
  { key: FEEDBACK.popup, title: "Popup counts", description: "Show how much each feature hid on this tab." },
];

function makeCheckbox(doc, id, checked, onChange) {
  const input = doc.createElement("input");
  input.type = "checkbox";
  input.className = "switch";
  input.setAttribute("data-id", id);
  input.checked = checked;
  input.addEventListener("change", () => onChange(id, input.checked));
  return input;
}

function makeRow(doc, { title, description }, control, hits) {
  const row = doc.createElement("label");
  row.className = "feature";
  const text = doc.createElement("span");
  text.className = "feature__text";
  const label = doc.createElement("span");
  label.className = "feature__label";
  label.textContent = title;
  const desc = doc.createElement("span");
  desc.className = "feature__desc";
  desc.textContent = description;
  text.appendChild(label);
  text.appendChild(desc);
  row.appendChild(text);
  if (hits) row.appendChild(hits);
  row.appendChild(control);
  return row;
}

// A feature option rendered as a small inline radio group, shown under an
// enabled feature that declares options.
function makeOption(doc, opt, current, onChange) {
  const wrap = doc.createElement("div");
  wrap.className = "feature-option";
  const label = doc.createElement("span");
  label.className = "feature-option__label";
  label.textContent = opt.label;
  wrap.appendChild(label);
  for (const choice of opt.choices) {
    const item = doc.createElement("label");
    item.className = "feature-option__choice";
    const input = doc.createElement("input");
    input.type = "radio";
    input.name = opt.key;
    input.value = choice.value;
    input.checked = current === choice.value;
    input.addEventListener("change", () => {
      if (input.checked) onChange(opt.key, choice.value);
    });
    const text = doc.createElement("span");
    text.textContent = choice.label;
    item.appendChild(input);
    item.appendChild(text);
    wrap.appendChild(item);
  }
  return wrap;
}

function groupTitle(doc, textContent) {
  const heading = doc.createElement("h2");
  heading.className = "popup__group-title";
  heading.textContent = textContent;
  return heading;
}

function makeHits(doc, count) {
  // Only show the pill when something was actually hidden; zeros add no value.
  if (!count) return null;
  const el = doc.createElement("span");
  el.className = "feature__hits is-hit";
  el.textContent = String(count);
  el.title = `${count} hidden on this tab`;
  return el;
}

function header(doc, config, onChange) {
  const el = doc.createElement("div");
  el.className = "popup__header";
  const title = doc.createElement("h1");
  title.className = "popup__title";
  title.textContent = "Disenshittify";
  el.appendChild(title);
  const master = makeCheckbox(doc, MASTER_KEY, config[MASTER_KEY] !== false, onChange);
  master.title = "Enable / disable everything";
  master.setAttribute("aria-label", "Enable Disenshittify");
  el.appendChild(master);
  return el;
}

function tabButton(doc, tab, label, isActive, onTab) {
  const btn = doc.createElement("button");
  btn.type = "button";
  btn.className = "tab" + (isActive ? " is-active" : "");
  btn.setAttribute("role", "tab");
  btn.setAttribute("data-tab", tab);
  btn.setAttribute("aria-selected", isActive ? "true" : "false");
  btn.setAttribute("aria-label", label);
  btn.title = label;
  btn.appendChild(makeIcon(doc, tab));
  btn.addEventListener("click", () => onTab(tab));
  return btn;
}

function tabBar(doc, platforms, active, onTab) {
  const bar = doc.createElement("div");
  bar.className = "tabbar";
  bar.setAttribute("role", "tablist");
  for (const platform of platforms) {
    bar.appendChild(
      tabButton(doc, platform, PLATFORM_LABELS[platform] || platform, active === platform, onTab)
    );
  }
  // The gear (general settings) is pushed to the far right.
  const gear = tabButton(doc, SETTINGS_TAB, "General settings", active === SETTINGS_TAB, onTab);
  gear.classList.add("tab--gear");
  bar.appendChild(gear);
  return bar;
}

function platformPanel(doc, panel, features, config, counts, onChange) {
  const enabled = resolveEnabled(features, config);
  // alwaysOn features are applied unconditionally and have no toggle.
  const toggleable = features.filter((f) => !f.alwaysOn);
  if (!toggleable.length) {
    const empty = doc.createElement("p");
    empty.className = "panel__empty";
    empty.textContent = "No features yet.";
    panel.appendChild(empty);
    return;
  }
  for (const feature of toggleable) {
    const hits = counts ? makeHits(doc, counts[feature.id]) : null;
    const control = makeCheckbox(doc, feature.id, enabled[feature.id], onChange);
    panel.appendChild(makeRow(doc, feature, control, hits));
    // Show a feature's options only while it is enabled.
    if (enabled[feature.id] && feature.options) {
      for (const opt of feature.options) {
        const current = resolveOption(config, opt.key, opt.default);
        panel.appendChild(makeOption(doc, opt, current, onChange));
      }
    }
  }
}

function settingsPanel(doc, panel, config, onChange) {
  panel.appendChild(groupTitle(doc, "Feedback"));
  for (const item of FEEDBACK_ROWS) {
    const control = makeCheckbox(doc, item.key, feedbackOn(config, item.key), onChange);
    panel.appendChild(makeRow(doc, item, control, null));
  }
  const version = doc.createElement("p");
  version.className = "panel__version";
  const link = doc.createElement("a");
  link.className = "panel__repo";
  link.href = "https://github.com/neverbot/disenshittify";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Disenshittify";
  version.appendChild(link);
  panel.appendChild(version);
}

export function renderPopup(root, features, config, onChange, report, initialTab) {
  const doc = root.ownerDocument;
  const counts = (report && report.counts) || null;
  const platforms = [...new Set(features.map((f) => f.platform))];
  // Open on the current page's platform tab when it is one we support.
  let active =
    initialTab && platforms.includes(initialTab) ? initialTab : platforms[0] || SETTINGS_TAB;

  function draw() {
    root.textContent = "";
    root.appendChild(header(doc, config, onChange));
    root.appendChild(
      tabBar(doc, platforms, active, (tab) => {
        if (tab === active) return;
        active = tab;
        draw();
      })
    );
    const panel = doc.createElement("div");
    panel.className = "panel";
    panel.setAttribute("role", "tabpanel");
    if (active === SETTINGS_TAB) {
      settingsPanel(doc, panel, config, onChange);
    } else {
      platformPanel(doc, panel, features.filter((f) => f.platform === active), config, counts, onChange);
    }
    root.appendChild(panel);
  }

  draw();
}

function tabsQuery(query) {
  return new Promise((resolve) => {
    try {
      const maybe = api.tabs.query(query, (tabs) => resolve(tabs || []));
      if (maybe && typeof maybe.then === "function") maybe.then(resolve, () => resolve([]));
    } catch {
      resolve([]);
    }
  });
}

function sendMessageToTab(tabId, msg) {
  return new Promise((resolve) => {
    try {
      const maybe = api.tabs.sendMessage(tabId, msg, (res) => resolve(res));
      if (maybe && typeof maybe.then === "function") maybe.then(resolve, () => resolve(null));
    } catch {
      resolve(null);
    }
  });
}

// Map a page URL to the platform whose tab the popup should open on.
function platformFromUrl(url) {
  try {
    const host = new URL(url).hostname;
    if (/(^|\.)youtube\.com$/.test(host)) return "youtube";
    if (/(^|\.)(x|twitter)\.com$/.test(host)) return "twitter";
    if (/(^|\.)linkedin\.com$/.test(host)) return "linkedin";
  } catch {
    /* not a normal URL */
  }
  return null;
}

// Ask the active tab's content script directly for live hit counts (robust
// against the MV3 background event page dropping its in-memory report), and
// return the active tab so the popup can open on its platform.
async function getActiveTab() {
  const tabs = await tabsQuery({ active: true, currentWindow: true });
  return tabs[0] || null;
}

async function bootstrap() {
  const root = document.getElementById("app");
  if (!root) return;
  const tab = await getActiveTab();
  const [config, report] = await Promise.all([
    getConfig(),
    tab && tab.id != null ? sendMessageToTab(tab.id, { type: "dsh:getCounts" }) : null,
  ]);
  const initialTab = tab && tab.url ? platformFromUrl(tab.url) : null;
  renderPopup(root, allFeatures, config, (id, value) => setValue(id, value), report, initialTab);
}

if (typeof document !== "undefined" && document.getElementById("app")) {
  bootstrap();
}
