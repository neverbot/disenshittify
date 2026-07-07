import { MASTER_KEY } from "./constants.js";

export function resolveEnabled(features, config) {
  const masterOn = config[MASTER_KEY] !== false; // absent => on
  const map = {};
  for (const feature of features) {
    const own = config[feature.id];
    const wanted = own === undefined ? feature.defaultEnabled : own;
    map[feature.id] = masterOn && Boolean(wanted);
  }
  return map;
}
