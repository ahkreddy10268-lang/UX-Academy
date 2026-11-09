/**
 * Accessibility — three perspectives on disability read through one
 * illustrative scenario, in the dark technical editorial system (illustration
 * v6, D-086). One scenario card (a lecture video without captions) branches to
 * three lens modules (individual/medical, social, WHO ICF), each showing the
 * question it asks, the response it foregrounds and its five-point profile; a
 * separately styled rights band (UN CRPD) connects to all three, because the
 * Convention is a treaty that applies across perspectives, not a fourth model.
 * Text is real HTML; SVG draws only connectors and miniature visuals. Content
 * restates content/knowledge/accessibility/accessibility-concept.ts.
 */
import type { ReactNode } from "react";

const ASPECTS = ["Where the difficulty is located", "What it asks us to examine", "Interventions it foregrounds", "What it explains well", "What it can leave out"] as const;

type Lens = { key: "A" | "B" | "C"; name: string; origin: string; question: string; response: string; visual: ReactNode; rows: [string, string, string, string, string] };

const stroke = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const, vectorEffect: "non-scaling-stroke" as const };

/** A: attention on one person's needs — one case in a list is selected. */
function IndividualVisual() {
  return (
    <svg viewBox="0 0 120 44" className="mx-auto block h-auto w-full max-w-[16rem]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={4} y={4 + i * 9.5} width={112} height={7} rx={2} fill={i === 1 ? "var(--viz-accent-soft)" : "var(--viz-surface-2)"} stroke={i === 1 ? "var(--viz-accent)" : "var(--viz-edge)"} strokeWidth={0.8} {...stroke} />
          <circle cx={10} cy={7.5 + i * 9.5} r={1.6} fill={i === 1 ? "var(--viz-accent)" : "var(--viz-edge-hi)"} />
          <rect x={16} y={6.6 + i * 9.5} width={i === 1 ? 52 : 40 - i * 4} height={1.8} rx={0.9} fill={i === 1 ? "var(--viz-text)" : "var(--viz-text-3)"} />
        </g>
      ))}
    </svg>
  );
}

/** B: attention on the default — every recording now carries captions. */
function SocialVisual() {
  return (
    <svg viewBox="0 0 120 44" className="mx-auto block h-auto w-full max-w-[16rem]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${4 + i * 39} 4)`}>
          <rect width={34} height={30} rx={2.5} fill="var(--viz-surface-2)" stroke="var(--viz-edge)" strokeWidth={0.8} {...stroke} />
          <path d="M13 9 L22 14.5 L13 20 Z" fill="var(--viz-edge-hi)" />
          <rect x={4} y={24} width={13} height={3} rx={1.5} fill="var(--viz-text-2)" />
          <rect x={20} y={21} width={12} height={8.5} rx={1.4} fill="var(--viz-positive-soft)" stroke="var(--viz-positive)" strokeWidth={0.8} {...stroke} />
          <text x={26} y={27.4} textAnchor="middle" fontSize={6} fontWeight={700} fill="var(--viz-positive)" fontFamily="var(--font-plex-mono), monospace">
            CC
          </text>
        </g>
      ))}

    </svg>
  );
}

