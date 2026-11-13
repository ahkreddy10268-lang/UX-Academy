/**
 * Interaction states — one toggle button ("Bold") as four independent sources
 * of state: pointer, focus, value and availability. Each lane lists its
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
    source: "Momentary · the input device",
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
    source: "Momentary · keyboard, click or script",
    states: ["Unfocused", "Focused, ring shown", "Focused, ring hidden"],
    moves: [
      { from: "Unfocused", to: "Focused, ring shown", on: "Tab" },
      { from: "Unfocused", to: "Focused, ring hidden", on: "mouse click", note: "browser heuristic (:focus-visible, draft)" },
      { from: "Focused, ring hidden", to: "Focused, ring shown", on: "next key press" },
      { from: "Focused (either)", to: "Unfocused", on: "Tab away, click elsewhere" },
    ],
    exposed: "Exposed by the browser. A mode with a visible indicator is required — WCAG 2.4.7.",
  },
  {
    key: "C",
    name: "Value",
    source: "Persistent · set by the person",
    states: ["Off", "On"],
    moves: [
      { from: "Off", to: "On", on: "click, Enter or Space" },
      { from: "On", to: "Off", on: "click, Enter or Space" },
    ],
    exposed: "aria-pressed=\"false\" / \"true\"; the label stays “Bold”.",
  },
  {
    key: "D",
    name: "Availability",
    source: "Condition · set by the product",
    states: ["Enabled", "Disabled"],
    moves: [
      { from: "Enabled", to: "Disabled", on: "product rule, e.g. no text selected" },
      { from: "Disabled", to: "Enabled", on: "rule satisfied" },
    ],
    exposed: "While disabled, lanes A and C stop responding. Native disabled also removes focus; aria-disabled can keep it.",
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
        <span className="font-semibold">One “Bold” toggle button, four sources of state.</span> Each lane changes on its own events; at any moment the button is in one state of every lane at once.
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
          <p className="mt-2 text-sm text-ink-2">Each source draws on its own layer: a tint inside (hover), a ring outside (focus), a tick and fill (on). None hides another.</p>
        </section>
        <section aria-label="Combinations never to show, on any control" className="min-w-0 rounded-lg border border-error/50 bg-surface p-3.5">
          <p className="label !text-error">Never show, on any control</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink">
            <li>Disabled + a hover or press response — it suggests the control works.</li>
            <li>“On” drawn like “Pressed” — the toggle looks stuck mid-press.</li>
            <li>Busy + accepting presses — a second request starts.</li>
            <li>Invalid before anyone has typed — the person is blamed for nothing.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
