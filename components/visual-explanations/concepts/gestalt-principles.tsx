/**
 * Gestalt principles — an annotated checkout step where each grouping cue
 * carries part of the structure, and a spacing comparison showing the
 * ambiguity of equal spacing. Illustrative interface; the principles and their
 * interaction restate content/knowledge/laws-effects/gestalt-principles.ts.
 */
import { ComparisonDiagram } from "../diagrams/comparison";
import { AnnotatedInterface, Pin } from "../diagrams/annotated-interface";

function Field({ label, tight = true }: { label: string; tight?: boolean }) {
  return (
    <div>
      <p className={`text-xs font-medium text-ink-2 ${tight ? "mb-1" : "mb-3"}`}>{label}</p>
      <div className="h-7 rounded-sm border border-line-control bg-surface" />
    </div>
  );
}

function Checkout() {
  return (
    <div className="mx-auto max-w-sm pl-7">
    <div className="rounded-lg border border-rule bg-surface p-4 shadow-card">
      {/* stepper: connectedness + continuity */}
      <div className="relative">
        <Pin n={4} className="-left-[2.6rem] top-0" />
        <div className="relative flex items-center justify-between px-1">
          <span aria-hidden className="absolute left-3 right-3 top-1/2 h-0.5 -translate-y-1/2 bg-rule-strong" />
          {["Basket", "Delivery", "Pay"].map((s, i) => (
            <span key={s} className="relative flex flex-col items-center gap-1 bg-surface px-1">
              <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-semibold ${i < 2 ? "bg-accent text-surface" : "border border-rule-strong bg-surface text-ink-3"}`}>{i + 1}</span>
              <span className="text-[11px] text-ink-2">{s}</span>
            </span>
          ))}
        </div>
      </div>
      {/* proximity: label close to its field, more space between pairs */}
      <div className="relative mt-5 space-y-4">
        <Pin n={1} className="-left-[2.6rem] top-0" />
        <Field label="Full name" />
        <Field label="Postcode" />
      </div>
      {/* common region + similarity: delivery options */}
      <p className="mt-5 text-[11px] font-semibold text-ink">Delivery</p>
      <div className="relative mt-1.5 grid grid-cols-2 gap-2">
        <Pin n={3} className="-left-[2.6rem] top-2" />
        <Pin n={2} className="-right-2 -top-2.5" />
        {["Standard · free", "Next day · £4"].map((o, i) => (
          <div key={o} className={`rounded-md border p-2 text-[11px] ${i === 0 ? "border-accent bg-accent-wash text-accent-ink" : "border-rule bg-soft text-ink-2"}`}>
            <span className={`mb-1 block h-3 w-3 rounded-full border ${i === 0 ? "border-accent bg-accent" : "border-line-control bg-surface"}`} />
            {o}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] text-ink-2 underline">Back to basket</span>
        <span className="rounded-sm bg-accent px-3 py-1.5 text-[11px] font-semibold text-surface">Continue to payment</span>
      </div>
    </div>
    </div>
  );
}

export function GestaltAnnotated() {
  return (
    <AnnotatedInterface
      mockLabel="A checkout step with a three-step progress line, two form fields with their labels close above them, two delivery options in matching boxes, and a Continue button."
      mock={<Checkout />}
      notes={[
        { n: 1, title: "Proximity", text: "Each label sits closer to its own field than to the field above, so label and field read as one unit.", ifBroken: "With equal gaps a label floats between two fields and could belong to either." },
        { n: 2, title: "Similarity", text: "Both delivery options share shape, size and style, so they read as alternatives of one kind.", ifBroken: "Styling one option like a button would suggest it does something different." },
        { n: 3, title: "Common region", text: "Each option's text and radio sit inside one box, so the box, not the spacing, holds them together.", ifBroken: "Without the box, dense options rely on spacing alone, which fails when content varies in length." },
        { n: 4, title: "Connectedness and continuation", text: "A line joins the step markers, so three separate circles read as one ordered sequence.", ifBroken: "Unconnected circles look like unrelated badges." },
      ]}
    />
  );
}

function Form({ even }: { even: boolean }) {
  return (
    <div className="space-y-0 p-4" aria-hidden>
      {["Email", "Password", "Confirm password"].map((l) => (
        <div key={l} className={even ? "" : "mb-5"}>
          <p className={`text-xs font-medium text-ink-2 ${even ? "mb-3" : "mb-1"}`}>{l}</p>
          <div className={`h-7 rounded-sm border border-line-control bg-surface ${even ? "mb-3" : ""}`} />
        </div>
      ))}
    </div>
  );
}

export function GestaltSpacing() {
  return (
    <ComparisonDiagram
      before={{
        title: "Equal spacing everywhere",
        visual: <Form even />,
        points: [
          { label: "Problem", text: "Each label is as far from its own field as from the field above it." },
          { label: "Why", text: "Proximity gives no cue to which field a label belongs to, so people have to infer it from order." },
        ],
      }}
      after={{
        title: "Inner spacing smaller than outer spacing",
        visual: <Form even={false} />,
        points: [
          { label: "Intervention", text: "Use a small step between a label and its field and a larger step between pairs." },
          { label: "Why it helps", text: "Grouping by proximity depends on relative distance, so the pairs separate without any extra lines or boxes." },
        ],
      }}
      effect="The structure becomes readable from spacing alone. Grouping cues are graded and can compete, so a strong colour or border elsewhere could still override this spacing."
      effectKind="illustrative"
    />
  );
}
