"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { KIND_LABEL, TYPE_LABEL } from "@/lib/content/labels";
import { prefetchSearch, useSearch } from "./use-search";

const SUGGESTIONS = ["Fitts's law", "cognitive load", "SUS", "contrast ratio", "card sorting", "confidence interval"];

/** Large inline search with a results listbox (combobox pattern). */
export function HeroSearch({ placeholder = "Search 45 concepts, formulas and methods…" }: { placeholder?: string }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const { status, hits } = useSearch(q);
  const router = useRouter();
  const id = useId();
  const shown = hits.slice(0, 6);
  const open = q.trim().length > 0;

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (shown[active]) router.push(shown[active].href);
          else if (q.trim()) router.push(`/library?q=${encodeURIComponent(q.trim())}`);
        }}
      >
        <label htmlFor={`${id}-q`} className="sr-only">
          Search the academy
        </label>
        <div className="flex items-center rounded-sm border border-line-control bg-surface shadow-raise focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus)]">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="ml-4 shrink-0 text-ink-3">
            <circle cx="7.5" cy="7.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 12l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <input
            id={`${id}-q`}
            role="combobox"
            aria-expanded={open && shown.length > 0}
            aria-controls={`${id}-list`}
            aria-activedescendant={open && shown[active] ? `${id}-${active}` : undefined}
            aria-autocomplete="list"
            value={q}
            onFocus={prefetchSearch}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(shown.length - 1, a + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === "Escape") setQ("");
            }}
            placeholder={placeholder}
            autoComplete="off"
            className="h-14 min-w-0 flex-1 bg-transparent px-3 text-lg outline-none placeholder:text-ink-3"
          />
          <button className="mr-2 h-10 rounded-xs bg-ink px-4 text-sm font-medium text-paper hover:bg-ink-2">Search</button>
        </div>
      </form>
      {open && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-sm border border-rule bg-surface shadow-raise" aria-live="polite">
          {status === "loading" && shown.length === 0 && <p className="px-4 py-3 text-sm text-ink-3">Searching…</p>}
          {status === "ready" && shown.length === 0 && <p className="px-4 py-3 text-sm text-ink-2">No matches. Try a broader term.</p>}
          {shown.length > 0 && (
            <ul id={`${id}-list`} role="listbox" aria-label="Suggestions">
              {shown.map((h, i) => (
                <li key={h.id} id={`${id}-${i}`} role="option" aria-selected={i === active} onMouseEnter={() => setActive(i)} onMouseDown={(e) => e.preventDefault()} onClick={() => router.push(h.href)} className={`flex cursor-pointer items-baseline justify-between gap-3 px-4 py-2.5 ${i === active ? "bg-sunken" : ""}`}>
                  <span className={h.kind === "planned" ? "text-ink-2" : "font-medium text-ink"}>{h.title}</span>
                  <span className="label shrink-0">{h.kind === "entry" || h.kind === "planned" ? `${TYPE_LABEL[h.type as keyof typeof TYPE_LABEL]}${h.kind === "planned" ? " · planned" : ""}` : KIND_LABEL[h.kind]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3">
        <span>Try</span>
        {SUGGESTIONS.map((s) => (
          <Link key={s} href={`/library?q=${encodeURIComponent(s)}`} className="text-ink-2 underline decoration-rule-strong underline-offset-4 hover:text-ink hover:decoration-ink-3">
            {s}
          </Link>
        ))}
      </p>
    </div>
  );
}
