/**
 * The gulfs of execution and evaluation — Norman's seven stages of action
 * split into the execution side and the evaluation side, with the design
 * question each side asks and what answers it. Restates
 * content/knowledge/psychology/gulfs-of-execution-and-evaluation.ts (Norman
 * 1986, 2013). Text is real HTML in ordered lists at every width.
 */
type Side = { name: string; gulf: string; stages: string[]; question: string[]; answers: string; breakdown: string };

const SIDES: Side[] = [
  {
    name: "Execution",
    gulf: "How do I make it do what I want?",
    stages: ["Goal", "Plan", "Specify", "Perform"],
    question: ["What can I do?", "What alternatives exist?", "How do I do it?"],
    answers: "Signifiers, mapping, constraints and visible options.",
    breakdown: "“I don’t know how to…”",
  },
  {
    name: "Evaluation",
    gulf: "Did it work?",
    stages: ["Perceive", "Interpret", "Compare"],
    question: ["What happened?", "What does it mean?", "Is it what I wanted?"],
    answers: "Feedback, visible system status and a clear conceptual model.",
    breakdown: "“Did that work?” or a misreading of the result.",
  },
];

export function GulfsOfAction() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Every use of a system crosses two gaps.</span> The seven stages of action fall on either side of the system: the user turns an intention into actions it accepts, then turns its output back into terms of the goal.
      </p>
      <ol className="grid gap-3 @2xl:grid-cols-2" aria-label="The two gulfs and their stages">
        {SIDES.map((s) => (
          <li key={s.name} className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
            <p className="t-sub text-base text-ink">Gulf of {s.name.toLowerCase()}</p>
            <p className="label mt-0.5">{s.gulf}</p>
            <ol className="mt-2 flex flex-wrap items-center gap-1.5 text-xs" aria-label={`${s.name} stages`}>
              {s.stages.map((st, i) => (
                <li key={st} className="flex items-center gap-1.5">
                  <span className="rounded-sm border border-accent bg-accent-wash px-2 py-0.5 text-ink">{st}</span>
                  {i < s.stages.length - 1 && (
                    <span aria-hidden className="text-ink-3">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="label mt-3">The design questions</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink">
              {s.question.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-ink">
              <span className="label block">Answered by</span>
              {s.answers}
            </p>
            <p className="mt-2 border-t border-rule pt-2 text-xs text-ink-2">
              <span className="font-semibold text-ink">A breakdown sounds like:</span> {s.breakdown}
            </p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-ink-2">The gulfs can be bridged from either side: users learn the system, or designers change the interface, and usability work aims to move that burden from users to the design. Many real interactions are opportunistic, so the cycle can begin at any stage.</p>
    </div>
  );
}
