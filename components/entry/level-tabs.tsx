"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { actions, useLearner, type Level } from "@/lib/store/store";

const LEVELS: { id: Level; label: string; purpose: string }[] = [
  { id: "beginner", label: "Beginner", purpose: "Understand" },
  { id: "intermediate", label: "Intermediate", purpose: "Apply" },
  { id: "advanced", label: "Advanced", purpose: "Analyse & evaluate" },
];

/**
 * Accessible tabs (WAI-ARIA APG "Tabs, manual activation is not needed": automatic activation).
 * All three panels are server-rendered; switching only toggles `hidden`, so the
 * learner's scroll position and place in the article are preserved.
 */
export function LevelTabs({ slug, panels }: { slug: string; panels: Record<Level, ReactNode> }) {
  const level = useLearner((s) => s.prefs.level);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    actions.readLevel(slug, level);
  }, [slug, level]);

  function onKey(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % LEVELS.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + LEVELS.length) % LEVELS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = LEVELS.length - 1;
    else return;
    e.preventDefault();
    actions.setLevel(LEVELS[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Explanation depth" className="flex flex-wrap gap-x-1 border-b border-rule">
        {LEVELS.map((l, i) => {
          const selected = l.id === level;
          return (
            <button
              key={l.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${l.id}`}
              aria-selected={selected}
              aria-controls={`panel-${l.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => actions.setLevel(l.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`-mb-px border-b-2 px-3 pb-2.5 pt-1 text-left transition-colors ${
                selected ? "border-accent text-ink" : "border-transparent text-ink-3 hover:text-ink-2"
              }`}
            >
              <span className="block text-sm font-semibold">{l.label}</span>
              <span className="block text-xs">{l.purpose}</span>
            </button>
          );
        })}
      </div>
      {LEVELS.map((l) => (
        <div key={l.id} role="tabpanel" id={`panel-${l.id}`} aria-labelledby={`tab-${l.id}`} hidden={l.id !== level} tabIndex={0} className="pt-6 outline-none">
          {panels[l.id]}
        </div>
      ))}
    </div>
  );
}
