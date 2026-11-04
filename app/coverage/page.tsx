import type { Metadata } from "next";
import Link from "next/link";
import { CoverageBar } from "@/components/ui/coverage-bar";
import { Container, PageHeader, SectionHeading } from "@/components/ui/layout";
import { allQuestions, entries, glossary, labs, libraryFormulas, sources, taxonomyItems } from "@/lib/content";
import { TOPIC_STATUSES, TOPIC_STATUS_LABEL, domainCoverage, qualitySummary } from "@/lib/content/coverage";
import { completionReport } from "@/lib/coverage-report";
import { EVIDENCE_LABEL } from "@/lib/content/labels";
import { EVIDENCE_CLASSES } from "@/lib/content/schema";

export const metadata: Metadata = { title: "Content coverage" };

export default function CoveragePage() {
  const cov = domainCoverage();
  const comp = completionReport();
  const dims = ["explanation", "evidence", "practice", "visual", "editorial"] as const;
  const total = cov.reduce((s, c) => s + c.total, 0);
  const published = cov.reduce((s, c) => s + c.published, 0);
  return (
    <>
      <PageHeader
        eyebrow="Coverage register"
        title="What is written, and what is not yet"
        lede="Computed from the content itself: nothing on this page is entered by hand. A topic counts as covered only when its entry is published and passes every quality gate."
      />
      <Container className="space-y-16 pt-8">
        <dl className="grid grid-cols-2 gap-6 border-y border-rule py-6 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Topics in taxonomy", total],
            ["Published entries", published],
            ["Formulas & calculators", libraryFormulas.length],
            ["Quiz questions", allQuestions.length],
            ["Labs", labs.length],
            ["Sources", sources.length],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label">{k}</dt>
              <dd className="formula mt-1 text-2xl">{v}</dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="by-subject">
          <SectionHeading id="by-subject" kicker="By subject">
            Coverage across the discipline
          </SectionHeading>
          <div className="overflow-x-auto" tabIndex={0} role="group" aria-label="Coverage table">
            <table className="w-full min-w-[44rem] text-sm">
              <caption className="sr-only">Topics per subject by content status</caption>
              <thead>
                <tr className="border-b border-rule-strong text-left text-ink-3">
                  <th className="py-2 pr-4 font-medium">Subject</th>
                  {TOPIC_STATUSES.map((s) => (
                    <th key={s} className="py-2 pr-3 text-right font-medium">
                      {TOPIC_STATUS_LABEL[s]}
                    </th>
                  ))}
                  <th className="w-48 py-2 pl-4 font-medium">Written</th>
                </tr>
              </thead>
              <tbody>
                {cov.map((c) => (
                  <tr key={c.id} className="border-b border-rule">
                    <th scope="row" className="py-3 pr-4 text-left font-medium">
                      <Link href={`/topics/${c.id}`} className="hover:text-accent-ink">
                        {c.title}
                      </Link>
                    </th>
                    {TOPIC_STATUSES.map((s) => (
                      <td key={s} className={`formula tabular py-3 pr-3 text-right ${c.byTopicStatus[s] ? "text-ink" : "text-ink-3"}`}>
                        {c.byTopicStatus[s]}
                      </td>
                    ))}
                    <td className="py-3 pl-4">
                      <CoverageBar published={c.published} total={c.total} label={c.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="completion">
          <SectionHeading id="completion" kicker="Completion">
            How complete the written entries are, by subject
          </SectionHeading>
          <p className="mb-4 max-w-3xl text-sm text-ink-2">
            Each column counts published entries rated complete on that dimension, out of the published entries in the subject. A dash means nothing is published there yet. These are separate dimensions, not one score; the rules are on the{" "}
            <Link href="/method" className="link">
              method page
            </Link>
            .
          </p>
          <div className="overflow-x-auto" tabIndex={0} role="group" aria-label="Completion table">
            <table className="w-full min-w-[44rem] text-sm">
              <caption className="sr-only">Published entries rated complete per dimension, by subject</caption>
              <thead>
                <tr className="border-b border-rule-strong text-left text-ink-3">
                  <th className="py-2 pr-4 font-medium">Subject</th>
                  <th className="py-2 pr-3 text-right font-medium">Research done</th>
                  {dims.map((d) => (
                    <th key={d} className="py-2 pr-3 text-right font-medium capitalize">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comp.map((c) => (
                  <tr key={c.id} className="border-b border-rule">
                    <th scope="row" className="py-3 pr-4 text-left font-medium">
                      {c.title}
                    </th>
                    <td className="formula tabular py-3 pr-3 text-right">
                      {c.researchDone} / {c.total}
                    </td>
                    {dims.map((d) => (
                      <td key={d} className={`formula tabular py-3 pr-3 text-right ${c.published ? "text-ink" : "text-ink-3"}`}>
                        {c.published ? `${c.complete[d]} / ${c.published}` : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-3">
            Empty subjects: {comp.filter((c) => c.published === 0).map((c) => c.title).join(", ") || "none"}. Subcategories with no published entry: {comp.reduce((n, c) => n + c.subcategories.filter((x) => x.published === 0).length, 0)} of{" "}
            {comp.reduce((n, c) => n + c.subcategories.length, 0)}.
          </p>
        </section>

        <section aria-labelledby="quality">
          <SectionHeading id="quality" kicker="Quality gate">
            Review status of written entries
          </SectionHeading>
          <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {qualitySummary().map((q) => (
              <li key={q.gate} className="flex justify-between border-b border-rule py-2 text-sm">
                <span className="capitalize text-ink-2">{q.gate}</span>
                <span className="formula tabular">
                  {q.passing} / {q.total}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="evidence">
          <SectionHeading id="evidence" kicker="Evidence">
            How the written entries are supported
          </SectionHeading>
          <ul className="grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {EVIDENCE_CLASSES.map((ev) => {
              const list = entries.filter((e) => e.evidence === ev);
              return (
                <li key={ev} className="border-b border-rule py-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-2">{EVIDENCE_LABEL[ev]}</span>
                    <span className="formula tabular">{list.length}</span>
                  </div>
                  {list.length > 0 && <p className="mt-1 text-xs text-ink-3">{list.map((e) => e.title).join(", ")}</p>}
                </li>
              );
            })}
          </ul>
        </section>

        <p className="text-sm text-ink-3">
          {taxonomyItems.filter((t) => !t.entry).length} topics remain planned. {glossary.length} glossary terms give short working definitions in the meantime. The expansion order is in{" "}
          <code className="formula">docs/ROADMAP.md</code>.
        </p>
      </Container>
    </>
  );
}
