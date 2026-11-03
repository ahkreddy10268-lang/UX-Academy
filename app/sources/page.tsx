import type { Metadata } from "next";
import { SourceCitation } from "@/components/entry/references";
import { Container, PageHeader } from "@/components/ui/layout";
import { entries, sources, verification } from "@/lib/content";
import { TIER_LABEL } from "@/lib/content/labels";

export const metadata: Metadata = { title: "Source registry" };

export default function SourcesPage() {
  const citedBy = new Map<string, string[]>();
  for (const e of entries) for (const r of e.references) citedBy.set(r.source, [...(citedBy.get(r.source) ?? []), e.title]);
  const status = (id: string) => verification[id]?.status;
  const counts = {
    doi: sources.filter((s) => status(s.id) === "doi-verified").length,
    url: sources.filter((s) => status(s.id) === "url-reachable").length,
    failed: sources.filter((s) => ["doi-mismatch", "doi-not-found"].includes(status(s.id) ?? "")).length,
    unreachable: sources.filter((s) => status(s.id) === "url-unreachable").length,
    awaiting: sources.filter((s) => s.verification === "awaiting-verification").length,
    unchecked: sources.filter((s) => !status(s.id)).length,
  };
  const byTier = [1, 2, 3, 4].map((t) => ({ tier: t, items: sources.filter((s) => s.tier === t).sort((a, b) => (a.authors[0] ?? a.organisation ?? a.title).localeCompare(b.authors[0] ?? b.organisation ?? b.title)) }));

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Source registry"
        lede="Every reference the academy relies on, ranked by evidence tier. DOIs are machine-checked against Crossref; URLs are fetched. What could not be checked is said plainly."
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
        {byTier.map(({ tier, items }) => (
          <section key={tier} aria-labelledby={`tier-${tier}`} className="pt-12">
            <h2 id={`tier-${tier}`} className="display text-2xl">
              {TIER_LABEL[tier]} <span className="text-base text-ink-3">· {items.length}</span>
            </h2>
            <ul className="mt-4 divide-y divide-rule border-y border-rule">
              {items.map((s) => (
                <li key={s.id} id={s.id} className="scroll-mt-24 py-4">
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
