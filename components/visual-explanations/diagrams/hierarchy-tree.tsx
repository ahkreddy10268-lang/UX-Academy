/**
 * Hierarchy diagram: a real nested list drawn as a tree, so it is navigable by
 * screen readers and reflows on any width. Nodes can carry tags (e.g. which IA
 * system they belong to) and a highlighted path (e.g. a route following
 * information scent to a target).
 */
import type { ReactNode } from "react";
import { Marker } from "../primitives";

export type TreeNode = { label: string; note?: string; marker?: number; path?: boolean; target?: boolean; children?: TreeNode[] };

function NodeRow({ node }: { node: TreeNode }) {
  const tone = node.target ? "border-accent bg-accent-wash text-accent-ink font-semibold" : node.path ? "border-c-ink bg-c-wash text-c-ink font-semibold" : "border-rule bg-surface text-ink";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm ${tone}`}>
        {node.marker !== undefined && <Marker n={node.marker} />}
        {node.label}
        {node.target && <span className="sr-only"> (target)</span>}
        {node.path && !node.target && <span className="sr-only"> (on the path)</span>}
      </span>
      {node.note && <span className="text-xs text-ink-3">{node.note}</span>}
    </div>
  );
}

function Branch({ nodes }: { nodes: TreeNode[] }) {
  return (
    <ul className="ml-3 space-y-2 border-l border-rule-strong pl-5 pt-2">
      {nodes.map((c) => (
        <li key={c.label} className="relative before:absolute before:-left-5 before:top-[1.05rem] before:h-px before:w-4 before:bg-rule-strong">
          <NodeRow node={c} />
          {c.children && <Branch nodes={c.children} />}
        </li>
      ))}
    </ul>
  );
}

export function HierarchyTree({ root, label, aside }: { root: TreeNode; label: string; aside?: ReactNode }) {
  return (
    <div className="grid gap-6 @2xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div aria-label={label} role="group" className="min-w-0 overflow-x-auto">
        <NodeRow node={root} />
        {root.children && <Branch nodes={root.children} />}
      </div>
      {aside && <div className="min-w-0">{aside}</div>}
    </div>
  );
}
