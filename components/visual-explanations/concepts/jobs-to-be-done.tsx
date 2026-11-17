/**
 * Jobs to be done — from a job to the opportunities it reveals: what a job is,
 * the two ways of researching it, and how each ends in a decision. Restates
 * content/knowledge/frameworks/jobs-to-be-done.ts (Christensen et al. 2016;
 * Ulwick 2005). Text is real HTML in ordered lists at every width.
 */
const SWITCH = ["First thought", "Passive looking", "Active looking", "Deciding", "Using"];
const FORCES = [
  { name: "Push", what: "of the current situation" },
  { name: "Pull", what: "of the new solution" },
  { name: "Anxiety", what: "about the new" },
  { name: "Habit", what: "of the present" },
];
const ODI = [
  "Break the core functional job into steps (a job map).",
  "Write desired outcome statements for each step: a direction, a metric and an object, such as “minimise the time it takes to confirm a payment has been received”.",
  "Customers rate each outcome’s importance and current satisfaction.",
  "Important but poorly satisfied outcomes are the opportunities; over-served outcomes suggest room for simpler, cheaper offerings.",
];

export function JobsToBeDoneFlow() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">A job is the progress a person is trying to make in a particular circumstance.</span> The circumstance, not the customer’s characteristics, explains the choice; a job has functional, social and emotional dimensions.
      </p>
      <section className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5" aria-label="Job statement">
        <p className="label">Write the job without naming a solution</p>
        <p className="mt-1.5 text-sm text-ink">“Help me get my family fed with a healthy meal on a busy weeknight”, not “order from a recipe app”. Situational detail often goes into a job story: When [situation], I want to [motivation], so I can [outcome].</p>
      </section>
      <div className="grid gap-3 @2xl:grid-cols-2">
        <section className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5" aria-label="Qualitative research">
          <p className="label">Qualitative: switch interviews</p>
          <p className="mt-1.5 text-sm text-ink">Talk to people who recently started or stopped using a solution and reconstruct the timeline.</p>
          <ol className="mt-2 flex flex-wrap items-center gap-1.5 text-xs" aria-label="Switch timeline">
            {SWITCH.map((s, i) => (
              <li key={s} className="flex items-center gap-1.5">
                <span className="rounded-sm border border-accent bg-accent-wash px-2 py-0.5 text-ink">{s}</span>
                {i < SWITCH.length - 1 && (
                  <span aria-hidden className="text-ink-3">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="label mt-3">Forces of progress</p>
          <ul className="mt-1.5 grid gap-1.5 text-sm text-ink @xl:grid-cols-2" aria-label="Forces of progress">
            {FORCES.map((f) => (
              <li key={f.name} className="min-w-0">
                <span className="font-semibold">{f.name}</span> {f.what}
              </li>
            ))}
          </ul>
        </section>
        <section className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5" aria-label="Quantitative research">
          <p className="label">Quantitative: outcome-driven innovation</p>
          <ol className="mt-1.5 list-decimal space-y-1.5 pl-5 text-sm text-ink" aria-label="Outcome-driven innovation steps">
            {ODI.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ol>
        </section>
      </div>
      <p className="text-xs text-ink-2">Recruit by recent behaviour, such as having switched in the last 90 days, not by demographics, and ask for concrete stories rather than opinions about features.</p>
    </div>
  );
}
