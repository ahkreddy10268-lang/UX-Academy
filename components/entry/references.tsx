import type { Reference, Source } from "@/lib/content/schema";
import type { VerificationRecord } from "@/lib/content";
import { TIER_LABEL } from "@/lib/content/labels";

export function formatAuthors(authors: string[]): string {
  if (!authors.length) return "";
  if (authors.length <= 3) return authors.join(", ");
  return `${authors[0]} et al.`;
}

export function citationLine(s: Source): string {
  const who = formatAuthors(s.authors) || s.organisation || "";
  const year = s.year ? ` (${s.year})` : "";
  return `${who}${year}`;
}

/** Shows what has actually been machine-checked, falling back to the authoring claim. */
export function VerificationNote({ source, record }: { source: Source; record?: VerificationRecord }) {
  let text: string;
  let tone = "text-ink-3";
  if (record?.status === "doi-verified") {
    text = `DOI verified with Crossref ${record.checkedAt}`;
    tone = "text-ok";
  } else if (record?.status === "url-reachable") {
    text = `URL reachable ${record.checkedAt}`;
    tone = "text-ok";
  } else if (record?.status === "doi-mismatch" || record?.status === "doi-not-found") {
    text = `DOI check failed ${record.checkedAt} — do not rely on this record`;
    tone = "text-accent-ink";
  } else if (record?.status === "url-unreachable") {
    text = `URL not reachable by automated check ${record.checkedAt} (often bot-blocking) · ${source.verification === "bibliographic" ? "bibliographic record" : source.verification}`;
  } else if (source.verification === "awaiting-verification") {
    text = "Awaiting verification";
    tone = "text-warn";
  } else {
    text = "Bibliographic record — not yet machine-verified";
  }
  return <span className={tone}>{text}</span>;
}

export function SourceCitation({ source, record }: { source: Source; record?: VerificationRecord }) {
  const href = source.doi ? `https://doi.org/${source.doi}` : source.url;
  return (
    <div>
      <p className="text-base leading-snug">
        <span className="text-ink-2">{citationLine(source)}.</span>{" "}
        {href ? (
          <a href={href} className="link font-serif italic" rel="noopener noreferrer" target="_blank">
            {source.title}
          </a>
        ) : (
          <span className="font-serif italic">{source.title}</span>
        )}
        {source.container && <span className="text-ink-2">. {source.container}</span>}
        {source.volume && (
          <span className="text-ink-2">
            , {source.volume}
            {source.issue ? `(${source.issue})` : ""}
          </span>
        )}
        {source.pages && <span className="text-ink-2">, {source.pages}</span>}
        {source.publisher && !source.container && <span className="text-ink-2">. {source.publisher}</span>}
        .
      </p>
      <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-3">
        <span>{TIER_LABEL[source.tier]}</span>
        {source.doi && <span className="formula">doi:{source.doi}</span>}
        {source.isbn && <span className="formula">ISBN {source.isbn}</span>}
        <span>Access: {source.access}</span>
        <VerificationNote source={source} record={record} />
      </p>
      {source.licence && <p className="mt-1 text-xs text-ink-3">Licence: {source.licence}</p>}
    </div>
  );
}

const ROLE_LABEL: Record<Reference["role"], string> = {
  primary: "Primary research",
  standard: "Standards",
  explanatory: "Explanatory sources",
  further: "Further reading",
};

export function ReferenceList({
  references,
  sources,
  verification,
}: {
  references: Reference[];
  sources: Map<string, Source>;
  verification: Record<string, VerificationRecord>;
}) {
  const groups = (["primary", "standard", "explanatory", "further"] as const)
    .map((role) => ({ role, refs: references.map((r, i) => ({ r, n: i + 1 })).filter(({ r }) => r.role === role) }))
    .filter((g) => g.refs.length);
  return (
    <div className="space-y-8">
      {groups.map((g) => (
        <div key={g.role}>
          <p className="label">{ROLE_LABEL[g.role]}</p>
          <ol className="mt-3 space-y-4">
            {g.refs.map(({ r, n }) => {
              const s = sources.get(r.source)!;
              return (
                <li key={r.source} id={`ref-${r.source}`} className="grid scroll-mt-24 grid-cols-[2rem_1fr] gap-2">
                  <span className="formula pt-0.5 text-sm text-ink-3">[{n}]</span>
                  <div>
                    <SourceCitation source={s} record={verification[s.id]} />
                    {(r.note || r.locator) && (
                      <p className="mt-1 text-sm text-ink-2">
                        {r.locator && <span className="font-medium">{r.locator}. </span>}
                        {r.note}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
