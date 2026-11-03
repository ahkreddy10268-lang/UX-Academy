"use client";

import Link from "next/link";
import { isDue, useLearner } from "@/lib/store/store";

export function PracticeStats({ totalCards }: { totalCards: number }) {
  const cards = useLearner((s) => s.cards);
  const quiz = useLearner((s) => s.quiz);
  const deck = Object.values(cards);
  const due = deck.filter(isDue).length;
  const answered = Object.values(quiz);
  const lastCorrect = answered.filter((q) => q.lastCorrect).length;
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 [&>div]:rounded-lg [&>div]:border [&>div]:border-rule [&>div]:bg-soft [&>div]:p-4">
      <div>
        <dt className="label">Cards due today</dt>
        <dd className="t-page tabular mt-1 text-3xl">{due}</dd>
        {due > 0 && (
          <dd className="mt-1 text-sm">
            <Link className="link" href="/practice/flashcards">
              Review now
            </Link>
          </dd>
        )}
      </div>
      <div>
        <dt className="label">In your deck</dt>
        <dd className="t-page tabular mt-1 text-3xl">
          {deck.length}
          <span className="text-base text-ink-3"> / {totalCards}</span>
        </dd>
      </div>
      <div>
        <dt className="label">Questions answered</dt>
        <dd className="t-page tabular mt-1 text-3xl">{answered.length}</dd>
      </div>
      <div>
        <dt className="label">Correct on last attempt</dt>
        <dd className="t-page tabular mt-1 text-3xl">{answered.length ? `${Math.round((lastCorrect / answered.length) * 100)}%` : "—"}</dd>
      </div>
    </dl>
  );
}
