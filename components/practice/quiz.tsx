"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LinkInfo } from "@/components/ui/rich";
import { Rich } from "@/components/ui/rich";
import { actions } from "@/lib/store/store";

export type QuizItem = {
  id: string;
  kind: string;
  level: string;
  prompt: string;
  options: { text: string; correct: boolean; explanation: string }[];
  explanation: string;
  revise?: string;
  entry: string;
  entryTitle?: string;
};

const KIND: Record<string, string> = {
  "multiple-choice": "Multiple choice",
  "true-false": "True or false",
  scenario: "Scenario",
  formula: "Formula",
  critique: "Critique",
};

/** A sequence of questions with immediate, explained feedback. */
export function Quiz({
  questions,
  links,
  showSource = false,
  onFinish,
}: {
  questions: QuizItem[];
  links: Record<string, LinkInfo>;
  showSource?: boolean;
  onFinish?: (score: number, total: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const ctx = useMemo(() => ({ resolve: (s: string) => links[s] }), [links]);

  if (!questions.length) return <p className="text-ink-2">No questions available yet.</p>;
  const done = results.length === questions.length && choice === null;

  if (done) {
    const score = results.filter(Boolean).length;
    const missed = questions.filter((_, i) => !results[i]);
    return (
      <div className="rounded-sm border border-rule bg-surface p-6">
        <p className="label">Result</p>
        <p className="display mt-2 text-2xl">
          {score} of {questions.length} correct
        </p>
        {missed.length > 0 ? (
          <div className="mt-4">
            <p className="text-sm text-ink-2">Recommended revision:</p>
            <ul className="mt-2 space-y-1 text-sm">
              {[...new Set(missed.map((q) => q.revise ?? q.entry))].map((slug) => (
                <li key={slug}>
                  {links[slug] ? (
                    <Link className="link" href={links[slug].href}>
                      {links[slug].title}
                    </Link>
                  ) : (
                    slug
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-3 text-sm text-ink-2">Every answer correct. Schedule a review in a few days to strengthen retention.</p>
        )}
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setResults([]);
            setChoice(null);
          }}
          className="btn btn-secondary btn-sm mt-5"
        >
          Try again
        </button>
      </div>
    );
  }

  const q = questions[index];
  const answered = choice !== null;
  const correctIndex = q.options.findIndex((o) => o.correct);

  function select(i: number) {
    if (answered) return;
    setChoice(i);
    const ok = q.options[i].correct;
    setResults((r) => [...r, ok]);
    actions.answer(q.id, q.entry, ok);
  }

  function next() {
    setChoice(null);
    if (index + 1 < questions.length) setIndex(index + 1);
    else onFinish?.(results.filter(Boolean).length, questions.length);
  }

  return (
    <div className="rounded-sm border border-rule bg-surface">
      <div className="flex items-center justify-between border-b border-rule px-5 py-3">
        <p className="label">
          Question {index + 1} of {questions.length} · {KIND[q.kind] ?? q.kind} · {q.level}
        </p>
        {showSource && links[q.entry] && (
          <Link href={links[q.entry].href} className="text-xs text-ink-3 hover:text-ink">
            {links[q.entry].title}
          </Link>
        )}
      </div>
      <fieldset className="px-5 pb-5 pt-4">
        <legend className="font-serif text-lg leading-snug text-ink [font-variation-settings:'opsz'_18]">
          <Rich text={q.prompt} ctx={ctx} />
        </legend>
        <div className="mt-4 space-y-2">
          {q.options.map((o, i) => {
            const isChoice = choice === i;
            const state = !answered ? "idle" : o.correct ? "correct" : isChoice ? "wrong" : "other";
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-disabled={answered}
                  className={`flex w-full items-start gap-3 rounded-sm border px-3 py-2.5 text-left text-base transition-colors ${
                    state === "idle"
                      ? "border-rule hover:border-ink-3 hover:bg-sunken"
                      : state === "correct"
                        ? "border-ok bg-ok-wash"
                        : state === "wrong"
                          ? "border-accent bg-accent-wash"
                          : "border-rule opacity-80"
                  }`}
                >
                  <span className="formula mt-0.5 text-sm text-ink-3">{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{o.text}</span>
                  {state === "correct" && <span className="text-sm font-medium text-ok">Correct answer</span>}
                  {state === "wrong" && <span className="text-sm font-medium text-accent-ink">Your answer</span>}
                </button>
                {answered && (isChoice || o.correct) && (
                  <p className="mt-1.5 pl-8 text-sm text-ink-2">{o.explanation}</p>
                )}
                {answered && !isChoice && !o.correct && (
                  <details className="pl-8 text-sm text-ink-3">
                    <summary className="cursor-pointer py-0.5">Why not {String.fromCharCode(65 + i)}?</summary>
                    <p className="mt-1 text-ink-2">{o.explanation}</p>
                  </details>
                )}
              </div>
            );
          })}
        </div>
        <div aria-live="polite">
          {answered && (
            <div className="mt-5 border-t border-rule pt-4">
              <p className={`font-medium ${q.options[choice!].correct ? "text-ok" : "text-accent-ink"}`}>
                {q.options[choice!].correct ? "Correct." : `Not quite — the answer is ${String.fromCharCode(65 + correctIndex)}.`}
              </p>
              <p className="mt-1 text-ink-2">
                <Rich text={q.explanation} ctx={ctx} />
              </p>
              {!q.options[choice!].correct && links[q.revise ?? q.entry] && (
                <p className="mt-2 text-sm">
                  Revise:{" "}
                  <Link className="link" href={links[q.revise ?? q.entry].href}>
                    {links[q.revise ?? q.entry].title}
                  </Link>
                </p>
              )}
              <button type="button" onClick={next} className="btn btn-primary mt-4">
                {index + 1 < questions.length ? "Next question" : "See result"}
              </button>
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
}
