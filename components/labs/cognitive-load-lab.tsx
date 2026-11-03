"use client";

import { useRef, useState } from "react";
import { actions } from "@/lib/store/store";

/**
 * The same decision presented in a dense layout (extraneous load: scattered,
 * inconsistent, irrelevant detail) and a structured layout (aligned, relevant
 * attributes only). Two isomorphic data sets are used so the second trial is
 * not simply a memory of the first; layout order is randomised.
 */
type Plan = { name: string; price: number; offline: boolean; seats: number; support: string; storage: number; note: string };

const SET_A: Plan[] = [
  { name: "Harbour", price: 18, offline: false, seats: 5, support: "Email", storage: 100, note: "Popular with agencies" },
  { name: "Meridian", price: 24, offline: true, seats: 10, support: "Chat", storage: 250, note: "Includes onboarding call" },
  { name: "Quill", price: 15, offline: true, seats: 3, support: "Email", storage: 50, note: "Annual billing only" },
  { name: "Lantern", price: 12, offline: false, seats: 2, support: "Forum", storage: 20, note: "No admin console" },
  { name: "Atlas", price: 30, offline: true, seats: 25, support: "Phone", storage: 1000, note: "Volume discounts" },
  { name: "Fjord", price: 21, offline: true, seats: 8, support: "Chat", storage: 200, note: "EU data residency" },
];
const SET_B: Plan[] = [
  { name: "Cedar", price: 19, offline: false, seats: 5, support: "Email", storage: 100, note: "Popular with studios" },
  { name: "Orbit", price: 25, offline: true, seats: 10, support: "Chat", storage: 250, note: "Includes training" },
  { name: "Sable", price: 16, offline: true, seats: 3, support: "Email", storage: 50, note: "Monthly billing" },
  { name: "Pebble", price: 11, offline: false, seats: 2, support: "Forum", storage: 20, note: "No SSO" },
  { name: "Summit", price: 32, offline: true, seats: 25, support: "Phone", storage: 1000, note: "Custom contracts" },
  { name: "Delta", price: 22, offline: true, seats: 8, support: "Chat", storage: 200, note: "US data residency" },
];
const QUESTION = "Which is the cheapest plan that works offline and allows at least 5 seats?";
const answerOf = (ps: Plan[]) => ps.filter((p) => p.offline && p.seats >= 5).sort((a, b) => a.price - b.price)[0].name;

type Layout = "dense" | "structured";
type Run = { layout: Layout; seconds: number; correct: boolean };

export function CognitiveLoadLab() {
  const [plan, setPlan] = useState<{ layout: Layout; data: Plan[] }[]>([]);
  const [step, setStep] = useState(-1);
  const [runs, setRuns] = useState<Run[]>([]);
  const t0 = useRef(0);

  function start() {
    const denseFirst = Math.random() < 0.5;
    const dataFirst = Math.random() < 0.5 ? SET_A : SET_B;
    const dataSecond = dataFirst === SET_A ? SET_B : SET_A;
    setPlan([
      { layout: denseFirst ? "dense" : "structured", data: dataFirst },
      { layout: denseFirst ? "structured" : "dense", data: dataSecond },
    ]);
    setRuns([]);
    setStep(0);
    t0.current = performance.now();
  }

  function choose(name: string) {
    const cur = plan[step];
    const run = { layout: cur.layout, seconds: (performance.now() - t0.current) / 1000, correct: name === answerOf(cur.data) };
    const next = [...runs, run];
    setRuns(next);
    if (step + 1 < plan.length) {
      setStep(step + 1);
      t0.current = performance.now();
    } else {
      setStep(plan.length);
      const d = next.find((r) => r.layout === "dense")!;
      const s = next.find((r) => r.layout === "structured")!;
      actions.recordLabRun("cognitive-load-lab", `dense ${d.seconds.toFixed(1)} s${d.correct ? "" : " (wrong)"} · structured ${s.seconds.toFixed(1)} s${s.correct ? "" : " (wrong)"}`);
    }
  }

  const cur = step >= 0 && step < plan.length ? plan[step] : undefined;

  return (
    <div className="space-y-6">
      <div className="rounded-sm border border-rule bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
          <p className="text-sm text-ink-2">{cur ? `Layout ${step + 1} of 2 — ${QUESTION}` : step < 0 ? "You will answer the same question in two layouts. The order is randomised." : "Done."}</p>
          <button type="button" onClick={start} className="h-9 rounded-sm bg-ink px-4 text-sm font-medium text-paper">
            {step < 0 ? "Start" : "Run again"}
          </button>
        </div>
        <div className="p-5">
          {cur?.layout === "dense" && <Dense plans={cur.data} onChoose={choose} />}
          {cur?.layout === "structured" && <Structured plans={cur.data} onChoose={choose} />}
          {step === plan.length && plan.length > 0 && (
            <table className="w-full max-w-md text-sm">
              <caption className="label pb-2 text-left">Your result</caption>
              <thead>
                <tr className="border-b border-rule-strong text-left text-ink-3">
                  <th className="py-1.5 font-medium">Layout</th>
                  <th className="font-medium">Time</th>
                  <th className="font-medium">Answer</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((r) => (
                  <tr key={r.layout} className="border-b border-rule">
                    <td className="py-1.5 capitalize">{r.layout}</td>
                    <td className="formula tabular">{r.seconds.toFixed(1)} s</td>
                    <td className={r.correct ? "text-ok" : "text-accent-ink"}>{r.correct ? "Correct" : "Incorrect"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <p className="text-sm text-ink-2">
        Both layouts contain identical information. The dense version scatters the two attributes the task needs among irrelevant ones, forcing you to search and hold values in working
        memory — extraneous load in Cognitive Load Theory&apos;s terms. One comparison is an anecdote, not evidence: run it several times, and expect learning effects.
      </p>
    </div>
  );
}

function Dense({ plans, onChoose }: { plans: Plan[]; onChoose: (n: string) => void }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {plans.map((p) => (
        <p key={p.name}>
          <button type="button" onClick={() => onChoose(p.name)} className="font-semibold underline">
            {p.name}
          </button>{" "}
          — {p.note.toLowerCase()}; {p.storage} GB storage, {p.support.toLowerCase()} support. {p.offline ? "Offline mode included" : "Requires connection"}, from ${p.price}/user/mo,{" "}
          {p.seats === 2 ? "two" : p.seats} seats max.
        </p>
      ))}
      <p className="text-xs text-ink-3">Select a plan name to answer.</p>
    </div>
  );
}

function Structured({ plans, onChoose }: { plans: Plan[]; onChoose: (n: string) => void }) {
  return (
    <table className="w-full text-sm">
      <caption className="sr-only">Plans compared by price, offline support and seats</caption>
      <thead>
        <tr className="border-b border-rule-strong text-left text-ink-3">
          <th className="py-2 font-medium">Plan</th>
          <th className="font-medium">Price / user</th>
          <th className="font-medium">Works offline</th>
          <th className="font-medium">Seats</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {[...plans]
          .sort((a, b) => a.price - b.price)
          .map((p) => (
            <tr key={p.name} className="border-b border-rule">
              <td className="py-2 font-medium">{p.name}</td>
              <td className="formula tabular">${p.price}</td>
              <td>{p.offline ? "Yes" : "No"}</td>
              <td className="formula tabular">{p.seats}</td>
              <td className="text-right">
                <button type="button" onClick={() => onChoose(p.name)} className="h-8 rounded-xs border border-rule px-2.5 text-sm hover:border-ink-3">
                  Choose
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
