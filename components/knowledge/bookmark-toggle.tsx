"use client";

import { actions, useLearner } from "@/lib/store/store";

/** Compact save control for cards. Sits outside the card link (no nested interactive elements). */
export function BookmarkToggle({ slug, title }: { slug: string; title: string }) {
  const saved = useLearner((s) => Boolean(s.bookmarks[slug]));
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      title={saved ? "Saved" : "Save"}
      onClick={() => actions.toggleBookmark(slug)}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xs border transition-colors ${saved ? "border-accent/50 bg-accent-wash text-accent-ink" : "border-transparent text-ink-3 hover:border-rule hover:text-ink"}`}
    >
      <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden>
        <path d="M1 1h10v12L6 9.5 1 13z" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
