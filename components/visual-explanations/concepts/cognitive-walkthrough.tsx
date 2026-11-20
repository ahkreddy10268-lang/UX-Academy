/**
 * Cognitive walkthrough — the four questions asked at each step, which half of
 * Norman's gulfs each probes, and the design concept it points to; plus what
 * goes in and what comes out. Restates
 * content/knowledge/research/cognitive-walkthrough.ts (Wharton et al. 1994's
 * four questions; Spencer 2000's streamlined version). Text is real HTML;
 * each question stacks as question → gulf → concept at every width.
 */
type Q = { n: string; q: string; gulf: "Execution" | "Evaluation"; concept?: string };

const QUESTIONS: Q[] = [
  { n: "1", q: "Will the user try to achieve the right effect?", gulf: "Execution" },
  { n: "2", q: "Will the user notice that the correct action is available?", gulf: "Execution", concept: "Visibility and signifiers" },
  { n: "3", q: "Will the user associate the correct action with the effect they are trying to achieve?", gulf: "Execution", concept: "Labels and mental models" },
  { n: "4", q: "If the correct action is performed, will the user see that progress is being made towards their goal?", gulf: "Evaluation", concept: "Feedback" },
];

export function WalkthroughQuestions() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">At each step of a task, the group answers four questions.</span> Questions 1 to 3 ask whether the user can get from intention to action; question 4 asks whether they can interpret the result.
      </p>
      <ol className="space-y-2" aria-label="The four walkthrough questions">
        {QUESTIONS.map((x) => (
          <li key={x.n} className="grid min-w-0 gap-x-4 gap-y-1.5 rounded-lg border border-rule-strong bg-surface p-3.5 @2xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <p className="min-w-0 text-sm text-ink">
              <span className="formula mr-2 text-sm text-accent">{x.n}</span>
              {x.q}
            </p>
            <p className="min-w-0 text-sm text-ink">
              <span className="label block">Gulf probed</span>
              {x.gulf}
            </p>
            <p className="min-w-0 text-sm text-ink-2">
              <span className="label block">Design concept</span>
              {x.concept ?? "Not mapped in the entry"}
            </p>
          </li>
        ))}
      </ol>
      <div className="grid gap-3 @2xl:grid-cols-3">
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="Inputs">
          <p className="label">In</p>
          <p className="mt-1.5 text-sm text-ink">A description of the users, representative tasks, the correct action sequence for each, and an interface at enough fidelity to judge each step.</p>
        </section>
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="At each step">
          <p className="label">At each step</p>
          <p className="mt-1.5 text-sm text-ink">The group agrees an answer to each question and, for every “no”, writes a failure story grounded in what the user knows and what the interface shows.</p>
        </section>
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="Outputs">
          <p className="label">Out</p>
          <p className="mt-1.5 text-sm text-ink">A list of failure points with reasons. Design ideas are captured separately, after the walkthrough.</p>
        </section>
      </div>
      <p className="text-xs text-ink-2">
        The streamlined version keeps two questions: will the user know what to do at this step, and, if they do the right thing, will they know they did and are making progress? It adds ground rules such as banning design discussion and defensiveness during the walkthrough.
      </p>
    </div>
  );
}
