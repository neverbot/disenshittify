import { describe, it, expect, beforeEach, vi } from "vitest";
import { getConfig, setValue, onConfigChanged } from "../src/shared/storage.js";

function fakeChrome(store = {}) {
  const listeners = [];
  return {
    _store: store,
    _listeners: listeners,
    storage: {
      sync: {
        get: (keys, cb) => cb({ ...store }),
        set: (obj, cb) => {
          Object.assign(store, obj);
          cb && cb();
        },
      },
      onChanged: {
        addListener: (fn) => listeners.push(fn),
      },
    },
  };
}

describe("storage", () => {
  beforeEach(() => {
    delete globalThis.browser;
    globalThis.chrome = fakeChrome({ "youtube.hide-shorts": true });
  });

  it("getConfig returns the stored object", async () => {
    const config = await getConfig();
    expect(config).toEqual({ "youtube.hide-shorts": true });
  });

  it("setValue writes a single key", async () => {
    await setValue("youtube.hide-comments", true);
    expect(globalThis.chrome._store["youtube.hide-comments"]).toBe(true);
  });

  it("onConfigChanged registers a listener", () => {
    const fn = vi.fn();
    onConfigChanged(fn);
    expect(globalThis.chrome._listeners).toHaveLength(1);
  });
});
