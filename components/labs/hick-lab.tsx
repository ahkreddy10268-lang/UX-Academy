"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { linearFit, log2 } from "@/lib/formulas/math";
import { actions } from "@/lib/store/store";
import { ScatterFit } from "./charts";

const KEYS = ["a", "s", "d", "f", "j", "k", "l", ";"];
const SETS: Record<number, number[]> = { 1: [3], 2: [3, 4], 4: [2, 3, 4, 5], 8: [0, 1, 2, 3, 4, 5, 6, 7] };
const BLOCK = [1, 2, 4, 8];
const TRIALS = 10;

type Result = { n: number; rt: number; correct: boolean };

export function HickLab() {
  const [block, setBlock] = useState(-1);
  const [trial, setTrial] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [message, setMessage] = useState("");
  const shownAt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const n = block >= 0 && block < BLOCK.length ? BLOCK[block] : 0;
  const done = block >= BLOCK.length;

  const schedule = useCallback((count: number) => {
    setLit(null);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const options = SETS[count];
      setLit(options[Math.floor(Math.random() * options.length)]);
      shownAt.current = performance.now();
    }, 700 + Math.random() * 900);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!n) return;
    const onKey = (e: KeyboardEvent) => {
      const k = KEYS.indexOf(e.key.toLowerCase());
      if (k < 0) return;
      e.preventDefault();
      if (lit === null) {
        setMessage("Too early — wait for a box to light.");
        return;
      }
      const rt = (performance.now() - shownAt.current) / 1000;
      const correct = k === lit;
      setMessage(correct ? "" : `Wrong key — that was “${KEYS[lit]}”.`);
      setResults((r) => [...r, { n, rt, correct }]);
      if (trial + 1 >= TRIALS) {
        setTrial(0);
        setBlock((b) => b + 1);
        setLit(null);
        if (block + 1 < BLOCK.length) schedule(BLOCK[block + 1]);
      } else {
        setTrial((t) => t + 1);
        schedule(n);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, lit, trial, block, schedule]);

  function start() {
    setResults([]);
    setBlock(0);
    setTrial(0);
    setMessage("");
    schedule(BLOCK[0]);
  }

  const summary = useMemo(() => {
    const rows = BLOCK.map((count) => {
      const rs = results.filter((r) => r.n === count && r.correct).slice(1); // first trial = warm-up
      const mean = rs.length ? rs.reduce((s, r) => s + r.rt, 0) / rs.length : NaN;
      const errors = results.filter((r) => r.n === count && !r.correct).length;
      return { n: count, H: log2(count), mean, errors };
    });
    const valid = rows.filter((r) => Number.isFinite(r.mean));
    return { rows, fit: valid.length >= 3 ? linearFit(valid.map((r) => r.H), valid.map((r) => r.mean)) : undefined };
  }, [results]);

  useEffect(() => {
    if (done && summary.fit) actions.recordLabRun("hick-lab", `a = ${summary.fit.intercept.toFixed(3)} s, b = ${summary.fit.slope.toFixed(3)} s/bit, R² = ${summary.fit.r2.toFixed(2)}`);
  }, [done, summary.fit]);

  const visible = n ? SETS[n] : [];

  return (
    <div className="space-y-8">
      <div className="rounded-sm border border-rule bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
          <p className="text-sm text-ink-2" aria-live="polite">
            {block < 0 && "Rest your fingers on A S D F and J K L ;. When a box lights, press its key."}
            {n > 0 && `Block ${block + 1} of ${BLOCK.length}: ${n} ${n === 1 ? "alternative" : "alternatives"} · trial ${trial + 1} of ${TRIALS}`}
            {done && "Finished — results below."}
          </p>
          <button type="button" onClick={start} className="btn btn-primary">
            {block < 0 ? "Start" : "Restart"}
          </button>
        </div>
        <div className="flex h-48 items-center justify-center gap-2 px-4" role="application" aria-label="Choice reaction area">
          {KEYS.map((k, i) => {
            const on = visible.includes(i);
            return (
              <div
                key={k}
                className={`flex h-16 w-10 items-end justify-center rounded-xs border pb-1 text-xs sm:w-14 ${!on ? "border-transparent text-transparent" : lit === i ? "border-accent bg-accent text-paper" : "border-line-control text-ink-3"}`}
                aria-hidden
              >
                {k.toUpperCase()}
              </div>
            );
          })}
        </div>
        <p className="min-h-6 px-5 pb-3 text-sm text-accent-ink" aria-live="assertive">
          {message}
        </p>
      </div>

      {results.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <table className="w-full text-sm">
              <caption className="label pb-2 text-left">Your data</caption>
              <thead>
                <tr className="border-b border-rule-strong text-left text-ink-3">
                  <th className="py-1.5 font-medium">n</th>
                  <th className="font-medium">H = log₂ n</th>
                  <th className="font-medium">Mean RT</th>
                  <th className="font-medium">Errors</th>
                </tr>
              </thead>
              <tbody className="formula tabular">
                {summary.rows.map((r) => (
                  <tr key={r.n} className="border-b border-rule">
                    <td className="py-1.5">{r.n}</td>
                    <td>{r.H.toFixed(0)} bits</td>
                    <td>{Number.isFinite(r.mean) ? `${(r.mean * 1000).toFixed(0)} ms` : "—"}</td>
                    <td>{r.errors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {summary.fit && (
              <p className="formula mt-4 text-sm">
                RT ≈ {summary.fit.intercept.toFixed(3)} + {summary.fit.slope.toFixed(3)} × H s · R² {summary.fit.r2.toFixed(2)}
              </p>
            )}
          </div>
          <ScatterFit
            title="Mean reaction time against information in bits; values in the adjacent table."
            points={summary.rows.filter((r) => Number.isFinite(r.mean)).map((r) => ({ x: r.H, y: r.mean }))}
            fit={summary.fit}
            xLabel="Information H (bits)"
            yLabel="Mean RT (s)"
          />
        </div>
      )}
      {done && (
        <p className="text-sm text-ink-2">
          If speed and accuracy traded off — faster blocks with more errors — the slope underestimates true decision cost. Notice also how much of the time is the
          intercept: perception and response that do not depend on the number of choices.
        </p>
      )}
    </div>
  );
}
