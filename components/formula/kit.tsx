"use client";

import { useId, useState, type ReactNode } from "react";
import { FormulaInputError } from "@/lib/formulas/math";
import { actions } from "@/lib/store/store";

/** Run a calculation; return either a result or a human-readable input error. */
export function compute<T>(fn: () => T): { ok: true; value: T } | { ok: false; error: string } {
  try {
    return { ok: true, value: fn() };
  } catch (e) {
    if (e instanceof FormulaInputError) return { ok: false, error: e.message };
    return { ok: false, error: "This combination of inputs cannot be calculated." };
  }
}

export const fmt = (x: number, digits = 2) =>
  Number.isFinite(x) ? x.toLocaleString("en-GB", { maximumFractionDigits: digits, minimumFractionDigits: 0 }) : "—";
export const pct = (x: number, digits = 1) => (Number.isFinite(x) ? `${(x * 100).toFixed(digits)}%` : "—");

/** A numeric field that keeps the raw text so users can type freely; parse happens in the calculation. */
export function NumberField({
  label,
  value,
  onChange,
  unit,
  hint,
  step = "any",
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  hint?: string;
  step?: string | number;
  min?: number;
  max?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-1 flex items-stretch overflow-hidden rounded-sm border border-line-control bg-surface focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus)]">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className="formula tabular h-10 w-full min-w-0 bg-transparent px-3 text-base outline-none"
        />
        {unit && <span className="flex items-center border-l border-rule bg-sunken px-2.5 text-sm text-ink-3">{unit}</span>}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink-3">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextAreaField({ label, value, onChange, hint, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; hint?: string; rows?: number }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="formula mt-1 w-full rounded-sm border border-line-control bg-surface px-3 py-2 text-sm"
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink-3">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SelectField<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="field mt-1 w-full"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Result({ label, value, emphasis = false, note }: { label: string; value: ReactNode; emphasis?: boolean; note?: ReactNode }) {
  return (
    <dl className={emphasis ? "col-span-full" : ""}>
      <dt className="label">{label}</dt>
      <dd className={`formula tabular mt-1 ${emphasis ? "text-3xl text-ink" : "text-xl text-ink"}`}>{value}</dd>
      {note && <dd className="mt-1 text-sm text-ink-2">{note}</dd>}
    </dl>
  );
}

/**
 * Shell shared by every calculator: inputs, live results, validation message,
 * reset and save-to-my-learning. `summary` is a plain-text record of the result.
 */
export function CalculatorShell({
  formulaId,
  title,
  inputs,
  results,
  error,
  onReset,
  summary,
}: {
  formulaId: string;
  title: string;
  inputs: ReactNode;
  results: ReactNode;
  error?: string;
  onReset: () => void;
  summary?: string;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <section aria-label={`${title} calculator`} className="overflow-hidden rounded-sm border border-rule bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule px-5 py-3">
        <p className="label">Calculator</p>
        <div className="flex gap-2">
          <button type="button" onClick={onReset} className="h-8 rounded-xs px-2.5 text-sm text-ink-2 hover:bg-sunken hover:text-ink">
            Reset
          </button>
          {summary && (
            <button
              type="button"
              onClick={() => {
                actions.saveCalculation(formulaId, title, summary);
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
              className="btn btn-secondary btn-sm"
            >
              {saved ? "Saved to My learning" : "Save result"}
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4 p-5">{inputs}</div>
        <div className="border-t border-rule bg-sunken p-5 md:border-l md:border-t-0" aria-live="polite">
          {error ? (
            <p role="alert" className="text-sm text-accent-ink">
              <span className="font-semibold">Check the inputs.</span> {error}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">{results}</div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Small helper: a set of string-valued inputs with defaults and reset. */
export function useFields<T extends Record<string, string>>(defaults: T) {
  const [values, setValues] = useState<T>(defaults);
  const set = (key: keyof T) => (v: string) => setValues((s) => ({ ...s, [key]: v }));
  const reset = () => setValues(defaults);
  const num = (key: keyof T) => (values[key].trim() === "" ? NaN : Number(values[key]));
  return { values, set, reset, num };
}
