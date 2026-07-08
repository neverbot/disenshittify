import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderPopup } from "../src/popup/popup.js";
import { MASTER_KEY } from "../src/shared/constants.js";
import { FEEDBACK } from "../src/shared/feedback.js";

const features = [
  { id: "youtube.a", platform: "youtube", title: "Feature A", description: "does A", defaultEnabled: true },
  { id: "youtube.b", platform: "youtube", title: "Feature B", description: "does B", defaultEnabled: false },
];

describe("renderPopup", () => {
  let root;
  beforeEach(() => {
    document.body.innerHTML = '<main id="app"></main>';
    root = document.getElementById("app");
  });

  it("renders a checkbox per feature, the master, and 3 feedback toggles", () => {
    renderPopup(root, features, {}, () => {});
    const boxes = root.querySelectorAll('input[type="checkbox"]');
    // 2 features + 1 master + 3 feedback
    expect(boxes).toHaveLength(6);
  });

  it("renders feedback toggles with per-key defaults (toast off)", () => {
    renderPopup(root, features, {}, () => {});
    expect(root.querySelector(`input[data-id="${FEEDBACK.toast}"]`).checked).toBe(false);
    expect(root.querySelector(`input[data-id="${FEEDBACK.badge}"]`).checked).toBe(true);
    expect(root.querySelector(`input[data-id="${FEEDBACK.popup}"]`).checked).toBe(true);
  });

  it("shows a hit pill only for non-zero counts", () => {
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
