/**
 * Direct manipulation — Hutchins, Hollan & Norman's two aspects of directness
 * as a space: distance from the person's goals (large / small) against
 * engagement (interface as conversation / as model world). Each region carries
 * an example taken from content/knowledge/interaction/direct-manipulation.ts.
 * An original layout of their conceptual model, not a copy of their figure.
 * On narrow containers the grid becomes a list and every cell names both of
 * its coordinates, so nothing depends on position alone.
 */
type Cell = { name: string; distance: "Large" | "Small"; engagement: "Conversation" | "Model world"; example: string; reading: string; target?: boolean };

const CELLS: Cell[] = [
  {
    name: "Low-level language",
    distance: "Large",
    engagement: "Conversation",
    example: "One typed command per file, in syntax you must recall.",
    reading: "You talk to an intermediary, and at too low a level: the least direct corner.",
  },
  {
    name: "Low-level world",
    distance: "Large",
    engagement: "Model world",
    example: "Tagging 400 photos by dragging a tag onto each one.",
    reading: "You touch objects, but not at the level of your task: engaging at first, clumsy with use.",
  },
  {
    name: "High-level language",
    distance: "Small",
    engagement: "Conversation",
    example: "One rule for a whole set: 'tag every photo from this trip'.",
    reading: "Says exactly what you mean, without touching anything. Better for repetition and sets.",
  },
  {
    name: "Direct manipulation",
    distance: "Small",
    engagement: "Model world",
    example: "Dragging a crop handle while the photo updates.",
    reading: "The object of the task, acted on at the task's level, with the result shown at once.",
    target: true,
  },
];

function Region({ c }: { c: Cell }) {
  return (
    <section aria-label={`${c.name}: ${c.distance.toLowerCase()} distance, interface as ${c.engagement.toLowerCase()}`} className={`min-w-0 rounded-lg border p-3.5 ${c.target ? "border-accent bg-accent-wash" : "border-rule bg-surface"}`}>
      <p className="label">
        {c.distance} distance · {c.engagement}
      </p>
      <p className="t-sub mt-1 text-base text-ink">{c.name}</p>
      <p className="mt-2 text-sm text-ink">
        <span className="font-semibold">Example. </span>
        {c.example}
      </p>
      <p className="mt-1.5 text-sm text-ink-2">{c.reading}</p>
    </section>
  );
}

export function DirectnessSpace() {
  const at = (d: Cell["distance"], e: Cell["engagement"]) => CELLS.find((c) => c.distance === d && c.engagement === e)!;
  return (
    <div className="space-y-3">
      <div className="grid gap-3 @2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]">
        {/* column headings: engagement */}
        <div className="hidden @2xl:block" />
        <p className="label hidden text-center @2xl:block">Engagement · conversation</p>
        <p className="label hidden text-center @2xl:block">Engagement · model world</p>

        <p className="label hidden self-center [writing-mode:vertical-rl] rotate-180 @2xl:block">Distance · large</p>
        <Region c={at("Large", "Conversation")} />
        <Region c={at("Large", "Model world")} />

        <p className="label hidden self-center [writing-mode:vertical-rl] rotate-180 @2xl:block">Distance · small</p>
        <Region c={at("Small", "Conversation")} />
        <Region c={at("Small", "Model world")} />
      </div>
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Reading the space. </span>
        Distance is the effort of getting from what you want to the system’s actions and back from its output — the gulfs of execution and evaluation. Engagement is whether you act on a world of objects or talk to an intermediary about one. Directness needs both, and is always relative to the task and the person.
      </p>
    </div>
  );
}
