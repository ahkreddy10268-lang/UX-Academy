/**
 * Interaction Design — the user ⇄ system loop. Nine steps split between the
 * person's side and the system's side, joined by an input channel (person →
 * system) and an output channel (system → person), with a return path from the
 * next action into a new turn of the loop and one annotated failure point.
 * Conceptual model; labels restate content/knowledge/foundations/
 * interaction-design-discipline.ts (Norman's action cycle and gulfs; feedback
 * and state). The bill-payment lines are an illustrative example.
 */
import type { ReactNode } from "react";
import { IllustrativeBadge, Marker } from "../primitives";

type Step = { n: number; name: string; what: string; eg: string };

const PERSON_BEFORE: Step[] = [
  { n: 1, name: "Goal", what: "What the person wants to be true.", eg: "The electricity bill is paid." },
  { n: 2, name: "Intention", what: "A plan for what to do next, based on their mental model.", eg: "Pay £45 now from the current account." },
  { n: 3, name: "Action / input", what: "What they physically do, received by the system as input.", eg: "Presses ‘Pay £45’." },
];
const SYSTEM: Step[] = [
  { n: 4, name: "System processing", what: "The system interprets the input and does the work.", eg: "Validates the request, sends it to the payment network." },
  { n: 5, name: "State transition", what: "The system moves to a new state, which decides what it will do next.", eg: "Ready → processing → paid; balance £320 → £275." },
  { n: 6, name: "Output / feedback", what: "What the system presents to report the response and the new state.", eg: "‘Paying…’ at once, then ‘Paid £45 to City Power’ with a reference." },
];
const PERSON_AFTER: Step[] = [
  { n: 7, name: "Perception", what: "What the person notices of the output, if anything.", eg: "Sees the tick and the amount." },
  { n: 8, name: "Interpretation and evaluation", what: "What they conclude happened, compared with the goal.", eg: "Paid once, right amount: goal met." },
  { n: 9, name: "Next action", what: "Stop, continue, correct or retry: a new turn of the loop.", eg: "Closes the app, or saves the receipt." },
];

function StepCard({ s, side }: { s: Step; side: "person" | "system" }) {
  return (
    <div className={`h-full rounded-md border p-3 ${side === "person" ? "border-rule bg-c-wash" : "border-rule-strong bg-soft"}`}>
      <p className="flex items-start gap-2">
        <Marker n={s.n} tone={side === "person" ? "c" : "ink"} />
        <span className="t-sub text-sm leading-snug text-ink">{s.name}</span>
      </p>
      <p className="mt-1 text-sm text-ink-2">{s.what}</p>
      <p className="mt-1.5 border-t border-rule pt-1.5 text-xs text-ink-2">
        <span className="font-semibold text-ink">e.g. </span>
        {s.eg}
      </p>
    </div>
  );
}

/** Horizontal channel arrow on wide screens; a downward arrow with the same label when stacked. */
function Channel({ label, dir, className }: { label: string; dir: "right" | "left"; className: string }) {
  return (
    <div aria-hidden className={`flex flex-col items-center justify-center gap-1 py-1 text-ink-3 ${className}`}>
      <svg viewBox="0 0 96 16" className="hidden h-4 w-full @3xl:block" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none">
        {dir === "right" ? <path d="M4 8h86M82 2l8 6-8 6" vectorEffect="non-scaling-stroke" /> : <path d="M92 8H6M14 2l-8 6 8 6" vectorEffect="non-scaling-stroke" strokeDasharray={undefined} />}
      </svg>
      <svg viewBox="0 0 24 24" className="h-6 w-6 @3xl:hidden" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v17M6 14l6 6 6-6" />
      </svg>
      <span className="text-center text-xs font-semibold uppercase tracking-[0.06em] text-ink-2">{label}</span>
    </div>
  );
}

function ColumnHead({ children, className }: { children: ReactNode; className: string }) {
  return <p className={`t-sub hidden text-xs uppercase tracking-[0.08em] text-ink-3 @3xl:block ${className}`}>{children}</p>;
}

