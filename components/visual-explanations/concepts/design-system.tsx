/**
 * Design system — two Level-2 explanations in the dark technical language
 * (D-089: viz for systems and processes). Text is real HTML; SVG draws only
 * connectors. Every label restates content/knowledge/design-systems/design-system.ts;
 * the Harbourline examples are the entry's illustrative worked example.
 *
 *  1. DesignSystemArchitecture: the layers a decision travels through, what each
 *     holds, an example from Harbourline and what a change at that layer reaches,
 *     with documentation and governance running alongside every layer.
 *  2. ContributionLifecycle: from a need in a product to a release and back,
 *     following the GOV.UK Design System's published process, with the paths
 *     that stop or return a proposal.
 */

const stroke = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const, vectorEffect: "non-scaling-stroke" as const };

type Layer = { name: string; holds: string; example: string; reach: string; key?: boolean };

const LAYERS: Layer[] = [
  { name: "Product interfaces", holds: "Screens built by product teams from the shared parts, plus what is specific to each product.", example: "Booking website, mobile app, staff ticketing tool.", reach: "One product." },
  { name: "Patterns and templates", holds: "Reusable solutions to recurring tasks, and page structures.", example: "Choose a sailing; pay and confirm; error summary.", reach: "Every screen that uses the pattern." },
  { name: "Components", holds: "Reusable controls with anatomy, properties, variants, states, accessibility and responsive behaviour.", example: "Button, text input, date input.", reach: "Every pattern and product that uses it; renaming a property is a breaking change.", key: true },
  { name: "Tokens", holds: "Named records of design decisions that components consume.", example: "color.action.primary, color.feedback.danger.text, space.4.", reach: "Every component that consumes it; recheck contrast on every surface.", key: true },
  { name: "Foundations and design language", holds: "Scales and rules: colour, type, spacing, layout, shape, elevation, icons, motion, accessibility.", example: "An action colour that meets contrast on every surface it sits on.", reach: "Every token and component built on it." },
  { name: "Principles and needs", holds: "What the system is for and how decisions are judged.", example: "Tell people what happened and what to do next; work one-handed on a moving deck.", reach: "How every later decision is evaluated." },
];

const DOCS = ["Usage: when and when not", "Do and don't examples", "Anatomy and states", "Accessibility requirements", "Content guidance", "Responsive behaviour", "Design file and code links", "Versions and known limits"];
const GOV = ["Owner and decision rights", "Contribution process", "Review criteria", "Exceptions and extensions", "Decision records", "Releases, migration, deprecation"];

function UpDown() {
  return (
    <svg aria-hidden viewBox="0 0 24 40" className="h-8 w-5 shrink-0">
      <path d="M8 36 V6 M4 10 L8 5 L12 10" fill="none" stroke="var(--viz-accent)" strokeWidth={1.4} {...stroke} />
      <path d="M16 4 V34 M12 30 L16 35 L20 30" fill="none" stroke="var(--viz-edge-hi)" strokeWidth={1} strokeDasharray="2 2" {...stroke} />
    </svg>
  );
}

