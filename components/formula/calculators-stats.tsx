"use client";

import { useState } from "react";
import { parseNumberList } from "@/lib/formulas/math";
import { ciMean, ciMeanFromValues, cohensD, correlation, describeEffect, descriptive, sampleSizeMean, sampleSizeProportion, sampleSizeTwoProportions, twoProportionTest } from "@/lib/formulas/stats";
import { aspectRatio, contrastRatio, gridColumns, modularScale, parseHex, wcagChecks, SCALE_RATIOS } from "@/lib/formulas/visual";
import { CalculatorShell, NumberField, Result, SelectField, TextAreaField, compute, fmt, pct, useFields } from "./kit";

export function DescriptiveCalculator() {
  const [text, setText] = useState("72, 85, 65, 90, 77, 85, 68, 80");
  const r = compute(() => descriptive(parseNumberList(text)));
  return (
    <CalculatorShell
      formulaId="descriptive-stats"
      title="Descriptive statistics"
      onReset={() => setText("72, 85, 65, 90, 77, 85, 68, 80")}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `n=${r.value.n}, mean ${fmt(r.value.mean, 2)}, SD ${fmt(r.value.sampleSd, 2)}` : undefined}
      inputs={<TextAreaField label="Values" value={text} onChange={setText} rows={4} hint="Separate with commas, spaces or new lines." />}
      results={
        r.ok && (
          <>
            <Result label="n" value={r.value.n} />
            <Result label="Mean" value={fmt(r.value.mean, 3)} />
            <Result label="Median" value={fmt(r.value.median, 3)} />
            <Result label="Mode" value={r.value.modes.length ? r.value.modes.join(", ") : "none"} />
            <Result label="Sample SD (n − 1)" value={fmt(r.value.sampleSd, 3)} />
            <Result label="Sample variance" value={fmt(r.value.sampleVariance, 3)} />
            <Result label="Population SD (n)" value={fmt(r.value.populationSd, 3)} />
            <Result label="Range" value={`${fmt(r.value.min)} – ${fmt(r.value.max)}`} />
          </>
        )
      }
    />
  );
}

export function CiMeanCalculator() {
  const [mode, setMode] = useState<"summary" | "values">("summary");
  const f = useFields({ mean: "72.5", sd: "12", n: "15", values: "68, 75, 80, 62, 90, 71, 77" });
  const [conf, setConf] = useState("0.95");
  const r = compute(() => (mode === "summary" ? ciMean(f.num("mean"), f.num("sd"), f.num("n"), Number(conf)) : ciMeanFromValues(parseNumberList(f.values.values), Number(conf))));
  return (
    <CalculatorShell
      formulaId="confidence-interval-mean"
      title="Confidence interval for a mean"
      onReset={() => {
        f.reset();
        setConf("0.95");
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `${fmt(r.value.mean, 2)} [${fmt(r.value.low, 2)}, ${fmt(r.value.high, 2)}] at ${Number(conf) * 100}%` : undefined}
      inputs={
        <>
          <SelectField label="Input" value={mode} onChange={setMode} options={[{ value: "summary", label: "Summary statistics" }, { value: "values", label: "Raw values" }]} />
          {mode === "summary" ? (
            <div className="grid grid-cols-3 gap-3">
              <NumberField label="Mean x̄" value={f.values.mean} onChange={f.set("mean")} />
              <NumberField label="SD s" value={f.values.sd} onChange={f.set("sd")} />
              <NumberField label="n" value={f.values.n} onChange={f.set("n")} step={1} />
            </div>
          ) : (
            <TextAreaField label="Values" value={f.values.values} onChange={f.set("values")} />
          )}
          <SelectField label="Confidence" value={conf} onChange={setConf} options={[{ value: "0.9", label: "90%" }, { value: "0.95", label: "95%" }, { value: "0.99", label: "99%" }]} />
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label={`${Number(conf) * 100}% confidence interval`} value={`${fmt(r.value.low, 2)} – ${fmt(r.value.high, 2)}`} note="The procedure captures the true mean in this share of repeated samples; it is not a probability statement about this one interval." />
            <Result label="Margin of error" value={`± ${fmt(r.value.margin, 3)}`} />
            <Result label={`t critical (df ${r.value.df})`} value={fmt(r.value.t, 4)} />
          </>
        )
      }
    />
  );
}

