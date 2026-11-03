import type { Formula } from "@/lib/content/schema";
import { Calculator } from "@/components/formula/calculator";
import { Bullets } from "@/components/ui/layout";
import { Rich, RichParagraphs, type RichContext } from "@/components/ui/rich";

/** Full Formula Library specification (spec Part 11) for one formula. */
export function FormulaBlock({ formula, ctx, headingLevel = 3 }: { formula: Formula; ctx: RichContext; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="space-y-8">
      <div>
        <H className="display text-xl">{formula.name}</H>
        <p className="mt-1 text-sm text-ink-3">{formula.contributor}</p>
        <div tabIndex={0} role="group" aria-label={`${formula.name} expression`} className="mt-4 overflow-x-auto rounded-sm border border-rule bg-sunken px-5 py-6 text-center">
          <p className="formula whitespace-nowrap text-xl text-ink sm:text-2xl" aria-label={`Formula: ${formula.expression}`}>
            {formula.expression}
          </p>
        </div>
      </div>

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

      {formula.calculator && <Calculator id={formula.calculator} />}

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

      <div className="rounded-sm border border-rule p-5">
        <p className="label">Worked example</p>
        <Bullets className="mt-3 text-ink-2" items={formula.workedExample.given} />
        <ol className="formula mt-4 space-y-1 text-sm text-ink">
          {formula.workedExample.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p className="mt-4 border-t border-rule pt-3 font-medium text-ink">{formula.workedExample.result}</p>
      </div>

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
    </div>
  );
}
