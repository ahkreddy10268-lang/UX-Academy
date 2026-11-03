/**
 * The frame every Level-2 visual explanation renders in. It answers the five
 * questions of spec Part 07 in a fixed reading order:
 *   1 What am I looking at?  → kind + title + objective
 *   2 What is the main idea? → the diagram, then the takeaway
 *   3–4 Parts and connections → markers, legend and labels inside the diagram
 *   5 What should I understand? → takeaway callout
 * plus a text version (summary) that doubles as the mobile/screen-reader reading.
 */
import { citationLine } from "@/components/entry/references";
import { sourceById } from "@/lib/content";
import { VISUAL_TYPE_LABEL, type VisualExplanation } from "./types";

export function VisualFigure({ v, headingLevel = 3 }: { v: VisualExplanation; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const { Component } = v;
  const sources = v.sources.map((id) => sourceById.get(id)).filter((s) => s !== undefined);
  return (
    <figure aria-labelledby={`${v.id}-title`} aria-describedby={`${v.id}-objective`} className="overflow-hidden rounded-xl border border-rule bg-surface shadow-card">
      <header className="border-b border-rule bg-soft px-5 py-4">
        <p className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-[0.06em] text-ink-3">{VISUAL_TYPE_LABEL[v.type]}</span>
          <span aria-hidden className="text-ink-3">·</span>
          <span className="text-ink-3">Level {v.level} · {v.level === 2 ? "detailed explanation" : v.level === 3 ? "interactive model" : "quick visual"}</span>
          {v.verification === "illustrative" && (
            <span className="rounded-full border border-dashed border-planned-line px-2 py-px text-[11px] font-medium text-planned">Illustrative example</span>
          )}
        </p>
        <H id={`${v.id}-title`} className="t-sub mt-1.5 text-lg">
          {v.title}
        </H>
        <p id={`${v.id}-objective`} className="mt-1 text-sm text-ink-2">
          {v.objective}
        </p>
      </header>
      <div className="@container p-4 sm:p-6">
        <Component />
      </div>
      <figcaption className="space-y-3 border-t border-rule px-5 py-4">
        <p className="rounded-lg bg-accent-wash px-4 py-3 text-sm text-ink">
          <span className="font-semibold text-accent-ink">Take away · </span>
          {v.takeaway}
        </p>
        <details className="group text-sm">
          <summary className="cursor-pointer font-medium text-accent-ink hover:underline">Read this diagram as text</summary>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink-2 marker:text-ink-3">
            {v.summary.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </details>
        {sources.length > 0 && (
          <p className="text-xs text-ink-3">
            Based on: {sources.map((s, i) => (
              <span key={s.id}>
                {i > 0 && "; "}
                <a href={`#ref-${s.id}`} className="underline decoration-rule-strong underline-offset-2 hover:text-ink">
                  {citationLine(s)}, <span className="italic">{s.title}</span>
                </a>
              </span>
            ))}
          </p>
        )}
      </figcaption>
    </figure>
  );
}
