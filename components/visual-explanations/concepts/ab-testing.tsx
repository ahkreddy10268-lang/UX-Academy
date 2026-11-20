/**
 * A/B testing — the checks of a trustworthy test in the order they happen:
 * design before launch, validate the setup, run the planned duration, analyse,
 * report. Restates content/knowledge/research/ab-testing.ts (Kohavi, Tang and
 * Xu 2020; Fabijan et al. 2019; Greenland et al. 2016). Text is real HTML in an
 * ordered list, so the reading order is the process order at every width.
 */
type Stage = { n: string; name: string; items: string[] };

const STAGES: Stage[] = [
  {
    n: "1",
    name: "Design before the test starts",
    items: [
      "Write the hypothesis and choose one primary metric, the overall evaluation criterion.",
      "Set the significance level α (usually 0.05) and the power (usually 80%), then compute the sample size per variant from them and the smallest effect worth detecting.",
      "Pre-register guardrail metrics (for example error rate or page load time) and the duration.",
    ],
  },
  {
    n: "2",
    name: "Validate the setup",
    items: [
      "Run an A/A test (two identical variants). A “significant” A/A result signals a pipeline problem.",
      "Check the sample ratio: assigning 50/50 but observing 52/48 with a large n means assignment or logging is broken. Investigate before interpreting.",
    ],
  },
  {
    n: "3",
    name: "Run the planned duration",
    items: [
      "Randomise by user, using a stable hash of a user identifier, so each person sees one variant consistently.",
      "Run the full planned time, usually whole weeks to cover weekly cycles. Do not stop when the p-value first dips below 0.05 (“peeking”).",
    ],
  },
  {
    n: "4",
    name: "Analyse",
    items: [
      "For conversion-type metrics the standard analysis is the two-proportion z-test.",
      "Report the confidence interval for the difference and the relative lift alongside it.",
      "Correct for multiple comparisons when testing many variants or metrics, and treat secondary findings as hypotheses.",
    ],
  },
  {
    n: "5",
    name: "Report",
    items: [
      "Report the effect size with its confidence interval, not only “significant” or “not significant”.",
      "A p-value is the probability of a difference at least this large if there were no true difference. It is not the probability that B is better.",
    ],
  },
];

export function AbTestChecks() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">A trustworthy test is designed before it starts.</span> Most of the checks happen at steps 1 and 2, before any result can tempt anyone to stop early.
      </p>
      <ol className="grid gap-3 @2xl:grid-cols-2" aria-label="A/B test steps 1 to 5">
        {STAGES.map((s) => (
          <li key={s.n} className="min-w-0 rounded-lg border border-rule-strong bg-surface p-3.5">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="formula text-sm text-accent">{s.n}</span>
              <span className="t-sub text-base text-ink">{s.name}</span>
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-ink">
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="text-xs text-ink-2">An A/B test answers what happened and how much, not why. Usability testing shows why users struggle but cannot estimate population effects; teams that run both decide better than teams that run either alone.</p>
    </div>
  );
}
