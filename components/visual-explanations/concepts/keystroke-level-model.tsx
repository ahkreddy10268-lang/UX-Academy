/**
 * Keystroke-level model — one worked method, translated into operators, with
 * mental operators inserted by Rule 0, and the operator times. Restates
 * content/knowledge/frameworks/keystroke-level-model.ts. Every time and total
 * is computed from lib/formulas (KLM_OPERATORS, parseKlm, klmTotal), never typed
 * here. The method is an illustration, labelled as such.
 */
import { KLM_OPERATORS, klmTotal, parseKlm } from "@/lib/formulas/pointing";

const BASE = "H P B B P B B";
const WITH_M = "H M P B B M P B B";

function seconds(sequence: string): string {
  return klmTotal(parseKlm(sequence)).total.toFixed(2);
}

export function KlmWorkedMethod() {
  const operators = Object.entries(KLM_OPERATORS);
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Write the method, translate it into operators, insert the mental operators, then sum.</span> The example is an illustration: saving through a File menu with the mouse.
      </p>
      <ol className="space-y-2" aria-label="Worked example, step by step">
        <li className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
          <p className="label">1. The method</p>
          <p className="mt-1 text-sm text-ink">Move hand to mouse, point to File menu, click, point to Save, click.</p>
        </li>
        <li className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
          <p className="label">2. As operators</p>
          <p className="formula mt-1 text-sm text-ink">{BASE.replaceAll(" B B", " BB")}</p>
          <p className="mt-1 text-xs text-ink-2">A click is two button operators, BB. Physical operators only: {seconds(BASE)} s.</p>
        </li>
        <li className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
          <p className="label">3. With mental operators (Rule 0)</p>
          <p className="formula mt-1 text-sm text-ink">{WITH_M.replaceAll(" B B", " BB")}</p>
          <p className="mt-1 text-xs text-ink-2">M goes before keystrokes and before pointing that selects a command: {seconds(WITH_M)} s.</p>
        </li>
        <li className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
          <p className="label">4. Then</p>
          <p className="mt-1 text-sm text-ink">Remove any M that is fully anticipated from the previous step, document each such judgement, and add R only where the user must wait for the system.</p>
        </li>
      </ol>
      <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="Operator times">
        <p className="label">Standard operator times</p>
        <ul className="mt-1.5 grid gap-x-4 gap-y-1 text-sm text-ink @2xl:grid-cols-2">
          {operators.map(([k, v]) => (
            <li key={k} className="min-w-0">
              <span className="formula mr-2 text-accent">{k}</span>
              {v.name}: {v.seconds.toFixed(2)} s
            </li>
          ))}
        </ul>
        <p className="mt-1.5 text-xs text-ink-2">K depends on typing skill; the value shown is a common default. R(t) is the system’s response time when the user must wait.</p>
      </section>
      <p className="text-xs text-ink-2">The model predicts expert, error-free, routine execution time to compare designs. The hardest judgement is where to put M, so model competing designs with the same assumptions.</p>
    </div>
  );
}
