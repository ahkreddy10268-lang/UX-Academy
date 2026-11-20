/**
 * The working-memory model — the four parts, what each does, the evidence that
 * shows it, and the dual-task logic that makes two tasks compete or not.
 * Restates content/knowledge/psychology/working-memory-model.ts (Baddeley and
 * Hitch 1974; Baddeley, Thomson and Buchanan 1975; Baddeley 2000). Text is
 * real HTML; each part stacks as role → evidence at every width.
 */
type Part = { name: string; does: string; shows: string };

const PARTS: Part[] = [
  {
    name: "Central executive",
    does: "Allocates attention: focusing, dividing between tasks, switching, and interfacing with long-term memory. It has no storage of its own in the revised model.",
    shows: "Dual-task experiments: a secondary task disrupts a primary task only modestly, so the two cannot both depend on one small store.",
  },
  {
    name: "Phonological loop",
    does: "A short-lived store for speech-based information, refreshed by silent rehearsal; it also converts written words into phonological form.",
    shows: "The word-length effect: fewer long words than short words are recalled, and it disappears under articulatory suppression.",
  },
  {
    name: "Visuospatial sketchpad",
    does: "Holds visual appearance and spatial layout, and supports mental imagery and navigation.",
    shows: "Disrupted by concurrent spatial tasks but much less by verbal ones.",
  },
  {
    name: "Episodic buffer",
    does: "A limited-capacity store accessible to awareness that binds features into chunks, combining information from the other parts and long-term memory.",
    shows: "Added to explain how people hold more than the subsystems allow when information is meaningful, such as prose, and how modalities are bound into one representation.",
  },
];

export function WorkingMemoryParts() {
  return (
    <div className="space-y-3">
      <p className="rounded-lg border border-rule bg-surface p-3 text-sm text-ink">
        <span className="font-semibold">Working memory is a small team, not one box.</span> Each part has limited room, so two tasks that use the same part compete, while two that use different parts are easier to do together.
      </p>
      <ol className="space-y-2" aria-label="The four parts of working memory">
        {PARTS.map((p, i) => (
          <li key={p.name} className="grid min-w-0 gap-x-4 gap-y-1.5 rounded-lg border border-rule-strong bg-surface p-3.5 @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1.6fr)]">
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="formula text-sm text-accent">{i + 1}</span>
              <span className="t-sub text-base text-ink">{p.name}</span>
            </p>
            <p className="min-w-0 text-sm text-ink">
              <span className="label block">What it does</span>
              {p.does}
            </p>
            <p className="min-w-0 text-sm text-ink-2">
              <span className="label block">What shows it</span>
              {p.shows}
            </p>
          </li>
        ))}
      </ol>
      <div className="grid gap-3 @2xl:grid-cols-2">
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="Same part">
          <p className="label">Same part: harder</p>
          <p className="mt-1.5 text-sm text-ink">Remembering a number while listening to someone talk; narration plus dense on-screen text competes for the same resources.</p>
        </section>
        <section className="min-w-0 rounded-lg border border-rule bg-surface p-3.5" aria-label="Different parts">
          <p className="label">Different parts: easier</p>
          <p className="mt-1.5 text-sm text-ink">Remembering a number while looking at a map. Do not make users carry information from one screen to the next in memory; show it where it is needed.</p>
        </section>
      </div>
    </div>
  );
}
