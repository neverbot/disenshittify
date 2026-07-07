import { describe, it, expect } from "vitest";
import { resolveEnabled } from "../src/shared/config.js";
import { MASTER_KEY } from "../src/shared/constants.js";

const features = [
  { id: "youtube.a", defaultEnabled: true },
  { id: "youtube.b", defaultEnabled: false },
];

describe("resolveEnabled", () => {
  it("uses defaultEnabled when no stored value", () => {
    expect(resolveEnabled(features, {})).toEqual({
      "youtube.a": true,
      "youtube.b": false,
    });
  });

  it("stored value overrides the default", () => {
    expect(resolveEnabled(features, { "youtube.a": false, "youtube.b": true })).toEqual({
      "youtube.a": false,
      "youtube.b": true,
    });
  });

  it("master switch off forces everything off", () => {
    const config = { [MASTER_KEY]: false, "youtube.b": true };
    expect(resolveEnabled(features, config)).toEqual({
      "youtube.a": false,
      "youtube.b": false,
    });
  });

  it("master switch absent defaults to on", () => {
    expect(resolveEnabled(features, {})["youtube.a"]).toBe(true);
  });
});
