"use client";

import { useEffect, useState } from "react";
import { actions, useLearner } from "@/lib/store/store";

type Props = { slug: string; cards: { id: string }[] };

export function EntryActions({ slug, cards }: Props) {
  const bookmarked = useLearner((s) => Boolean(s.bookmarks[slug]));
  const completed = useLearner((s) => Boolean(s.progress[slug]?.completedAt));
  const cardsAdded = useLearner((s) => cards.length > 0 && cards.every((c) => s.cards[c.id]));

  useEffect(() => actions.visit(slug), [slug]);

  const btn = "inline-flex h-9 items-center gap-2 rounded-sm border px-3 text-sm font-medium transition-colors";
  const off = "border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink";
  const on = "border-accent/50 bg-accent-wash text-accent-ink";

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" aria-pressed={bookmarked} onClick={() => actions.toggleBookmark(slug)} className={`${btn} ${bookmarked ? on : off}`}>
        <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden>
          <path d="M1 1h10v12L6 9.5 1 13z" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        {bookmarked ? "Saved" : "Save"}
      </button>
      <button type="button" aria-pressed={completed} onClick={() => actions.setComplete(slug, !completed)} className={`${btn} ${completed ? on : off}`}>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
          {completed && <path d="M4 7.2l2 2 4-4.4" fill="none" stroke="currentColor" strokeWidth="1.6" />}
        </svg>
        {completed ? "Completed" : "Mark complete"}
      </button>
      {cards.length > 0 && (
        <button
          type="button"
          aria-pressed={cardsAdded}
          onClick={() => (cardsAdded ? actions.removeCards(cards.map((c) => c.id)) : actions.addCards(cards.map((c) => ({ id: c.id, entry: slug }))))}
          className={`${btn} ${cardsAdded ? on : off}`}
        >
          {cardsAdded ? `${cards.length} cards in review deck` : `Add ${cards.length} flashcards`}
        </button>
      )}
      <CollectionMenu slug={slug} />
    </div>
  );
}

function CollectionMenu({ slug }: { slug: string }) {
  const collections = useLearner((s) => s.collections);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const list = Object.entries(collections);
  const count = list.filter(([, c]) => c.slugs.includes(slug)).length;

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-9 items-center gap-2 rounded-sm border border-rule bg-surface px-3 text-sm font-medium text-ink-2 hover:border-rule-strong hover:text-ink"
      >
        Collections{count > 0 ? ` (${count})` : ""}
      </button>
      {open && (
        <div className="absolute left-0 top-11 z-20 w-72 rounded-sm border border-rule bg-surface p-3 shadow-raise">
          <p className="label">Add to research collection</p>
          {list.length === 0 && <p className="mt-2 text-sm text-ink-3">No collections yet.</p>}
          <ul className="mt-2 space-y-1">
            {list.map(([id, c]) => (
              <li key={id}>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={c.slugs.includes(slug)} onChange={() => actions.toggleInCollection(id, slug)} />
                  {c.name}
                </label>
              </li>
            ))}
          </ul>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              const id = actions.createCollection(name.trim());
              actions.toggleInCollection(id, slug);
              setName("");
            }}
          >
            <label htmlFor="new-collection" className="sr-only">
              New collection name
            </label>
            <input
              id="new-collection"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New collection"
              className="h-8 min-w-0 flex-1 rounded-xs border border-line-control bg-surface px-2 text-sm"
            />
            <button className="h-8 rounded-xs bg-accent px-2.5 text-sm font-medium text-surface">Add</button>
          </form>
        </div>
      )}
    </div>
  );
}
