import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader, SectionHeading } from "@/components/ui/layout";
import { EvidenceMark } from "@/components/ui/marks";
import { EVIDENCE_DESCRIPTION, EVIDENCE_ORDER, STATUS_LABEL, TIER_LABEL, TYPE_DESCRIPTION, TYPE_LABEL } from "@/lib/content/labels";
import { CONTENT_STATUSES, KNOWLEDGE_TYPES } from "@/lib/content/schema";

export const metadata: Metadata = { title: "Method & evidence" };

const GATES = [
  ["Classification", "Primary type reflects what the item is, not where it is convenient to file it."],
  ["Explanation", "Teaches the mechanism, not just a definition."],
  ["Research", "Claims trace to sources; the original publication is identified where it exists."],
  ["Beginner", "Understandable with no background; every unavoidable term is explained."],
  ["Professional", "Gives practitioners implementation guidance and decision criteria."],
  ["Examples", "Examples are accurate and drawn from real interface contexts."],
  ["Limitations", "States when not to use it, its limits and common misreadings."],
  ["Relationships", "Connections are explicit, typed and explained."],
  ["Sources", "References are verifiable; DOIs pass machine verification."],
  ["Activities", "At least three ways to practise: quiz questions, exercises, labs."],
];

export default function MethodPage() {
  return (
    <>
      <PageHeader eyebrow="Method" title="How this academy decides what is true" lede="Accuracy over quantity. Every entry is classified, evidenced and reviewed against a quality gate before it is published. Anything not yet researched is labelled as planned." />
      <Container className="max-w-[52rem] space-y-16 pt-10">
        <section>
          <SectionHeading kicker="Evidence classes">How strong is the support?</SectionHeading>
          <p className="mb-5 text-ink-2">No numeric confidence scores are given — there is no defensible way to compute them. Instead each entry is placed in one class and explained in its own words.</p>
          <dl className="divide-y divide-rule border-y border-rule">
            {EVIDENCE_ORDER.map((ev) => (
              <div key={ev} className="grid gap-2 py-4 sm:grid-cols-[17rem_1fr] sm:gap-6">
                <dt>
                  <EvidenceMark evidence={ev} />
                </dt>
                <dd className="text-sm text-ink-2">{EVIDENCE_DESCRIPTION[ev]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <SectionHeading kicker="Source tiers">Where evidence comes from</SectionHeading>
          <ul className="space-y-3 text-ink-2">
            {[1, 2, 3, 4].map((t) => (
              <li key={t}>
                <span className="font-medium text-ink">{TIER_LABEL[t]}</span> —{" "}
                {
                  {
                    1: "original studies, peer-reviewed papers, original theoretical works, official standards and primary documentation.",
                    2: "recognised HCI organisations, universities, professional bodies, government design systems, original research teams.",
                    3: "established educational resources such as IxDF and Nielsen Norman Group.",
                    4: "blogs, discussions and discovery tools — used to find questions and sources, never as evidence.",
                  }[t]
                }
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-3">
            DOIs are resolved against Crossref and titles and years compared automatically. Paywalled standards are never reproduced; only public abstracts and independent explanations are used. See the{" "}
            <Link className="underline" href="/sources">
              source registry
            </Link>
            .
          </p>
        </section>

        <section>
          <SectionHeading kicker="Quality gate">Before an entry is published</SectionHeading>
          <ol className="divide-y divide-rule border-y border-rule">
            {GATES.map(([g, d], i) => (
              <li key={g} className="grid grid-cols-[2rem_10rem_1fr] gap-3 py-3 text-sm">
                <span className="formula text-ink-3">{i + 1}</span>
                <span className="font-medium">{g}</span>
                <span className="text-ink-2">{d}</span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-ink-3">These are enforced as automated tests: a published entry that fails any gate fails the build.</p>
        </section>

        <section>
          <SectionHeading kicker="Content status">From plan to publication</SectionHeading>
          <ol className="flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {CONTENT_STATUSES.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                {i > 0 && <span className="text-ink-3">→</span>}
                <span>{STATUS_LABEL[s]}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionHeading kicker="Knowledge types">What kind of thing is it?</SectionHeading>
          <dl className="grid gap-x-8 sm:grid-cols-2">
            {KNOWLEDGE_TYPES.map((t) => (
              <div key={t} className="border-b border-rule py-3">
                <dt className="font-medium">{TYPE_LABEL[t]}</dt>
                <dd className="mt-0.5 text-sm text-ink-2">{TYPE_DESCRIPTION[t]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <SectionHeading kicker="Learning design">How the academy teaches</SectionHeading>
          <div className="prose-read space-y-4 text-ink-2">
            <p>
              Each entry is written at three depths — understand, apply, analyse — so a beginner never needs another explanation and an expert can reach the primary research. Progression follows
              discover → understand → explore → apply → practise → evaluate → revise → master, but nothing forces a single route.
            </p>
            <p>
              Practice uses retrieval (quizzes with explained answers), spacing (Leitner flashcards), interleaving (mixed quizzes across subjects), worked examples (every formula) and authentic tasks
              (workshops). These are applied selectively: they are well-supported in learning research, but no technique is a universal recipe.
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
