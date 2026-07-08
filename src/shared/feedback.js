// Feedback channel config keys and their default states.
export const FEEDBACK = {
  toast: "feedback.toast",
  badge: "feedback.badge",
  popup: "feedback.popup",
};

// The on-page toast is off by default (opt-in); badge and popup counts are on.
const DEFAULTS = {
  "feedback.toast": false,
  "feedback.badge": true,
  "feedback.popup": true,
};

export function feedbackOn(config, key) {
  const value = config[key];
  if (value === undefined) return DEFAULTS[key] !== false;
  return value !== false;
}
