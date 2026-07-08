import { MASTER_KEY } from "./constants.js";

export function resolveEnabled(features, config) {
  const masterOn = config[MASTER_KEY] !== false; // absent => on
  const map = {};
  for (const feature of features) {
    if (feature.alwaysOn) {
      // Always applied while the addon is enabled; not user-toggleable.
      map[feature.id] = masterOn;
      continue;
    }
    const own = config[feature.id];
    const wanted = own === undefined ? feature.defaultEnabled : own;
    map[feature.id] = masterOn && Boolean(wanted);
  }
  return map;
}

// Resolve a feature option's chosen value, falling back to its default.
export function resolveOption(config, key, fallback) {
  const value = config[key];
  return value === undefined ? fallback : value;
}