export function TwoProportionCalculator() {
  const f = useFields({ x1: "200", n1: "4000", x2: "248", n2: "4000" });
  const [conf, setConf] = useState("0.95");
  const r = compute(() => twoProportionTest(f.num("x1"), f.num("n1"), f.num("x2"), f.num("n2"), Number(conf)));
  return (
    <CalculatorShell
      formulaId="two-proportion-test"
      title="A/B test — two-proportion z-test"
      onReset={() => {
        f.reset();
        setConf("0.95");
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `A ${pct(r.value.p1, 2)} vs B ${pct(r.value.p2, 2)}, z=${fmt(r.value.z, 3)}, p=${fmt(r.value.pValue, 4)}` : undefined}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="A — conversions" value={f.values.x1} onChange={f.set("x1")} step={1} />
            <NumberField label="A — visitors" value={f.values.n1} onChange={f.set("n1")} step={1} />
            <NumberField label="B — conversions" value={f.values.x2} onChange={f.set("x2")} step={1} />
            <NumberField label="B — visitors" value={f.values.n2} onChange={f.set("n2")} step={1} />
          </div>
          <SelectField label="Confidence" value={conf} onChange={setConf} options={[{ value: "0.9", label: "90% (α = 0.10)" }, { value: "0.95", label: "95% (α = 0.05)" }, { value: "0.99", label: "99% (α = 0.01)" }]} />
          <p className="text-xs text-ink-3">Valid only for a sample size fixed in advance and analysed once. Repeatedly checking (“peeking”) inflates false positives.</p>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Difference B − A" value={`${(r.value.diff * 100).toFixed(2)} pts`} note={`${Number(conf) * 100}% CI ${(r.value.low * 100).toFixed(2)} to ${(r.value.high * 100).toFixed(2)} pts`} />
            <Result label="Relative lift" value={pct(r.value.relativeLift)} />
            <Result label="p-value (two-sided)" value={fmt(r.value.pValue, 4)} note={r.value.significant ? `Below α — statistically significant at ${Number(conf) * 100}%` : "Not statistically significant at this level"} />
            <Result label="z" value={fmt(r.value.z, 3)} />
          </>
        )
      }
    />
  );
}

export function EffectSizeCalculator() {
  const f = useFields({ m1: "48", s1: "12", n1: "20", m2: "56", s2: "14", n2: "20" });
  const r = compute(() => cohensD(f.num("m1"), f.num("s1"), f.num("n1"), f.num("m2"), f.num("s2"), f.num("n2")));
  return (
    <CalculatorShell
      formulaId="effect-size"
      title="Effect size (Cohen's d)"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `d=${fmt(r.value.d, 3)}, g=${fmt(r.value.g, 3)}` : undefined}
      inputs={
        <div className="grid grid-cols-3 gap-3">
          <NumberField label="Mean 1" value={f.values.m1} onChange={f.set("m1")} />
          <NumberField label="SD 1" value={f.values.s1} onChange={f.set("s1")} />
          <NumberField label="n 1" value={f.values.n1} onChange={f.set("n1")} step={1} />
          <NumberField label="Mean 2" value={f.values.m2} onChange={f.set("m2")} />
          <NumberField label="SD 2" value={f.values.s2} onChange={f.set("s2")} />
          <NumberField label="n 2" value={f.values.n2} onChange={f.set("n2")} step={1} />
        </div>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Cohen's d" value={fmt(r.value.d, 3)} note={`Magnitude ${describeEffect(r.value.d)}. Benchmarks are conventions, not judgements of practical importance.`} />
            <Result label="Hedges' g (bias-corrected)" value={fmt(r.value.g, 3)} />
            <Result label="Pooled SD" value={fmt(r.value.pooledSd, 3)} />
          </>
        )
      }
    />
  );
}

