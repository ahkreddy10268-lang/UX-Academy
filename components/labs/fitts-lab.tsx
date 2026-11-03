"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { linearFit } from "@/lib/formulas/math";
import { fittsId } from "@/lib/formulas/pointing";
import { actions } from "@/lib/store/store";
import { ScatterFit } from "./charts";

/** Nominal conditions in reference pixels; scaled to the stage so D/W (and thus ID) is preserved. */
const CONDITIONS = [
  { D: 160, W: 64 },
  { D: 160, W: 24 },
  { D: 320, W: 64 },
  { D: 320, W: 24 },
  { D: 560, W: 48 },
  { D: 560, W: 16 },
];
const TRIALS = 6;
const REF_WIDTH = 680;

type Trial = { cond: number; mt: number; hit: boolean };

function shuffle<T>(xs: T[]) {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FittsLab() {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [order, setOrder] = useState<number[]>([]);
  const [index, setIndex] = useState(-1); // -1 = not started
  const [phase, setPhase] = useState<"home" | "target">("home");
  const [dir, setDir] = useState<1 | -1>(1);
  const [trials, setTrials] = useState<Trial[]>([]);
  const started = useRef(0);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, (el.clientWidth - 24) / REF_WIDTH)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const running = index >= 0 && index < order.length;
  const done = index >= 0 && index >= order.length;
  const cond = running ? CONDITIONS[order[index]] : undefined;

  function begin() {
    setOrder(shuffle(CONDITIONS.flatMap((_, i) => Array(TRIALS).fill(i))));
    setTrials([]);
    setIndex(0);
    setPhase("home");
  }

  function onHome() {
    started.current = performance.now();
    setDir(Math.random() < 0.5 ? 1 : -1);
    setPhase("target");
  }

  function onStageClick(e: React.MouseEvent) {
    if (phase !== "target" || !cond) return;
    const target = (e.target as HTMLElement).closest("[data-target]");
    const mt = (performance.now() - started.current) / 1000;
    setTrials((t) => [...t, { cond: order[index], mt, hit: Boolean(target) }]);
    setIndex((i) => i + 1);
    setPhase("home");
  }

  const results = useMemo(() => {
    const rows = CONDITIONS.map((c, i) => {
      const hits = trials.filter((t) => t.cond === i && t.hit);
      // drop the first hit of each condition as warm-up when we have enough
      const used = hits.length > 2 ? hits.slice(1) : hits;
      const mean = used.length ? used.reduce((s, t) => s + t.mt, 0) / used.length : NaN;
      const errors = trials.filter((t) => t.cond === i && !t.hit).length;
      return { ...c, id: fittsId(c.D, c.W), mean, n: used.length, errors };
    });
    const valid = rows.filter((r) => Number.isFinite(r.mean));
    const fit = valid.length >= 3 ? linearFit(valid.map((r) => r.id), valid.map((r) => r.mean)) : undefined;
    return { rows, fit };
  }, [trials]);

  useEffect(() => {
    if (done && results.fit) actions.recordLabRun("fitts-lab", `a = ${results.fit.intercept.toFixed(3)} s, b = ${results.fit.slope.toFixed(3)} s/bit, R² = ${results.fit.r2.toFixed(2)}`);
  }, [done, results.fit]);

  const homeX = cond ? (dir === 1 ? 0.5 * (REF_WIDTH - cond.D) : 0.5 * (REF_WIDTH + cond.D)) * scale : 0;
  const targetX = cond ? homeX + dir * cond.D * scale : 0;

  return (
    <div className="space-y-8">
      <div className="rounded-sm border border-rule bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
          <p className="text-sm text-ink-2" aria-live="polite">
            {!running && !done && `${CONDITIONS.length} conditions × ${TRIALS} trials. Click the dot, then the bar as quickly and accurately as you can.`}
            {running && `Trial ${index + 1} of ${order.length} · ${phase === "home" ? "click the dot" : "click the bar"}`}
            {done && "Finished — results below."}
          </p>
          <button type="button" onClick={begin} className="h-9 rounded-sm bg-accent px-4 text-sm font-medium text-surface hover:bg-accent-ink">
            {running ? "Restart" : done ? "Run again" : "Start experiment"}
          </button>
        </div>
        <div ref={stage} onClick={onStageClick} className="relative h-64 select-none overflow-hidden bg-soft" aria-label="Pointing area" role="application">
          {running && cond && phase === "home" && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onHome();
              }}
              aria-label="Start trial"
              className="absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-paper"
              style={{ left: 12 + homeX }}
            />
          )}
          {running && cond && phase === "target" && (
            <div data-target className="absolute inset-y-6 -translate-x-1/2 bg-accent" style={{ left: 12 + targetX, width: Math.max(4, cond.W * scale) }} />
          )}
          {!running && <p className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm text-ink-3">Use a mouse or trackpad for consistent results. Touch works, but finger contact adds imprecision.</p>}
        </div>
      </div>

      {trials.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="label">Your data</p>
            <table className="mt-3 w-full text-sm">
              <caption className="sr-only">Mean movement time per condition</caption>
              <thead>
                <tr className="border-b border-rule-strong text-left text-ink-3">
                  <th className="py-1.5 font-medium">D</th>
                  <th className="font-medium">W</th>
                  <th className="font-medium">ID (bits)</th>
                  <th className="font-medium">Mean MT</th>
                  <th className="font-medium">Misses</th>
                </tr>
              </thead>
              <tbody className="formula tabular">
                {results.rows.map((r) => (
                  <tr key={`${r.D}-${r.W}`} className="border-b border-rule">
                    <td className="py-1.5">{r.D}</td>
                    <td>{r.W}</td>
                    <td>{r.id.toFixed(2)}</td>
                    <td>{Number.isFinite(r.mean) ? `${(r.mean * 1000).toFixed(0)} ms` : "—"}</td>
                    <td>{r.errors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {results.fit && (
              <dl className="mt-5 grid grid-cols-3 gap-4">
                <div>
                  <dt className="label">a (intercept)</dt>
                  <dd className="formula text-lg">{results.fit.intercept.toFixed(3)} s</dd>
                </div>
                <div>
                  <dt className="label">b (slope)</dt>
                  <dd className="formula text-lg">{results.fit.slope.toFixed(3)} s/bit</dd>
                </div>
                <div>
                  <dt className="label">R²</dt>
                  <dd className="formula text-lg">{results.fit.r2.toFixed(2)}</dd>
                </div>
              </dl>
            )}
          </div>
          <div>
            <p className="label">Movement time against index of difficulty</p>
            <div className="mt-3">
              <ScatterFit
                title={`Scatter of mean movement time against index of difficulty${results.fit ? `, fitted line slope ${results.fit.slope.toFixed(3)}` : ""}. Values listed in the table.`}
                points={results.rows.filter((r) => Number.isFinite(r.mean)).map((r) => ({ x: r.id, y: r.mean }))}
                fit={results.fit}
                xLabel="ID = log₂(D/W + 1)  (bits)"
                yLabel="Mean MT (s)"
              />
            </div>
            {done && results.fit && (
              <p className="mt-3 text-sm text-ink-2">
                {results.fit.r2 > 0.8
                  ? "A strong linear fit — your data follow Fitts's law closely."
                  : "A weaker fit than published studies report — likely from few trials, learning effects, or inconsistent effort. Run it again."}{" "}
                These constants describe you, on this device, today — not users in general.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
