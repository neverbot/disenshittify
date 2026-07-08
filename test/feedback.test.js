import { describe, it, expect } from "vitest";
import { FEEDBACK, feedbackOn } from "../src/shared/feedback.js";

describe("feedbackOn", () => {
  it("defaults to on when the key is absent", () => {
    expect(feedbackOn({}, FEEDBACK.toast)).toBe(true);
    expect(feedbackOn({}, FEEDBACK.badge)).toBe(true);
    expect(feedbackOn({}, FEEDBACK.popup)).toBe(true);
  });

  it("is off only when explicitly false", () => {
    expect(feedbackOn({ [FEEDBACK.toast]: false }, FEEDBACK.toast)).toBe(false);
    expect(feedbackOn({ [FEEDBACK.badge]: true }, FEEDBACK.badge)).toBe(true);
  });
});