export function SampleSizeCalculator() {
  const [mode, setMode] = useState<"proportion" | "mean" | "ab">("ab");
  const f = useFields({ p: "0.5", e: "0.05", sd: "15", em: "5", p1: "0.05", p2: "0.06", alpha: "0.05", power: "0.8" });
  const r = compute(() =>
    mode === "proportion" ? sampleSizeProportion(f.num("p"), f.num("e")) : mode === "mean" ? sampleSizeMean(f.num("sd"), f.num("em")) : sampleSizeTwoProportions(f.num("p1"), f.num("p2"), f.num("alpha"), f.num("power")),
  );
  return (
    <CalculatorShell
      formulaId="sample-size"
      title="Sample size"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `${mode}: n = ${r.value}${mode === "ab" ? " per group" : ""}` : undefined}
      inputs={
        <>
          <SelectField
            label="Goal"
            value={mode}
            onChange={setMode}
            options={[
              { value: "ab", label: "Detect a difference between two rates (A/B)" },
              { value: "proportion", label: "Estimate a proportion within ± margin" },
              { value: "mean", label: "Estimate a mean within ± margin" },
            ]}
          />
          {mode === "proportion" && (
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Expected proportion p" value={f.values.p} onChange={f.set("p")} hint="0.5 is the most conservative" />
              <NumberField label="Margin of error E" value={f.values.e} onChange={f.set("e")} hint="0.05 = ± 5 points" />
            </div>
          )}
          {mode === "mean" && (
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Expected SD σ" value={f.values.sd} onChange={f.set("sd")} />
              <NumberField label="Margin of error E" value={f.values.em} onChange={f.set("em")} />
            </div>
          )}
          {mode === "ab" && (
            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Baseline rate p₁" value={f.values.p1} onChange={f.set("p1")} />
              <NumberField label="Rate to detect p₂" value={f.values.p2} onChange={f.set("p2")} />
              <NumberField label="Significance α" value={f.values.alpha} onChange={f.set("alpha")} hint="two-sided" />
              <NumberField label="Power 1 − β" value={f.values.power} onChange={f.set("power")} />
            </div>
          )}
          <p className="text-xs text-ink-3">95% confidence (z = 1.96) for the estimation modes.</p>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label={mode === "ab" ? "Participants per group" : "Required sample"} value={fmt(r.value, 0)} note={mode === "ab" ? `Total ≈ ${fmt(r.value * 2, 0)}. Smaller effects need far larger samples — halving the difference roughly quadruples n.` : "Rounded up. Add allowance for non-response and exclusions."} />
          </>
        )
      }
    />
  );
}

export function CorrelationCalculator() {
  const f = useFields({ x: "1, 2, 3, 4, 5, 6, 7, 8", y: "62, 65, 70, 69, 75, 79, 80, 86" });
  const r = compute(() => correlation(parseNumberList(f.values.x), parseNumberList(f.values.y)));
  return (
    <CalculatorShell
      formulaId="correlation-regression"
      title="Correlation & regression"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `r=${fmt(r.value.r, 3)}, y = ${fmt(r.value.intercept, 3)} + ${fmt(r.value.slope, 3)}x` : undefined}
      inputs={
        <>
          <TextAreaField label="x values" value={f.values.x} onChange={f.set("x")} />
          <TextAreaField label="y values (same order)" value={f.values.y} onChange={f.set("y")} />
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Pearson r" value={fmt(r.value.r, 4)} note="Association only — it does not show that x causes y." />
            <Result label="r²" value={fmt(r.value.r2, 4)} />
            <Result label="p (two-sided)" value={fmt(r.value.pValue, 5)} note={`t = ${fmt(r.value.t, 3)}, df = ${r.value.df}`} />
            <Result label="Regression line" value={<span className="text-base">y = {fmt(r.value.intercept, 3)} + {fmt(r.value.slope, 3)}·x</span>} />
          </>
        )
      }
    />
  );
}

