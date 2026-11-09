/**
 * Information architecture — two Level-2 visuals:
 *  1. System diagram: users, content and context, and the four systems built
 *     on them (Rosenfeld, Morville & Arango).
 *  2. Hierarchy diagram: an illustrative library website showing all four
 *     systems on one structure, with a path that follows information scent.
 */
import { HierarchyTree } from "../diagrams/hierarchy-tree";
import { Legend, Marker, Tag } from "../primitives";

const SYSTEMS = [
  { n: 1, name: "Organisation", q: "What goes together?", eg: "Group by task: Visit, Borrow, Events" },
  { n: 2, name: "Labelling", q: "What is it called?", eg: "'Your account', not 'Patron services'" },
  { n: 3, name: "Navigation", q: "How do I get there?", eg: "Menus, breadcrumbs, related links" },
  { n: 4, name: "Search", q: "Can I ask for it?", eg: "Query box, synonyms, results page" },
];

export function IaEcology() {
  return (
    <div className="grid gap-6 @2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] @2xl:items-center">
      <div className="mx-auto w-full max-w-sm">
        <svg viewBox="0 0 300 300" className="h-auto w-full" role="img" aria-label="Three overlapping circles labelled users, content and context. The overlap in the centre is labelled information architecture.">
          {[
            { cx: 150, cy: 92, label: "Users", sub: "needs, tasks, words", ly: 50 },
            { cx: 100, cy: 172, label: "Content", sub: "what exists, volume", ly: 266 },
            { cx: 200, cy: 172, label: "Context", sub: "goals, budget, constraints", ly: 266 },
          ].map((c, i) => (
            <g key={c.label}>
              <circle cx={c.cx} cy={c.cy} r={74} fill="var(--c-wash)" fillOpacity={0.75} stroke="var(--c-ink)" strokeWidth={1.5} />
              <text x={i === 0 ? c.cx : i === 1 ? c.cx - 30 : c.cx + 30} y={c.ly} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--ink)" fontFamily="var(--font-plex-sans), sans-serif">
                {c.label}
              </text>
              <text x={i === 0 ? c.cx : i === 1 ? c.cx - 30 : c.cx + 30} y={c.ly + 16} textAnchor="middle" fontSize="12" fill="var(--ink-2)" fontFamily="var(--font-plex-sans), sans-serif">
                {c.sub.length > 20 ? (
                  <>
                    <tspan>{c.sub.slice(0, c.sub.lastIndexOf(",", 16) + 1)}</tspan>
                    <tspan x={i === 0 ? c.cx : i === 1 ? c.cx - 30 : c.cx + 30} dy={14}>
                      {c.sub.slice(c.sub.lastIndexOf(",", 16) + 2)}
                    </tspan>
                  </>
                ) : (
                  c.sub
                )}
              </text>
            </g>
          ))}
          <rect x={112} y={128} width={76} height={34} rx={8} fill="var(--surface)" stroke="var(--c-ink)" strokeWidth={1.5} />
          <text x={150} y={150} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--c-ink)" fontFamily="var(--font-plex-sans), sans-serif">
            IA
          </text>
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-sm text-ink-2">The structure sits where three forces meet. Built on them are four systems that depend on each other:</p>
        <ol className="mt-3 grid gap-2 @md:grid-cols-2">
          {SYSTEMS.map((s) => (
            <li key={s.n} className="rounded-lg border border-rule bg-surface p-3">
              <p className="flex items-center gap-2">
                <Marker n={s.n} />
                <span className="t-sub text-sm">{s.name}</span>
              </p>
              <p className="mt-1.5 text-sm italic text-ink-2">{s.q}</p>
              <p className="mt-1 text-xs text-ink-3">{s.eg}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-ink-3">Good grouping with vague labels still fails; good labels on an incoherent grouping mislead. Search must use the same vocabulary as the labels.</p>
      </div>
    </div>
  );
}

export function IaHierarchy() {
  return (
    <HierarchyTree
      label="An illustrative public library website hierarchy"
      root={{
        label: "Library home",
        children: [
          { label: "Visit", note: "hours, branches", children: [{ label: "Opening hours" }, { label: "Find a branch" }, { label: "Accessibility" }] },
          {
            label: "Borrow",
            marker: 1,
            path: true,
            note: "grouped by task",
            children: [
              { label: "Search the catalogue" },
              {
                label: "Your account",
                marker: 2,
                path: true,
                note: "a label people predict",
                children: [{ label: "Renew a loan", marker: 3, target: true, note: "target" }, { label: "Reserve a book" }, { label: "Fees and fines" }],
              },
            ],
          },
          { label: "Events", children: [{ label: "Children's activities" }, { label: "Talks and workshops" }] },
        ],
      }}
      aside={
        <div className="space-y-3">
          <div className="rounded-lg border border-rule bg-soft p-3.5 text-sm">
            <p className="flex items-center gap-2">
              <Marker n={4} />
              <span className="t-sub">Search, for people who know what they want</span>
            </p>
            <p className="mt-2 text-ink-2">A query for any of these should reach “Renew a loan”:</p>
            <p className="mt-2 flex flex-wrap gap-1.5">
              {["renew", "extend loan", "due date", "overdue"].map((q) => (
                <Tag key={q}>{q}</Tag>
              ))}
            </p>
            <p className="mt-2 text-xs text-ink-3">People rarely choose the same word for the same thing (the vocabulary problem), so search needs synonyms.</p>
          </div>
          <Legend
            items={[
              { key: <Marker n={1} />, label: "Organisation: content grouped by what people come to do." },
              { key: <Marker n={2} />, label: "Labelling: names taken from users' words." },
              { key: <Marker n={3} />, label: "Navigation: the highlighted path, where every label on the way carries scent toward the target." },
              { key: <Marker n={4} />, label: "Search: a second route to the same item." },
            ]}
          />
          <p className="flex items-center gap-2 text-xs text-ink-3">
            <span className="inline-block h-3 w-5 rounded-xs border border-c-ink bg-c-wash" aria-hidden /> on the path
            <span className="ml-2 inline-block h-3 w-5 rounded-xs border border-accent bg-accent-wash" aria-hidden /> target
          </p>
        </div>
      }
    />
  );
}
