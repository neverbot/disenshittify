function getApi() {
  if (typeof browser !== "undefined" && browser.storage) return browser;
  return chrome;
}

function getArea() {
  const api = getApi();
  return api.storage.sync || api.storage.local;
}

// Handles both promise-based (browser.*) and callback-based (chrome.*) APIs.
function callOrPromise(fn) {
  return new Promise((resolve, reject) => {
    try {
      const maybe = fn(resolve);
      if (maybe && typeof maybe.then === "function") maybe.then(resolve, reject);
    } catch (err) {
      reject(err);
    }
  });
}

export function getConfig() {
  const area = getArea();
  return callOrPromise((resolve) => area.get(null, (items) => resolve(items || {})));
}

export function setValue(id, value) {
  const area = getArea();
  return callOrPromise((resolve) => area.set({ [id]: value }, () => resolve()));
}

export function onConfigChanged(callback) {
  const api = getApi();
  api.storage.onChanged.addListener((changes, areaName) => callback(changes, areaName));
}
