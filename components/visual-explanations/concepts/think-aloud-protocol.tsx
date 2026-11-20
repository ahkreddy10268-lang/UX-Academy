/**
 * Think-aloud protocol — protocols ordered by how much the moderator says
 * during the task (silent → classic → relaxed → coaching), then the two
 * variants that move the talk after the task (retrospective, hybrid). Each
 * card restates content/knowledge/research/think-aloud-protocol.ts and names
 * the study behind its "effect" line. Text is real HTML; on narrow containers
 * the row becomes a list in the same order, and the order is also stated in
 * words, so nothing depends on position alone.
 */
type Protocol = { n: string; name: string; says: string; get: string; effect: string; source: string };

const DURING: Protocol[] = [
  {
    n: "1",
    name: "Silent observation",
    says: "Nothing during tasks.",
    get: "Behaviour and natural task times; no reasons or expectations.",
    effect: "The baseline the other protocols are compared with.",
    source: "Hertzum et al. 2009; Olmsted-Hawala et al. 2010",
  },
  {
    n: "2",
    name: "Classic think-aloud",
    says: "“Please keep talking.”",
    get: "What the person is attending to, as it happens.",
    effect: "Little or no effect on behaviour apart from longer tasks.",
    source: "Ericsson & Simon 1980; Hertzum et al. 2009",
  },
  {
    n: "3",
    name: "Relaxed think-aloud",
    says: "Reminders plus questions and probes.",
    get: "Explanations, at the risk of inference rather than report.",
    effect: "Changed navigation behaviour and raised mental workload.",
    source: "Hertzum et al. 2009; McDonald et al. 2012",
  },
  {
    n: "4",
    name: "Coaching",
    says: "Help, hints and encouragement.",
    get: "A smoother session — and results shaped by the moderator.",
    effect: "Higher task accuracy and satisfaction than other protocols.",
    source: "Olmsted-Hawala et al. 2010",
  },
];

const AFTER: Protocol[] = [
  {
    n: "R",
    name: "Retrospective",
    says: "Silent task, then commentary over the recording.",
    get: "Talk that cannot disturb the task; depends on memory and the recording.",
    effect: "Comparable problems, found more through talk (van den Haak); fewer than concurrent at about twice the evaluator time (Alhadreti).",
    source: "van den Haak et al. 2003; Alhadreti & Mayhew 2018",
  },
  {
    n: "H",
    name: "Hybrid",
    says: "Concurrent talk, then a retrospective review.",
    get: "Both kinds of data from one participant.",
    effect: "Output comparable to concurrent alone, at about twice the evaluator time.",
    source: "Alhadreti & Mayhew 2018",
  },
];

function ProtocolCard({ p, highlight = false }: { p: Protocol; highlight?: boolean }) {
  return (
    <li className={`min-w-0 rounded-lg border bg-surface p-3.5 ${highlight ? "border-accent" : "border-rule-strong"}`}>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="formula text-sm text-accent">{p.n}</span>
        <p className="t-sub text-base text-ink">{p.name}</p>
      </div>
      {highlight && <p className="label mt-1 !text-accent">Usual default for finding problems</p>}
      <dl className="mt-2 space-y-1.5 text-sm">
        <div>
          <dt className="label">Moderator says</dt>
          <dd className="text-ink">{p.says}</dd>
        </div>
        <div>
          <dt className="label">You get</dt>
          <dd className="text-ink-2">{p.get}</dd>
        </div>
        <div>
          <dt className="label">Evidence</dt>
          <dd className="text-ink-2">{p.effect}</dd>
        </div>
      </dl>
      <p className="mt-2 border-t border-rule pt-2 text-xs text-ink-3">{p.source}</p>
    </li>
  );
}

export function ThinkAloudProtocols() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">The more the moderator says, the more the result describes the session rather than the design.</span> Protocols 1 to 4 are ordered from least to most moderator talk during the task.
      </p>
      <div className="flex items-center gap-2 text-xs text-ink-2" aria-hidden>
        <span className="label">Less moderator talk</span>
        <span className="h-px min-w-0 flex-1 bg-rule-strong" />
        <span className="text-ink-3">→</span>
        <span className="label">More</span>
      </div>
      <ol className="grid gap-3 @2xl:grid-cols-4" aria-label="Protocols during the task, from least to most moderator talk">
        {DURING.map((p) => (
          <ProtocolCard key={p.n} p={p} highlight={p.n === "2"} />
        ))}
      </ol>
      <p className="label pt-1">Moving the talk after the task</p>
      <ul className="grid gap-3 @2xl:grid-cols-2" aria-label="Protocols that move the talk after the task">
        {AFTER.map((p) => (
          <ProtocolCard key={p.n} p={p} />
        ))}
      </ul>
      <p className="text-xs text-ink-2">
        The studies used different products, tasks and participants and disagree on whether concurrent talk lowers performance; the effects are per study, not general sizes.
      </p>
    </div>
  );
}
