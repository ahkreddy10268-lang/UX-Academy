/**
 * Usability testing — one test cycle from research questions to the next round,
 * with what is measured and how sessions are run. Restates
 * content/knowledge/research/usability-testing.ts (test plan, protocol,
 * implementation steps, formative and summative measures). Text is real HTML in
 * an ordered list, so the reading order is the process order at every width.
 */
type Stage = { n: string; name: string; does: string };

const STAGES: Stage[] = [
  { n: "1", name: "Research questions and tasks", does: "Write 3–5 research questions and derive the tasks from them. Each task states a goal and context in the user's language, avoids the interface's labels, and has a defined success criterion." },
  { n: "2", name: "Participants", does: "Recruit people who match the target users on the characteristics that affect the tasks: domain knowledge, experience, accessibility needs." },
  { n: "3", name: "Pilot", does: "Run the protocol with one person and fix confusing tasks before the real sessions." },
  { n: "4", name: "Sessions", does: "Stay neutral: do not explain the interface, praise or correct, and answer questions with questions. Think-aloud is standard in formative testing." },
  { n: "5", name: "Record", does: "Note each problem with participant, task, observed behaviour and quote. Rate severity after all sessions." },
  { n: "6", name: "Synthesise", does: "Combine across participants, report problems by severity and frequency, and agree fixes." },
  { n: "7", name: "Iterate", does: "Test again after the changes, ideally with new participants." },
];

export function UsabilityTestCycle() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">A usability test is a cycle, not a single event.</span> Steps 1 to 3 are planning, 4 and 5 happen in the sessions, 6 and 7 turn what was seen into changes and a new round.
      </p>
      <ol className="grid gap-3 @2xl:grid-cols-2" aria-label="Usability test cycle, steps 1 to 7">
        {STAGES.map((s) => (
          <li key={s.n} className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="formula text-sm text-accent">{s.n}</span>
              <span className="t-sub text-base text-ink">{s.name}</span>
            </p>
            <p className="mt-2 text-sm text-ink">{s.does}</p>
          </li>
        ))}
      </ol>
      <div className="grid gap-3 @2xl:grid-cols-2">
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="What is measured">
          <p className="label">What is measured</p>
          <p className="mt-1.5 text-sm text-ink">
            <span className="font-semibold">Formative:</span> observed problems, to improve the design.
          </p>
          <p className="mt-1.5 text-sm text-ink">
            <span className="font-semibold">Summative:</span> task success, time on task, errors and questionnaires such as the SUS. Think-aloud can change task times, so measurements are often taken without it.
          </p>
        </section>
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="How sessions are run">
          <p className="label">How sessions are run</p>
          <p className="mt-1.5 text-sm text-ink">
            <span className="font-semibold">Moderated</span> (in person or remote): allows probing and adapting.
          </p>
          <p className="mt-1.5 text-sm text-ink">
            <span className="font-semibold">Unmoderated:</span> reaches more participants quickly, but loses the ability to ask why and is more vulnerable to low-quality participation.
          </p>
        </section>
      </div>
      <p className="text-xs text-ink-2">Each extra participant tends to reveal fewer new problems, because common problems are seen early; the entry’s problem-discovery model quantifies this for a given problem frequency.</p>
    </div>
  );
}
