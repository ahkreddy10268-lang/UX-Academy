/**
 * Heuristic evaluation report helpers (D-127): numbering, priority ordering,
 * severity counts and plain-text exports for the report lab. Pure functions.
 */
import { FormulaInputError } from "./math";

export type Effort = "low" | "medium" | "high";
export type ReportFinding = {
  id: string;
  screen: string;
  task: string;
  observation: string;
  heuristic: number;
  evidence: string;
  impact: string;
  severity: number;
  recommendation: string;
  effort: Effort;
};

const EFFORT_RANK: Record<Effort, number> = { low: 0, medium: 1, high: 2 };

/** Next finding id after the highest existing one: F01, F02, … */
export function nextFindingId(findings: { id: string }[]): string {
  const max = findings.reduce((m, f) => Math.max(m, Number(/^F(\d+)$/.exec(f.id)?.[1] ?? 0)), 0);
  return `F${String(max + 1).padStart(2, "0")}`;
}

export function validateFinding(f: ReportFinding): string[] {
  const errors: string[] = [];
  if (!f.screen.trim()) errors.push("Screen is required.");
  if (!f.observation.trim()) errors.push("Observation is required.");
  if (!Number.isInteger(f.heuristic) || f.heuristic < 1 || f.heuristic > 10) errors.push("Choose a heuristic from 1 to 10.");
  if (!Number.isInteger(f.severity) || f.severity < 0 || f.severity > 4) errors.push("Severity must be 0–4.");
  if (!f.recommendation.trim()) errors.push("Recommendation is required.");
  return errors;
}

/**
 * Recommended order of work: severity first (4 → 0), then lower effort first
 * (quick wins among equals), then id. Priority 1 is first.
 */
export function prioritise<T extends ReportFinding>(findings: T[]): (T & { priority: number })[] {
  for (const f of findings) if (validateFinding(f).length) throw new FormulaInputError(`Finding ${f.id} is incomplete.`);
  return [...findings]
    .sort((a, b) => b.severity - a.severity || EFFORT_RANK[a.effort] - EFFORT_RANK[b.effort] || a.id.localeCompare(b.id))
    .map((f, i) => ({ ...f, priority: i + 1 }));
}

export function severityCounts(findings: { severity: number }[]): [number, number, number, number, number] {
  const c: [number, number, number, number, number] = [0, 0, 0, 0, 0];
  for (const f of findings) c[f.severity] += 1;
  return c;
}

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n+/g, " ");

export function toMarkdown(findings: ReportFinding[], heuristicName: (n: number) => string): string {
  const rows = prioritise(findings);
  const head = "| Priority | ID | Screen | Task | Observation | Heuristic | Evidence | User impact | Severity | Recommendation |\n|---|---|---|---|---|---|---|---|---|---|";
  const body = rows
    .map((f) => `| ${f.priority} | ${f.id} | ${cell(f.screen)} | ${cell(f.task)} | ${cell(f.observation)} | ${f.heuristic}. ${cell(heuristicName(f.heuristic))} | ${cell(f.evidence)} | ${cell(f.impact)} | ${f.severity} | ${cell(f.recommendation)} |`)
    .join("\n");
  return `${head}\n${body}`;
}

const csvCell = (s: string | number) => {
  const t = String(s);
  return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
};

export function toCsv(findings: ReportFinding[]): string {
  const rows = prioritise(findings);
  const head = ["priority", "id", "screen", "task", "observation", "heuristic", "evidence", "impact", "severity", "recommendation", "effort"];
  return [head.join(","), ...rows.map((f) => [f.priority, f.id, f.screen, f.task, f.observation, f.heuristic, f.evidence, f.impact, f.severity, f.recommendation, f.effort].map(csvCell).join(","))].join("\n");
}
