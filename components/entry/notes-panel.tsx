"use client";

import { useEffect, useId, useState } from "react";
import { actions, useLearner } from "@/lib/store/store";

export function NotesPanel({ slug, title }: { slug: string; title: string }) {
  const saved = useLearner((s) => s.notes[slug]);
  // null = not editing; show what is stored.
  const [draft, setDraft] = useState<string | null>(null);
  const id = useId();
  const text = draft ?? saved?.text ?? "";

  // Autosave after a pause in typing.
  useEffect(() => {
    if (draft === null) return;
    const t = setTimeout(() => {
      actions.saveNote(slug, draft);
      setDraft(null);
    }, 600);
    return () => clearTimeout(t);
  }, [draft, slug]);

  return (
    <div>
      <label htmlFor={id} className="label">
        My notes on {title}
      </label>
      <textarea
        id={id}
        value={text}
        onChange={(e) => setDraft(e.target.value)}
        rows={6}
        placeholder="Write in your own words — what it means, where you would use it, questions to follow up."
        className="mt-2 w-full resize-y rounded-sm border border-line-control bg-surface px-3 py-2 font-serif text-base leading-relaxed text-ink placeholder:text-ink-3"
      />
      <p className="mt-1 text-xs text-ink-3" aria-live="polite">
        {draft !== null ? "Saving…" : saved ? `Saved ${new Date(saved.updatedAt).toLocaleString()} · stored only in this browser` : "Notes are stored only in this browser. Export them from My learning."}
      </p>
    </div>
  );
}
