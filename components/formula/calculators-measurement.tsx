"use client";

import { useState } from "react";
import { ces, csat, nasaTlxRaw, nasaTlxWeighted, nps, susScore, tlxWeightsFromPairs, umuxLite, TLX_PAIRS, TLX_SCALES } from "@/lib/formulas/questionnaires";
import { errorRate, funnel, problemDiscovery, participantsForDiscovery, retention, customerRetentionRate, stickiness, taskSuccess, timeOnTask } from "@/lib/formulas/stats";
import { parseNumberList } from "@/lib/formulas/math";
import { CalculatorShell, NumberField, Result, SelectField, TextAreaField, compute, fmt, pct, useFields } from "./kit";

const SUS_ITEMS = [
  "1 · would use frequently (positive)",
  "2 · unnecessarily complex (negative)",
  "3 · easy to use (positive)",
  "4 · would need technical support (negative)",
  "5 · functions well integrated (positive)",
  "6 · too much inconsistency (negative)",
  "7 · most people would learn quickly (positive)",
  "8 · cumbersome to use (negative)",
  "9 · felt confident (positive)",
  "10 · needed to learn a lot first (negative)",
];

export function SusCalculator() {
  const initial = [4, 2, 4, 1, 4, 2, 5, 2, 4, 2];
  const [resp, setResp] = useState<number[]>(initial);
  const r = compute(() => susScore(resp));
  return (
    <CalculatorShell
      formulaId="sus"
      title="System Usability Scale"
      onReset={() => setResp(initial)}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `SUS ${fmt(r.value.score, 1)} from responses ${resp.join(",")}` : undefined}
      inputs={
        <fieldset>
          <legend className="text-sm font-medium">One respondent — 1 strongly disagree … 5 strongly agree</legend>
          <p className="mt-1 text-xs text-ink-3">Item intent paraphrased; administer the published wording.</p>
          <div className="mt-3 space-y-2">
            {SUS_ITEMS.map((label, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <span id={`sus-${i}`} className="text-sm text-ink-2">{label}</span>
                <div role="radiogroup" aria-labelledby={`sus-${i}`} className="flex shrink-0 gap-1">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={resp[i] === v}
                      aria-label={`${v}`}
                      onClick={() => setResp((x) => x.map((y, j) => (j === i ? v : y)))}
                      className={`formula h-8 w-8 rounded-xs border text-sm ${resp[i] === v ? "border-ink bg-accent text-surface" : "border-line-control text-ink-2 hover:bg-sunken"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="SUS score (0–100)" value={fmt(r.value.score, 1)} note="Not a percentage. Interpret against benchmarks (a commonly cited average is ≈ 68), and report the mean across respondents with a confidence interval." />
            <Result label="Sum of contributions" value={`${r.value.contributions.reduce((s, c) => s + c, 0)} × 2.5`} />
            <Result label="Contributions" value={<span className="text-base">{r.value.contributions.join(" · ")}</span>} note="Odd items: r − 1 · Even items: 5 − r" />
          </>
        )
      }
    />
  );
}

export function UmuxLiteCalculator() {
  const f = useFields({ i1: "6", i2: "5" });
  const r = compute(() => umuxLite(f.num("i1"), f.num("i2")));
  return (
    <CalculatorShell
      formulaId="umux-lite"
      title="UMUX-LITE"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `raw ${fmt(r.value.raw, 1)}, adjusted ${fmt(r.value.adjusted, 1)}` : undefined}
      inputs={
        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Item 1 — capabilities meet requirements" value={f.values.i1} onChange={f.set("i1")} hint="1–7" step={1} min={1} max={7} />
          <NumberField label="Item 2 — easy to use" value={f.values.i2} onChange={f.set("i2")} hint="1–7" step={1} min={1} max={7} />
        </div>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="UMUX-LITE (raw, 0–100)" value={fmt(r.value.raw, 1)} />
            <Result label="Regression-adjusted (SUS-comparable)" value={fmt(r.value.adjusted, 1)} note="0.65 × raw + 22.9 (Lewis, Utesch & Maher 2013)" />
          </>
        )
      }
    />
  );
}

export function NasaTlxCalculator() {
  const initial = [55, 10, 45, 30, 50, 25];
  const [ratings, setRatings] = useState<number[]>(initial);
  const [weighted, setWeighted] = useState(false);
  const [pairs, setPairs] = useState<number[]>(TLX_PAIRS.map(([a]) => a));
  const r = compute(() => {
    const raw = nasaTlxRaw(ratings);
    const weights = tlxWeightsFromPairs(pairs);
    return { raw, weights, weightedScore: nasaTlxWeighted(ratings, weights) };
  });
  return (
    <CalculatorShell
      formulaId="nasa-tlx"
      title="NASA-TLX"
      onReset={() => {
        setRatings(initial);
        setPairs(TLX_PAIRS.map(([a]) => a));
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `Raw TLX ${fmt(r.value.raw, 1)}${weighted ? `, weighted ${fmt(r.value.weightedScore, 1)}` : ""}` : undefined}
      inputs={
        <>
          {TLX_SCALES.map((name, i) => (
            <div key={name}>
              <label htmlFor={`tlx-${i}`} className="flex justify-between text-sm font-medium">
                <span>{name}</span>
                <span className="formula tabular text-ink-2">{ratings[i]}</span>
              </label>
              <input id={`tlx-${i}`} type="range" min={0} max={100} step={5} value={ratings[i]} onChange={(e) => setRatings((x) => x.map((y, j) => (j === i ? Number(e.target.value) : y)))} className="mt-1 w-full" />
              <div className="flex justify-between text-[11px] text-ink-3">
                <span>{name === "Performance" ? "Perfect" : "Very low"}</span>
                <span>{name === "Performance" ? "Failure" : "Very high"}</span>
              </div>
            </div>
          ))}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={weighted} onChange={(e) => setWeighted(e.target.checked)} />
            Use weighted TLX (15 pairwise comparisons)
          </label>
          {weighted && (
            <fieldset className="space-y-2">
              <legend className="text-sm text-ink-2">For each pair, which contributed more to workload?</legend>
              {TLX_PAIRS.map(([a, b], i) => (
                <div key={i} className="flex flex-wrap gap-2 text-sm">
                  {[a, b].map((c) => (
                    <button key={c} type="button" aria-pressed={pairs[i] === c} onClick={() => setPairs((x) => x.map((y, j) => (j === i ? c : y)))} className={`rounded-xs border px-2 py-1 ${pairs[i] === c ? "border-ink bg-accent text-surface" : "border-line-control text-ink-2"}`}>
                      {TLX_SCALES[c]}
                    </button>
                  ))}
                </div>
              ))}
            </fieldset>
          )}
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Raw TLX (mean of six)" value={fmt(r.value.raw, 1)} />
            {weighted && <Result label="Weighted TLX" value={fmt(r.value.weightedScore, 1)} note={`Weights: ${r.value.weights.join(", ")} (sum 15)`} />}
            <Result label="Highest subscale" value={<span className="text-base">{TLX_SCALES[ratings.indexOf(Math.max(...ratings))]}</span>} note="Subscale profiles are often more diagnostic than the overall score." />
          </>
        )
      }
    />
  );
}

export function NpsCalculator() {
  const f = useFields({ p: "120", pa: "60", d: "45" });
  const r = compute(() => nps(f.num("p"), f.num("pa"), f.num("d")));
  return (
    <CalculatorShell
      formulaId="nps"
      title="Net Promoter Score"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `NPS ${fmt(r.value.nps, 1)} ± ${fmt(r.value.marginOfError, 1)} (n=${r.value.n})` : undefined}
      inputs={
        <div className="grid grid-cols-3 gap-3">
          <NumberField label="Promoters (9–10)" value={f.values.p} onChange={f.set("p")} step={1} min={0} />
          <NumberField label="Passives (7–8)" value={f.values.pa} onChange={f.set("pa")} step={1} min={0} />
          <NumberField label="Detractors (0–6)" value={f.values.d} onChange={f.set("d")} step={1} min={0} />
        </div>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="NPS (−100 to +100)" value={fmt(r.value.nps, 1)} note={`95% interval ≈ ${fmt(r.value.low, 1)} to ${fmt(r.value.high, 1)}`} />
            <Result label="Promoters" value={pct(r.value.promoterShare)} />
            <Result label="Detractors" value={pct(r.value.detractorShare)} />
          </>
        )
      }
    />
  );
}

export function CsatCalculator() {
  const [counts, setCounts] = useState(["4", "6", "15", "40", "35"]);
  const r = compute(() => csat(counts.map(Number)));
  return (
    <CalculatorShell
      formulaId="csat"
      title="Customer Satisfaction Score"
      onReset={() => setCounts(["4", "6", "15", "40", "35"])}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `CSAT ${fmt(r.value.csat, 1)}% (n=${r.value.n})` : undefined}
      inputs={
        <div className="grid grid-cols-5 gap-2">
          {counts.map((c, i) => (
            <NumberField key={i} label={`“${i + 1}”`} value={c} onChange={(v) => setCounts((x) => x.map((y, j) => (j === i ? v : y)))} step={1} min={0} />
          ))}
        </div>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="CSAT (top-two-box)" value={`${fmt(r.value.csat, 1)}%`} note="Share of responses rating 4 or 5 on a 5-point scale." />
            <Result label="Mean rating" value={fmt(r.value.mean, 2)} />
            <Result label="Responses" value={r.value.n} />
          </>
        )
      }
    />
  );
}

export function CesCalculator() {
  const [counts, setCounts] = useState(["2", "3", "5", "10", "25", "35", "20"]);
  const r = compute(() => ces(counts.map(Number)));
  return (
    <CalculatorShell
      formulaId="ces"
      title="Customer Effort Score"
      onReset={() => setCounts(["2", "3", "5", "10", "25", "35", "20"])}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `CES mean ${fmt(r.value.mean, 2)}, ${fmt(r.value.agreeShare, 1)}% agree` : undefined}
      inputs={
        <>
          <p className="text-sm text-ink-2">Counts per response on a 7-point agreement scale (“…made it easy to handle my issue”).</p>
          <div className="grid grid-cols-7 gap-1.5">
            {counts.map((c, i) => (
              <NumberField key={i} label={`${i + 1}`} value={c} onChange={(v) => setCounts((x) => x.map((y, j) => (j === i ? v : y)))} step={1} min={0} />
            ))}
          </div>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Mean (1–7, higher = easier)" value={fmt(r.value.mean, 2)} />
            <Result label="Agree (5–7)" value={`${fmt(r.value.agreeShare, 1)}%`} />
            <Result label="Responses" value={r.value.n} />
          </>
        )
      }
    />
  );
}

export function TaskSuccessCalculator() {
  const f = useFields({ x: "7", n: "10" });
  const [conf, setConf] = useState("0.95");
  const r = compute(() => taskSuccess(f.num("x"), f.num("n"), Number(conf)));
  return (
    <CalculatorShell
      formulaId="task-success"
      title="Task success rate"
      onReset={() => {
        f.reset();
        setConf("0.95");
      }}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `${f.values.x}/${f.values.n} = ${pct(r.value.p)} (CI ${pct(r.value.low)}–${pct(r.value.high)})` : undefined}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Successful attempts x" value={f.values.x} onChange={f.set("x")} step={1} min={0} />
            <NumberField label="Attempts n" value={f.values.n} onChange={f.set("n")} step={1} min={1} />
          </div>
          <SelectField label="Confidence" value={conf} onChange={setConf} options={[{ value: "0.9", label: "90%" }, { value: "0.95", label: "95%" }, { value: "0.99", label: "99%" }]} />
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Observed success rate" value={pct(r.value.p)} />
            <Result label={`Adjusted-Wald ${Number(conf) * 100}% CI`} value={`${pct(r.value.low)} – ${pct(r.value.high)}`} note="Recommended for small samples (Sauro & Lewis 2005)." />
          </>
        )
      }
    />
  );
}

export function TimeOnTaskCalculator() {
  const [text, setText] = useState("38, 45, 52, 41, 120, 60, 47");
  const r = compute(() => timeOnTask(parseNumberList(text)));
  return (
    <CalculatorShell
      formulaId="time-on-task"
      title="Time on task"
      onReset={() => setText("38, 45, 52, 41, 120, 60, 47")}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `geometric mean ${fmt(r.value.geometricMean, 1)} s (n=${r.value.n})` : undefined}
      inputs={<TextAreaField label="Task times for successful attempts (seconds)" value={text} onChange={setText} hint="Separate with commas, spaces or new lines." />}
      results={
        r.ok && (
          <>
            <Result emphasis label="Geometric mean" value={`${fmt(r.value.geometricMean, 1)} s`} note={Number.isFinite(r.value.low) ? `95% CI ${fmt(r.value.low, 1)}–${fmt(r.value.high, 1)} s (log-transformed)` : "Need ≥ 2 times for an interval."} />
            <Result label="Arithmetic mean" value={`${fmt(r.value.mean, 1)} s`} note="Pulled up by slow outliers." />
            <Result label="Median" value={`${fmt(r.value.median, 1)} s`} />
          </>
        )
      }
    />
  );
}

export function ErrorRateCalculator() {
  const f = useFields({ e: "9", o: "120", a: "24", uw: "6", u: "12" });
  const r = compute(() => errorRate(f.num("e"), f.num("o"), f.num("a"), f.num("uw"), f.num("u")));
  return (
    <CalculatorShell
      formulaId="error-rate"
      title="Error rate"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `${pct(r.value.perOpportunity)} per opportunity` : undefined}
      inputs={
        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Errors observed" value={f.values.e} onChange={f.set("e")} step={1} min={0} />
          <NumberField label="Error opportunities" value={f.values.o} onChange={f.set("o")} step={1} min={1} hint="e.g. fields × attempts" />
          <NumberField label="Task attempts" value={f.values.a} onChange={f.set("a")} step={1} min={1} />
          <NumberField label="Users with ≥ 1 error" value={f.values.uw} onChange={f.set("uw")} step={1} min={0} />
          <NumberField label="Users" value={f.values.u} onChange={f.set("u")} step={1} min={1} />
        </div>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Errors per opportunity" value={pct(r.value.perOpportunity)} />
            <Result label="Errors per attempt" value={fmt(r.value.perAttempt, 2)} />
            <Result label="Users affected" value={pct(r.value.shareOfUsers)} />
          </>
        )
      }
    />
  );
}

export function FunnelCalculator() {
  const [text, setText] = useState("10000, 4200, 1900, 760, 410");
  const r = compute(() => funnel(parseNumberList(text)));
  return (
    <CalculatorShell
      formulaId="conversion-funnel"
      title="Funnel conversion"
      onReset={() => setText("10000, 4200, 1900, 760, 410")}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `overall ${pct(r.value.overall, 2)}` : undefined}
      inputs={<TextAreaField label="Users reaching each step (in order)" value={text} onChange={setText} hint="Same users, same time window. A count may not exceed the previous step." />}
      results={
        r.ok && (
          <>
            <Result emphasis label="Overall conversion" value={pct(r.value.overall, 2)} />
            <div className="col-span-full">
              <table className="w-full text-sm">
                <caption className="sr-only">Step conversion and drop-off</caption>
                <thead>
                  <tr className="text-left text-ink-3">
                    <th className="pb-1 font-medium">Step</th>
                    <th className="pb-1 font-medium">Users</th>
                    <th className="pb-1 font-medium">From previous</th>
                    <th className="pb-1 font-medium">Drop-off</th>
                  </tr>
                </thead>
                <tbody className="formula tabular">
                  {r.value.steps.map((s, i) => (
                    <tr key={i} className="border-t border-rule">
                      <td className="py-1">{i + 1}</td>
                      <td>{fmt(s.count, 0)}</td>
                      <td>{i === 0 ? "—" : pct(s.stepConversion)}</td>
                      <td>{i === 0 ? "—" : pct(s.dropOff)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      }
    />
  );
}

export function RetentionCalculator() {
  const f = useFields({ start: "1000", retained: "720", end: "1150", acquired: "300", dau: "1800", mau: "9000" });
  const r = compute(() => ({
    cohort: retention(f.num("start"), f.num("retained")),
    crr: customerRetentionRate(f.num("start"), f.num("end"), f.num("acquired")),
    stick: stickiness(f.num("dau"), f.num("mau")),
  }));
  return (
    <CalculatorShell
      formulaId="retention-churn"
      title="Retention & churn"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `retention ${pct(r.value.cohort.retention)}, churn ${pct(r.value.cohort.churn)}` : undefined}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Cohort at start" value={f.values.start} onChange={f.set("start")} step={1} />
            <NumberField label="Of whom still active" value={f.values.retained} onChange={f.set("retained")} step={1} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Customers at period end" value={f.values.end} onChange={f.set("end")} step={1} />
            <NumberField label="New customers in period" value={f.values.acquired} onChange={f.set("acquired")} step={1} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Average DAU" value={f.values.dau} onChange={f.set("dau")} />
            <NumberField label="MAU" value={f.values.mau} onChange={f.set("mau")} />
          </div>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="Cohort retention" value={pct(r.value.cohort.retention)} note={`Churn ${pct(r.value.cohort.churn)} over the same window`} />
            <Result label="Customer retention rate" value={pct(r.value.crr.crr)} note="(end − new) / start" />
            <Result label="DAU/MAU stickiness" value={pct(r.value.stick)} />
          </>
        )
      }
    />
  );
}

export function ProblemDiscoveryCalculator() {
  const f = useFields({ p: "0.31", n: "5", goal: "0.85" });
  const r = compute(() => ({ found: problemDiscovery(f.num("p"), f.num("n")), needed: participantsForDiscovery(f.num("p"), f.num("goal")) }));
  return (
    <CalculatorShell
      formulaId="problem-discovery"
      title="Problem discovery"
      onReset={f.reset}
      error={r.ok ? undefined : r.error}
      summary={r.ok ? `p=${f.values.p}, n=${f.values.n} → ${pct(r.value.found)} chance of observing a problem at least once` : undefined}
      inputs={
        <>
          <NumberField label="Problem occurrence probability p" value={f.values.p} onChange={f.set("p")} hint="Share of users who encounter the problem (0.31 was Nielsen & Landauer's average — yours will differ)" step={0.01} />
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Participants n" value={f.values.n} onChange={f.set("n")} step={1} />
            <NumberField label="Discovery goal" value={f.values.goal} onChange={f.set("goal")} step={0.01} />
          </div>
        </>
      }
      results={
        r.ok && (
          <>
            <Result emphasis label="P(seen at least once)" value={pct(r.value.found)} note="For a single problem of probability p — not the share of all problems found." />
            <Result label="Participants for goal" value={r.value.needed} />
          </>
        )
      }
    />
  );
}

export { SelectField };
