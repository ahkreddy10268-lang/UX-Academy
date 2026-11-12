"use client";

import { useId, useMemo, useRef, useState, type FormEvent } from "react";
import { caseStudy } from "@/content/guides/nielsen-heuristics/case-study";
import { heuristics } from "@/content/guides/nielsen-heuristics/heuristics";
import { severity as severityGuide } from "@/content/guides/nielsen-heuristics/sections";
import { nextFindingId, prioritise, severityCounts, toCsv, toMarkdown, validateFinding, type Effort, type ReportFinding } from "@/lib/formulas/heuristic-report";

const NAMES = Object.fromEntries(heuristics.map((h) => [h.n, h.name])) as Record<number, string>;
const nameOf = (n: number) => NAMES[n] ?? `Heuristic ${n}`;
const plain = (s: string) => s.replace(/\*\*|\*|`/g, "").replace(/\{\{src:[^}]+\}\}/g, "").replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, a, b) => b || a).trim();

const EXAMPLE: ReportFinding[] = caseStudy.findings.map((f) => ({
  id: f.id,
  screen: f.screen,
  task: f.task,
  observation: plain(f.observation),
  heuristic: f.heuristic,
  evidence: "Annotated before/after illustration in the guide's case study",
  impact: plain(f.impact),
  severity: f.severity,
  recommendation: plain(f.recommendation),
  effort: (f.severity >= 4 ? "medium" : "low") as Effort,
}));

type Draft = Omit<ReportFinding, "id" | "heuristic" | "severity"> & { heuristic: string; severity: string };
const EMPTY: Draft = { screen: "", task: "", observation: "", heuristic: "", evidence: "", impact: "", severity: "", recommendation: "", effort: "medium" };

/**
 * Heuristic Evaluation Report lab: record findings with the professional
 * report fields, see them ordered by severity and effort, compare with the
 * guide's completed case-study report, and export Markdown or CSV.
 */
export function HeuristicReportLab() {
  const id = useId();
  const [findings, setFindings] = useState<ReportFinding[]>([]);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [errors, setErrors] = useState<string[]>([]);
  const [format, setFormat] = useState<"md" | "csv">("md");
  const [status, setStatus] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  const ordered = useMemo(() => prioritise(findings), [findings]);
  const counts = severityCounts(findings);
  const exported = useMemo(() => (findings.length === 0 ? "" : format === "md" ? toMarkdown(findings, nameOf) : toCsv(findings)), [findings, format]);

  const set = (k: keyof Draft, v: string) => setDraft((d) => ({ ...d, [k]: v }));
  const add = (e: FormEvent) => {
    e.preventDefault();
    const f: ReportFinding = { ...draft, id: nextFindingId(findings), heuristic: Number(draft.heuristic || 0), severity: draft.severity === "" ? -1 : Number(draft.severity), effort: draft.effort as Effort };
    const errs = validateFinding(f);
    setErrors(errs);
    if (errs.length) {
      window.setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }
    setFindings((xs) => [...xs, f]);
    setDraft(EMPTY);
    setStatus(`Finding ${f.id} added. ${findings.length + 1} in the report.`);
  };
  const remove = (fid: string) => {
    setFindings((xs) => xs.filter((x) => x.id !== fid));
    setStatus(`Finding ${fid} removed.`);
  };
  const loadExample = () => {
    setFindings(EXAMPLE);
    setStatus(`Loaded the case-study report: ${EXAMPLE.length} findings.`);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exported);
      setStatus(`Copied the report as ${format === "md" ? "Markdown" : "CSV"}.`);
    } catch {
      setStatus("Copy is not available here; select the text instead.");
    }
  };

  const field = (k: keyof Draft, label: string, hint?: string, multiline = false) => (
    <div>
      <label htmlFor={`${id}-${k}`} className="field-label">
        {label}
      </label>
      {hint && (
        <p id={`${id}-${k}-h`} className="field-hint">
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea id={`${id}-${k}`} className="field min-h-20" value={draft[k]} onChange={(e) => set(k, e.target.value)} aria-describedby={hint ? `${id}-${k}-h` : undefined} />
      ) : (
        <input id={`${id}-${k}`} className="field" value={draft[k]} onChange={(e) => set(k, e.target.value)} aria-describedby={hint ? `${id}-${k}-h` : undefined} />
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-8 2xl:grid-cols-[24rem_minmax(0,1fr)]">
      <form onSubmit={add} noValidate className="min-w-0 space-y-4" aria-labelledby={`${id}-form-h`}>
        <h2 id={`${id}-form-h`} className="t-sub">
          Add a finding
        </h2>
        {errors.length > 0 && (
          <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-md border border-error bg-error-wash p-3 text-sm">
            <p className="font-semibold text-ink">
              <span aria-hidden>⚠ </span>The finding is incomplete
            </p>
            <ul className="mt-1 list-disc pl-5 text-ink-2">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        {field("screen", "Screen", "Where the problem occurs, e.g. Checkout · payment")}
        {field("task", "User task", "The task affected, e.g. Pay for the order")}
        {field("observation", "Observation", "What you saw, described factually", true)}
        <div>
          <label htmlFor={`${id}-heuristic`} className="field-label">
            Heuristic (primary)
          </label>
          <select id={`${id}-heuristic`} className="field" value={draft.heuristic} onChange={(e) => set("heuristic", e.target.value)}>
            <option value="">Choose…</option>
            {heuristics.map((h) => (
              <option key={h.n} value={h.n}>
                {h.n}. {h.name}
              </option>
            ))}
          </select>
        </div>
        {field("evidence", "Evidence", "Screenshot reference or steps to reproduce")}
        {field("impact", "User impact", "Why it matters to people", true)}
        <fieldset>
          <legend className="field-label">Severity</legend>
          <div className="mt-1 space-y-1.5">
            {severityGuide.scale.map((s) => (
              <label key={s.rating} className="flex items-start gap-2 text-sm">
                <input type="radio" name={`${id}-sev`} className="mt-0.5 h-5 w-5 shrink-0" value={s.rating} checked={draft.severity === String(s.rating)} onChange={(e) => set("severity", e.target.value)} />
                <span>
                  <span className="font-semibold text-ink">
                    {s.rating} · {s.label}
                  </span>
                  <span className="text-ink-3"> — {s.meaning}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {field("recommendation", "Recommendation", "The direction of the fix", true)}
        <div>
          <label htmlFor={`${id}-effort`} className="field-label">
            Estimated effort
          </label>
          <select id={`${id}-effort`} className="field" value={draft.effort} onChange={(e) => set("effort", e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="btn btn-primary">
            Add finding
          </button>
          <button type="button" className="btn btn-secondary" onClick={loadExample}>
            Load the case-study example
          </button>
        </div>
      </form>

      <div className="min-w-0 space-y-6">
        <p role="status" className="min-h-5 text-sm text-ink-2">
          {status}
        </p>
        <section aria-labelledby={`${id}-rep`}>
          <h2 id={`${id}-rep`} className="t-sub">
            Report · {findings.length} {findings.length === 1 ? "finding" : "findings"}
          </h2>
          <p className="mt-1 text-sm text-ink-2">
            Ordered by severity, then lower effort first. Severity counts: {counts.map((c, i) => `${i}: ${c}`).join(" · ")}
          </p>
          {findings.length === 0 ? (
            <p className="mt-4 rounded-md border border-dashed border-rule p-4 text-sm text-ink-3">No findings yet. Add one, or load the case-study example to see a completed report.</p>
          ) : (
            <div className="relative mt-3 overflow-x-auto rounded-md border border-rule" tabIndex={0} role="region" aria-label="Findings, in priority order">
              <table className="w-full min-w-[46rem] text-left text-sm">
                <caption className="sr-only">Heuristic evaluation findings in priority order</caption>
                <thead className="bg-soft">
                  <tr>
                    {["Priority", "ID", "Screen", "Observation", "Heuristic", "Severity", "Recommendation", ""].map((h, i) => (
                      <th key={i} scope="col" className="label px-3 py-2 !text-ink-2">
                        {h || <span className="sr-only">Actions</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule align-top">
                  {ordered.map((f) => (
                    <tr key={f.id}>
                      <td className="formula px-3 py-2">{f.priority}</td>
                      <th scope="row" className="formula px-3 py-2">
                        {f.id}
                      </th>
                      <td className="px-3 py-2">{f.screen}</td>
                      <td className="px-3 py-2 text-ink-2">{f.observation}</td>
                      <td className="px-3 py-2">
                        {f.heuristic}. {nameOf(f.heuristic)}
                      </td>
                      <td className="px-3 py-2 font-semibold">{f.severity}</td>
                      <td className="px-3 py-2 text-ink-2">{f.recommendation}</td>
                      <td className="px-3 py-2">
                        <button type="button" className="btn btn-tertiary btn-sm" onClick={() => remove(f.id)} aria-label={`Remove finding ${f.id}`}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {findings.length > 0 && (
          <section aria-labelledby={`${id}-exp`}>
            <h2 id={`${id}-exp`} className="t-sub">
              Export
            </h2>
            <div role="group" aria-label="Export format" className="mt-2 flex flex-wrap items-center gap-1.5">
              <button type="button" aria-pressed={format === "md"} onClick={() => setFormat("md")} className="chip h-9 hover:border-rule-strong hover:text-ink">
                Markdown table
              </button>
              <button type="button" aria-pressed={format === "csv"} onClick={() => setFormat("csv")} className="chip h-9 hover:border-rule-strong hover:text-ink">
                CSV
              </button>
              <button type="button" className="btn btn-secondary btn-sm ml-auto" onClick={copy}>
                Copy
              </button>
            </div>
            <pre tabIndex={0} aria-label={`Report as ${format === "md" ? "Markdown" : "CSV"}`} className="formula mt-2 max-h-80 overflow-auto rounded-md border border-rule bg-soft p-4 text-xs leading-relaxed text-ink">
              <code>{exported}</code>
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}
