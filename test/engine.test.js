import { describe, it, expect, beforeEach } from "vitest";
import { createEngine } from "../src/engine/engine.js";

describe("engine", () => {
  let engine;
  beforeEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    engine = createEngine({ doc: document });
  });

  it("enabling a css feature injects a tagged style", () => {
    const feature = { id: "youtube.a", css: "h1 { display: none; }" };
    engine.sync([feature], { "youtube.a": true });
    const style = document.querySelector('style[data-dsh="youtube.a"]');
    expect(style).not.toBeNull();
    expect(style.textContent).toContain("display: none");
  });

  it("disabling a css feature removes its style", () => {
    const feature = { id: "youtube.a", css: "h1 { display: none; }" };
    engine.sync([feature], { "youtube.a": true });
    engine.sync([feature], { "youtube.a": false });
    expect(document.querySelector('style[data-dsh="youtube.a"]')).toBeNull();
  });

  it("enabling twice injects only one style (idempotent)", () => {
    const feature = { id: "youtube.a", css: "h1 { display: none; }" };
    engine.sync([feature], { "youtube.a": true });
    engine.sync([feature], { "youtube.a": true });
    expect(document.querySelectorAll('style[data-dsh="youtube.a"]')).toHaveLength(1);
  });

  it("runs apply() for a js feature and cleanup() on disable", () => {
    const calls = [];
    const feature = {
      id: "youtube.js",
      apply: (ctx) => calls.push(["apply", !!ctx.doc]),
      cleanup: (ctx) => calls.push(["cleanup", !!ctx.doc]),
    };
    engine.sync([feature], { "youtube.js": true });
    engine.sync([feature], { "youtube.js": false });
    expect(calls).toEqual([["apply", true], ["cleanup", true]]);
  });
});