export function InteractionLoop() {
  return (
    <div className="space-y-3">
      <p className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
        <span className="rounded-full border border-rule-strong bg-soft px-2.5 py-0.5 font-semibold text-ink">Conceptual model</span>
        Not a literal sequence for every interaction: steps overlap, repeat and are often skipped by experienced users.
        <IllustrativeBadge>Example: paying a bill</IllustrativeBadge>
      </p>
      <ol className="grid gap-2 @3xl:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] @3xl:gap-x-2 @3xl:gap-y-2">
        <li aria-hidden className="contents">
          <ColumnHead className="@3xl:col-start-1 @3xl:row-start-1">Person</ColumnHead>
          <ColumnHead className="@3xl:col-start-3 @3xl:row-start-1">System</ColumnHead>
        </li>
        {PERSON_BEFORE.map((s, i) => (
          <li key={s.n} className={`@3xl:col-start-1 ${["@3xl:row-start-2", "@3xl:row-start-3", "@3xl:row-start-4"][i]}`}>
            <StepCard s={s} side="person" />
          </li>
        ))}
        <li aria-hidden className="contents">
          <Channel label="input" dir="right" className="@3xl:col-start-2 @3xl:row-start-4" />
        </li>
        <li className="@3xl:col-start-3 @3xl:row-start-2 @3xl:row-span-2 @3xl:self-start">
          <div className="rounded-md border border-dashed border-rule-strong p-3 text-sm text-ink-2">
            <p className="t-sub text-sm text-ink">Hidden from the person</p>
            <p className="mt-1">Processing and state live inside the system. The person can know them only through what the system outputs, which is why steps 5 and 6 must agree.</p>
          </div>
        </li>
        {SYSTEM.map((s, i) => (
          <li key={s.n} className={`@3xl:col-start-3 ${["@3xl:row-start-4", "@3xl:row-start-5", "@3xl:row-start-6"][i]}`}>
            <StepCard s={s} side="system" />
          </li>
        ))}
        <li aria-hidden className="contents">
          <Channel label="output" dir="left" className="@3xl:col-start-2 @3xl:row-start-6" />
        </li>
        {PERSON_AFTER.map((s, i) => (
          <li key={s.n} className={`@3xl:col-start-1 ${["@3xl:row-start-6", "@3xl:row-start-7", "@3xl:row-start-8"][i]}`}>
            <StepCard s={s} side="person" />
          </li>
        ))}
        <li className="@3xl:col-start-3 @3xl:row-start-7 @3xl:row-span-2 @3xl:self-start">
          <div className="rounded-md border-2 border-error bg-error-wash p-3 text-sm">
            <p className="t-sub flex items-center gap-2 text-sm text-ink">
              <span className="rounded-sm border border-error px-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-error">Failure point</span>
              Between 6 and 8
            </p>
            <p className="mt-1.5 text-ink">The payment network times out. If step 6 shows nothing, or the same spinner forever, the person cannot evaluate what happened.</p>
            <p className="mt-1.5 text-ink-2">
              <span className="font-semibold text-ink">Consequence: </span>
              they guess. Pressing again may pay twice; leaving may mean the bill goes unpaid.
            </p>
            <p className="mt-1.5 text-ink-2">
              <span className="font-semibold text-ink">Design response: </span>
              show the real state (‘Not confirmed yet. Don&apos;t pay again: we&apos;ll check and tell you.’), list the payment as pending, and give a way to check it.
            </p>
          </div>
        </li>
      </ol>
      <div className="flex items-start gap-3 rounded-lg border border-rule bg-surface p-3 text-sm text-ink-2">
        <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-ink-3" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
        </svg>
        <p>
          <span className="font-semibold text-ink">9 → 2: the loop repeats.</span> The next action starts from a new intention, shaped by what the person just understood. Steps 1–3 are where people must work out how to act (the gulf of execution); steps 6–8 are where they work out what happened (the gulf of evaluation).
        </p>
      </div>
    </div>
  );
}
