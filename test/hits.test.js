import { describe, it, expect, beforeEach } from "vitest";
import { countHits, summarize } from "../src/shared/hits.js";

const features = [
  { id: "youtube.a", probe: ".a", defaultEnabled: true },
  { id: "youtube.b", probe: ".b", defaultEnabled: true },
  { id: "youtube.c", defaultEnabled: true }, // no probe
];

describe("countHits", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="a"></div><div class="a"></div>
      <div class="b"></div>
    `;
  });

  it("counts matched elements for active features with a probe", () => {
    const counts = countHits(features, { "youtube.a": true, "youtube.b": true });
    expect(counts).toEqual({ "youtube.a": 2, "youtube.b": 1 });
  });

  it("skips disabled features", () => {
    const counts = countHits(features, { "youtube.a": true, "youtube.b": false });
    expect(counts).toEqual({ "youtube.a": 2 });
  });

  it("skips features without a probe", () => {
    const counts = countHits(features, { "youtube.c": true });
    expect(counts).toEqual({});
  });
});

describe("summarize", () => {
  it("rolls counts into activeHitCount and totalHidden", () => {
    expect(summarize({ "youtube.a": 2, "youtube.b": 0, "youtube.c": 3 })).toEqual({
      activeHitCount: 2,
      totalHidden: 5,
    });
  });
});
