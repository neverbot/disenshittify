import { features as allFeatures } from "../shared/registry.js";
import { resolveEnabled } from "../shared/config.js";
import { MASTER_KEY } from "../shared/constants.js";
import { getConfig, setValue } from "../shared/storage.js";

function makeCheckbox(doc, id, checked, onChange) {
  const input = doc.createElement("input");
  input.type = "checkbox";
  input.setAttribute("data-id", id);
  input.checked = checked;
  input.addEventListener("change", () => onChange(id, input.checked));
  return input;
}

export function renderPopup(root, features, config, onChange) {
  const doc = root.ownerDocument;
  root.textContent = "";

  const title = doc.createElement("h1");
  title.className = "popup__title";
  title.textContent = "disenshittify";
  root.appendChild(title);

  // Master switch
  const master = doc.createElement("label");
  master.className = "popup__master";
  const masterText = doc.createElement("span");
  masterText.textContent = "Enabled";
  const masterOn = config[MASTER_KEY] !== false;
  master.appendChild(masterText);
  master.appendChild(makeCheckbox(doc, MASTER_KEY, masterOn, onChange));
  root.appendChild(master);

  // Feature toggles grouped by platform
  const enabled = resolveEnabled(features, config);
  const platforms = [...new Set(features.map((f) => f.platform))];
  for (const platform of platforms) {
    const heading = doc.createElement("h2");
    heading.className = "popup__group-title";
    heading.textContent = platform;
    root.appendChild(heading);

    for (const feature of features.filter((f) => f.platform === platform)) {
      const row = doc.createElement("label");
      row.className = "feature";
      row.appendChild(makeCheckbox(doc, feature.id, enabled[feature.id], onChange));
      const text = doc.createElement("span");
      const label = doc.createElement("span");
      label.className = "feature__label";
      label.textContent = feature.title;
      const desc = doc.createElement("span");
      desc.className = "feature__desc";
      desc.textContent = " — " + feature.description;
      text.appendChild(label);
      text.appendChild(desc);
      row.appendChild(text);
      root.appendChild(row);
    }
  }
}

// Bootstrap (skipped under test, where there is no #app until injected).
async function bootstrap() {
  const root = document.getElementById("app");
  if (!root) return;
  const config = await getConfig();
  renderPopup(root, allFeatures, config, (id, value) => setValue(id, value));
}

if (typeof document !== "undefined" && document.getElementById("app")) {
  bootstrap();
}