/** C: attention on the interaction — four components, the environmental factor highlighted. */
function IcfVisual() {
  const n: [number, number, string, boolean][] = [
    [22, 12, "health", false],
    [60, 6, "activity", false],
    [96, 12, "participation", false],
    [60, 30, "environment", true],
  ];
  return (
    <svg viewBox="0 0 120 44" className="mx-auto block h-auto w-full max-w-[16rem]" aria-hidden>
      {[
        [0, 1],
        [1, 2],
        [0, 3],
        [1, 3],
        [2, 3],
      ].map(([a, b]) => (
        <line key={`${a}${b}`} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke="var(--viz-edge-hi)" strokeWidth={0.8} {...stroke} />
      ))}
      {n.map(([x, y, t, hi]) => (
        <g key={t}>
          <circle cx={x} cy={y} r={3.4} fill={hi ? "var(--viz-accent)" : "var(--viz-surface-3)"} stroke={hi ? "var(--viz-accent)" : "var(--viz-edge-hi)"} strokeWidth={0.8} {...stroke} />
          <text x={x} y={y + (y > 20 ? 10 : 9.5)} textAnchor="middle" fontSize={5.8} fill={hi ? "var(--viz-accent)" : "var(--viz-text-3)"} fontFamily="var(--font-plex-mono), monospace">
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

const LENSES: Lens[] = [
  {
    key: "A",
    name: "Individual (medical) model",
    origin: "Clinical and rehabilitation traditions",
    question: "What does this student need?",
    response: "Arrange individual support.",
    visual: <IndividualVisual />,
    rows: [
      "In the person's impairment or health condition.",
      "Diagnosis, functional limits and individual needs.",
      "Treatment, rehabilitation, assistive devices and individual support.",
      "Health needs, pain and why some people need specific clinical or personal support.",
      "Inaccessible environments, services and attitudes; it can make the person the only place the problem lives.",
    ],
  },
  {
    key: "B",
    name: "Social model",
    origin: "UPIAS and the Disability Alliance, 1976; developed by Oliver and others",
    question: "Why are videos published without captions?",
    response: "Caption every video by default.",
    visual: <SocialVisual />,
    rows: [
      "In a social organisation that takes little or no account of people with impairments.",
      "Barriers in buildings, products, information, policies, procedures and attitudes.",
      "Removing barriers, changing defaults and policy, and decisions made with disabled people.",
      "Exclusion and segregation, and why the fix is often redesign rather than individual adjustment.",
      "Impairment experiences, such as pain or fatigue, that removing barriers does not resolve; first framed around physical impairment.",
    ],
  },
  {
    key: "C",
    name: "WHO ICF (biopsychosocial)",
    origin: "World Health Organization, 2001",
    question: "How do hearing, the activity of following lectures, participation in study and the missing captions interact?",
    response: "Consider them together: support and environmental change.",
    visual: <IcfVisual />,
    rows: [
      "In the interaction between a health condition and contextual factors, environmental and personal.",
      "Body functions and structures, activities, participation, and environmental and personal factors together.",
      "Both individual support and environmental change; describing and measuring functioning.",
      "Functioning in context, combining clinical and environmental information in one framework.",
      "It is a classification, not a political account; some scholars argue it still frames disability through health.",
    ],
  },
];

const RIGHTS = ["Dignity and autonomy", "Non-discrimination", "Full participation and inclusion", "Accessibility", "Equality of opportunity", "Reasonable accommodation", "Universal design"];

/** Corner brackets around an annotation group (decorative; meaning is in the text). */
function Brackets({ tone = "edge" }: { tone?: "edge" | "accent" }) {
  const c = tone === "accent" ? "border-viz-accent" : "border-viz-edge";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={`absolute left-0 top-0 h-2.5 w-2.5 border-l border-t ${c}`} />
      <span className={`absolute right-0 top-0 h-2.5 w-2.5 border-r border-t ${c}`} />
      <span className={`absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l ${c}`} />
      <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r ${c}`} />
    </span>
  );
}

/** Branching connector from the scenario to the three lenses (wide layouts only). */
function Branch() {
  return (
    <svg aria-hidden viewBox="0 0 300 40" preserveAspectRatio="none" className="hidden h-10 w-full @4xl:block">
      <path d="M150 0 V14" fill="none" stroke="var(--viz-edge-hi)" strokeWidth={1} {...stroke} />
      <path d="M50 40 V24 Q50 18 56 18 H244 Q250 18 250 24 V40 M150 18 V40" fill="none" stroke="var(--viz-edge-hi)" strokeWidth={1} {...stroke} />
      <circle cx={150} cy={18} r={2.2} fill="var(--viz-surface-3)" stroke="var(--viz-edge-hi)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Rights connectors from the band up to every lens (wide layouts only). */
function RightsLinks() {
  return (
    <svg aria-hidden viewBox="0 0 300 28" preserveAspectRatio="none" className="hidden h-7 w-full @4xl:block">
      {[50, 150, 250].map((x) => (
        <g key={x}>
          <path d={`M${x} 28 V4`} fill="none" stroke="var(--viz-accent)" strokeWidth={1.4} {...stroke} />
          <path d={`M${x - 3} 8 L${x} 3 L${x + 3} 8`} fill="none" stroke="var(--viz-accent)" strokeWidth={1.4} {...stroke} />
        </g>
      ))}
    </svg>
  );
}

export function DisabilityPerspectives() {
  return (
    <div className="space-y-3">
      <p className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
        <span className="rounded-full border border-rule-strong bg-soft px-2.5 py-0.5 font-semibold text-ink">Educational comparison</span>
        Simplified for comparison: not a complete history of disability theory, and the perspectives overlap in practice.
      </p>

      <div className="text-viz-text">
        {/* Scenario */}
        <section aria-labelledby="dp-scenario" className="relative">
          <div className="relative mb-3 px-3 py-2 @4xl:absolute @4xl:left-0 @4xl:top-1 @4xl:mb-0 @4xl:w-44">
            <Brackets />
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-viz-text-2">Scenario · illustrative</p>
            <p className="mt-1 text-xs text-viz-text-2">A deaf student cannot follow the recordings.</p>
          </div>
          <div className="mx-auto max-w-sm rounded-lg border border-viz-edge bg-viz-surface-2 p-3 shadow-[0_8px_24px_var(--viz-shadow)]">
            <div className="flex items-center gap-3">
              <div aria-hidden className="relative grid h-14 w-24 shrink-0 place-items-center rounded-md border border-viz-edge bg-viz-surface-1">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M9 7 L17 12 L9 17 Z" fill="var(--viz-edge-hi)" />
                </svg>
                <span className="absolute bottom-1 right-1 rounded-sm border border-dashed border-viz-warning px-1 font-mono text-[12px] font-bold leading-tight text-viz-warning line-through">CC</span>
                <span className="absolute bottom-1.5 left-1.5 h-0.5 w-10 rounded-full bg-viz-edge-hi" />
              </div>
              <div className="min-w-0">
                <h4 id="dp-scenario" className="t-sub text-base text-viz-text">
                  Lecture videos without captions
                </h4>
                <p className="mt-0.5 text-xs text-viz-text-2">
                  <span className="font-semibold text-viz-warning">Barrier:</span> published with no captions or transcript.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Branch />
        <div className="my-3 h-px bg-viz-edge-soft @4xl:hidden" aria-hidden />

        {/* Three lenses */}
        <div className="grid gap-3 @4xl:grid-cols-3">
          {LENSES.map((l) => (
            <section key={l.key} aria-labelledby={`dp-${l.key}`} className="flex min-w-0 flex-col rounded-lg border border-viz-edge bg-viz-surface-1">
              <div className="border-b border-viz-edge-soft p-3.5">
                <h4 id={`dp-${l.key}`} className="flex items-start gap-2">
                  <span aria-hidden className="inline-grid h-6 w-6 shrink-0 place-items-center rounded-sm border border-viz-edge-hi bg-viz-surface-3 font-mono text-xs font-semibold text-viz-text">
                    {l.key}
                  </span>
                  <span className="t-sub text-sm leading-snug text-viz-text">{l.name}</span>
                </h4>
                <p className="mt-1 pl-8 font-mono text-[12px] text-viz-text-3">{l.origin}</p>
              </div>
              <div className="p-3.5">
                <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-viz-text-3">Question it asks</p>
                <p className="mt-1 text-[15px] font-semibold leading-snug text-viz-text">{l.question}</p>
                <div className="mt-3 rounded-md border border-viz-edge-soft bg-viz-bg p-2">{l.visual}</div>
                <p className="mt-2 text-sm text-viz-text-2">
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-viz-text-3">Response · </span>
                  {l.response}
                </p>
              </div>
              <dl className="mt-auto border-t border-viz-edge-soft px-3.5 py-3">
                {ASPECTS.map((a, i) => (
                  <div key={a} className={`py-1.5 ${i ? "border-t border-viz-edge-soft" : ""}`}>
                    <dt className={`font-mono text-[12px] uppercase tracking-[0.1em] ${i === 4 ? "text-viz-warning" : "text-viz-text-3"}`}>
                      {i + 1} · {a}
                    </dt>
                    <dd className="mt-0.5 text-[13px] leading-snug text-viz-text-2">{l.rows[i]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <RightsLinks />
        <div className="my-3 h-px bg-viz-edge-soft @4xl:hidden" aria-hidden />

        {/* Rights band: a different kind of framework */}
        <section aria-labelledby="dp-rights" className="rounded-lg border border-viz-accent bg-viz-accent-soft/40 p-4 shadow-[0_0_28px_var(--viz-accent-glow)]">
          <h4 id="dp-rights" className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm border border-viz-accent px-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-viz-accent">Not a fourth model</span>
            <span className="t-sub text-sm text-viz-text">Rights-based lens · UN Convention on the Rights of Persons with Disabilities (2006)</span>
          </h4>
          <p className="mt-2 text-sm text-viz-text-2">
            A human-rights treaty, not an account of what disability is. It applies across all three perspectives: whichever explains a situation best, states that ratify the Convention must act on these principles, including identifying and removing barriers to the physical environment, transport, information and communications, and public services.
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Principles and obligations">
            {RIGHTS.map((r) => (
              <li key={r} className="rounded-full border border-viz-edge bg-viz-surface-2 px-2.5 py-0.5 text-xs font-medium text-viz-text">
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-viz-edge-soft pt-2 text-sm text-viz-text">
            <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-viz-accent">In the scenario · </span>
            Equal access to education and information in accessible formats; reasonable accommodation, such as an interpreter for live seminars, where still needed.
          </p>
        </section>

        {/* Legend */}
        <ul aria-label="Key" className="relative mt-4 grid gap-3 px-3 py-2.5 text-xs @2xl:grid-cols-3">
          <Brackets />
          <li className="flex items-start gap-2">
            <span aria-hidden className="mt-1.5 h-px w-6 shrink-0 bg-viz-edge-hi" />
            <span className="text-viz-text-2">
              <span className="font-mono font-semibold uppercase tracking-[0.08em] text-viz-text">Grey line</span> · each lens examines the same scenario
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden className="mt-1 h-0.5 w-6 shrink-0 bg-viz-accent" />
            <span className="text-viz-text-2">
              <span className="font-mono font-semibold uppercase tracking-[0.08em] text-viz-accent">Amber arrow</span> · rights obligations apply to every lens
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden className="mt-1 w-6 shrink-0 border-t border-dashed border-viz-warning" />
            <span className="text-viz-text-2">
              <span className="font-mono font-semibold uppercase tracking-[0.08em] text-viz-warning">Coral</span> · the barrier in the scenario, and what each lens can leave out (item 5)
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
