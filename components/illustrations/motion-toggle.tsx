"use client";

import { useState, type ReactNode } from "react";

/**
 * Wraps an animated plate with a pause/play control (WCAG 2.2.2). Animation is
 * already disabled by CSS under prefers-reduced-motion, so the control is
 * hidden there.
 */
export function MotionFrame({ children, label }: { children: ReactNode; label: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative" data-paused={paused}>
      {children}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={`${paused ? "Play" : "Pause"} animation: ${label}`}
        className="absolute bottom-3 right-3 inline-flex h-8 items-center gap-1.5 rounded-xs border border-rule bg-surface/90 px-2.5 text-xs font-medium text-ink-2 hover:text-ink motion-reduce:hidden"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
          {paused ? <path d="M2 1 L9 5 L2 9 Z" fill="currentColor" /> : <path d="M2 1 h2 v8 h-2 z M6 1 h2 v8 h-2 z" fill="currentColor" />}
        </svg>
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
