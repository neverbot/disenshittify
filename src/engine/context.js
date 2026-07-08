import { resolveOption } from "../shared/config.js";

// Context handed to a feature's apply(ctx). Minimal for the MVP; grows as JS
// features need more. getConfig is a live accessor so getOption reflects the
// current stored config, not a snapshot from apply time.
export function createContext(doc, getConfig) {
  const observers = [];
  return {
    doc,
    getOption(key, fallback) {
      return resolveOption((getConfig && getConfig()) || {}, key, fallback);
    },
    injectStyle(css, id) {
      const style = doc.createElement("style");
      style.setAttribute("data-dsh", id);
      style.textContent = css;
      (doc.head || doc.documentElement).appendChild(style);
      return style;
    },
    observe(target, options, callback) {
      const observer = new doc.defaultView.MutationObserver(callback);
      observer.observe(target, options);
      observers.push(observer);
      return observer;
    },
    disconnectAll() {
      for (const observer of observers) observer.disconnect();
      observers.length = 0;
    },
  };
}
