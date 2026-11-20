/**
 * The HEART framework — the five categories and the Goals–Signals–Metrics
 * routine that turns a goal into a metric. Restates
 * content/knowledge/frameworks/heart-framework.ts (Rodden, Hutchinson and Fu
 * 2010; one independent application). Text is real HTML at every width.
 */
type Cat = { name: string; asks: string };

const CATS: Cat[] = [
  { name: "Happiness", asks: "Attitudinal measures such as satisfaction, perceived ease of use or visual appeal, typically from in-product surveys." },
  { name: "Engagement", asks: "The depth and frequency of involvement: visits per user per week, or items created per user." },
  { name: "Adoption", asks: "New users of a product or feature in a period." },
  { name: "Retention", asks: "The rate at which users from one period are still active in a later one." },
  { name: "Task success", asks: "Behavioural usability measures: efficiency (time), effectiveness (completion) and error rate." },
];

const GSM = [
  { step: "Goal", text: "Users find the photo they want quickly." },
  { step: "Signal", text: "Fewer searches refined repeatedly; faster time from search to opening a photo." },
  { step: "Metric", text: "Median time from first query to first photo opened, per user per week." },
];

export function HeartCategories() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">HEART names five kinds of measure; Goals–Signals–Metrics decides which numbers to track.</span> You need not use every category: pick those that serve the project’s goals.
      </p>
      <ul className="grid gap-3 @2xl:grid-cols-3" aria-label="The five HEART categories">
        {CATS.map((c) => (
          <li key={c.name} className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
            <p className="t-sub text-base text-ink">{c.name}</p>
            <p className="mt-1.5 text-sm text-ink">{c.asks}</p>
          </li>
        ))}
      </ul>
      <section className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5" aria-label="Goals, signals, metrics">
        <p className="label">Goals → signals → metrics (the entry’s example)</p>
        <ol className="mt-2 grid gap-3 @2xl:grid-cols-3" aria-label="Goal, signal, metric">
          {GSM.map((g, i) => (
            <li key={g.step} className="min-w-0 text-sm text-ink">
              <span className="formula mr-2 text-accent">{i + 1}</span>
              <span className="font-semibold">{g.step}:</span> {g.text}
            </li>
          ))}
        </ol>
      </section>
      <p className="text-xs text-ink-2">
        Behavioural metrics come from logging and attitudinal ones from surveys; combining both shows where people use a feature heavily but dislike it, or like it but fail at it. In one independent application, a research platform’s team prioritised Adoption, Engagement and Retention because they could be captured through web analytics, and treated Task completion as less relevant. That is practitioner evidence, not a validation of the framework.
      </p>
    </div>
  );
}
