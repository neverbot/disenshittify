import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderPopup } from "../src/popup/popup.js";
import { MASTER_KEY } from "../src/shared/constants.js";

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

  it("renders one checkbox per feature plus a master switch", () => {
    renderPopup(root, features, {}, () => {});
    const boxes = root.querySelectorAll('input[type="checkbox"]');
    // 2 features + 1 master
    expect(boxes).toHaveLength(3);
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
