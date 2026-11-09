import type { Metadata } from "next";
import { SourceCitation } from "@/components/entry/references";
import { Container, PageHeader } from "@/components/ui/layout";
import { aiPatterns, entries, sources, verification } from "@/lib/content";
import { TIER_LABEL } from "@/lib/content/labels";

export const metadata: Metadata = {
  title: "Resources",
  description: "Books, research, standards, official design systems and learning resources behind UX Academy, grouped by kind, with machine verification status.",
};

/** Resource kinds, derived from each record's source type (no hand curation). */
const KINDS = [
  { id: "books", title: "Books", lede: "Textbooks and practitioner books. Recorded from publisher and catalogue information.", types: ["book", "book-chapter"] },
  { id: "research", title: "Research publications", lede: "Peer-reviewed articles, conference papers and technical reports: the primary evidence.", types: ["journal-article", "conference-paper", "technical-report"] },
  { id: "standards", title: "Standards", lede: "Normative documents from standards bodies, such as W3C and ISO.", types: ["standard"] },
  { id: "official", title: "Official guidelines and design systems", lede: "Documentation published by public bodies and product teams: GOV.UK, USWDS, Carbon, Material, Apple, Microsoft and others.", types: ["official-documentation"] },
  { id: "learning", title: "Learning resources, publications and tools", lede: "Professional articles, reference sites, communities and discovery tools. Context, not evidence.", types: ["professional-article", "website"] },
] as const;

export default function SourcesPage() {
  const citedBy = new Map<string, string[]>();
  for (const e of entries) for (const r of e.references) citedBy.set(r.source, [...(citedBy.get(r.source) ?? []), e.title]);
  for (const p of aiPatterns) for (const r of p.references) citedBy.set(r.source, [...new Set([...(citedBy.get(r.source) ?? []), `${p.title} (AI pattern)`])]);
  const status = (id: string) => verification[id]?.status;
  const counts = {
    doi: sources.filter((s) => status(s.id) === "doi-verified").length,
    url: sources.filter((s) => status(s.id) === "url-reachable").length,
    failed: sources.filter((s) => ["doi-mismatch", "doi-not-found"].includes(status(s.id) ?? "")).length,
    unreachable: sources.filter((s) => status(s.id) === "url-unreachable").length,
    awaiting: sources.filter((s) => s.verification === "awaiting-verification").length,
    unchecked: sources.filter((s) => !status(s.id)).length,
  };
  const sortKey = (x: (typeof sources)[number]) => x.authors[0] ?? x.organisation ?? x.title;
  const byKind = KINDS.map((k) => ({ ...k, items: sources.filter((x) => (k.types as readonly string[]).includes(x.type)).sort((a, b) => a.tier - b.tier || sortKey(a).localeCompare(sortKey(b))) }));

  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="Resources"
        lede="Every book, paper, standard, design system and learning resource the academy relies on, grouped by kind and labelled by evidence tier. DOIs are machine-checked against Crossref; URLs are fetched. What could not be checked is said plainly."
        crumbs={[{ href: "/", label: "Home" }, { label: "Resources" }]}
      />
      <Container className="pt-8">
        <dl className="grid grid-cols-2 gap-6 border-y border-rule py-6 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Sources", sources.length],
            ["DOI verified", counts.doi],
            ["URL reachable", counts.url],
            ["URL blocked / unreachable", counts.unreachable],
            ["Awaiting verification", counts.awaiting],
            ["DOI check failed", counts.failed],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label">{k}</dt>
              <dd className="formula mt-1 text-2xl">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-read text-sm text-ink-3">
          Books without DOIs and paywalled standards are recorded bibliographically and cannot be machine-verified; their records come from publisher and catalogue information. Run{" "}
          <code className="formula">npm run sources:verify</code> to re-check. Lower tiers are context, never equivalent to primary evidence.
        </p>
        <nav aria-label="Resource kinds" className="mt-8 flex flex-wrap gap-2">
          {byKind.map((k) => (
            <a key={k.id} href={`#${k.id}`} className="btn btn-secondary btn-sm">
              {k.title} <span className="font-mono text-xs text-ink-3">{k.items.length}</span>
            </a>
          ))}
        </nav>
        {byKind.map(({ id, title, lede, items }) => (
          <section key={id} id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 pt-12">
            <h2 id={`${id}-h`} className="t-section text-[1.5rem]">
              {title} <span className="font-mono text-base text-ink-3">· {items.length}</span>
            </h2>
            <p className="mt-1 max-w-read text-sm text-ink-2">{lede}</p>
            <ul className="mt-4 divide-y divide-rule border-y border-rule">
              {items.map((s) => (
                <li key={s.id} id={s.id} className="scroll-mt-24 py-4">
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{TIER_LABEL[s.tier]}</p>
                  <SourceCitation source={s} record={verification[s.id]} />
                  {citedBy.get(s.id) && <p className="mt-1 text-xs text-ink-3">Cited by: {citedBy.get(s.id)!.join(", ")}</p>}
                  {s.notes && <p className="mt-1 max-w-read text-xs text-ink-3">Note: {s.notes}</p>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>
    </>
  );
}
