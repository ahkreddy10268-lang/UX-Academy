import { describe, expect, it } from "vitest";
import { nextFindingId, prioritise, severityCounts, toCsv, toMarkdown, validateFinding, type ReportFinding } from "./heuristic-report";
import { FormulaInputError } from "./math";

const f = (id: string, severity: number, effort: ReportFinding["effort"] = "medium"): ReportFinding => ({
  id, screen: "Checkout", task: "Pay", observation: "No feedback", heuristic: 1, evidence: "screenshot", impact: "Double payments", severity, recommendation: "Show status", effort,
});

describe("heuristic report", () => {
  it("numbers findings after the highest id", () => {
    expect(nextFindingId([])).toBe("F01");
    expect(nextFindingId([{ id: "F03" }, { id: "F11" }])).toBe("F12");
  });
  it("orders by severity, then lower effort, then id", () => {
    const out = prioritise([f("F01", 2), f("F02", 4, "high"), f("F03", 4, "low"), f("F04", 3)]);
    expect(out.map((x) => [x.id, x.priority])).toEqual([["F03", 1], ["F02", 2], ["F04", 3], ["F01", 4]]);
  });
  it("counts severities", () => {
    expect(severityCounts([f("F01", 4), f("F02", 4), f("F03", 0)])).toEqual([1, 0, 0, 0, 2]);
  });
  it("validates required fields and ranges", () => {
    expect(validateFinding({ ...f("F01", 5), screen: "" })).toEqual(["Screen is required.", "Severity must be 0–4."]);
    expect(() => prioritise([{ ...f("F01", 2), heuristic: 11 }])).toThrow(FormulaInputError);
  });
  it("exports markdown and csv with escaping", () => {
    const md = toMarkdown([{ ...f("F01", 3), observation: "a | b" }], (n) => `H${n}`);
    expect(md.split("\n")[2]).toContain("a \\| b");
    expect(md).toContain("| 1 | F01 |");
    const csv = toCsv([{ ...f("F01", 3), impact: 'Says "error", then stops' }]);
    expect(csv.split("\n")[1]).toContain('"Says ""error"", then stops"');
  });
});
