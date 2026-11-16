/**
 * Contextual inquiry — from one session to shared team understanding: the
 * four parts of a session (primer, transition, contextual interview, wrap-up)
 * and the two team steps that follow (interpretation session,
 * consolidation). Each stage gives what happens and the risk it guards
 * against. Restates content/knowledge/research/contextual-inquiry.ts. Text is
 * real HTML in an ordered list, so the reading order is the process order at
 * every width.
 */
type Stage = { n: string; name: string; who: string; does: string; guards: string; loop?: string[] };

const SESSION: Stage[] = [
  {
    n: "1",
    name: "Primer",
    who: "Researcher and participant",
    does: "Purpose, consent and recording; an overview of today's work; an invitation to correct you.",
    guards: "Starting without trust or permission.",
  },
  {
    n: "2",
    name: "Transition",
    who: "Researcher",
    does: "Say explicitly: from now on, work as normal; I'll interrupt when something is interesting.",
    guards: "The participant staying in interview mode and summarising.",
  },
  {
    n: "3",
    name: "Contextual interview",
    who: "Participant leads the work",
    does: "Repeated cycles while the real work goes on.",
    guards: "A list of grievances, or a tour of the official process.",
    loop: ["Watch", "Ask about what you just saw", "Offer an interpretation", "Confirm or correct"],
  },
  {
    n: "4",
    name: "Wrap-up",
    who: "Researcher and participant",
    does: "Summarise what you understood; held-back interpretations get checked now.",
    guards: "Leaving with interpretations nobody has checked.",
  },
];

const TEAM: Stage[] = [
  {
    n: "5",
    name: "Interpretation session",
    who: "Cross-functional team, soon after the visit",
    does: "Retell the whole session; capture insights, issues and implications for design.",
    guards: "One researcher's memory becoming the only record.",
  },
  {
    n: "6",
    name: "Consolidation",
    who: "Team, across all sessions",
    does: "Affinity mapping and work models reveal common strategies while keeping individual differences.",
    guards: "Designing from the most memorable visit.",
  },
];

function StageCard({ s }: { s: Stage }) {
  return (
    <li className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="formula text-sm text-accent">{s.n}</span>
        <p className="t-sub text-base text-ink">{s.name}</p>
      </div>
      <p className="label mt-0.5">{s.who}</p>
      <p className="mt-2 text-sm text-ink">{s.does}</p>
      {s.loop && (
        <ol className="mt-2 flex flex-wrap items-center gap-1.5 text-xs" aria-label="Repeated cycle">
          {s.loop.map((l, i) => (
            <li key={l} className="flex items-center gap-1.5">
              <span className="rounded-sm border border-accent bg-accent-wash px-2 py-0.5 text-ink">{l}</span>
              <span aria-hidden className="text-ink-3">
                {i < s.loop!.length - 1 ? "→" : "↺"}
              </span>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-2 border-t border-rule pt-2 text-xs text-ink-2">
        <span className="font-semibold text-ink">Guards against:</span> {s.guards}
      </p>
    </li>
  );
}

export function ContextualInquiryProcess() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">One session at the participant’s place, then two steps with the team.</span> Stages 1–4 happen during the visit; 5 and 6 turn one person’s notes into shared understanding.
      </p>
      <p className="label">During the visit</p>
      <ol className="grid gap-3 @2xl:grid-cols-4" aria-label="Session stages 1 to 4">
        {SESSION.map((s) => (
          <StageCard key={s.n} s={s} />
        ))}
      </ol>
      <p className="label pt-1">After the visit</p>
      <ol className="grid gap-3 @2xl:grid-cols-2" aria-label="Team stages 5 and 6">
        {TEAM.map((s) => (
          <StageCard key={s.n} s={s} />
        ))}
      </ol>
    </div>
  );
}