export function DesignSystemArchitecture() {
  return (
    <div className="space-y-3">
      <p className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
        <span className="rounded-full border border-rule-strong bg-soft px-2.5 py-0.5 font-semibold text-ink">Teaching model</span>
        Layers to reason with, not an order of construction: real systems often start from an audit of existing components.
      </p>
      <div className="text-viz-text">
        <div className="grid gap-3 @4xl:grid-cols-[minmax(0,1fr)_15rem]">
          {/* the layers, top = what users see */}
          <ol aria-label="Layers, from product interfaces down to principles" className="space-y-0.5">
            {LAYERS.map((l, i) => (
              <li key={l.name} className="list-none">
                {i > 0 && (
                  <div aria-hidden className="flex justify-center py-0.5 @2xl:justify-start @2xl:pl-16">
                    <svg viewBox="0 0 40 18" className="h-4 w-9">
                      <path d="M12 16 V3 M8.5 6.5 L12 2.5 L15.5 6.5" fill="none" stroke="var(--viz-accent)" strokeWidth={1.4} {...stroke} />
                      <path d="M28 2 V15 M24.5 11.5 L28 15.5 L31.5 11.5" fill="none" stroke="var(--viz-edge-hi)" strokeWidth={1} strokeDasharray="2 2" {...stroke} />
                    </svg>
                  </div>
                )}
                <div className={`grid gap-2 rounded-lg border p-3 @2xl:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1fr)] ${l.key ? "border-viz-accent bg-viz-surface-2" : "border-viz-edge bg-viz-surface-1"}`}>
                <div className="flex items-start gap-2">
                  <span aria-hidden className={`inline-grid h-6 w-6 shrink-0 place-items-center rounded-sm border font-mono text-xs font-semibold ${l.key ? "border-viz-accent text-viz-accent" : "border-viz-edge-hi text-viz-text"}`}>
                    {LAYERS.length - i}
                  </span>
                  <div className="min-w-0">
                    <p className="t-sub text-sm leading-snug text-viz-text">{l.name}</p>
                    <p className="mt-0.5 text-xs text-viz-text-2">{l.holds}</p>
                  </div>
                </div>
                <p className="text-[13px] leading-snug text-viz-text-2">
                  <span className="block font-mono text-[12px] uppercase tracking-[0.12em] text-viz-text-3">Harbourline · illustrative</span>
                  {l.example}
                </p>
                <p className="text-[13px] leading-snug text-viz-text-2">
                  <span className={`block font-mono text-[12px] uppercase tracking-[0.12em] ${l.key ? "text-viz-accent" : "text-viz-text-3"}`}>A change here reaches</span>
                  {l.reach}
                </p>
                </div>
              </li>
            ))}
          </ol>

          {/* alongside every layer */}
          <div className="grid gap-2 @2xl:grid-cols-2 @4xl:grid-cols-1">
            <section aria-labelledby="ds-docs" className="rounded-lg border border-dashed border-viz-edge-hi bg-viz-surface-1 p-3">
              <h4 id="ds-docs" className="t-sub text-sm text-viz-text">Documentation, beside every layer</h4>
              <ul className="mt-2 space-y-1 text-xs text-viz-text-2">
                {DOCS.map((d) => (
                  <li key={d} className="flex gap-1.5">
                    <span aria-hidden className="mt-1.5 h-px w-2 shrink-0 bg-viz-edge-hi" />
                    {d}
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="ds-gov" className="rounded-lg border border-dashed border-viz-edge-hi bg-viz-surface-1 p-3">
              <h4 id="ds-gov" className="t-sub text-sm text-viz-text">Governance, beside every layer</h4>
              <ul className="mt-2 space-y-1 text-xs text-viz-text-2">
                {GOV.map((d) => (
                  <li key={d} className="flex gap-1.5">
                    <span aria-hidden className="mt-1.5 h-px w-2 shrink-0 bg-viz-edge-hi" />
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* core and extension */}
        <div className="mt-3 rounded-lg border border-viz-edge bg-viz-surface-1 p-3 text-sm text-viz-text-2">
          <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-viz-text-3">Core and extension · </span>
          The staff tool needs a dense data table the public products do not. It lives in the staff tool&apos;s own extension, built from the shared tokens, and moves into the core only if another product needs it.
        </div>

        {/* legend */}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-viz-text-2">
          <span className="flex items-center gap-2">
            <UpDown />
            <span>
              <span className="font-mono font-semibold uppercase tracking-[0.08em] text-viz-accent">Solid up</span> · a decision travels to every layer that uses it ·{" "}
              <span className="font-mono font-semibold uppercase tracking-[0.08em] text-viz-text">dashed down</span> · feedback and requests return to the system
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-3 w-5 rounded-sm border border-viz-accent bg-viz-surface-2" />
            <span>Outlined layers: the traced decision (an action colour and the button that uses it)</span>
          </span>
        </div>
      </div>
    </div>
  );
}

type Step = { n: number; name: string; what: string; out: string };

const STEPS: Step[] = [
  { n: 1, name: "Find a need", what: "A product team meets a problem other services also have.", out: "Examples and evidence of the need" },
  { n: 2, name: "Propose", what: "Check existing discussions first; then present the idea and evidence of user needs, without spending time on a specific design or code.", out: "A proposal" },
  { n: 3, name: "Check against proposal criteria", what: "Useful: many teams or services need it. Unique: it does not replicate something already in the system.", out: "Accepted for development" },
  { n: 4, name: "Develop and research", what: "Start with what exists, work with the community, design an implementation, research it in a real service or a realistic prototype, and test accessibility.", out: "A researched implementation" },
  { n: 5, name: "Review", what: "The system team reviews against the publication criteria: usable (tested with a representative sample, including disabled people), consistent and versatile.", out: "A decision" },
  { n: 6, name: "Document and release", what: "Final checks to design, content, code and guidance; publish with release notes and a version.", out: "A release" },
  { n: 7, name: "Adopt and feed back", what: "Product teams update; problems, gaps and ideas return as new needs. Parts that no longer serve are deprecated with a migration path.", out: "New needs" },
];

const EXITS: Record<number, { tone: "stop" | "return"; text: string }[]> = {
  2: [{ tone: "stop", text: "Already proposed: upvote it and add your evidence" }],
  3: [
    { tone: "stop", text: "Not useful to many teams or services: not taken forward; the need stays with the product" },
    { tone: "stop", text: "Not unique: reuse the existing part, or bring evidence that the new one is better" },
    { tone: "return", text: "Not prioritised this year: develop it with the team, or leave it for someone else" },
  ],
  5: [{ tone: "return", text: "Recommendations to address first: back to step 4" }],
};

export function ContributionLifecycle() {
  return (
    <div className="space-y-3">
      <p className="flex flex-wrap items-center gap-2 text-xs text-ink-2">
        <span className="rounded-full border border-rule-strong bg-soft px-2.5 py-0.5 font-semibold text-ink">One documented model</span>
        Steps 2 to 6 follow the GOV.UK Design System&apos;s published process; other systems differ in detail.
      </p>
      <div className="text-viz-text">
        <ol aria-label="From a need to a release and back" className="grid gap-2 @4xl:grid-cols-7">
          {STEPS.map((s) => (
            <li key={s.n} className="flex min-w-0 flex-col">
              <div className={`flex h-full flex-col rounded-lg border p-3 ${s.n === 3 || s.n === 5 ? "border-viz-accent bg-viz-surface-2" : "border-viz-edge bg-viz-surface-1"}`}>
                <p className="flex items-start gap-2">
                  <span aria-hidden className={`inline-grid h-6 w-6 shrink-0 place-items-center rounded-sm border font-mono text-xs font-semibold ${s.n === 3 || s.n === 5 ? "border-viz-accent text-viz-accent" : "border-viz-edge-hi text-viz-text"}`}>
                    {s.n}
                  </span>
                  <span className="t-sub text-sm leading-snug text-viz-text">{s.name}</span>
                </p>
                <p className="mt-1.5 text-xs leading-snug text-viz-text-2">{s.what}</p>
                <p className="mt-auto pt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-viz-text-3">
                  Output · <span className="normal-case tracking-normal text-viz-text">{s.out}</span>
                </p>
              </div>
              {EXITS[s.n] && (
                <ul aria-label={`Paths that stop or return at step ${s.n}`} className="mt-1.5 space-y-1.5">
                  {EXITS[s.n].map((x) => (
                    <li key={x.text} className={`rounded-md border border-dashed px-2 py-1.5 text-[12px] leading-snug ${x.tone === "stop" ? "border-viz-warning text-viz-text-2" : "border-viz-edge-hi text-viz-text-2"}`}>
                      <span className={`mr-1 font-mono font-semibold ${x.tone === "stop" ? "text-viz-warning" : "text-viz-text"}`}>{x.tone === "stop" ? "✕" : "↺"}</span>
                      {x.text}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        {/* the return loop */}
        <svg aria-hidden viewBox="0 0 700 30" preserveAspectRatio="none" className="mt-2 hidden h-7 w-full @4xl:block">
          <path d="M650 2 V16 Q650 24 642 24 H58 Q50 24 50 16 V4" fill="none" stroke="var(--viz-edge-hi)" strokeWidth={1} strokeDasharray="3 3" {...stroke} />
          <path d="M46 9 L50 3 L54 9" fill="none" stroke="var(--viz-edge-hi)" strokeWidth={1} {...stroke} />
        </svg>
        <p className="mt-2 text-xs text-viz-text-2 @4xl:mt-0 @4xl:text-center">
          <span className="font-mono font-semibold uppercase tracking-[0.08em] text-viz-text">↺ Loop</span> · adoption produces new needs, so the sequence repeats for as long as the system is used.
        </p>

        <ul aria-label="Key" className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-viz-text-2">
          <li>
            <span className="font-mono font-semibold text-viz-accent">Outlined</span> · the two published checkpoints (criteria and review)
          </li>
          <li>
            <span className="font-mono font-semibold text-viz-warning">✕ coral, dashed</span> · the proposal stops or goes elsewhere
          </li>
          <li>
            <span className="font-mono font-semibold text-viz-text">↺ grey, dashed</span> · the work returns or waits
          </li>
        </ul>
      </div>
    </div>
  );
}
