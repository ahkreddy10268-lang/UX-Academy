/**
 * Card sorting — choosing the type of sort by the question, what each gives,
 * and how it is analysed. Restates content/knowledge/research/card-sorting.ts
 * (open, closed and hybrid sorts; card selection; similarity matrix and
 * dendrogram). Text is real HTML; each type stacks as use → result → analysis.
 */
type Kind = { name: string; tag: string; when: string; get: string; analyse: string };

const KINDS: Kind[] = [
  {
    name: "Open sort",
    tag: "Generative",
    when: "Early, to discover how people conceptualise a domain and what language they use.",
    get: "Participants group the cards and name their own groups.",
    analyse: "Standardise the group names to reveal vocabulary; a similarity matrix shows the share of participants who put each pair together, and cluster analysis turns it into a dendrogram.",
  },
  {
    name: "Closed sort",
    tag: "Evaluative",
    when: "To test whether an existing or proposed set of categories is understood and used consistently.",
    get: "Participants place the cards into categories you supply.",
    analyse: "The proportion of participants placing each card in each category shows agreement and ambiguity.",
  },
  {
    name: "Hybrid sort",
    tag: "Redesigns",
    when: "Redesigns where some categories are fixed.",
    get: "Participants use the provided categories but may add their own.",
    analyse: "The entry does not describe a separate analysis for hybrid sorts.",
  },
];

export function CardSortTypes() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Choose the type of sort by your question.</span> The cards matter as much as the type: they should represent real content at a consistent level of detail, be worded neutrally, and be few enough to sort thoughtfully.
      </p>
      <ol className="grid gap-3 @2xl:grid-cols-3" aria-label="Card sort types">
        {KINDS.map((k) => (
          <li key={k.name} className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
            <p className="t-sub text-base text-ink">{k.name}</p>
            <p className="label mt-0.5">{k.tag}</p>
            <p className="mt-2 text-sm text-ink">
              <span className="label block">Use when</span>
              {k.when}
            </p>
            <p className="mt-2 text-sm text-ink">
              <span className="label block">What happens</span>
              {k.get}
            </p>
            <p className="mt-2 border-t border-rule pt-2 text-xs text-ink-2">
              <span className="font-semibold text-ink">Analysis:</span> {k.analyse}
            </p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-ink-2">
        Similar words on cards (“Account settings”, “Account balance”) make people group by surface wording rather than meaning. Where to cut a dendrogram is a judgment, not a statistical given. Validate candidate structures with tree testing before implementing navigation.
      </p>
    </div>
  );
}
