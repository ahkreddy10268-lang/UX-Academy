"use client";

import { useState } from "react";
import { fittsId, fittsMovementTime, hickInformation, hickInformationEqual, hickReactionTime, klmTotal, parseKlm, steeringId, KLM_OPERATORS, KLM_TYPIST_RATES, type FittsFormulation } from "@/lib/formulas/pointing";
import { parseNumberList } from "@/lib/formulas/math";
import { CalculatorShell, NumberField, Result, SelectField, TextAreaField, compute, fmt, useFields } from "./kit";

export function FittsCalculator() {
  const f = useFields({ D: "400", W: "40", a: "", b: "" });
  const [form, setForm] = useState<FittsFormulation>("shannon");
  const r = compute(() => {
    const id = fittsId(f.num("D"), f.num("W"), form);
    const hasConstants = f.values.a.trim() !== "" && f.values.b.trim() !== "";
    return { id, mt: hasConstants ? fittsMovementTime(id, f.num("a"), f.num("b")) : NaN, hasConstants };
  });
  return (
    <CalculatorShell
      formulaId="fitts-shannon"
      title="Fitts's law"
      onReset={() => {
        f.reset();
        setForm("shannon");
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `D=${f.values.D}, W=${f.values.W} → ID ${fmt(r.value.id, 3)} bits${r.value.hasConstants ? `, MT ${fmt(r.value.mt, 3)} s` : ""}` : undefined}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Distance D" value={f.values.D} onChange={f.set("D")} unit="px" hint="Start point to target centre" />
            <NumberField label="Width W" value={f.values.W} onChange={f.set("W")} unit="px" hint="Along the axis of motion" />
          </div>
          <SelectField
            label="Formulation"
            value={form}
            onChange={setForm}
            options={[
              { value: "shannon", label: "Shannon — log₂(D/W + 1)" },
              { value: "original", label: "Original (Fitts 1954) — log₂(2D/W)" },
              { value: "welford", label: "Welford — log₂(D/W + 0.5)" },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Intercept a (optional)" value={f.values.a} onChange={f.set("a")} unit="s" />
            <NumberField label="Slope b (optional)" value={f.values.b} onChange={f.set("b")} unit="s/bit" />
          </div>
          <p className="text-xs text-ink-3">a and b must be fitted to your own device and users — the Fitts lab estimates yours. Leave blank to compare difficulty only.</p>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Index of difficulty" value={`${fmt(r.value.id, 3)} bits`} note={r.value.id < 0 ? "A negative ID arises in the original formulation when W > 2D — one reason the Shannon form is preferred." : undefined} />
            <Result label="Ratio D/W" value={fmt(f.num("D") / f.num("W"), 2)} />
            <Result label="Predicted MT" value={r.value.hasConstants ? `${fmt(r.value.mt, 3)} s` : "—"} note={r.value.hasConstants ? "Valid only for the context a and b came from." : "Add a and b to predict time."} />
          </>
        )
      }
    />
  );
}

export function HickCalculator() {
  const f = useFields({ n: "8", probs: "", a: "", b: "" });
  const [mode, setMode] = useState<"equal" | "hick" | "unequal">("equal");
  const r = compute(() => {
    const H = mode === "unequal" ? hickInformation(parseNumberList(f.values.probs)).H : hickInformationEqual(f.num("n"), mode === "hick" ? "hick" : "hyman");
    const has = f.values.a.trim() !== "" && f.values.b.trim() !== "";
    return { H, rt: has ? hickReactionTime(H, f.num("a"), f.num("b")) : NaN, has };
  });
  return (
    <CalculatorShell
      formulaId="hick-hyman"
      title="Hick-Hyman law"
      onReset={() => {
        f.reset();
        setMode("equal");
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `H = ${fmt(r.value.H, 3)} bits${r.value.has ? `, RT ${fmt(r.value.rt, 3)} s` : ""}` : undefined}
      inputs={
        <>
          <SelectField
            label="Alternatives"
            value={mode}
            onChange={setMode}
            options={[
              { value: "equal", label: "Equally likely — H = log₂(n)" },
              { value: "hick", label: "Hick's variant — log₂(n + 1)" },
              { value: "unequal", label: "Unequal probabilities — Σ p log₂(1/p)" },
            ]}
          />
          {mode === "unequal" ? (
            <TextAreaField label="Probabilities or frequencies" value={f.values.probs} onChange={f.set("probs")} hint="e.g. 0.5, 0.25, 0.125, 0.125 or raw counts 40, 20, 10, 10 — normalised automatically" />
          ) : (
            <NumberField label="Number of alternatives n" value={f.values.n} onChange={f.set("n")} step={1} min={1} />
          )}
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Intercept a (optional)" value={f.values.a} onChange={f.set("a")} unit="s" />
            <NumberField label="Slope b (optional)" value={f.values.b} onChange={f.set("b")} unit="s/bit" />
          </div>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Information (stimulus entropy)" value={`${fmt(r.value.H, 3)} bits`} />
            <Result label="Predicted reaction time" value={r.value.has ? `${fmt(r.value.rt, 3)} s` : "—"} note="Applies to choice reaction with practised, known stimulus–response mappings." />
          </>
        )
      }
    />
  );
}

export function SteeringCalculator() {
  const [segments, setSegments] = useState([
    { length: "200", width: "24" },
    { length: "150", width: "24" },
  ]);
  const f = useFields({ a: "", b: "" });
  const r = compute(() => {
    const id = steeringId(segments.map((s) => ({ length: Number(s.length), width: Number(s.width) })));
    const has = f.values.a.trim() !== "" && f.values.b.trim() !== "";
    return { id, mt: has ? f.num("a") + f.num("b") * id : NaN, has };
  });
  return (
    <CalculatorShell
      formulaId="steering"
      title="Steering law"
      onReset={() => {
        setSegments([
          { length: "200", width: "24" },
          { length: "150", width: "24" },
        ]);
        f.reset();
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `Σ L/W = ${fmt(r.value.id, 2)}` : undefined}
      inputs={
        <>
          <fieldset>
            <legend className="text-sm font-medium">Path segments (straight tunnels)</legend>
            <div className="mt-2 space-y-3">
              {segments.map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
                  <NumberField label={`Segment ${i + 1} length`} value={s.length} onChange={(v) => setSegments((x) => x.map((y, j) => (j === i ? { ...y, length: v } : y)))} unit="px" />
                  <NumberField label="Width" value={s.width} onChange={(v) => setSegments((x) => x.map((y, j) => (j === i ? { ...y, width: v } : y)))} unit="px" />
                  <button type="button" disabled={segments.length === 1} onClick={() => setSegments((x) => x.filter((_, j) => j !== i))} className="h-10 rounded-xs px-2 text-sm text-ink-3 hover:text-ink disabled:opacity-40" aria-label={`Remove segment ${i + 1}`}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setSegments((x) => [...x, { length: "100", width: "24" }])} className="mt-3 text-sm font-medium text-accent-ink hover:underline">
              + Add segment
            </button>
          </fieldset>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Intercept a (optional)" value={f.values.a} onChange={f.set("a")} unit="s" />
            <NumberField label="Slope b (optional)" value={f.values.b} onChange={f.set("b")} unit="s" />
          </div>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Index of difficulty Σ L/W" value={fmt(r.value.id, 2)} note="Linear, not logarithmic: halving the width doubles the difficulty of that segment." />
            <Result label="Predicted MT" value={r.value.has ? `${fmt(r.value.mt, 3)} s` : "—"} />
          </>
        )
      }
    />
  );
}

export function KlmCalculator() {
  const [seq, setSeq] = useState("M P BB H M 8K K");
  const [k, setK] = useState(String(KLM_OPERATORS.K.seconds));
  const r = compute(() => klmTotal(parseKlm(seq, Number(k))));
  return (
    <CalculatorShell
      formulaId="klm"
      title="Keystroke-Level Model"
      onReset={() => {
        setSeq("M P BB H M 8K K");
        setK(String(KLM_OPERATORS.K.seconds));
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `${seq} → ${fmt(r.value.total, 2)} s` : undefined}
      inputs={
        <>
          <TextAreaField label="Operator sequence" value={seq} onChange={setSeq} rows={2} hint="K keystroke · P point · B button press/release (click = BB) · H home hands · M mental preparation · R(0.5) system response · 8K = eight keystrokes" />
          <SelectField label="Typist skill (K)" value={k} onChange={setK} options={KLM_TYPIST_RATES.map((t) => ({ value: String(t.seconds), label: `${t.label} — ${t.seconds} s` }))} />
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Predicted expert execution time" value={`${fmt(r.value.total, 2)} s`} note="Error-free, practised execution only. Excludes learning, errors and problem solving." />
            {Object.entries(r.value.byOperator).map(([op, t]) => (
              <Result key={op} label={`${op} total`} value={`${fmt(t, 2)} s`} />
            ))}
          </>
        )
      }
    />
  );
}
