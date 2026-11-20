/**
 * Information foraging theory — the three decisions of the foraging analogy,
 * each with the question a visitor is answering, what it is on the web, what
 * shapes the estimate, and the practitioner guidance attached to it. Restates
 * content/knowledge/ia/information-foraging-theory.ts (Nielsen 2003; Budiu
 * 2020; the abstracts of Fu and Pirolli 2007 and Pirolli 2007). The guidance
 * is the practitioners' reading, not a result of the research papers. Text is
 * real HTML; each decision stacks as question → web → estimate → guidance.
 */
type Decision = { name: string; ask: string; web: string; shapes: string; guidance: string };

const DECISIONS: Decision[] = [
  {
    name: "Scent: which path next?",
    ask: "Which link or result looks most likely to lead to what I need?",
    web: "A link, snippet or result is the cue; the page it leads to is the patch.",
    shapes: "The link label, any text or image beside it, the surrounding page, and what the person already knows about the brand or the subject.",
    guidance: "Say what is at the destination, avoid invented labels, and be specific where the surrounding context may be off screen.",
  },
  {
    name: "Diet: what to consume?",
    ask: "Is this item worth the effort for what I need?",
    web: "Content has to look worth consuming and be easy to reach. Good content that is hard to find, or easy content with nothing in it, is passed over.",
    shapes: "The expected gain from the item and the likely cost of finding and consuming it, estimated from experience or from design cues.",
    guidance: "Show sample content and prominent navigation or search, so the site looks worth using and easy to use.",
  },
  {
    name: "Patch leaving: when to go elsewhere?",
    ask: "Should I keep working here, or look in another source?",
    web: "Each site is a patch. Nielsen reads the theory as saying that the easier the next patch is to reach, the sooner a visitor leaves this one.",
    shapes: "What is left to gain here, and the cost of reaching an alternative.",
    guidance: "Nielsen predicts ever shorter visits and advises supporting short visits. His article gives no data for this, so treat it as a hypothesis to test.",
  },
];

export function ForagingDecisions() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">One rule runs through all three: estimate the gain, estimate the cost.</span> Both are estimates, made from experience or from the cues the design provides. Fu and Pirolli&rsquo;s SNIF-ACT model quantifies the perceived relevance of a link to a goal by spreading activation.
      </p>
      <ol className="space-y-2" aria-label="The three decisions of information foraging">
        {DECISIONS.map((d, i) => (
          <li key={d.name} className="grid min-w-0 gap-x-4 gap-y-1.5 rounded-lg border border-rule-strong bg-surface p-3.5 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)_minmax(0,1.3fr)]">
            <div className="min-w-0">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="formula text-sm text-accent">{i + 1}</span>
                <span className="t-sub text-base text-ink">{d.name}</span>
              </p>
              <p className="mt-1 text-sm text-ink-2">{d.ask}</p>
            </div>
            <p className="min-w-0 text-sm text-ink">
              <span className="label block">On the web</span>
              {d.web}
            </p>
            <p className="min-w-0 text-sm text-ink">
              <span className="label block">What shapes the estimate</span>
              {d.shapes}
            </p>
            <p className="min-w-0 text-sm text-ink-2">
              <span className="label block">Practitioner guidance</span>
              {d.guidance}
            </p>
          </li>
        ))}
      </ol>
      <p className="text-xs text-ink-2">The guidance column is Nielsen&rsquo;s and Budiu&rsquo;s reading of the theory, not a result from the research papers. This figure shows no equations or data, because the founding article and the book were not read for this entry.</p>
    </div>
  );
}
