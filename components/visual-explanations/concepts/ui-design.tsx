/**
 * User Interface Design — an annotated, fictional "book a study room" screen
 * where each marker points to one decision the interface designer made:
 * hierarchy, location, controls and signifiers, content presentation, states
 * that do not depend on colour alone, feedback, and accessible focus, labels
 * and targets. Illustrative interface; the decisions restate
 * content/knowledge/foundations/ui-design.ts.
 */
import { AnnotatedInterface, Pin } from "../diagrams/annotated-interface";

const slots: { t: string; state: "open" | "booked" | "selected" }[] = [
  { t: "09:00", state: "booked" },
  { t: "10:00", state: "open" },
  { t: "11:00", state: "selected" },
  { t: "12:00", state: "open" },
];

function BookingScreen() {
  return (
    <div className="mx-auto max-w-sm pl-7" aria-hidden>
      <div className="rounded-lg border border-rule bg-surface p-4 shadow-card">
        {/* 2 location */}
        <div className="relative">
          <Pin n={2} className="-left-[2.6rem] -top-1" />
          <p className="text-[12px] text-ink-3">
            <span className="underline">Library</span> › <span className="underline">Study rooms</span> › <span className="font-semibold text-ink-2">Book</span>
          </p>
        </div>
        {/* 1 hierarchy */}
        <div className="relative mt-2">
          <Pin n={1} className="-left-[2.6rem] top-0" />
          <p className="text-[17px] font-semibold leading-tight text-ink">Book a study room</p>
          <p className="mt-0.5 text-[12px] text-ink-2">Thursday 12 March · up to 2 hours</p>
        </div>
        {/* 4 content presentation */}
        <div className="relative mt-4 rounded-md border border-rule bg-soft p-2.5">
          <Pin n={4} className="-left-[2.6rem] top-1" />
          <div className="flex items-baseline justify-between">
            <p className="text-[12px] font-semibold text-ink">Room 2B</p>
            <p className="text-[12px] text-ink-2">Seats 4</p>
          </div>
          <p className="mt-0.5 text-[12px] text-ink-2">Screen · whiteboard · step-free access</p>
        </div>
        {/* 3 controls, 5 states, 7 focus and targets */}
        <p className="mt-4 text-[12px] font-semibold text-ink">Start time</p>
        <div className="relative mt-1.5 grid grid-cols-4 gap-1.5">
          <Pin n={3} className="-left-[2.6rem] top-1" />
          <Pin n={5} className="-right-2 -top-3" />
          {slots.map((s) => (
            <span
              key={s.t}
              className={`flex min-h-9 flex-col items-center justify-center rounded-sm border text-[11px] leading-tight ${
                s.state === "selected"
                  ? "border-accent bg-accent text-surface outline-2 outline-offset-2 outline-accent"
                  : s.state === "booked"
                    ? "border-dashed border-rule bg-sunken text-ink-3"
                    : "border-line-control bg-surface text-ink"
              }`}
            >
              <span className={s.state === "booked" ? "line-through" : "font-semibold"}>{s.t}</span>
              <span>{s.state === "selected" ? "✓ Chosen" : s.state === "booked" ? "Booked" : "Free"}</span>
            </span>
          ))}
        </div>
        <div className="relative mt-3">
          <Pin n={7} className="-left-[2.6rem] top-3" />
          <p className="text-[12px] font-medium text-ink-2">Group name (shown on the door)</p>
          <div className="mt-1 h-7 rounded-sm border border-line-control bg-surface px-2 text-[12px] leading-7 text-ink">Thesis group</div>
        </div>
        {/* 6 feedback */}
        <div className="relative mt-3 rounded-sm border border-ok bg-ok-wash px-2 py-1.5 text-[12px] text-ink">
          <Pin n={6} className="-left-[2.6rem] top-0" />
          <span className="font-semibold text-ok">Held for 10 minutes.</span> Confirm to keep 11:00–13:00.
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[12px] text-ink-2 underline">Choose another room</span>
          <span className="rounded-sm bg-accent px-3 py-1.5 text-[12px] font-semibold text-surface">Confirm booking</span>
        </div>
      </div>
    </div>
  );
}

export function UiDesignAnnotated() {
  return (
    <AnnotatedInterface
      mockLabel="A fictional library screen for booking a study room. From top: a breadcrumb trail, the title Book a study room with the date beneath it, a card for Room 2B with seats and features, four start-time buttons (09:00 booked and struck through, 10:00 free, 11:00 chosen with a tick and a focus ring, 12:00 free), a labelled field for the group name, a green-bordered message saying the room is held for 10 minutes, a secondary link to choose another room and a primary Confirm booking button."
      mock={<BookingScreen />}
      notes={[
        {
          n: 1,
          title: "Hierarchy",
          text: "The title is the largest text, the date sits under it in a quieter style, and the single filled button is the one primary action. Size, weight and position give the order in which to read and act.",
          ifBroken: "When everything is the same size and weight, people have to read every element to find the task and the next step.",
        },
        {
          n: 2,
          title: "Location and navigation",
          text: "The breadcrumb tells people where they are and gives a way back up without losing the booking context.",
          ifBroken: "Without it, a person who arrived from a search link cannot tell which service this is or how to reach the list of rooms.",
        },
        {
          n: 3,
          title: "Controls and signifiers",
          text: "Time slots are bordered boxes that look pressable; the underlined text looks like a link; the filled button looks like the main action. Each control's appearance signals what it does.",
          ifBroken: "Flat text for times, or a link styled as a button, makes people guess which parts respond and what will happen.",
        },
        {
          n: 4,
          title: "Content presentation",
          text: "Room name, capacity and features appear in the same order and position on every room card, so rooms can be compared at a glance.",
          ifBroken: "If each card orders its details differently, comparing two rooms means re-reading both.",
        },
        {
          n: 5,
          title: "States not carried by colour alone",
          text: "Free, chosen and booked differ in words (Free, Chosen, Booked), a tick, a strike-through and a dashed border, as well as in colour.",
          ifBroken: "If only colour marks a booked slot, people who cannot distinguish the colours, or who see a greyscale print, cannot tell which times are taken.",
        },
        {
          n: 6,
          title: "Feedback",
          text: "Choosing a time produces an immediate message that says what happened (the room is held), for how long, and what to do next.",
          ifBroken: "Without it, people cannot tell whether the click registered, and may book twice or leave believing they have a room.",
        },
        {
          n: 7,
          title: "Focus, labels and targets",
          text: "The field has a visible label above it rather than placeholder text; the keyboard focus ring around 11:00 shows which control is active; each time slot is a target large enough to hit easily.",
          ifBroken: "Placeholder-only labels vanish when typing starts; no focus ring strands keyboard users; small targets cause mis-taps on phones.",
        },
      ]}
    />
  );
}
