import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { KnowledgeGraph, type GEdge, type GNode } from "@/components/graph/knowledge-graph";
import { Container, PageHeader } from "@/components/ui/layout";
import { domains, entries, entryBySlug, graphEdges, taxonomyBySlug, titleFor } from "@/lib/content";
import { RELATION_LABEL } from "@/lib/content/labels";

export const metadata: Metadata = { title: "Knowledge graph" };

export default function GraphPage() {
  const ids = new Set(graphEdges.flatMap((e) => [e.from, e.to]));
  entries.forEach((e) => ids.add(e.slug));
  const nodes: GNode[] = [...ids].flatMap((id): GNode[] => {
    const e = entryBySlug.get(id);
    if (e) return [{ id, title: e.title, domain: e.domain, planned: false, summary: e.summary }];
    const t = taxonomyBySlug.get(id);
    return t ? [{ id, title: t.title, domain: t.domain, planned: true }] : [];
  });
  const edges: GEdge[] = graphEdges.map((e) => ({ ...e }));

  return (
    <>
      <PageHeader
        eyebrow="Knowledge graph"
        title="How the ideas connect"
        lede={`${entries.length} written entries and ${graphEdges.length} explained relationships — prerequisites, derivations, applications, contrasts and measurements.`}
      />
      <Container className="pt-8">
        <Suspense fallback={<p className="text-ink-3">Laying out the graph…</p>}>
          <KnowledgeGraph nodes={nodes} edges={edges} domains={domains.map((d) => ({ id: d.id, title: d.shortTitle }))} />
        </Suspense>

        <section aria-labelledby="list" className="pt-16">
          <h2 id="list" className="display text-2xl">
            The graph as a list
          </h2>
          <p className="mt-1 text-sm text-ink-2">The same relationships in reading order — every entry with its outgoing connections.</p>
          <div className="mt-6 columns-1 gap-10 lg:columns-2">
            {entries.map((e) => {
              const out = graphEdges.filter((g) => g.from === e.slug);
              const pre = e.prerequisites;
              return (
                <details key={e.slug} className="mb-2 break-inside-avoid border-b border-rule py-2">
                  <summary className="cursor-pointer font-medium">
                    {e.title} <span className="text-xs font-normal text-ink-3">· {out.length + pre.length} links</span>
                  </summary>
                  <ul className="mt-2 space-y-2 pb-2 text-sm">
                    {pre.map((p) => (
                      <li key={`p-${p}`}>
                        <span className="text-ink-3">Requires </span>
                        <Link className="link" href={`/library/${p}`}>
                          {titleFor(p)}
                        </Link>
                      </li>
                    ))}
                    {out.map((o) => (
                      <li key={o.to + o.type}>
                        <span className="text-ink-3">{RELATION_LABEL[o.type]} </span>
                        <Link className="link" href={`/library/${o.to}`}>
                          {titleFor(o.to)}
                        </Link>
                        <span className="text-ink-2"> — {o.note}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </section>
      </Container>
    </>
  );
}
