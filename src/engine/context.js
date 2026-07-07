// Context handed to a feature's apply(ctx). Minimal for the MVP (all features
// are css-type); the JS path exists so future features need no engine changes.
export function createContext(doc) {
  const observers = [];
  return {
    doc,
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
