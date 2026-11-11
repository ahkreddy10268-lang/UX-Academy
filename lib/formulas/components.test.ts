import { describe, expect, it } from "vitest";
import { booleanVsEnum, variantCount } from "./components";
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
