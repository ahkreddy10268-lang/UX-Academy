"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { actions, isDue, LEITNER_INTERVALS, useLearner } from "@/lib/store/store";

type Card = { id: string; front: string; back: string; entry: string; entryTitle: string };

export function FlashcardReview({ cards }: { cards: Card[] }) {
  const deck = useLearner((s) => s.cards);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const due = Object.entries(deck)
    .filter(([id, c]) => isDue(c) && byId.has(id))
    .sort(([, a], [, b]) => a.box - b.box || a.due.localeCompare(b.due))
    .map(([id]) => byId.get(id)!);
  const inDeck = Object.keys(deck).filter((id) => byId.has(id)).length;
  const boxes = LEITNER_INTERVALS.map((_, i) => Object.values(deck).filter((c) => c.box === i + 1).length);
  const entriesNotAdded = [...new Map(cards.filter((c) => !deck[c.id]).map((c) => [c.entry, c.entryTitle])).entries()];
  const current = due[0];

  return (
    <div className="space-y-10">
      {inDeck === 0 ? (
        <div className="rounded-sm border border-dashed border-rule-strong p-8 text-center">
          <p className="font-medium">Your review deck is empty.</p>
          <p className="mt-1 text-sm text-ink-2">Add cards from any entry with “Add flashcards”, or add everything below.</p>
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={() => actions.addCards(cards.map((c) => ({ id: c.id, entry: c.entry })))}
          >
            Add all {cards.length} cards
          </button>
        </div>
      ) : current ? (
        <div className="rounded-sm border border-rule bg-surface">
          <div className="flex items-center justify-between border-b border-rule px-5 py-3 text-sm">
            <span className="label">
              {due.length} due · box {deck[current.id].box}
            </span>
            <Link href={`/library/${current.entry}`} className="text-ink-3 hover:text-ink">
              {current.entryTitle}
            </Link>
          </div>
          <div className="px-6 py-10 text-center">
            <p className="display text-2xl">{current.front}</p>
            {revealed && <p className="prose-read mx-auto mt-6 max-w-read border-t border-rule pt-6 text-ink-2">{current.back}</p>}
          </div>
          <div className="flex flex-wrap justify-center gap-3 border-t border-rule px-5 py-4" aria-live="polite">
            {!revealed ? (
              <button type="button" onClick={() => setRevealed(true)} className="btn btn-primary">
                Show answer
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    actions.reviewCard(current.id, false);
                    setRevealed(false);
                    setReviewed((n) => n + 1);
                  }}
                  className="btn btn-secondary"
                >
                  Didn&apos;t remember · tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => {
                    actions.reviewCard(current.id, true);
                    setRevealed(false);
                    setReviewed((n) => n + 1);
                  }}
                  className="btn btn-primary"
                >
                  Remembered · in {LEITNER_INTERVALS[Math.min(4, deck[current.id].box)]} days
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-sm border border-rule p-8 text-center">
          <p className="display text-xl">Nothing due today.</p>
          <p className="mt-1 text-sm text-ink-2">{reviewed ? `You reviewed ${reviewed} cards this session. ` : ""}Come back tomorrow — spacing is the point.</p>
        </div>
      )}

      {inDeck > 0 && (
        <div>
          <p className="label">Your deck by box</p>
          <ol className="mt-3 grid grid-cols-5 gap-2 text-center">
            {boxes.map((n, i) => (
              <li key={i} className="rounded-sm border border-rule py-3">
                <span className="formula block text-xl">{n}</span>
                <span className="text-xs text-ink-3">
                  Box {i + 1} · {LEITNER_INTERVALS[i]}d
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {inDeck > 0 && entriesNotAdded.length > 0 && (
        <details>
          <summary className="cursor-pointer text-sm font-medium">Add cards from more entries ({entriesNotAdded.length})</summary>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {entriesNotAdded.map(([slug, title]) => (
              <li key={slug}>
                <button type="button" className="text-left text-sm text-accent-ink underline" onClick={() => actions.addCards(cards.filter((c) => c.entry === slug).map((c) => ({ id: c.id, entry: slug })))}>
                  + {title}
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
