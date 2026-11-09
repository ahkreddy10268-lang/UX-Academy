/**
 * Cognitive Load Theory — a conceptual model, not a map of the brain.
 *  1. Architecture: presented information → limited working memory ⇄ long-term
 *     schemas, with the same screen loading a novice and an expert differently.
 *  2. Split attention: a chart with a separate legend versus direct labels.
 * Segment widths are illustrative proportions; CLT does not quantify load in units.
 */
import { ComparisonDiagram } from "../diagrams/comparison";
import { DiagramNode, FlowArrow, Legend } from "../primitives";

type Load = { intrinsic: number; extraneous: number };

function CapacityBar({ who, load, note }: { who: string; load: Load; note: string }) {
  const free = Math.max(0, 100 - load.intrinsic - load.extraneous);
  return (
    <div>
      <p className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-semibold text-ink">{who}</span>
        <span className="text-ink-3">{note}</span>
      </p>
      <div className="mt-1.5 flex h-7 overflow-hidden rounded-md ring-1 ring-rule" role="img" aria-label={`${who}: intrinsic load ${load.intrinsic}%, extraneous load ${load.extraneous}%, ${free}% capacity left for learning (illustrative proportions).`}>
        <span className="flex items-center justify-center bg-c-ink text-xs font-semibold text-surface" style={{ width: `${load.intrinsic}%` }}>
          1
        </span>
        <span className="hatch-extraneous flex items-center justify-center text-xs font-semibold text-ink" style={{ width: `${load.extraneous}%` }}>
          2
        </span>
        <span className="flex items-center justify-center bg-surface text-xs font-semibold text-ink-3" style={{ width: `${free}%` }}>
          3
        </span>
      </div>
    </div>
  );
}

export function CltArchitecture() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 @4xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.5fr)_auto_minmax(0,1fr)] @4xl:items-center">
        <DiagramNode title="Information presented" tone="soft">
          The material itself, plus the way it is shown: layout, wording, where labels and instructions sit.
        </DiagramNode>
        <FlowArrow turn="@4xl:rotate-0" />
        <div className="rounded-lg border-2 border-c-ink bg-c-wash p-4">
          <p className="t-sub text-sm text-c-ink">Working memory</p>
          <p className="mt-1 text-sm text-ink-2">Handles only a few interacting elements of new information at a time, and holds them briefly.</p>
          <div className="mt-3 space-y-3">
            <CapacityBar who="Novice" load={{ intrinsic: 55, extraneous: 35 }} note="same screen" />
            <CapacityBar who="Expert" load={{ intrinsic: 20, extraneous: 35 }} note="schemas chunk the elements" />
            <p className="text-xs leading-snug text-ink-2">Extraneous load is drawn the same for both. In practice it can differ: guidance that helps a novice can burden an expert (expertise reversal).</p>
          </div>
        </div>
        <span className="flex flex-col items-center gap-1 text-xs font-medium text-ink-3">
          <FlowArrow turn="@4xl:rotate-0" />
          <span className="text-center @4xl:max-w-20">schemas built · schemas retrieved</span>
        </span>
        <DiagramNode title="Long-term memory" tone="soft">
          A large store of schemas. A schema lets many elements be handled as one, which is why expertise lowers intrinsic load.
        </DiagramNode>
      </div>
      <Legend
        items={[
          { key: <span className="inline-flex h-5 w-7 items-center justify-center rounded-xs bg-c-ink text-xs font-semibold text-surface">1</span>, label: <><strong className="text-ink">Intrinsic load</strong>: set by element interactivity relative to what the person already knows.</> },
          { key: <span className="hatch-extraneous inline-flex h-5 w-7 items-center justify-center rounded-xs text-xs font-semibold text-ink ring-1 ring-rule">2</span>, label: <><strong className="text-ink">Extraneous load</strong>: imposed by presentation, the part design can remove.</> },
          { key: <span className="inline-flex h-5 w-7 items-center justify-center rounded-xs bg-surface text-xs font-semibold text-ink-3 ring-1 ring-rule">3</span>, label: <><strong className="text-ink">Remaining capacity</strong>: available for understanding. The revised theory treats &ldquo;germane&rdquo; processing as these resources, not a third load.</> },
        ]}
      />
      <p className="text-xs text-ink-3">A conceptual model of the theory&apos;s assumptions, not a diagram of the brain. Bar proportions are illustrative; the theory does not measure load in units.</p>
    </div>
  );
}

function Chart({ labelled }: { labelled: boolean }) {
  const series = [
    { name: "Search", d: "M20 120 L80 96 L140 84 L200 60 L260 44", y: 44 },
    { name: "Browse", d: "M20 110 L80 112 L140 100 L200 102 L260 92", y: 92 },
  ];
  return (
    <svg viewBox="0 0 360 150" className="h-auto w-full" role="img" aria-label={labelled ? "A line chart with each line labelled at its end." : "A line chart whose series are identified only by a legend in a separate box to the right."}>
      <line x1={20} y1={130} x2={270} y2={130} stroke="var(--rule-strong)" />
      {series.map((s, i) => (
        <g key={s.name}>
          <path d={s.d} fill="none" stroke={i === 0 ? "var(--c)" : "var(--ink-2)"} strokeWidth={2.5} strokeDasharray={i === 0 ? undefined : "5 4"} strokeLinecap="round" />
          {labelled && (
            <text x={266} y={s.y + 5} fontSize="16" fontWeight={600} fill="var(--ink)" fontFamily="var(--font-plex-sans), sans-serif">
              {s.name}
            </text>
          )}
        </g>
      ))}
      {!labelled && (
        <g>
          <rect x={272} y={14} width={84} height={56} rx={5} fill="var(--soft)" stroke="var(--rule-strong)" />
          <line x1={278} y1={33} x2={294} y2={33} stroke="var(--c)" strokeWidth={2.5} />
          <text x={298} y={38} fontSize="16" fill="var(--ink)" fontFamily="var(--font-plex-sans), sans-serif">
            Search
          </text>
          <line x1={278} y1={55} x2={294} y2={55} stroke="var(--ink-2)" strokeWidth={2.5} strokeDasharray="5 4" />
          <text x={298} y={60} fontSize="16" fill="var(--ink)" fontFamily="var(--font-plex-sans), sans-serif">
            Browse
          </text>
        </g>
      )}
    </svg>
  );
}

export function CltSplitAttention() {
  return (
    <ComparisonDiagram
      before={{
        title: "Legend in a separate box",
        visual: <Chart labelled={false} />,
        points: [
          { label: "Problem", text: "Every reading of a line means looking away to the legend, matching the style, and coming back." },
          { label: "Why", text: "Two separated sources must be integrated in working memory: the split-attention effect." },
        ],
      }}
      after={{
        title: "Direct labels on the lines",
        visual: <Chart labelled />,
        points: [
          { label: "Intervention", text: "Put each label where the eye already is, at the end of its line." },
          { label: "Why it helps", text: "Nothing has to be held in mind to connect name and line, so less capacity goes on decoding." },
        ],
      }}
      effect="Removing split attention reduces extraneous load; it does not make the data itself simpler (intrinsic load is unchanged). The size of the benefit for a given chart and reader has to be tested."
      effectKind="illustrative"
    />
  );
}
