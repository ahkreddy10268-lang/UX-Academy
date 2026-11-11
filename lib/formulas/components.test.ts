import { describe, expect, it } from "vitest";
import { booleanVsEnum, variantCount, waitFeedback } from "./components";
import { FormulaInputError } from "./math";

describe("variantCount", () => {
  it("reproduces Figma's documented button: type 2 × size 2 × state 3 × icon 2 = 24 variants", () => {
    expect(variantCount([2, 2, 3, 2])).toBe(24);
  });
  it("drops to 8 when interaction state leaves the variant set", () => {
    expect(variantCount([2, 2, 2])).toBe(8);
  });
  it("rejects empty and non-integer input", () => {
    expect(() => variantCount([])).toThrow(FormulaInputError);
    expect(() => variantCount([2, 1.5])).toThrow(FormulaInputError);
  });
});

describe("booleanVsEnum", () => {
  it("three exclusive booleans allow 8 combinations, 4 meaningful, 4 invalid", () => {
    expect(booleanVsEnum(3)).toEqual({ booleanCombinations: 8, meaningful: 4, invalid: 4, enumValues: 4 });
  });
  it("rejects zero", () => expect(() => booleanVsEnum(0)).toThrow(FormulaInputError));
});

describe("waitFeedback", () => {
  it("follows the 0.1 / 2 / 10 s boundaries", () => {
    expect(waitFeedback(0.05)).toBe("none");
    expect(waitFeedback(0.1)).toBe("none");
    expect(waitFeedback(0.8)).toBe("state-only");
    expect(waitFeedback(2)).toBe("looped");
    expect(waitFeedback(10)).toBe("looped");
    expect(waitFeedback(15)).toBe("percent-done");
  });
  it("rejects negative input", () => expect(() => waitFeedback(-1)).toThrow(FormulaInputError));
});
