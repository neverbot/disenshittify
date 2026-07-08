import { features as allFeatures } from "../shared/registry.js";
import { resolveEnabled, resolveOption } from "../shared/config.js";
import { MASTER_KEY } from "../shared/constants.js";
import { FEEDBACK, feedbackOn } from "../shared/feedback.js";
import { getConfig, setValue } from "../shared/storage.js";

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

export function renderPopup(root, features, config, onChange, report) {
  const doc = root.ownerDocument;
  root.textContent = "";
  const counts = (report && report.counts) || null;

  // Header: logo + name, with the master switch inline on the right.
  const header = doc.createElement("div");
  header.className = "popup__header";
  const title = doc.createElement("h1");
  title.className = "popup__title";
  title.textContent = "disenshittify";
  header.appendChild(title);
  const master = makeCheckbox(doc, MASTER_KEY, config[MASTER_KEY] !== false, onChange);
  master.title = "Enable / disable everything";
  master.setAttribute("aria-label", "Enable disenshittify");
  header.appendChild(master);
  root.appendChild(header);

  // Feature toggles grouped by platform, with per-tab hit counts.
  const enabled = resolveEnabled(features, config);
  const platforms = [...new Set(features.map((f) => f.platform))];
  for (const platform of platforms) {
    root.appendChild(groupTitle(doc, platform));
    // alwaysOn features are applied unconditionally and have no toggle.
    for (const feature of features.filter((f) => f.platform === platform && !f.alwaysOn)) {
      const hits = counts ? makeHits(doc, counts[feature.id]) : null;
      const control = makeCheckbox(doc, feature.id, enabled[feature.id], onChange);
      root.appendChild(makeRow(doc, feature, control, hits));
      // Show a feature's options only while it is enabled.
      if (enabled[feature.id] && feature.options) {
        for (const opt of feature.options) {
          const current = resolveOption(config, opt.key, opt.default);
          root.appendChild(makeOption(doc, opt, current, onChange));
        }
      }
    }
  }

  // Feedback channels
  root.appendChild(groupTitle(doc, "Feedback"));
  for (const item of FEEDBACK_ROWS) {
    const control = makeCheckbox(doc, item.key, feedbackOn(config, item.key), onChange);
    root.appendChild(makeRow(doc, item, control, null));
  }
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

function sendMessage(msg) {
  return new Promise((resolve) => {
    try {
      const maybe = api.runtime.sendMessage(msg, (res) => resolve(res));
      if (maybe && typeof maybe.then === "function") maybe.then(resolve, () => resolve(null));
    } catch {
      resolve(null);
    }
  });
}

async function getActiveReport() {
  const tabs = await tabsQuery({ active: true, currentWindow: true });
  const tabId = tabs[0] && tabs[0].id;
  if (tabId == null) return null;
  return sendMessage({ type: "dsh:getReport", tabId });
}

async function bootstrap() {
  const root = document.getElementById("app");
  if (!root) return;
  const [config, report] = await Promise.all([getConfig(), getActiveReport()]);
  renderPopup(root, allFeatures, config, (id, value) => setValue(id, value), report);
}

if (typeof document !== "undefined" && document.getElementById("app")) {
  bootstrap();
}
