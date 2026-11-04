/**
 * Decision tree for choosing between methods or options. Each question is a
 * real heading-level node with Yes/No branches; leaves name the choice and say
 * why. Drawn as an indented tree so it reads correctly at any width.
 */
import Link from "next/link";

export type Leaf = { choice: string; why: string; href?: string; highlight?: boolean };
export type Question = { q: string; yes: Question | Leaf; no: Question | Leaf };

const isLeaf = (x: Question | Leaf): x is Leaf => "choice" in x;

function Outcome({ leaf }: { leaf: Leaf }) {
  return (
    <div className={`rounded-md border p-2.5 text-sm ${leaf.highlight ? "border-accent bg-accent-wash" : "border-rule bg-surface"}`}>
      <p className={`t-sub ${leaf.highlight ? "text-accent-ink" : "text-ink"}`}>{leaf.href ? <Link href={leaf.href} className="hover:underline">{leaf.choice}</Link> : leaf.choice}</p>
      <p className="mt-0.5 text-ink-2">{leaf.why}</p>
    </div>
  );
}

function Node({ node, depth }: { node: Question; depth: number }) {
  return (
    <div>
      <p className="inline-flex items-center gap-2 rounded-md border border-rule-strong bg-soft px-3 py-2 text-sm font-medium text-ink">
        <span aria-hidden className="formula text-accent-ink">?</span>
        {node.q}
      </p>
      <ul className="ml-4 mt-2 space-y-2 border-l border-rule-strong pl-4">
        {(["yes", "no"] as const).map((k) => (
          <li key={k} className="relative before:absolute before:-left-4 before:top-4 before:h-px before:w-3 before:bg-rule-strong">
            <p className={`mb-1 text-xs font-semibold ${k === "yes" ? "text-ok" : "text-ink-2"}`}>{k === "yes" ? "Yes" : "No"}</p>
            {isLeaf(node[k]) ? <Outcome leaf={node[k] as Leaf} /> : <Node node={node[k] as Question} depth={depth + 1} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DecisionTree({ root, label }: { root: Question; label: string }) {
  return (
    <div role="group" aria-label={label} className="min-w-0">
      <Node node={root} depth={0} />
    </div>
  );
}
