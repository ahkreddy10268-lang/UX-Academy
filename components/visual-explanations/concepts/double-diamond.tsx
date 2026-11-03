/**
 * Double Diamond — process diagram. Two diamonds of opening up and narrowing
 * down, the decision between them, and the return path that makes the model
 * iterative. Every label restates the entry (content/knowledge/frameworks/double-diamond.ts).
 */
import { ProcessTimeline } from "../diagrams/process-timeline";
import { Tag } from "../primitives";

export function DoubleDiamondProcess() {
  return (
    <ProcessTimeline
      groups={[
        {
          label: "Diamond 1 · the problem",
          sublabel: "understand the right problem",
          phases: [
            {
              name: "Discover",
              mode: "diverge",
              question: "What is really going on?",
              activities: ["User research", "Stakeholder interviews", "Data and desk research"],
              output: "Insight into the situation, not assumptions about it",
            },
            {
              name: "Define",
              mode: "converge",
              question: "Which problem is worth solving?",
              activities: ["Synthesise the findings", "Frame a problem statement or design challenge", "Agree success criteria"],
              output: "A brief the team commits to",
            },
          ],
        },
        {
          label: "Diamond 2 · the solution",
          sublabel: "find the right solution",
          phases: [
            {
              name: "Develop",
              mode: "diverge",
              question: "What could solve it?",
              activities: ["Generate many solutions", "Prototype and test", "Co-design with users"],
              output: "Tested alternatives",
            },
            {
              name: "Deliver",
              mode: "converge",
              question: "What works?",
              activities: ["Test at increasing fidelity", "Reject what fails", "Refine and launch"],
              output: "A solution in use, still being refined",
            },
          ],
        },
      ]}
      gate={{ title: "The right problem", detail: "Agree the problem statement before solution work begins." }}
      loop="Testing in Develop can show that the problem was framed wrongly and send the team back to Discover. Early prototypes can themselves be discovery tools. Real projects often contain many small diamonds."
      footer={
        <div className="grid gap-3 rounded-lg border border-rule bg-surface p-3.5 text-sm sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
          <p className="t-sub text-ink">The wider Framework for Innovation adds</p>
          <div className="flex flex-wrap gap-1.5">
            {["Put people first", "Communicate visually and inclusively", "Collaborate and co-create", "Iterate, iterate, iterate"].map((p) => (
              <Tag key={p}>{p}</Tag>
            ))}
            <Tag tone="accent">Methods: Explore · Shape · Build</Tag>
          </div>
        </div>
      }
    />
  );
}
