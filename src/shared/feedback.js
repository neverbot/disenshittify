// Feedback channel config keys. All default ON (absent value => enabled).
export const FEEDBACK = {
  toast: "feedback.toast",
  badge: "feedback.badge",
  popup: "feedback.popup",
};

export function feedbackOn(config, key) {
  return config[key] !== false;
}
