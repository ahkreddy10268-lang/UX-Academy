"use client";

import MiniSearch, { type SearchResult } from "minisearch";
import { useEffect, useState } from "react";
import type { SearchDoc } from "@/lib/content/search";

let indexPromise: Promise<{ mini: MiniSearch<SearchDoc>; docs: Map<string, SearchDoc> }> | null = null;

/** Boost order reflects the spec: titles and alternate names first, then definitions/summary, then full text. */
function loadIndex() {
  indexPromise ??= fetch("/search-index.json")
    .then((r) => {
      if (!r.ok) throw new Error(`Search index HTTP ${r.status}`);
      return r.json() as Promise<SearchDoc[]>;
    })
    .then((docs) => {
      const mini = new MiniSearch<SearchDoc>({
        fields: ["title", "alternateNames", "summary", "tags", "body", "context"],
        storeFields: ["id"],
        searchOptions: {
          boost: { title: 6, alternateNames: 4, tags: 2, summary: 2, context: 1, body: 1 },
          prefix: (term) => term.length > 2,
          fuzzy: (term) => (term.length > 4 ? 0.2 : false),
          combineWith: "AND",
        },
      });
      mini.addAll(docs);
      return { mini, docs: new Map(docs.map((d) => [d.id, d])) };
    })
    .catch((e) => {
      indexPromise = null;
      throw e;
    });
  return indexPromise;
}

export type Hit = SearchDoc & { score: number; terms: string[] };

export function useSearch(query: string, enabled = true) {
  const q = query.trim();
  const [state, setState] = useState<{ query: string; status: "ready" | "error"; hits: Hit[]; error?: string } | null>(null);

  useEffect(() => {
    if (!enabled || !q) return;
    let cancelled = false;
    loadIndex()
      .then(({ mini, docs }) => {
        if (cancelled) return;
        let results: SearchResult[] = mini.search(q);
        if (!results.length) results = mini.search(q, { combineWith: "OR" });
        const hits = results.slice(0, 60).map((r) => ({ ...docs.get(r.id as string)!, score: r.score, terms: r.terms }));
        // Published entries outrank planned stubs with similar scores.
        hits.sort((a, b) => b.score * weight(b) - a.score * weight(a));
        setState({ query: q, status: "ready", hits });
      })
      .catch((e) => !cancelled && setState({ query: q, status: "error", hits: [], error: String(e) }));
    return () => {
      cancelled = true;
    };
  }, [q, enabled]);

  if (!q) return { status: "idle" as const, hits: [] as Hit[], error: undefined };
  if (!state || state.query !== q) return { status: "loading" as const, hits: state?.hits ?? [], error: undefined };
  return state;
}

const weight = (d: SearchDoc) => (d.kind === "planned" ? 0.35 : d.kind === "entry" ? 1.2 : 1);

/** Extract a short snippet around the first matched term. */
export function snippet(doc: SearchDoc, terms: string[], length = 180): string {
  const text = [doc.summary, doc.body].filter(Boolean).join(" ");
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of terms) {
    const i = lower.indexOf(t.toLowerCase());
    if (i >= 0 && (at < 0 || i < at)) at = i;
  }
  if (at < 0 || at < length / 2) return text.slice(0, length) + (text.length > length ? "…" : "");
  const start = Math.max(0, at - Math.floor(length / 3));
  return "…" + text.slice(start, start + length).trim() + (start + length < text.length ? "…" : "");
}

export function prefetchSearch() {
  void loadIndex().catch(() => {});
}
