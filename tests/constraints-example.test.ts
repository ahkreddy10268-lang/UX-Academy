/**
 * The `constraints` entry teaches a date-only `addMonths` / `returnLimits`
 * helper in its worked example. These tests compile and run that snippet
 * exactly as it is rendered (not a copy), so the code readers see is the
 * code that is checked: month-end clamping, leap years, year boundaries,
 * independence from the local time zone, and rejection of bad input.
 */
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { entryBySlug } from "../lib/content";

type Helpers = { addMonths: (iso: string, months: number) => string; returnLimits: (departure: string, monthsAhead?: number) => { min: string; max: string } };

function loadSnippet(): Helpers {
  const example = entryBySlug.get("constraints")?.practice?.examples.find((x) => x.code.includes("function returnLimits"));
  if (!example) throw new Error("constraints worked example with returnLimits not found");
  const js = ts.transpileModule(example.code, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
  return new Function(`${js}\nreturn { addMonths, returnLimits };`)() as Helpers;
}

describe("constraints worked example: date-only month arithmetic", () => {
  const { addMonths, returnLimits } = loadSnippet();

  it("clamps month-end dates to the last day of the target month", () => {
    expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
    expect(addMonths("2026-03-31", 1)).toBe("2026-04-30");
    expect(addMonths("2026-05-31", 1)).toBe("2026-06-30");
    expect(addMonths("2026-08-31", 1)).toBe("2026-09-30");
    expect(addMonths("2026-03-31", -1)).toBe("2026-02-28");
  });

  it("handles leap years", () => {
    expect(addMonths("2028-01-31", 1)).toBe("2028-02-29");
    expect(addMonths("2028-02-29", 12)).toBe("2029-02-28");
    expect(addMonths("2024-02-29", 48)).toBe("2028-02-29");
    expect(addMonths("2100-01-31", 1)).toBe("2100-02-28"); // century year, not a leap year
    expect(addMonths("2000-01-31", 1)).toBe("2000-02-29"); // divisible by 400, a leap year
  });

  it("crosses year boundaries in both directions", () => {
    expect(addMonths("2026-12-15", 1)).toBe("2027-01-15");
    expect(addMonths("2025-12-31", 2)).toBe("2026-02-28");
    expect(addMonths("2026-01-15", -1)).toBe("2025-12-15");
    expect(addMonths("2026-03-14", 12)).toBe("2027-03-14");
    expect(addMonths("2026-06-30", 30)).toBe("2028-12-30");
  });

  it("does not depend on the local time zone", () => {
    // The helper never creates a local-time Date, so the result is the same whatever TZ the
    // process uses. Changing process.env.TZ at runtime is honoured by Node for new Date objects.
    const original = process.env.TZ;
    const results = ["UTC", "America/Los_Angeles", "Pacific/Kiritimati", "Pacific/Pago_Pago"].map((tz) => {
      process.env.TZ = tz;
      return [addMonths("2026-01-31", 1), addMonths("2026-12-31", 1), returnLimits("2026-03-14").max].join();
    });
    process.env.TZ = original;
    expect(new Set(results).size).toBe(1);
    expect(results[0]).toBe("2026-02-28,2027-01-31,2027-03-14");
  });

  it("returns the departure date as the minimum and 12 months ahead by default", () => {
    expect(returnLimits("2026-01-31")).toEqual({ min: "2026-01-31", max: "2027-01-31" });
    expect(returnLimits("2026-01-31", 1)).toEqual({ min: "2026-01-31", max: "2026-02-28" });
  });

  it("rejects malformed dates and fractional months", () => {
    expect(() => addMonths("2026-1-31", 1)).toThrow();
    expect(() => addMonths("31/01/2026", 1)).toThrow();
    expect(() => addMonths("2026-01-31", 1.5)).toThrow();
  });
});
