/**
 * Heuristic evaluation — (1) independent evaluators fanning into aggregation
 * and independent severity rating, with illustrative problem sets that show the
 * evaluator effect; (2) a decision tree for choosing between inspection and
 * testing. Restates content/knowledge/research/heuristic-evaluation.ts.
 */
import { DecisionTree } from "../diagrams/decision-tree";
import { ParallelFlow } from "../diagrams/parallel-flow";
import { Tag } from "../primitives";

/** Eight problems in a hypothetical interface; P6 is found by nobody. Single evaluators find 3 of 8 (37.5%). */
const FOUND: Record<string, string[]> = { "Evaluator A": ["P1", "P2", "P4"], "Evaluator B": ["P2", "P5", "P7"], "Evaluator C": ["P3", "P4", "P8"] };
const ALL = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"];

function Problems({ found }: { found: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1" aria-label={`Found ${found.join(", ")}`}>
      {ALL.map((p) => {
        const on = found.includes(p);
        return (
          <li key={p} className={`formula rounded-xs px-1.5 py-0.5 text-[11px] ${on ? "bg-c-ink text-surface" : "border border-dashed border-planned-line text-ink-3"}`}>
            {p}
            <span className="sr-only">{on ? " found" : " missed"}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function HeuristicFlow() {
  const union = ALL.filter((p) => Object.values(FOUND).some((f) => f.includes(p)));
  return (
    <ParallelFlow
      start={
        <>
          <span className="t-sub text-ink">Brief</span> <span className="text-ink-2">— target users, key tasks, platform, scope and the heuristic set, the same for every evaluator.</span>
        </>
      }
      laneNote="Independent first: no sharing until everyone is done (1–2 hours each, often two passes)"
      lanes={Object.entries(FOUND).map(([label, f]) => ({
        label,
        content: (
          <>
            <Problems found={f} />
            <p className="mt-1.5 text-xs text-ink-3">{f.length} of {ALL.length} problems</p>
          </>
        ),
      }))}
      merge={
        <>
          <p className="t-sub text-c-ink">Aggregate into one de-duplicated list</p>
          <div className="mt-2">
            <Problems found={union} />
          </div>
          <p className="mt-1.5 text-xs text-ink-2">
            Together: {union.length} of {ALL.length}. P6 was missed by everyone, so even a merged list is not complete.
          </p>
        </>
      }
      after={[
        <>
          <p className="t-sub text-ink">Rate severity independently, then average</p>
          <p className="mt-1.5 flex flex-wrap gap-1.5">
            {["0 not a problem", "1 cosmetic", "2 minor", "3 major", "4 catastrophe"].map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </p>
          <p className="mt-1.5 text-xs text-ink-2">Judged on frequency, impact and persistence. One rater&apos;s scores are unreliable; the average of several is more dependable.</p>
        </>,
        <>
          <p className="t-sub text-ink">Report, prioritise and validate with users</p>
          <p className="mt-1 text-xs text-ink-2">Findings are expert predictions. Uncertain or high-impact ones go into the next usability test.</p>
        </>,
      ]}
    />
  );
}

export function HeuristicDecision() {
  return (
    <DecisionTree
      label="Choosing between heuristic evaluation and related methods"
      root={{
        q: "Do you need evidence of what real users actually do?",
        yes: { choice: "Usability testing", why: "Observe representative users. Slower and costlier, but direct evidence rather than prediction.", href: "/library/usability-testing" },
        no: {
          q: "Is the question whether first-time users can work out specific tasks?",
          yes: { choice: "Cognitive walkthrough", why: "A task-based inspection grounded in a theory of exploratory learning; narrower in scope.", href: "/library/cognitive-walkthrough" },
          no: {
            q: "Do you need a broad, quick check of an interface against established principles?",
            yes: { choice: "Heuristic evaluation", why: "Three to five evaluators working independently first, ideally including someone with domain expertise.", highlight: true },
            no: { choice: "Expert review without heuristics", why: "Faster, but less structured and harder to audit. Or sharpen the question first." },
          },
        },
      }}
    />
  );
}
