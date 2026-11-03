import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { glossary, sourceById } from "@/lib/content";
import { resolveSlug } from "@/lib/content/context";
import { citationLine } from "@/components/entry/references";

export const metadata: Metadata = { title: "Glossary" };

export default function GlossaryPage() {
  const groups = new Map<string, typeof glossary>();
  for (const g of glossary) {
    const k = /[a-z]/i.test(g.term[0]) ? g.term[0].toUpperCase() : "#";
    (groups.get(k) ?? groups.set(k, []).get(k)!).push(g);
  }
  return (
    <>
      <PageHeader eyebrow="Glossary" title="The vocabulary of the discipline" lede={`${glossary.length} short definitions. Where a term has a full entry, follow it for the explanation, evidence and practice.`} />
      <Container className="pt-8">
        <nav aria-label="Letters" className="sticky top-16 z-10 -mx-4 flex flex-wrap gap-1 border-b border-rule bg-paper/95 px-4 py-2 sm:mx-0 sm:px-0">
          {[...groups.keys()].map((k) => (
            <a key={k} href={`#letter-${k}`} className="formula inline-flex h-8 w-8 items-center justify-center rounded-xs text-sm text-ink-2 hover:bg-sunken hover:text-ink">
              {k}
            </a>
          ))}
        </nav>
        <div className="max-w-[52rem]">
          {[...groups.entries()].map(([k, terms]) => (
            <section key={k} aria-labelledby={`letter-${k}`} className="pt-10">
              <h2 id={`letter-${k}`} className="display scroll-mt-32 text-3xl text-accent">
                {k}
              </h2>
              <dl className="mt-3 divide-y divide-rule border-t border-rule">
                {terms.map((g) => (
                  <div key={g.slug} id={g.slug} className="grid scroll-mt-32 gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <dt className="font-medium text-ink">{g.term}</dt>
                    <dd>
                      <p className="text-ink-2">{g.definition}</p>
                      {(g.seeAlso.length > 0 || g.source) && (
                        <p className="mt-1.5 text-sm text-ink-3">
                          {g.seeAlso.length > 0 && (
                            <>
                              See{" "}
                              {g.seeAlso.map((s, i) => {
                                const info = resolveSlug(s);
                                return (
                                  <span key={s}>
                                    {i > 0 && ", "}
                                    {info ? (
                                      <Link href={info.href} className={info.planned ? "underline decoration-dotted" : "link"}>
                                        {info.title}
                                      </Link>
                                    ) : (
                                      s
                                    )}
                                  </span>
                                );
                              })}
                            </>
                          )}
                          {g.source && sourceById.get(g.source) && <span>{g.seeAlso.length ? " · " : ""}Source: {citationLine(sourceById.get(g.source)!)}</span>}
                        </p>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
