"use client";
/**
 * Jakob's law comparison experiment. The learner finds a named control on a
 * mock shop page. In "familiar" trials it sits where many shopping sites put
 * it (top right); in "unfamiliar" trials the same control sits in the mirror
 * position (bottom left). Label, size and distance from the start point are
 * identical, so the difference isolates the cost of an unconventional
 * location — not of an unfamiliar icon or of a longer movement (Fitts's law).
 * Every number comes from this browser's trials (lib/formulas/stats).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { descriptive } from "@/lib/formulas/stats";
import { actions } from "@/lib/store/store";
import { Bars } from "./charts";

type Condition = "familiar" | "unfamiliar";
type Target = "Basket" | "Sign in";
type Trial = { target: Target; condition: Condition; rep: number };
type Result = Trial & { ms: number; errors: number };

const TARGETS: Target[] = ["Basket", "Sign in"];
const REPS = 4;
const PRACTICE: Trial[] = [
  { target: "Basket", condition: "familiar", rep: 0 },
  { target: "Sign in", condition: "unfamiliar", rep: 0 },
];

function plan(): Trial[] {
  const t: Trial[] = [];
  for (const target of TARGETS) for (const condition of ["familiar", "unfamiliar"] as Condition[]) for (let rep = 1; rep <= REPS; rep++) t.push({ target, condition, rep });
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return [...PRACTICE, ...t];
}

/** Links in each corner. The target occupies the same slot in its corner in both conditions; the other corner gets a decoy in that slot. */
const CORNER_LINKS = { tr: ["Help", "Stores"], bl: ["Privacy", "Careers"] };
const DECOYS: Record<Target, string> = { Basket: "Gift cards", "Sign in": "Offers" };

const LINK = "rounded-sm px-2.5 py-1.5 text-xs font-medium text-ink-2 hover:bg-sunken";

/** One corner of the mock page. The target fills the same slot in whichever corner holds it; the other corner gets a decoy there. */
function Corner({ where, trial, onPick }: { where: "tr" | "bl"; trial: Trial; onPick: (label: string) => void }) {
  const holdsTarget = (trial.condition === "familiar" && where === "tr") || (trial.condition === "unfamiliar" && where === "bl");
  const slot = holdsTarget ? trial.target : DECOYS[trial.target];
  const labels = where === "tr" ? [...CORNER_LINKS.tr, slot] : [slot, ...CORNER_LINKS.bl];
  return (
    <div className={`absolute flex gap-1 ${where === "tr" ? "right-3 top-3" : "bottom-3 left-3"}`}>
      {labels.map((l) => (
        <button key={l} type="button" onClick={() => onPick(l)} className={LINK}>
          {l}
        </button>
      ))}
    </div>
  );
}

