import type { Formula } from "@/lib/content/schema";
import { Calculator } from "@/components/formula/calculator";
import { FormulaCurve } from "@/components/formula/formula-curve";
import { hasCurve } from "@/components/formula/curves";
import { Callout } from "@/components/ui/callout";
import { Bullets } from "@/components/ui/layout";
import { Rich, RichParagraphs, type RichContext } from "@/components/ui/rich";

/** Full Formula Library specification (spec Part 11) for one formula. */
export function FormulaBlock({ formula, ctx, headingLevel = 3, layout = "stacked" }: { formula: Formula; ctx: RichContext; headingLevel?: 2 | 3; layout?: "stacked" | "split" }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const workbench = (formula.calculator || null) && (
    <>
      {formula.calculator && <Calculator id={formula.calculator} />}
      {formula.calculator && hasCurve(formula.calculator) && <FormulaCurve calculator={formula.calculator} />}
    </>
  );
  const head = (
      <div>
        <H className="t-sub text-xl">{formula.name}</H>
        <p className="mt-1 text-sm text-ink-3">{formula.contributor}</p>
        <div tabIndex={0} role="group" aria-label={`${formula.name} expression`} className="mt-4 overflow-x-auto rounded-lg bg-sunken px-5 py-6 text-center ring-1 ring-rule">
          <p className="formula whitespace-nowrap text-xl text-ink sm:text-2xl" aria-label={`Formula: ${formula.expression}`}>
            {formula.expression}
          </p>
        </div>
      </div>
  );
  const spec = (
    <>
      <div className="overflow-x-auto" tabIndex={0} role="group" aria-label="Variables table">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <caption className="label pb-2 text-left">Variables</caption>
          <thead>
            <tr className="border-b border-rule-strong text-ink-3">
              <th scope="col" className="py-2 pr-4 font-medium">Symbol</th>
              <th scope="col" className="py-2 pr-4 font-medium">Meaning</th>
              <th scope="col" className="py-2 pr-4 font-medium">Unit</th>
              <th scope="col" className="py-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {formula.variables.map((v) => (
              <tr key={v.symbol} className="border-b border-rule align-top">
                <th scope="row" className="formula py-2 pr-4 font-medium text-ink">{v.symbol}</th>
                <td className="py-2 pr-4 text-ink">{v.name}</td>
                <td className="py-2 pr-4 text-ink-2">{v.unit}</td>
                <td className="py-2 text-ink-2">{v.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-ink-2">Result: {formula.resultUnit}</p>
      </div>

      {layout === "stacked" && workbench}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="label">Assumptions</p>
          <Bullets className="mt-3 text-ink-2" items={formula.assumptions} />
        </div>
        <div>
          <p className="label">Conditions for use</p>
          <Bullets className="mt-3 text-ink-2" items={formula.conditions} />
        </div>
      </div>

      <div>
        <p className="label">Step by step</p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-ink-2 marker:text-ink-3">
          {formula.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>

      <Callout role="formula" label="Worked example">
        <Bullets className="text-ink" items={formula.workedExample.given} />
        <ol className="formula mt-4 space-y-1 text-sm text-ink">
          {formula.workedExample.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p className="mt-4 border-t border-c-soft pt-3 font-medium text-ink">{formula.workedExample.result}</p>
      </Callout>

      <div>
        <p className="label">Interpreting the result</p>
        <RichParagraphs className="mt-3" items={formula.interpretation} ctx={ctx} />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="label">Common calculation errors</p>
          <Bullets className="mt-3 text-ink-2" items={formula.commonErrors} />
        </div>
        <div>
          <p className="label">Limitations</p>
          <Bullets className="mt-3 text-ink-2" items={formula.limitations} />
        </div>
      </div>

      {formula.alternatives.length > 0 && (
        <div>
          <p className="label">Alternative formulations</p>
          <dl className="mt-3 divide-y divide-rule border-y border-rule">
            {formula.alternatives.map((a) => (
              <div key={a.name} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                <dt className="font-medium text-ink">{a.name}</dt>
                <dd>
                  <p className="formula text-sm text-ink">{a.expression}</p>
                  <p className="mt-1 text-sm text-ink-2">
                    <Rich text={a.note} ctx={ctx} />
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );

  if (layout === "split" && workbench) {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-10">
        <div className="min-w-0 space-y-8">
          {head}
          {spec}
        </div>
        <aside aria-label="Calculator workspace" className="min-w-0">
          <div className="space-y-6 rounded-xl border border-rule bg-soft p-4 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto">{workbench}</div>
        </aside>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {head}
      {spec}
    </div>
  );
}