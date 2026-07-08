import { createContext } from "./context.js";

export function createEngine({ doc = document } = {}) {
  const applied = new Map(); // feature.id -> revert function
  let getConfig; // live config accessor, set by sync()

  function enable(feature) {
    if (applied.has(feature.id)) return;
    if (feature.css) {
      const style = doc.createElement("style");
      style.setAttribute("data-dsh", feature.id);
      style.textContent = feature.css;
      (doc.head || doc.documentElement).appendChild(style);
      applied.set(feature.id, () => style.remove());
    } else if (typeof feature.apply === "function") {
      const ctx = createContext(doc, getConfig);
      feature.apply(ctx);
      applied.set(feature.id, () => {
        if (typeof feature.cleanup === "function") feature.cleanup(ctx);
        ctx.disconnectAll();
      });
    }
  }

  function disable(feature) {
    const revert = applied.get(feature.id);
    if (revert) {
      revert();
      applied.delete(feature.id);
    }
  }

  function sync(features, enabledMap, configAccessor) {
    getConfig = configAccessor;
    for (const feature of features) {
      if (enabledMap[feature.id]) enable(feature);
      else disable(feature);
    }
  }

  return { enable, disable, sync };
}
