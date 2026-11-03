"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { RELATION_LABEL } from "@/lib/content/labels";

export type GNode = { id: string; title: string; domain: string; planned: boolean; summary?: string };
export type GEdge = { from: string; to: string; type: keyof typeof RELATION_LABEL; note: string };

const W = 960;
const H = 680;

/**
 * Deterministic Fruchterman–Reingold layout (no randomness → stable between renders).
 * Nodes start on a circle grouped by subject so related subjects settle near each other.
 */
function layout(nodes: GNode[], edges: GEdge[], domains: string[]) {
  const n = Math.max(nodes.length, 1);
  const k = Math.sqrt(((W - 80) * (H - 60)) / n) * 0.9;
  const pos = new Map<string, { x: number; y: number; dx: number; dy: number }>();
  const order = [...nodes].sort((a, b) => domains.indexOf(a.domain) - domains.indexOf(b.domain));
  order.forEach((node, i) => {
    const angle = (i / n) * Math.PI * 2;
    pos.set(node.id, { x: W / 2 + Math.cos(angle) * W * 0.38, y: H / 2 + Math.sin(angle) * H * 0.38, dx: 0, dy: 0 });
  });
  const list = [...pos.values()];
  let temperature = W / 8;
  for (let iter = 0; iter < 400; iter++) {
    for (const v of list) {
      v.dx = 0;
      v.dy = 0;
    }
    for (let i = 0; i < list.length; i++)
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        const dx = a.x - b.x || 0.01;
        const dy = a.y - b.y || 0.01;
        const d = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const f = (k * k) / d;
        a.dx += (dx / d) * f;
        a.dy += (dy / d) * f;
        b.dx -= (dx / d) * f;
        b.dy -= (dy / d) * f;
      }
    for (const e of edges) {
      const a = pos.get(e.from);
      const b = pos.get(e.to);
      if (!a || !b) continue;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const f = (d * d) / k;
      a.dx -= (dx / d) * f;
      a.dy -= (dy / d) * f;
      b.dx += (dx / d) * f;
      b.dy += (dy / d) * f;
    }
    for (const v of list) {
      // gentle gravity keeps disconnected nodes on the canvas
      v.dx += (W / 2 - v.x) * 0.02 * k * 0.05;
      v.dy += (H / 2 - v.y) * 0.02 * k * 0.05;
      const d = Math.max(Math.sqrt(v.dx * v.dx + v.dy * v.dy), 0.01);
      v.x = Math.min(W - 40, Math.max(40, v.x + (v.dx / d) * Math.min(d, temperature)));
      v.y = Math.min(H - 24, Math.max(28, v.y + (v.dy / d) * Math.min(d, temperature)));
    }
    temperature = Math.max(1, temperature * 0.985);
  }
  return new Map([...pos.entries()].map(([id, p]) => [id, { x: p.x, y: p.y }]));
}

