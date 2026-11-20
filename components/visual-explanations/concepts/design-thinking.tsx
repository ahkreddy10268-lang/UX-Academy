/**
 * Design thinking — the three lenses (desirability, feasibility, viability),
 * each with its question, its owner and what checking it involves, and the
 * usability risk the lenses leave out. Restates
 * content/knowledge/foundations/design-thinking.ts (IDEO's introduction page;
 * Cagan's "four big risks"). Text is real HTML; each lens stacks as question →
 * owner → what to check at every width.
 */
type Lens = { name: string; ask: string; owner: string; check: string; tone?: "muted" };

const LENSES: Lens[] = [
  {
    name: "Desirability",
    ask: "Are we solving a problem that matters to people?",
    owner: "Learned from people: research and testing with them. Cagan's closest counterpart is value risk: will customers buy it, or users choose to use it?",
    check: "Evidence of the problem and of people choosing the solution, from interviews, observation and prototype tests.",
  },
  {
    name: "Feasibility",
    ask: "Can we build it with today's technology and capabilities?",
    owner: "Answered by the people who will build it; Cagan makes the lead engineer responsible for this risk.",
    check: "Whether engineers can build what is needed with the time, skills and technology the team has.",
  },
  {
    name: "Viability",
    ask: "Can the solution succeed and endure within real-world constraints?",
    owner: "Answered against the business; Cagan makes the product manager responsible for it.",
    check: "Fit with the sales channel, partner contracts and legal compliance, the cost of acquiring customers, monetisation, and consistency with the brand promise.",
  },
  {
    name: "Usability (not a lens)",
    ask: "Can people figure out how to use it?",
    owner: "Cagan's fourth risk; he makes the product designer responsible for it.",
    check: "Task-based testing with representative people. None of the three lenses asks this, so it needs its own evidence.",
    tone: "muted",
  },
];

export function DesignThinkingLenses() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Three questions, three kinds of evidence.</span> IDEO judges ideas by what is desirable for people, feasible with technology and viable for the organisation, and weighs the three by its values rather than ticking them off.
      </p>
      <ol className="space-y-2" aria-label="The design-thinking lenses and the usability risk">
        {LENSES.map((l, i) => (
          <li
            key={l.name}
            className={`grid min-w-0 gap-x-4 gap-y-1.5 rounded-lg border bg-surface p-3.5 @2xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)] ${l.tone === "muted" ? "border-dashed border-rule-strong" : "border-rule-strong"}`}
          >
            <div className="min-w-0">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="formula text-sm text-accent">{i + 1}</span>
                <span className="t-sub text-base text-ink">{l.name}</span>
              </p>
              <p className="mt-1 text-sm text-ink-2">{l.ask}</p>
            </div>
            <p className="min-w-0 text-sm text-ink">
              <span className="label block">Who answers it</span>
              {l.owner}
            </p>
            <p className="min-w-0 text-sm text-ink-2">
              <span className="label block">What to check</span>
              {l.check}
            </p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-ink-2">The questions are IDEO&rsquo;s; the owners and the list of viability risks are Cagan&rsquo;s practitioner framework. Neither is a tested model.</p>
    </div>
  );
}
