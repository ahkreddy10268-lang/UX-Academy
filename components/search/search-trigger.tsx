"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { KIND_LABEL, TYPE_LABEL } from "@/lib/content/labels";
import { prefetchSearch, snippet, useSearch } from "./use-search";

export function SearchTrigger() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={prefetchSearch}
        onFocus={prefetchSearch}
        className="inline-flex h-9 items-center gap-3 rounded-sm border border-rule bg-surface px-3 text-sm text-ink-3 hover:border-rule-strong hover:text-ink-2"
        aria-haspopup="dialog"
      >
        <span className="text-ink-2">Search</span>
        <kbd className="hidden rounded-xs border border-rule px-1.5 font-mono text-[11px] leading-5 text-ink-3 md:inline">⌘K</kbd>
      </button>
      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && setOpen(false)}
        aria-label="Search UX Academy"
        className="m-0 mx-auto mt-[8vh] w-[min(44rem,calc(100vw-2rem))] max-w-none rounded-md border border-rule bg-surface p-0 text-ink shadow-raise backdrop:bg-ink/30"
      >
        {open && <SearchPanel onDone={() => setOpen(false)} />}
      </dialog>
    </>
  );
}

function SearchPanel({ onDone }: { onDone: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { status, hits, error } = useSearch(query);
  const router = useRouter();
  const listId = useId();
  const shown = hits.slice(0, 12);

  function go(href: string) {
    onDone();
    router.push(href);
  }

  return (
    <div className="flex max-h-[76vh] flex-col">
      <div className="flex items-center gap-3 border-b border-rule px-4">
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search concepts, formulas, methods and terms
        </label>
        <input
          id={`${listId}-input`}
          autoFocus
          role="combobox"
          aria-expanded={shown.length > 0}
          aria-controls={listId}
          aria-activedescendant={shown[active] ? `${listId}-${active}` : undefined}
          aria-autocomplete="list"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(shown.length - 1, a + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(0, a - 1));
            } else if (e.key === "Enter" && shown[active]) {
              e.preventDefault();
              go(shown[active].href);
            } else if (e.key === "Enter" && query.trim()) {
              go(`/library?q=${encodeURIComponent(query.trim())}`);
            }
          }}
          placeholder="Search — e.g. Fitts, cognitive load, SUS, contrast"
          className="h-14 flex-1 bg-transparent text-lg outline-none placeholder:text-ink-3"
        />
        <button type="button" onClick={onDone} className="text-sm text-ink-3 hover:text-ink">
          Esc
        </button>
      </div>
      <div className="overflow-y-auto" aria-live="polite">
        {status === "error" && <p className="px-4 py-6 text-sm text-ink-2">The search index could not be loaded. {error}</p>}
        {status === "ready" && query.trim() && shown.length === 0 && (
          <p className="px-4 py-6 text-sm text-ink-2">
            No matches for “{query}”. Try a broader term, or browse the{" "}
            <Link className="link" href="/topics" onClick={onDone}>
              subject index
            </Link>
            .
          </p>
        )}
        {!query.trim() && (
          <div className="px-4 py-5 text-sm text-ink-2">
            <p>Search titles, alternative names, definitions and full article text.</p>
            <p className="mt-2 text-ink-3">↑ ↓ to move · Enter to open · Enter on no selection searches the library</p>
          </div>
        )}
        {shown.length > 0 && (
          <ul id={listId} role="listbox" aria-label="Results" className="py-2">
            {shown.map((h, i) => (
              <li
                key={h.id}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(h.href)}
                className={`cursor-pointer px-4 py-2.5 ${i === active ? "bg-sunken" : ""}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-medium ${h.kind === "planned" ? "text-ink-2" : "text-ink"}`}>{h.title}</span>
                  <span className="label shrink-0">
                    {h.kind === "entry" || h.kind === "planned" ? TYPE_LABEL[h.type as keyof typeof TYPE_LABEL] : KIND_LABEL[h.kind]}
                    {h.kind === "planned" && " · planned"}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-sm text-ink-3">
                  <span className="text-ink-2">{h.context}</span> — {snippet(h, h.terms, 140)}
                </p>
              </li>
            ))}
          </ul>
        )}
        {hits.length > shown.length && (
          <button
            type="button"
            onClick={() => go(`/library?q=${encodeURIComponent(query.trim())}`)}
            className="w-full border-t border-rule px-4 py-3 text-left text-sm text-accent-ink hover:bg-sunken"
          >
            See all {hits.length} results in the library →
          </button>
        )}
      </div>
    </div>
  );
}