export function KnowledgeGraph({ nodes, edges, domains }: { nodes: GNode[]; edges: GEdge[]; domains: { id: string; title: string }[] }) {
  const params = useSearchParams();
  const [focus, setFocus] = useState<string | null>(params.get("focus"));
  const [showPlanned, setShowPlanned] = useState(false);
  const [domain, setDomain] = useState("");
  const [types, setTypes] = useState<Set<string>>(new Set(Object.keys(RELATION_LABEL)));

  const visibleNodes = useMemo(() => {
    const base = nodes.filter((n) => (showPlanned || !n.planned) && (!domain || n.domain === domain));
    const ids = new Set(base.map((n) => n.id));
    // Keep the focused node and its neighbours even when filtered out.
    if (focus) {
      ids.add(focus);
      edges.forEach((e) => {
        if (e.from === focus) ids.add(e.to);
        if (e.to === focus) ids.add(e.from);
      });
    }
    return nodes.filter((n) => ids.has(n.id));
  }, [nodes, edges, showPlanned, domain, focus]);
  const ids = useMemo(() => new Set(visibleNodes.map((n) => n.id)), [visibleNodes]);
  const visibleEdges = useMemo(() => edges.filter((e) => ids.has(e.from) && ids.has(e.to) && types.has(e.type)), [edges, ids, types]);
  const pos = useMemo(() => layout(visibleNodes, visibleEdges, domains.map((d) => d.id)), [visibleNodes, visibleEdges, domains]);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const focusNode = focus ? byId.get(focus) : undefined;
  const neighbours = new Set(focus ? visibleEdges.flatMap((e) => (e.from === focus ? [e.to] : e.to === focus ? [e.from] : [])) : []);
  const focusEdges = focus ? edges.filter((e) => e.from === focus || e.to === focus) : [];
  const degree = (id: string) => edges.filter((e) => e.from === id || e.to === id).length;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <div className="mb-3 flex flex-wrap items-end gap-4 text-sm">
          <label className="font-medium">
            Focus on
            <select className="mt-1 block h-9 rounded-sm border border-line-control bg-surface px-2" value={focus ?? ""} onChange={(e) => setFocus(e.target.value || null)}>
              <option value="">— nothing selected —</option>
              {nodes
                .filter((n) => !n.planned)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.title}
                  </option>
                ))}
            </select>
          </label>
          <label className="font-medium">
            Subject
            <select className="mt-1 block h-9 rounded-sm border border-line-control bg-surface px-2" value={domain} onChange={(e) => setDomain(e.target.value)}>
              <option value="">All</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex h-9 items-center gap-2">
            <input type="checkbox" checked={showPlanned} onChange={(e) => setShowPlanned(e.target.checked)} /> Include planned topics
          </label>
        </div>
        <fieldset className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <legend className="sr-only">Relationship types</legend>
          {Object.entries(RELATION_LABEL).map(([k, v]) => (
            <label key={k} className="flex items-center gap-1.5 text-ink-2">
              <input
                type="checkbox"
                checked={types.has(k)}
                onChange={() =>
                  setTypes((t) => {
                    const n = new Set(t);
                    if (n.has(k)) n.delete(k);
                    else n.add(k);
                    return n;
                  })
                }
              />
              {v}
            </label>
          ))}
        </fieldset>
        <div className="overflow-hidden rounded-sm border border-rule bg-surface">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Knowledge graph with ${visibleNodes.length} concepts and ${visibleEdges.length} relationships. A text version is below.`}>
            <defs>
              <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" className="fill-ink-3" />
              </marker>
            </defs>
            {visibleEdges.map((e, i) => {
              const a = pos.get(e.from)!;
              const b = pos.get(e.to)!;
              const on = focus && (e.from === focus || e.to === focus);
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  markerEnd="url(#arrow)"
                  strokeDasharray={e.type === "prerequisite-of" ? "4 3" : undefined}
                  className={on ? "stroke-accent" : "stroke-rule-strong"}
                  strokeWidth={on ? 1.8 : 1}
                  opacity={focus && !on ? 0.25 : 1}
                />
              );
            })}
            {visibleNodes.map((n) => {
              const p = pos.get(n.id)!;
              const isFocus = n.id === focus;
              const near = neighbours.has(n.id);
              const r = n.planned ? 4 : 5 + Math.min(6, degree(n.id) * 0.5);
              const dim = focus && !isFocus && !near;
              return (
                <g key={n.id} transform={`translate(${p.x} ${p.y})`} onClick={() => setFocus(n.id)} className="cursor-pointer" opacity={dim ? 0.3 : 1}>
                  <circle r={r + 6} className="fill-transparent" />
                  <circle r={r} className={isFocus ? "fill-accent" : n.planned ? "fill-surface stroke-ink-3" : "fill-ink"} strokeWidth={1.4} />
                  {(!n.planned || isFocus || near) && (
                    <text y={-r - 5} textAnchor="middle" className={`pointer-events-none text-[11px] ${isFocus ? "fill-accent-ink font-semibold" : "fill-ink-2"}`}>
                      {n.title.length > 28 ? n.title.slice(0, 26) + "…" : n.title}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        <p className="mt-2 text-xs text-ink-3">Filled dot: written entry (size = number of connections) · hollow: planned topic · dashed line: prerequisite · click a dot to focus.</p>
      </div>
      <aside aria-live="polite" className="lg:pt-[7.5rem]">
        {focusNode ? (
          <div>
            <p className="label">{focusNode.planned ? "Planned topic" : "Selected"}</p>
            <h2 className="display mt-1 text-xl">{focusNode.title}</h2>
            {focusNode.summary && <p className="mt-2 text-sm text-ink-2">{focusNode.summary}</p>}
            <Link href={`/library/${focusNode.id}`} className="link mt-3 inline-block text-sm">
              Open {focusNode.planned ? "topic" : "entry"} →
            </Link>
            <ul className="mt-6 divide-y divide-rule border-y border-rule">
              {focusEdges.map((e, i) => {
                const other = byId.get(e.from === focus ? e.to : e.from);
                const outgoing = e.from === focus;
                return (
                  <li key={i} className="py-3 text-sm">
                    <p className="text-xs text-ink-3">{outgoing ? RELATION_LABEL[e.type] : `${RELATION_LABEL[e.type]} ← (incoming)`}</p>
                    <button type="button" className="mt-0.5 text-left font-medium text-ink hover:text-accent-ink" onClick={() => setFocus(other!.id)}>
                      {other?.title}
                    </button>
                    <p className="mt-1 text-ink-2">{e.note}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-ink-2">Select a concept to see each relationship and the reason it exists. Every edge in this graph was written by hand with an explanation — none are inferred from keywords.</p>
        )}
      </aside>
    </div>
  );
}