export function JakobLab() {
  const [queue, setQueue] = useState<Trial[]>([]);
  const [index, setIndex] = useState(-1);
  const [phase, setPhase] = useState<"idle" | "ready" | "search">("idle");
  const [results, setResults] = useState<Result[]>([]);
  const [message, setMessage] = useState("");
  const t0 = useRef(0);
  const misses = useRef(0);

  const trial = index >= 0 && index < queue.length ? queue[index] : undefined;
  const done = queue.length > 0 && index >= queue.length;
  const practice = trial ? trial.rep === 0 : false;

  function start() {
    setQueue(plan());
    setIndex(0);
    setResults([]);
    setPhase("ready");
    setMessage("The first two trials are practice and are not scored.");
  }
  function begin() {
    misses.current = 0;
    t0.current = performance.now();
    setPhase("search");
    setMessage("");
  }
  function hit(label: string) {
    if (phase !== "search" || !trial) return;
    if (label !== trial.target) {
      misses.current += 1;
      setMessage(`That was “${label}”. Keep looking for “${trial.target}”.`);
      return;
    }
    const ms = performance.now() - t0.current;
    if (!practice) setResults((r) => [...r, { ...trial, ms, errors: misses.current }]);
    setMessage(`${Math.round(ms)} ms${practice ? " (practice, not scored)" : ""}. Press Start trial for the next one.`);
    setIndex((i) => i + 1);
    setPhase("ready");
  }

  const summary = useMemo(() => {
    const by = (c: Condition) => results.filter((r) => r.condition === c);
    const stat = (c: Condition) => (by(c).length ? descriptive(by(c).map((r) => r.ms)) : undefined);
    const fam = stat("familiar");
    const unf = stat("unfamiliar");
    const firstLast = (c: Condition) => {
      const first = by(c).filter((r) => r.rep === 1).map((r) => r.ms);
      const last = by(c).filter((r) => r.rep === REPS).map((r) => r.ms);
      return first.length && last.length ? { first: descriptive(first).mean, last: descriptive(last).mean } : undefined;
    };
    return { fam, unf, errors: { familiar: by("familiar").reduce((s, r) => s + r.errors, 0), unfamiliar: by("unfamiliar").reduce((s, r) => s + r.errors, 0) }, learnU: firstLast("unfamiliar"), learnF: firstLast("familiar") };
  }, [results]);

  useEffect(() => {
    if (done && summary.fam && summary.unf)
      actions.recordLabRun("jakob-lab", `familiar median ${Math.round(summary.fam.median)} ms, unfamiliar median ${Math.round(summary.unf.median)} ms (${results.length} scored trials)`);
  }, [done, summary.fam, summary.unf, results.length]);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
          <p className="text-sm text-ink-2" aria-live="polite">
            {!trial && !done && `${TARGETS.length} controls × 2 positions × ${REPS}, shuffled, after ${PRACTICE.length} practice trials. Use a mouse or touch.`}
            {trial && `Trial ${index + 1} of ${queue.length}${practice ? " · practice" : ""} · find “${trial.target}”`}
            {done && "Finished. Your results are below."}
          </p>
          <button type="button" onClick={start} className="h-9 rounded-sm bg-accent px-4 text-sm font-medium text-surface hover:bg-accent-ink">
            {index < 0 ? "Start" : "Restart"}
          </button>
        </div>
        <div className="relative h-72 select-none bg-soft" aria-label="Mock shop page">
          {trial && phase === "search" && (
            <>
              <div className="absolute left-3 top-3 flex items-center gap-3">
                <span className="t-sub text-sm text-ink">Northwind</span>
                <span className="text-xs text-ink-3">Home · Lighting · Furniture</span>
              </div>
              <Corner where="tr" trial={trial} onPick={hit} />
              <Corner where="bl" trial={trial} onPick={hit} />
              <div className="absolute bottom-3 right-3 flex gap-1 text-xs text-ink-3">
                <span className="px-2.5 py-1.5">Terms</span>
                <span className="px-2.5 py-1.5">Contact</span>
              </div>
              <div className="absolute inset-x-0 top-1/2 mx-auto grid max-w-xs -translate-y-1/2 grid-cols-3 gap-2 opacity-60" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-14 rounded-md bg-sunken" />
                ))}
              </div>
            </>
          )}
          {trial && phase === "ready" && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="mb-3 text-sm text-ink-2">
                  Next: find <strong className="text-ink">“{trial.target}”</strong>
                </p>
                <button type="button" onClick={begin} className="h-10 rounded-sm border border-line-control bg-surface px-4 text-sm font-medium hover:border-ink-3">
                  Start trial
                </button>
              </div>
            </div>
          )}
          {!trial && <p className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-ink-3">{done ? "All trials complete." : "Press Start to begin."}</p>}
        </div>
        <p className="min-h-6 px-5 py-2.5 text-sm text-ink-2" aria-live="assertive">
          {message}
        </p>
      </div>

      {summary.fam && summary.unf && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="min-w-0 overflow-x-auto">
            <table className="w-full min-w-[26rem] text-sm">
              <caption className="label pb-2 text-left">Your data (scored trials)</caption>
              <thead>
                <tr className="border-b border-rule-strong text-left text-ink-3 [&>th]:pr-4">
                  <th className="py-1.5 font-medium">Position</th>
                  <th className="font-medium">Trials</th>
                  <th className="font-medium">Median</th>
                  <th className="font-medium">Mean</th>
                  <th className="font-medium">Wrong clicks</th>
                </tr>
              </thead>
              <tbody className="formula tabular">
                {(
                  [
                    ["Familiar (top right)", summary.fam, summary.errors.familiar],
                    ["Unfamiliar (bottom left)", summary.unf, summary.errors.unfamiliar],
                  ] as const
                ).map(([l, st, e]) => (
                  <tr key={l} className="border-b border-rule [&>td]:pr-4">
                    <td className="py-1.5 font-sans">{l}</td>
                    <td>{st.n}</td>
                    <td>{Math.round(st.median)} ms</td>
                    <td>{Math.round(st.mean)} ms</td>
                    <td>{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-ink-2">
              Median difference: <span className="formula text-ink">{Math.round(summary.unf.median - summary.fam.median)} ms</span> ({summary.unf.median > summary.fam.median ? "unfamiliar slower" : "no cost for the unfamiliar position in your data"}).
            </p>
            {summary.learnU && (
              <p className="mt-1 text-sm text-ink-2">
                Unfamiliar position, first vs last repetition: <span className="formula text-ink">{Math.round(summary.learnU.first)} → {Math.round(summary.learnU.last)} ms</span>
                {summary.learnF && (
                  <>
                    {" "}
                    (familiar: <span className="formula">{Math.round(summary.learnF.first)} → {Math.round(summary.learnF.last)} ms</span>)
                  </>
                )}
                .
              </p>
            )}
          </div>
          <Bars title="Median time to find the control, by position; values in the adjacent table." values={[summary.fam.median / 1000, summary.unf.median / 1000]} labels={["Familiar", "Unfamiliar"]} yLabel="Median time (s)" />
        </div>
      )}
      {done && (
        <div className="rounded-lg bg-soft p-5 text-sm text-ink-2 ring-1 ring-rule">
          <p className="t-sub text-ink">Interpreting your result</p>
          <p className="mt-2">
            Jakob&apos;s law says people expect a site to work like the other sites they use. Here the only thing that changed was where the control sat, so any
            extra time is the cost of looking where experience says it should be, and then searching. The first-versus-last comparison shows the other half of the
            story: within a few trials you start to learn the new position, which is why consistency inside a product matters as well as conventions across
            products. Sixteen trials from one person are noisy; treat a difference of a few tens of milliseconds as no difference.
          </p>
        </div>
      )}
    </div>
  );
}
