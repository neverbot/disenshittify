import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderPopup } from "../src/popup/popup.js";
import { MASTER_KEY } from "../src/shared/constants.js";
import { FEEDBACK } from "../src/shared/feedback.js";

const features = [
  { id: "youtube.a", platform: "youtube", title: "Feature A", description: "does A", defaultEnabled: true },
  { id: "youtube.b", platform: "youtube", title: "Feature B", description: "does B", defaultEnabled: false },
  { id: "twitter.a", platform: "twitter", title: "Tweet A", description: "does TA", defaultEnabled: true },
];

const gear = (root) => root.querySelector('.tab[data-tab="settings"]');

describe("renderPopup", () => {
  let root;
  beforeEach(() => {
    document.body.innerHTML = '<main id="app"></main>';
    root = document.getElementById("app");
  });

  it("renders a tab per platform plus a gear tab", () => {
    renderPopup(root, features, {}, () => {});
    const tabs = root.querySelectorAll('.tab');
    // youtube + twitter + gear
    expect(tabs).toHaveLength(3);
    expect(root.querySelector('.tab[data-tab="youtube"]')).not.toBeNull();
    expect(root.querySelector('.tab[data-tab="twitter"]')).not.toBeNull();
    expect(gear(root)).not.toBeNull();
  });

  it("shows the first platform's features (not other platforms) by default", () => {
    renderPopup(root, features, {}, () => {});
    expect(root.querySelector('input[data-id="youtube.a"]')).not.toBeNull();
    expect(root.querySelector('input[data-id="youtube.b"]')).not.toBeNull();
    expect(root.querySelector('input[data-id="twitter.a"]')).toBeNull();
    // feedback lives in the gear tab, not shown yet
    expect(root.querySelector(`input[data-id="${FEEDBACK.toast}"]`)).toBeNull();
  });

  it("the master switch is always in the header", () => {
    renderPopup(root, features, {}, () => {});
    expect(root.querySelector(`.popup__header input[data-id="${MASTER_KEY}"]`)).not.toBeNull();
  });

  it("clicking a platform tab switches the shown features", () => {
    renderPopup(root, features, {}, () => {});
    root.querySelector('.tab[data-tab="twitter"]').click();
    expect(root.querySelector('input[data-id="twitter.a"]')).not.toBeNull();
    expect(root.querySelector('input[data-id="youtube.a"]')).toBeNull();
  });

  it("the gear tab shows the feedback toggles with per-key defaults (toast off)", () => {
    renderPopup(root, features, {}, () => {});
    gear(root).click();
    expect(root.querySelector(`input[data-id="${FEEDBACK.toast}"]`).checked).toBe(false);
    expect(root.querySelector(`input[data-id="${FEEDBACK.badge}"]`).checked).toBe(true);
    expect(root.querySelector(`input[data-id="${FEEDBACK.popup}"]`).checked).toBe(true);
  });

  it("shows a hit pill only for non-zero counts on the active platform", () => {
    const report = { counts: { "youtube.a": 4, "youtube.b": 0 } };
    renderPopup(root, features, {}, () => {}, report);
    const hits = root.querySelectorAll(".feature__hits");
    expect(hits).toHaveLength(1);
    expect(hits[0].textContent).toBe("4");
    expect(hits[0].classList.contains("is-hit")).toBe(true);
  });

  it("reflects resolved enabled state (default + master on)", () => {
    renderPopup(root, features, {}, () => {});
    expect(root.querySelector('input[data-id="youtube.a"]').checked).toBe(true);
    expect(root.querySelector('input[data-id="youtube.b"]').checked).toBe(false);
    expect(root.querySelector(`input[data-id="${MASTER_KEY}"]`).checked).toBe(true);
  });

  it("toggling a feature calls onChange with id and new value", () => {
    const onChange = vi.fn();
    renderPopup(root, features, {}, onChange);
    const box = root.querySelector('input[data-id="youtube.b"]');
    box.checked = true;
    box.dispatchEvent(new Event("change"));
    expect(onChange).toHaveBeenCalledWith("youtube.b", true);
  });

  it("toggling the master switch calls onChange with MASTER_KEY", () => {
    const onChange = vi.fn();
    renderPopup(root, features, {}, onChange);
    const master = root.querySelector(`input[data-id="${MASTER_KEY}"]`);
    master.checked = false;
    master.dispatchEvent(new Event("change"));
    expect(onChange).toHaveBeenCalledWith(MASTER_KEY, false);
  });
});
