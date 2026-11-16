/**
 * Interaction states — one toggle button ("Bold") as four state dimensions:
 * pointer and focus (transient), value (persistent) and availability
 * (system-controlled). Each lane lists its
 * states and the events that move between them; a final block shows which
 * combinations stay legible and which must never be shown. Restates
 * content/knowledge/interaction/interaction-states.ts. Modelling the same
 * dimensions as a statechart, with ownership, belongs to
 * component-state-management, which this figure does not repeat.
 * Text is real HTML; the arrows are characters inside labelled list items,
 * so the reading order is the diagram's order at every width.
 */
type Move = { from: string; to: string; on: string; note?: string };
type Lane = { key: string; name: string; source: string; states: string[]; moves: Move[]; exposed: string };

const LANES: Lane[] = [
  {
    key: "A",
    name: "Pointer",
    source: "Transient interaction · pointer or key",
    states: ["Rest", "Hover", "Pressed"],
    moves: [
      { from: "Rest", to: "Hover", on: "pointer enters" },
      { from: "Hover", to: "Rest", on: "pointer leaves" },
      { from: "Hover", to: "Pressed", on: "button down" },
      { from: "Pressed", to: "Hover", on: "release over it", note: "activates" },
      { from: "Pressed", to: "Rest", on: "slide off, then release", note: "cancelled — WCAG 2.5.2" },
    ],
    exposed: "Not exposed; CSS :hover and :active. Keyboards never hover; touch gives no reliable hover.",
  },
  {
    key: "B",
    name: "Focus",
    source: "Transient navigation · keyboard, pointer or script",
    states: ["Unfocused", "Focused, ring shown", "Focused, ring hidden"],
    moves: [
      { from: "Unfocused", to: "Focused, ring shown", on: "Tab" },
      { from: "Unfocused", to: "Focused, ring shown or hidden", on: "a click", note: "the browser decides; on a button the ring is often hidden, but not always" },
      { from: "Unfocused", to: "Focused, ring shown or hidden", on: "script", note: "usually follows whether the previous element showed it" },
      { from: "Focused, ring hidden", to: "Focused, ring shown", on: "next key press" },
      { from: "Focused (either)", to: "Unfocused", on: "Tab away, click elsewhere" },
    ],
    exposed: "Exposed by the browser. :focus-visible heuristics come from the Selectors 4 draft; a person's preference to always see focus wins. WCAG 2.4.7 (AA) requires a mode with a visible indicator.",
  },
  {
    key: "C",
    name: "Value",
    source: "Persistent value · usually the person; the app can set it",
    states: ["Off", "On"],
    moves: [
      { from: "Off", to: "On", on: "click, Enter or Space" },
      { from: "On", to: "Off", on: "click, Enter or Space" },
      { from: "Start", to: "Off or On", on: "page load", note: "the app sets the starting value, e.g. from the document" },
    ],
    exposed: "aria-pressed=\"false\" / \"true\"; the label stays “Bold”.",
  },
  {
    key: "D",
    name: "Availability",
    source: "System-controlled condition",
    states: ["Enabled", "Disabled"],
    moves: [
      { from: "Enabled", to: "Disabled", on: "product rule, e.g. no text selected" },
      { from: "Disabled", to: "Enabled", on: "rule satisfied" },
    ],
    exposed: "While disabled, the value cannot change and the action must not run. Native disabled also removes focus and pointer response. aria-disabled can keep focus — and a tooltip — so people can find it, but script must block activation. Neither says why: give the reason in visible text.",
  },
];

function Chip({ children, strong = false }: { children: string; strong?: boolean }) {
  return <span className={`inline-block rounded-sm border px-2 py-0.5 text-xs ${strong ? "border-accent bg-accent-wash text-ink" : "border-rule-strong bg-soft text-ink"}`}>{children}</span>;
}

function LaneCard({ l }: { l: Lane }) {
  return (
    <section aria-label={`${l.name}: ${l.source}`} className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="formula text-sm text-accent">{l.key}</span>
        <p className="t-sub text-base text-ink">{l.name}</p>
      </div>
      <p className="label mt-0.5">{l.source}</p>
      <p className="mt-2 flex flex-wrap gap-1.5" aria-label={`States: ${l.states.join(", ")}`}>
        {l.states.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </p>
      <ol className="mt-3 space-y-1.5 text-sm" aria-label={`${l.name} transitions`}>
        {l.moves.map((m) => (
          <li key={`${m.from}-${m.to}-${m.on}`} className="grid gap-x-2 @md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] @md:items-baseline">
            <span className="text-ink">
              {m.from} <span aria-hidden>→</span>
              <span className="sr-only"> to </span> {m.to}
            </span>
            <span className="hidden text-ink-3 @md:inline" aria-hidden>
              ·
            </span>
            <span className="text-ink-2">
              on {m.on}
              {m.note && <span className="text-ink-3"> ({m.note})</span>}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 border-t border-rule pt-2 text-xs text-ink-2">{l.exposed}</p>
    </section>
  );
}

export function InteractionStateDimensions() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">One “Bold” toggle button, four state dimensions.</span> Pointer and focus are transient, the value persists, availability is controlled by the product. Each lane changes on its own events; at any moment the button is in one state of every lane at once.
      </p>
      <div className="grid gap-3 @2xl:grid-cols-2">
        {LANES.map((l) => (
          <LaneCard key={l.key} l={l} />
        ))}
      </div>
      <div className="grid gap-3 @2xl:grid-cols-2">
        <section aria-label="Combinations that stay legible" className="min-w-0 rounded-lg border border-ok/50 bg-surface p-3.5">
          <p className="label !text-ok">Combines legibly</p>
          <p className="mt-2 flex flex-wrap items-center gap-1.5">
            <Chip>Hover</Chip>
            <span aria-hidden>+</span>
            <Chip>Focused, ring shown</Chip>
            <span aria-hidden>+</span>
            <Chip strong>On</Chip>
          </p>
          <p className="mt-2 text-sm text-ink-2">Each dimension draws on its own layer: a tint inside (hover), a ring outside (focus), a tick and fill (on). None hides another.</p>
        </section>
        <section aria-label="Combinations that mislead, on any control" className="min-w-0 rounded-lg border border-error/50 bg-surface p-3.5">
          <p className="label !text-error">Combinations that mislead</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink">
            <li>Disabled but styled as if it works, or still running its action. Focus or a tooltip that helps people find it and learn why is a different matter.</li>
            <li>“On” drawn like “Pressed” — the toggle looks stuck mid-press.</li>
            <li>A busy submit button that accepts a second submit. An offered Cancel stays usable and looks different.</li>
            <li>A required field marked invalid before the person has tried to submit.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