export function ContrastCalculator() {
  const [fg, setFg] = useState("#4b4740");
  const [bg, setBg] = useState("#faf8f4");
  const r = compute(() => {
    const ratio = contrastRatio(parseHex(fg), parseHex(bg));
    return { ratio, checks: wcagChecks(ratio) };
  });
  return (
    <CalculatorShell
      formulaId="contrast-ratio"
      title="WCAG contrast ratio"
      onReset={() => {
        setFg("#4b4740");
        setBg("#faf8f4");
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `${fg} on ${bg} = ${r.value.ratio.toFixed(2)}:1` : undefined}
      inputs={
        <>
          {([
            ["Text / foreground", fg, setFg],
            ["Background", bg, setBg],
          ] as const).map(([label, value, set]) => (
            <div key={label}>
              <label className="block text-sm font-medium" htmlFor={`c-${label}`}>
                {label}
              </label>
              <div className="mt-1 flex gap-2">
                <input aria-label={`${label} colour picker`} type="color" value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"} onChange={(e) => set(e.target.value)} className="h-10 w-12 rounded-xs border border-line-control bg-surface" />
                <input id={`c-${label}`} value={value} onChange={(e) => set(e.target.value)} className="formula h-10 flex-1 rounded-sm border border-line-control bg-surface px-3" />
              </div>
            </div>
          ))}
          <div className="rounded-sm border border-rule p-4" style={{ background: r.ok ? bg : undefined, color: r.ok ? fg : undefined }}>
            <p className="text-sm">Normal text sample — the quick brown fox.</p>
            <p className="mt-1 text-2xl font-semibold">Large text sample</p>
          </div>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Contrast ratio" value={`${r.value.ratio.toFixed(2)} : 1`} note="Compared unrounded against each threshold." />
            <div className="col-span-full">
              <ul className="space-y-1.5 text-sm">
                {r.value.checks.map((c) => (
                  <li key={c.id} className="flex justify-between gap-3 border-t border-rule pt-1.5">
                    <span className="text-ink-2">
                      {c.label} · ≥ {c.threshold}:1
                    </span>
                    <span className={`font-semibold ${c.pass ? "text-ok" : "text-accent-ink"}`}>{c.pass ? "Pass" : "Fail"}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )
      }
    />
  );
}

export function ModularScaleCalculator() {
  const f = useFields({ base: "16" });
  const [ratio, setRatio] = useState(String(SCALE_RATIOS[3].ratio));
  const r = compute(() => modularScale(f.num("base"), Number(ratio), 2, 6));
  return (
    <CalculatorShell
      formulaId="modular-scale"
      title="Modular type scale"
      onReset={() => {
        f.reset();
        setRatio(String(SCALE_RATIOS[3].ratio));
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `base ${f.values.base}px × ${Number(ratio).toFixed(3)}: ${r.value.map((s) => s.size.toFixed(1)).join(", ")}` : undefined}
      inputs={
        <>
          <NumberField label="Base size" value={f.values.base} onChange={f.set("base")} unit="px" />
          <SelectField label="Ratio" value={ratio} onChange={setRatio} options={SCALE_RATIOS.map((s) => ({ value: String(s.ratio), label: `${s.name} — ${s.label} (${s.ratio.toFixed(3)})` }))} />
        </>
      }
      results={
        r.ok && (
          <div className="col-span-full space-y-1">
            {[...r.value].reverse().map((s) => (
              <div key={s.step} className="flex items-baseline gap-4 overflow-hidden border-t border-rule pt-1">
                <span className="formula tabular w-20 shrink-0 text-sm text-ink-3">
                  {s.step >= 0 ? `+${s.step}` : s.step} · {s.size.toFixed(2)}
                </span>
                <span className="truncate font-serif leading-tight" style={{ fontSize: `${Math.min(s.size, 64)}px` }}>
                  Hierarchy
                </span>
              </div>
            ))}
          </div>
        )
      }
    />
  );
}

export function GridCalculator() {
  const f = useFields({ container: "1200", columns: "12", gutter: "24", margin: "32", w: "1920", h: "1080" });
  const r = compute(() => ({ grid: gridColumns(f.num("container"), f.num("columns"), f.num("gutter"), f.num("margin")), aspect: aspectRatio(f.num("w"), f.num("h")) }));
  return (
    <CalculatorShell
      formulaId="grid-columns"
      title="Grid columns"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `${f.values.columns} cols in ${f.values.container}px → ${r.value.grid.column.toFixed(2)}px` : undefined}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Container width" value={f.values.container} onChange={f.set("container")} unit="px" />
            <NumberField label="Columns" value={f.values.columns} onChange={f.set("columns")} step={1} />
            <NumberField label="Gutter" value={f.values.gutter} onChange={f.set("gutter")} unit="px" />
            <NumberField label="Outer margin (each side)" value={f.values.margin} onChange={f.set("margin")} unit="px" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Aspect: width" value={f.values.w} onChange={f.set("w")} step={1} />
            <NumberField label="Aspect: height" value={f.values.h} onChange={f.set("h")} step={1} />
          </div>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Column width" value={`${r.value.grid.column.toFixed(2)} px`} />
            <Result label="Aspect ratio" value={`${r.value.aspect.w}:${r.value.aspect.h}`} note={`= ${r.value.aspect.decimal.toFixed(4)}`} />
            <div className="col-span-full">
              <p className="label">Spans</p>
              <p className="formula tabular mt-1 text-sm text-ink-2">
                {r.value.grid.spans
                  .filter((s) => [1, 2, 3, 4, 6, 8, 12].includes(s.columns))
                  .map((s) => `${s.columns}→${s.width.toFixed(1)}`)
                  .join(" · ")}
              </p>
              <div className="mt-3 flex h-8 gap-[2px]" aria-hidden>
                {Array.from({ length: Math.min(24, f.num("columns")) }).map((_, i) => (
                  <div key={i} className="flex-1 bg-accent-wash" />
                ))}
              </div>
            </div>
          </>
        )
      }
    />
  );
}

export { pct };
