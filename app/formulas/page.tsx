import type { Metadata } from "next";
import { FormulaIndex, type FormulaRow } from "@/components/formula/formula-index";
import { ConceptIllustration } from "@/components/illustrations/concept-illustration";
import { hasIllustration } from "@/components/illustrations/registry";
import { Container, PageHeader } from "@/components/ui/layout";
import { entryBySlug, libraryFormulas, taxonomyBySlug } from "@/lib/content";
import { catClass } from "@/lib/content/categories";

export const metadata: Metadata = { title: "Formula Lab" };

const GROUPS: { title: string; description: string; calculators: string[] }[] = [
  { title: "Interaction models", description: "Predict the time of pointing, choosing, steering and executing.", calculators: ["fitts", "hick-hyman", "steering", "klm"] },
  { title: "Usability measurement", description: "Standardised questionnaires and task-level metrics.", calculators: ["sus", "umux-lite", "nasa-tlx", "task-success", "time-on-task", "error-rate", "problem-discovery"] },
  { title: "Product & customer metrics", description: "Each with an explicit numerator, denominator and time window.", calculators: ["nps", "csat", "ces", "conversion-funnel", "retention-churn"] },
  { title: "Statistics", description: "The reasoning needed to interpret any of the numbers above honestly.", calculators: ["descriptive-stats", "confidence-interval-mean", "two-proportion-test", "effect-size", "sample-size", "correlation-regression"] },
  { title: "Visual design mathematics", description: "Contrast, type scales and grids.", calculators: ["contrast-ratio", "modular-scale", "grid-columns"] },
];

export default function FormulasPage() {
  const rows: FormulaRow[] = libraryFormulas.map((f) => {
    const domain = entryBySlug.get(f.host.slug)?.domain ?? taxonomyBySlug.get(f.host.slug)?.domain ?? "metrics";
    return {
      id: f.id,
      name: f.name,
      expression: f.expression,
      summary: f.summary,
      host: f.host.title,
      hasEntry: f.host.hasEntry,
      group: GROUPS.find((g) => f.calculator && g.calculators.includes(f.calculator))?.title ?? "Statistics",
      cat: catClass(domain),
    };
  });
  const plates = Object.fromEntries(
    libraryFormulas.map((f) => {
      const e = entryBySlug.get(f.host.slug);
      const domain = e?.domain ?? taxonomyBySlug.get(f.host.slug)?.domain ?? "metrics";
      const slug = e && hasIllustration(e.slug) ? e.slug : domain;
      return [f.id, <ConceptIllustration key={f.id} slug={slug} title={f.name} domain={domain} decorative />];
    }),
  );
  return (
    <>
      <PageHeader
        cat="cat-blue"
        eyebrow="Formula Lab"
        title="Calculate, then interpret"
        lede={`${libraryFormulas.length} formulas, each with its source, variables, assumptions, a worked example and its limitations, plus a calculator backed by unit-tested code. A number without its assumptions is not an answer.`}
      />
      <Container className="pt-10">
        <FormulaIndex rows={rows} groups={GROUPS.map(({ title, description }) => ({ title, description }))} plates={plates} />
      </Container>
    </>
  );
}
