/**
 * In-depth interviews — which claims interview data can support. Six kinds of
 * claim, grouped as well supported, supported with care, and not supported,
 * each with the question that produces it and what to use instead when
 * interviews are the wrong tool. Restates
 * content/knowledge/research/in-depth-interviews.ts. Strength is stated in
 * words in every row (never by colour alone); on narrow containers each group
 * is a list in reading order.
 */
type Claim = { claim: string; ask: string; why: string; instead?: string };
type Group = { strength: string; tone: "ok" | "warn" | "error"; claims: Claim[] };

const GROUPS: Group[] = [
  {
    strength: "Well supported",
    tone: "ok",
    claims: [
      {
        claim: "Experiences, feelings and what mattered",
        ask: "“Tell me about the last time…”",
        why: "This is what interviews are for: people's own accounts of their lives and needs.",
      },
      {
        claim: "Vocabulary and mental models",
        ask: "“What do you mean by …?”",
        why: "People's words and ways of thinking about a topic appear directly in what they say.",
      },
    ],
  },
  {
    strength: "Supported with care",
    tone: "warn",
    claims: [
      {
        claim: "What happened on a specific occasion",
        ask: "“Walk me through what you did, step by step.”",
        why: "Specific incidents carry detail; memory still fades and people omit what they think is irrelevant.",
        instead: "Corroborate with observation or records when the detail matters.",
      },
      {
        claim: "The person's reasons for a choice",
        ask: "“What were you thinking at that point?”",
        why: "Valuable as their account, but people may give a plausible cause rather than the actual influence.",
        instead: "Look for events in the story that support or contradict the stated reason.",
      },
    ],
  },
  {
    strength: "Not supported",
    tone: "error",
    claims: [
      {
        claim: "How common something is",
        ask: "Counting answers across a dozen interviews",
        why: "Purposive samples sized for saturation show what exists, not how often.",
        instead: "Survey or analytics.",
      },
      {
        claim: "What people will do or buy",
        ask: "“Would you use…?”",
        why: "Hypothetical answers invite polite agreement and predict little.",
        instead: "Behavioural tests: prototypes, usability tests, experiments.",
      },
    ],
  },
];

const TONE = {
  ok: { border: "border-ok/50", text: "!text-ok" },
  warn: { border: "border-warn/60", text: "!text-warn" },
  error: { border: "border-error/50", text: "!text-error" },
} as const;

export function InterviewClaims() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Interviews collect what people say.</span> That is strong evidence about experience and meaning, weaker evidence about past behaviour and reasons, and no evidence about frequency or future behaviour.
      </p>
      <div className="grid gap-3 @2xl:grid-cols-3">
        {GROUPS.map((g) => (
          <section key={g.strength} aria-label={g.strength} className={`min-w-0 rounded-lg border bg-surface p-3.5 ${TONE[g.tone].border}`}>
            <p className={`label ${TONE[g.tone].text}`}>{g.strength}</p>
            <ul className="mt-2 space-y-3">
              {g.claims.map((c) => (
                <li key={c.claim} className="min-w-0 border-t border-rule pt-2 first:border-0 first:pt-0">
                  <p className="t-sub text-base text-ink">{c.claim}</p>
                  <p className="mt-1 text-sm text-ink">
                    <span className="label mr-1">Ask</span>
                    {c.ask}
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{c.why}</p>
                  {c.instead && (
                    <p className="mt-1 text-xs text-ink-2">
                      <span className="font-semibold text-ink">Instead or as well:</span> {c.instead}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
