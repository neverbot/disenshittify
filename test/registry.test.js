import { describe, it, expect } from "vitest";
import { features, featuresByPlatform } from "../src/shared/registry.js";

describe("registry", () => {
  it("contains all registered features", () => {
    expect(features).toHaveLength(15);
  });

  it("has no duplicate ids", () => {
    const ids = features.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every feature has the required shape", () => {
    for (const f of features) {
      expect(typeof f.id).toBe("string");
      expect(typeof f.platform).toBe("string");
      expect(typeof f.title).toBe("string");
      expect(typeof f.description).toBe("string");
      expect(typeof f.defaultEnabled).toBe("boolean");
      expect(f.css || typeof f.apply === "function").toBeTruthy();
    }
  });

  it("every id is namespaced by its platform", () => {
    for (const f of features) {
      expect(f.id.startsWith(f.platform + ".")).toBe(true);
    }
  });

  it("featuresByPlatform filters correctly", () => {
    expect(featuresByPlatform("youtube")).toHaveLength(8);
    expect(featuresByPlatform("twitter")).toHaveLength(7);
    expect(featuresByPlatform("nonexistent")).toHaveLength(0);
  });
});
