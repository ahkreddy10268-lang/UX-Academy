import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/layout";
import { libraryFormulas } from "@/lib/content";

export const metadata: Metadata = { title: "Formula Lab" };

const GROUPS: { title: string; description: string; calculators: string[] }[] = [
  { title: "Interaction models", description: "Predict the time of pointing, choosing, steering and executing.", calculators: ["fitts", "hick-hyman", "steering", "klm"] },
  { title: "Usability measurement", description: "Standardised questionnaires and task-level metrics.", calculators: ["sus", "umux-lite", "nasa-tlx", "task-success", "time-on-task", "error-rate", "problem-discovery"] },
  { title: "Product & customer metrics", description: "Each with an explicit numerator, denominator and time window.", calculators: ["nps", "csat", "ces", "conversion-funnel", "retention-churn"] },
  { title: "Statistics", description: "The reasoning needed to interpret any of the numbers above honestly.", calculators: ["descriptive-stats", "confidence-interval-mean", "two-proportion-test", "effect-size", "sample-size", "correlation-regression"] },
  { title: "Visual design mathematics", description: "Contrast, type scales and grids.", calculators: ["contrast-ratio", "modular-scale", "grid-columns"] },
];

export default function FormulasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Formula Lab"
        title="Calculate, then interpret"
        lede="Every formula is documented with its source, variables, assumptions, a worked example and its limitations — and every calculator is backed by unit-tested code. A number without its assumptions is not an answer."
      />
      <Container className="space-y-14 pt-10">
        {GROUPS.map((g) => {
          const items = libraryFormulas.filter((f) => f.calculator && g.calculators.includes(f.calculator));
          return (
            <section key={g.title} aria-labelledby={g.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule-strong pb-3">
                <h2 id={g.title} className="display text-2xl">
                  {g.title}
                </h2>
                <p className="text-sm text-ink-3">{g.description}</p>
              </div>
              <ul className="divide-y divide-rule">
                {items.map((f) => (
                  <li key={f.id}>
                    <Link href={`/formulas/${f.id}`} className="group grid gap-2 py-5 md:grid-cols-[16rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8">
                      <span className="font-medium text-ink group-hover:text-accent-ink">{f.name}</span>
                      <span className="formula truncate text-sm text-ink-2" title={f.expression}>{f.expression}</span>
                      <span className="text-xs text-ink-3">{f.host.hasEntry ? `Full entry: ${f.host.title}` : "Formula specification"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <p className="text-sm text-ink-3">
          Calculations use the functions in <code className="formula">lib/formulas</code>, verified against statistical tables and published worked examples in{" "}
          <code className="formula">lib/formulas/formulas.test.ts</code>.
        </p>
      </Container>
    </>
  );
}
