/**
 * User-centred design — the ISO 9241-210 human-centred design cycle as a loop
 * with a decision exit, plus Gould & Lewis's three principles. Labels restate
 * content/knowledge/foundations/user-centred-design.ts (the standard is
 * paraphrased there because its text is paywalled).
 */
import { ProcessCycle } from "../diagrams/process-cycle";
import { Tag } from "../primitives";

export function UcdCycle() {
  return (
    <ProcessCycle
      entry="Plan the human-centred activities, roles and budget into the project."
      activities={[
        { name: "Understand and specify the context of use", methods: ["Contextual inquiry", "Interviews", "Field studies", "Analytics"], output: "A shared description of users, tasks and environments" },
        { name: "Specify the user requirements", methods: ["Personas", "Scenarios", "Task analysis", "Measurable usability goals"], output: "Requirements stated in testable terms" },
        { name: "Produce design solutions", methods: ["Sketches", "Prototypes", "Content and IA work"], output: "Prototypes, from low to high fidelity" },
        { name: "Evaluate the designs against the requirements", methods: ["Usability testing", "Heuristic evaluation", "Measurement against goals"], output: "Evidence of which requirements are met" },
      ]}
      hub={{ title: "Throughout", points: ["Users involved", "Explicit understanding of users, tasks, environments", "Multidisciplinary team"] }}
      decision={{ question: "Do the designs meet the requirements?", yes: "Release, then keep evaluating in use.", no: "Iterate: return to whichever activity needs revisiting, not always to the start." }}
      footer={
        <div className="grid gap-2 rounded-lg border border-rule bg-surface p-3.5 text-sm @2xl:grid-cols-[auto_minmax(0,1fr)] @2xl:items-center">
          <p className="t-sub text-ink">Gould &amp; Lewis (1985), three principles</p>
          <div className="flex flex-wrap gap-1.5">
            {["Early focus on users and tasks", "Empirical measurement", "Iterative design"].map((p) => (
              <Tag key={p}>{p}</Tag>
            ))}
          </div>
        </div>
      }
    />
  );
}
