"use client";

import { useState } from "react";
import { actions, useLearner } from "@/lib/store/store";

export function WorkshopResponse({ id }: { id: string }) {
  const saved = useLearner((s) => s.workshops[id]);
  const [draft, setDraft] = useState<string | null>(null);
  const text = draft ?? saved?.response ?? "";

  function save(status: "started" | "submitted") {
    actions.saveWorkshop(id, text, status);
    setDraft(null);
  }

  return (
    <div>
      <label htmlFor={`ws-${id}`} className="sr-only">
        Your workshop response
      </label>
      <textarea
        id={`ws-${id}`}
        rows={12}
        value={text}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Work through the tasks here, or note where your deliverable lives (a Figma link, a document)."
        className="w-full rounded-sm border border-line-control bg-surface px-4 py-3 font-serif text-base leading-relaxed"
      />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => save("started")} className="h-10 rounded-sm border border-rule px-4 text-sm font-medium hover:border-rule-strong">
          Save draft
        </button>
        <button type="button" onClick={() => save("submitted")} className="h-10 rounded-sm bg-ink px-4 text-sm font-medium text-paper">
          Mark as complete
        </button>
        <span className="text-sm text-ink-3" role="status">
          {draft !== null ? "Unsaved changes" : saved ? `${saved.status === "submitted" ? "Completed" : "Draft saved"} · ${new Date(saved.updatedAt).toLocaleString()}` : "Saved only in this browser."}
        </span>
      </div>
      <p className="mt-3 text-sm text-ink-3">Self-assess against the criteria above before marking complete — there is no automated grading of open design work.</p>
    </div>
  );
}
