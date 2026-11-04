/**
 * Human-computer interaction — a conceptual comparison of three lenses on the
 * same interaction (cognitive modelling, work and participation, experience and
 * meaning). Restates content/knowledge/foundations/human-computer-interaction.ts:
 * the lenses are interpretive framings (Bødker; Harrison, Sengers and Tatar), not
 * validated stages, and the diagram says so.
 */
import { DiagramNode, FlowArrow, Tag } from "../primitives";

const LENSES = [
  {
    title: "Cognitive modelling",
    unit: "The individual user as an information processor",
    question: "How long will an expert take, and where will errors occur?",
    methods: ["Task-time models (KLM, GOMS)", "Controlled experiments"],
    cannot: "Whether a team will adopt it, or what it means to people",
  },
  {
    title: "Work and participation",
    unit: "Groups and the settings where they work",
    question: "How does the technology fit what these people actually do together?",
    methods: ["Field observation", "Participatory design"],
    cannot: "A general performance number for a task",
  },
  {
    title: "Experience and meaning",
    unit: "Broader, more varied use contexts over time",
    question: "What does it mean to people, and how does that change with use?",
    methods: ["Interviews", "Long-term studies"],
    cannot: "Which of two layouts is quicker to operate",
  },
] as const;

export function HciLenses() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 @3xl:flex-row @3xl:items-stretch">
        {LENSES.map((l, i) => (
          <div key={l.title} className="contents">
            {i > 0 && <FlowArrow fixed="right" />}
            <div className="min-w-0 flex-1">
              <DiagramNode title={l.title} tone={i === 1 ? "wash" : "surface"} className="h-full">
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="label">Unit of analysis</dt>
                    <dd className="text-ink-2">{l.unit}</dd>
                  </div>
                  <div>
                    <dt className="label">Typical question</dt>
                    <dd className="text-ink-2">{l.question}</dd>
                  </div>
                  <div>
                    <dt className="label">Typical methods</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {l.methods.map((m) => (
                        <Tag key={m}>{m}</Tag>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="label">Cannot show</dt>
                    <dd className="text-ink-2">{l.cannot}</dd>
                  </div>
                </dl>
              </DiagramNode>
            </div>
          </div>
        ))}
      </div>
      <p className="rounded-lg border border-rule bg-soft p-3 text-sm text-ink-2">
        <span className="font-semibold text-ink">Read the arrows as an emphasis shift, not a replacement.</span> The lenses overlap, earlier ones keep contributing, and one project often uses all three.
      </p>
    </div>
  );
}
