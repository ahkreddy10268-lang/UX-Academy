import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "component-state-management",
  slug: "component-state-management",
  title: "Component State Management",
  alternateNames: ["UI state", "Controlled and uncontrolled components", "Component state machines", "Statecharts in UI"],
  summary:
    "Deciding which states a component can be in, what events move it between them, and who owns each piece of state — the component itself or its parent — so that the interface can never show an impossible combination.",
  definition:
    "Component state management is the practice of **modelling a component's possible states explicitly**, the **events** that move it between them, and **where each piece of state lives**. A finite state machine lists states (idle, pending, error) and allowed transitions; Harel's statecharts (1987) extend state diagrams with **nested** and **concurrent** states {{src:harel-1987}}, which suit interfaces where, for example, focus and a request's progress change independently. Ownership is the second half: a component is **uncontrolled** when it keeps the state itself and **controlled** when its parent drives it through props {{src:react-sharing-state}}. Accessibility state — `aria-expanded`, `aria-selected`, `aria-pressed`, `aria-busy` — must always mirror the internal state {{src:w3c-wai-aria-12}}.",
  primaryType: "concept",
  secondaryTypes: ["technique"],
  domain: "design-systems",
  subcategory: "components",
  tags: ["state", "state machine", "statecharts", "finite state machine", "controlled", "uncontrolled", "lifting state", "aria-busy", "roving tabindex", "focus management"],
  difficulty: "advanced",
  disciplines: ["Front-end engineering", "Interaction design", "Accessibility"],
  learningObjectives: [
    "List a component's states and transitions and draw them as a state machine.",
    "Decide whether state is internal, controlled by a parent or application-wide.",
    "Replace boolean state flags with a single state value that cannot contradict itself.",
    "Keep ARIA states, focus and announcements synchronised with component state.",
  ],
  prerequisites: ["component-architecture", "component-properties", "interaction-states"],

  levels: {
    beginner: {
      explanation: [
        "The library app's 'Renew' button sometimes shows a spinner and an error message at the same time, and pressing it twice renews the loan twice. Its code keeps three separate switches — `isLoading`, `hasError`, `isDone` — and nothing stops two of them being on together.",
        "**State management** starts by listing the situations a component can be in: *ready*, *working*, *done* or *failed*. The component is in exactly one of them at a time, and only certain events move it from one to another: pressing the button moves it from ready to working; the server's answer moves it to done or failed; 'Try again' moves it from failed back to working. Pressing while working does nothing.",
        "The second question is **who owns the state**. A text field can remember what you typed by itself, or the form around it can hold the value and tell the field what to show. Both are fine; mixing them is not.",
      ],
      analogy:
        "A traffic light: it is red, amber or green — never two at once — and changes only in a fixed order. A component designed as a state machine behaves the same way.",
      everydayExamples: [
        "A button that shows 'Saving…' and cannot be pressed again until it finishes.",
        "A menu that is either open or closed.",
        "A form field that shows an error only after you leave it.",
      ],
      vocabulary: [
        { term: "State", meaning: "The situation a component is in at a moment, such as open, loading or failed." },
        { term: "Event", meaning: "Something that happens, such as a click or a server reply, that may change the state." },
        { term: "Transition", meaning: "An allowed move from one state to another." },
        { term: "Controlled", meaning: "A component whose state is given to it by its parent through props." },
        { term: "Uncontrolled", meaning: "A component that keeps its own state internally." },
      ],
    },
    intermediate: {
      explanation: [
        "**Name the states first.** React's guide to reacting to input starts by identifying a component's visual states and what triggers each change, and relates this to a state machine {{src:react-reacting-to-input}}. It then removes non-essential state — variables that can be derived or that contradict each other {{src:react-reacting-to-input}}. Replacing `isLoading`, `hasError` and `isDone` with one `status` value makes the contradictory combinations impossible.",
        "**Ownership.** React calls a component with local state uncontrolled and one driven by props controlled; for each unique piece of state, one component owns it (a single source of truth), and shared state is lifted to the nearest common parent {{src:react-sharing-state}}. Library components often support both: Radix components are uncontrolled by default but can be controlled {{src:radix-primitives}}, typically through `value`/`defaultValue`/`onValueChange` pairs.",
        "**Three layers of state.** *Transient interaction state* (hover, pressed, focus-visible) belongs to the browser and CSS; *component state* (open, selected, pending) belongs to the component or its parent; *application state* (the user's loans, the current account) belongs to the product, outside the shared library. Design-system components should hold only the first two.",
        "**State machines in libraries.** Ark UI describes its components as state-machine powered, for predictable behaviour across frameworks {{src:ark-ui}}. You do not need a library to use the idea: a typed `status` and a transition function give most of the benefit.",
      ],
      howItWorks: [
        "A single state value with explicit transitions means every event is handled by asking 'what does this event do in this state?'; events that are not allowed are ignored, so double submissions and contradictory displays disappear.",
        "Owning each piece of state in exactly one place prevents copies drifting apart; controlled props let a parent coordinate several components without duplicating their state.",
      ],
      implementation: [
        "Draw the states and transitions before coding; review the diagram with design.",
        "Represent mutually exclusive states as one value (`status`), not several booleans.",
        "Support controlled and uncontrolled use with consistent prop names, and never switch a component between the two during its life.",
        "Mirror state in ARIA: `aria-expanded` for disclosure, `aria-selected` for tabs, `aria-pressed` for toggles {{src:w3c-wai-aria-12}}; set the state the role supports [WCAG 2.2 SC 4.1.2, A] {{src:w3c-wcag-22}}.",
        "Announce asynchronous outcomes as status messages without moving focus [SC 4.1.3 Status Messages, AA]; identify errors in text [SC 3.3.1 Error Identification, A] {{src:w3c-wcag-22}}.",
        "Manage focus as state: keep a visible focus indicator [SC 2.4.7, AA] and a logical focus order [SC 2.4.3, A] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** The Renew button gets one `status: \"idle\" | \"pending\" | \"renewed\" | \"error\"`. Presses in `pending` are ignored, the button exposes `aria-busy`, and a polite live region announces 'Renewed until 2 December' or the error.",
        "**Illustrative.** A filter panel's checkboxes each kept their own state, so 'Clear all' could not reset them. Lifting the selection to the panel and making the checkboxes controlled fixes it.",
        "**Design review protocol.** For each interactive component: what are its states and transitions? Which events are ignored in which states? Who owns each piece of state? Which ARIA states mirror it? How is each outcome announced, and where does focus go?",
      ],
    },
    advanced: {
      explanation: [
        "**Statecharts.** Harel's formalism adds hierarchy and concurrency to state diagrams {{src:harel-1987}}. In UI terms: an async button has a *request* region (idle → pending → resolved | error, with retry back to pending) and an independent *focus* region (blurred ⇄ focused). Modelled as two concurrent regions, they need 4 + 2 states; flattened into one machine they need every pair. Nested states let `error` contain `error.network` and `error.validation` while sharing the retry transition.",
        "**Focus and keyboard machines.** Composite widgets carry a focus state of their own. The APG describes two strategies: a roving tabindex, where one element has `tabindex=\"0\"` and the rest `-1`, updated on arrow keys, with the benefit that the browser scrolls the focused element into view; and `aria-activedescendant`, where DOM focus stays on the container that names the active element {{src:w3c-apg-keyboard}}. The tabs pattern specifies the transitions: arrows move and wrap, Home and End are optional, Tab leaves the list {{src:w3c-apg-tabs}}.",
        "**Typed machines.** A discriminated union per state (`{ status: \"error\"; message: string } | { status: \"resolved\"; until: Date } | …`) lets TypeScript narrow on `status` and the `never` type check that every state is handled {{src:typescript-narrowing}}; data that only exists in one state lives in that state.",
        "**Server and client.** In React Server Components apps, state and effects require client components; `'use client'` marks the boundary {{src:react-use-client}}. Keep the machine in the smallest interactive component and pass it serialisable initial data from the server.",
      ],
      evidence: [
        "State machines and statecharts are a long-established formalism in software engineering {{src:harel-1987}} (bibliographic record and DOI verified; the full text was not read here, so only the formalism's best-known features — nested and concurrent states — are attributed to it). React's documentation and headless libraries describe the controlled/uncontrolled model and state-machine-driven components {{src:react-sharing-state}} {{src:react-reacting-to-input}} {{src:radix-primitives}} {{src:ark-ui}}. Keyboard strategies come from the informative APG {{src:w3c-apg-keyboard}}; ARIA states from the WAI-ARIA 1.2 Recommendation {{src:w3c-wai-aria-12}}. No controlled study of state-machine use and UI defect rates was found.",
      ],
      debates: [
        "**Library or hand-rolled?** State-machine libraries give visualisation and formal guarantees; a typed `status` and reducer are lighter and often enough.",
        "**Controlled or uncontrolled by default?** Uncontrolled is simpler for consumers; controlled is needed for coordination. Supporting both costs implementation effort.",
        "**Roving tabindex or aria-activedescendant?** Roving moves real focus and scrolls into view {{src:w3c-apg-keyboard}}; activedescendant suits comboboxes where focus must stay in the input.",
      ],
      alternativeModels: [
        "**Reducers** — a function from (state, event) to state; a state machine without the diagram, common in React.",
        "**Signals and stores** — fine-grained reactive state; efficient, but transitions are not constrained unless modelled explicitly.",
      ],
    },
  },

  application: {
    summary: ["State management applies to every interactive component: buttons with async actions, disclosures, menus, tabs, comboboxes, forms and dialogs."],
    web: ["A typed status per component, controlled/uncontrolled props, ARIA mirroring and live regions; client boundaries only where state lives."],
    mobile: ["Native views use the same state lists; accessibility traits mirror state (selected, expanded)."],
    enterprise: ["Shared library components hold component state; products own application state and pass it in through controlled props."],
    services: ["State diagrams double as specifications for design, engineering and QA."],
    steps: [
      "List states and events; draw transitions.",
      "Mark ignored events per state.",
      "Decide ownership: internal, controlled or application.",
      "Implement with one status value and typed state data.",
      "Mirror ARIA states, announce outcomes, manage focus.",
    ],
  },

  whenToUse: [
    "Components with asynchronous actions, multiple modes or keyboard navigation.",
    "When bugs come from contradictory flags or duplicated state.",
  ],
  whenNotToUse: [
    "For simple presentational components with no state.",
    "As a reason to move every piece of application data into shared components: application state belongs to the product.",
  ],
  advantages: [
    "Impossible combinations cannot occur.",
    "Behaviour is reviewable as a diagram.",
    "Accessibility states and focus follow the same model.",
  ],
  limitations: [
    "Diagrams and types add up-front work.",
    "Supporting controlled and uncontrolled modes doubles some testing.",
    "Flattened machines grow quickly without hierarchy or concurrency.",
  ],
  misconceptions: [
    {
      myth: "Each visual condition needs its own boolean.",
      reality:
        "Mutually exclusive conditions belong in one value; React's guidance removes contradictory and derivable state {{src:react-reacting-to-input}}.",
    },
    {
      myth: "Hover and focus are component state to store in JavaScript.",
      reality:
        "They are transient interaction states the browser tracks (`:hover`, `:focus-visible`); storing them duplicates the browser and drifts. Composite widgets manage *which* element is focusable (roving tabindex), not whether something is hovered {{src:w3c-apg-keyboard}}.",
    },
  ],

  relations: [
    { target: "interaction-states", type: "related-to", note: "Visual states that the state model must cover." },
    { target: "state-transitions", type: "related-to", note: "How transitions between states are shown to users." },
    { target: "component-properties", type: "complementary-to", note: "Controlled props hand state to the parent." },
    { target: "component-architecture", type: "complementary-to", note: "Compound parts share state through context." },
    { target: "aria", type: "applied-in", note: "ARIA states mirror component state." },
    { target: "visibility-of-system-status", type: "applied-in", note: "Pending, success and error states keep users informed." },
  ],

  practice: {
    dos: [
      { text: "Model mutually exclusive conditions as one typed status with explicit transitions.", why: "Contradictory flags become impossible; React removes contradictory state {{src:react-reacting-to-input}}; TypeScript narrows on the discriminant {{src:typescript-narrowing}}.", kind: "industry" },
      { text: "Give each piece of state one owner and offer controlled and uncontrolled forms.", why: "A single source of truth per piece of state {{src:react-sharing-state}}; libraries such as Radix support both {{src:radix-primitives}}.", kind: "platform" },
      { text: "Mirror every state change in ARIA and announce async outcomes without moving focus.", why: "WCAG 2.2 SC 4.1.2 (A) and 4.1.3 Status Messages (AA) {{src:w3c-wcag-22}}; WAI-ARIA 1.2 states {{src:w3c-wai-aria-12}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't store hover or focus-visible in JavaScript state.", why: "The browser already tracks them; copies drift and add renders.", kind: "platform" },
      { text: "Don't switch a component between controlled and uncontrolled during its life.", why: "Two owners for one state; the component's behaviour becomes unpredictable.", kind: "platform" },
      { text: "Don't put every item of a composite widget in the tab sequence.", why: "The APG uses a roving tabindex or aria-activedescendant so Tab enters and leaves the widget once {{src:w3c-apg-keyboard}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Async action as a typed state machine (idle → pending → renewed | error)",
        language: "ts",
        code: `"use client";
import { useReducer } from "react";

type State =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "renewed"; until: string }
  | { status: "error"; message: string };

type Event =
  | { type: "PRESS" }
  | { type: "SUCCESS"; until: string }
  | { type: "FAILURE"; message: string }
  | { type: "RETRY" };

function transition(state: State, event: Event): State {
  switch (state.status) {
    case "idle":    return event.type === "PRESS" ? { status: "pending" } : state;
    case "pending": return event.type === "SUCCESS" ? { status: "renewed", until: event.until }
                         : event.type === "FAILURE" ? { status: "error", message: event.message }
                         : state;                                  // PRESS ignored: no double renewals
    case "error":   return event.type === "RETRY" ? { status: "pending" } : state;
    case "renewed": return state;
    default: { const never: never = state; return never; }          // exhaustiveness
  }
}

export function RenewButton({ loanId, renew }: { loanId: string; renew: (id: string) => Promise<string> }) {
  const [state, send] = useReducer(transition, { status: "idle" });
  const run = async (start: "PRESS" | "RETRY") => {
    send({ type: start });
    try { send({ type: "SUCCESS", until: await renew(loanId) }); }
    catch { send({ type: "FAILURE", message: "Renewal failed. Check your connection and try again." }); }
  };
  return (
    <>
      <button type="button" className="btn btn-primary"
        aria-busy={state.status === "pending" || undefined}
        aria-disabled={state.status === "pending" || state.status === "renewed" || undefined}
        onClick={() => state.status === "idle" && run("PRESS")}>
        {state.status === "pending" ? "Renewing…" : "Renew"}
      </button>
      {state.status === "error" && (
        <button type="button" className="btn btn-secondary" onClick={() => run("RETRY")}>Try again</button>
      )}
      <p role="status">                                   {/* polite announcement, focus stays put */}
        {state.status === "renewed" && \`Renewed until \${state.until}\`}
        {state.status === "error" && state.message}
      </p>
    </>
  );
}`,
        caption: "Illustrative. One status value; ignored events are explicit; data exists only in the state that needs it; outcomes are announced as status messages (SC 4.1.3).",
      },
      {
        title: "Controlled and uncontrolled in one API",
        language: "ts",
        code: `import { useState } from "react";

type DisclosureProps = {
  open?: boolean;                       // controlled
  defaultOpen?: boolean;                // uncontrolled initial value
  onOpenChange?: (open: boolean) => void;
};

export function useOpenState({ open, defaultOpen = false, onOpenChange }: DisclosureProps) {
  const [inner, setInner] = useState(defaultOpen);
  const isControlled = open !== undefined;          // decided once; do not switch later
  const value = isControlled ? open : inner;
  const setValue = (next: boolean) => {
    if (!isControlled) setInner(next);
    onOpenChange?.(next);
  };
  return [value, setValue] as const;
}

// <button aria-expanded={value} aria-controls={panelId} onClick={() => setValue(!value)}>Opening hours</button>`,
        caption: "Illustrative. One owner per mode; aria-expanded mirrors the state either way.",
      },
    ],
  },

  exercises: [
    {
      id: "component-state-management-ex-draw",
      kind: "assignment",
      level: "beginner",
      title: "Draw a state diagram",
      prompt: ["Choose a 'Save' or 'Send' button in an app. Draw its states as boxes and the events that move it between them as arrows. Mark which events should be ignored in which states."],
      deliverable: "A state diagram with ignored events listed.",
      criteria: ["States exclusive", "All events placed", "Ignored events marked"],
    },
    {
      id: "component-state-management-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix the double renewal",
      prompt: [
        "Illustrative case. The library app's Renew button uses isLoading, hasError and isDone. Pressing twice renews twice; a spinner and an error can show together; the success message appears visually but screen readers hear nothing; focus jumps to the top of the page after an error.",
        "Work through the correction sequence.",
      ],
      deliverable: "A state machine, ownership decision and accessibility plan.",
      criteria: ["Single status", "Ignored events", "Announcements", "Focus handled"],
      exampleSolution: [
        "1. Symptoms: duplicate renewals, contradictory display, silent success, lost focus.",
        "2. Impact: wrong loan records; confusion; screen-reader users unaware of the outcome; keyboard users lose their place.",
        "3. Causes: independent booleans; no ignored events; no live region; re-rendering the list resets focus.",
        "4. Requirements: status messages announced [WCAG 2.2 SC 4.1.3, AA]; errors identified in text [SC 3.3.1, A]; logical focus order [SC 2.4.3, A].",
        "5. Correction: status machine idle → pending → renewed | error, PRESS ignored in pending; role=\"status\" message; keep the button mounted so focus stays; Try again returns to pending.",
        "6. Validation: rapid double-click test; screen-reader check of announcements; keyboard test of retry.",
        "7. Trade-off: slightly more code; behaviour becomes reviewable as a diagram.",
      ],
    },
    {
      id: "component-state-management-ex-statechart",
      kind: "reflection",
      level: "advanced",
      title: "Concurrent regions",
      prompt: ["Model a combobox with three independent concerns: popup (closed, open), request (idle, loading, loaded, error) and focus (input, option). Compare a flat state count with a statechart of three concurrent regions, and say which strategy (roving tabindex or aria-activedescendant) suits its focus region and why."],
      deliverable: "Both models with state counts and a focus-strategy decision.",
      criteria: ["Regions independent", "Counts computed", "APG strategy justified"],
    },
  ],

  quiz: [
    {
      id: "component-state-management-q-exclusive",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why use one status value instead of isLoading, hasError and isDone?",
      options: [
        { text: "So the component can only be in one state at a time and cannot show contradictions", correct: true, explanation: "Exclusive states belong in one value." },
        { text: "Because booleans are slower", correct: false, explanation: "Performance is not the reason." },
        { text: "Because React forbids booleans", correct: false, explanation: "It does not." },
        { text: "To use less memory", correct: false, explanation: "Not the point." },
      ],
      explanation: "One value, one state.",
    },
    {
      id: "component-state-management-q-controlled",
      kind: "scenario",
      level: "intermediate",
      prompt: "A 'Clear all filters' button must reset every checkbox in a panel, but each checkbox keeps its own state. What fixes it?",
      options: [
        { text: "Lift the selection to the panel and make the checkboxes controlled", correct: true, explanation: "Shared state goes to the common parent." },
        { text: "Reload the page", correct: false, explanation: "Loses everything else." },
        { text: "Copy the state into both places", correct: false, explanation: "Copies drift apart." },
        { text: "Use a global variable", correct: false, explanation: "Hides ownership." },
      ],
      explanation: "A single source of truth per piece of state.",
    },
    {
      id: "component-state-management-q-roving",
      kind: "critique",
      level: "advanced",
      prompt: "In a toolbar using a roving tabindex, what tabindex values should the buttons have?",
      options: [
        { text: "The current item 0, all others -1; arrow keys move the 0", correct: true, explanation: "That is the APG roving tabindex algorithm." },
        { text: "All 0", correct: false, explanation: "Every item would be a Tab stop." },
        { text: "All -1", correct: false, explanation: "The toolbar would be unreachable with Tab." },
        { text: "Increasing positive values", correct: false, explanation: "Positive tabindex distorts page order." },
      ],
      explanation: "Focus is part of the component's state.",
    },
  ],

  flashcards: [
    { id: "component-state-management-fc-machine", front: "Finite state machine (UI)", back: "A component is in exactly one of a set of states; only listed events cause listed transitions." },
    { id: "component-state-management-fc-statechart", front: "Statecharts (Harel 1987)", back: "State diagrams extended with nested and concurrent states — e.g. request progress and focus as independent regions." },
    { id: "component-state-management-fc-controlled", front: "Controlled vs uncontrolled", back: "Controlled: state comes from props (parent owns it). Uncontrolled: the component keeps it (defaultValue)." },
    { id: "component-state-management-fc-wcag", front: "WCAG 2.2 criteria for component state", back: "4.1.2 Name, Role, Value (A), 4.1.3 Status Messages (AA), 3.3.1 Error Identification (A), 2.4.3 Focus Order (A), 2.4.7 Focus Visible (AA)." },
  ],

  references: [
    { source: "harel-1987", role: "primary", note: "Statecharts formalism (bibliographic; full text not read)." },
    { source: "react-sharing-state", role: "primary", note: "Controlled, uncontrolled, single source of truth." },
    { source: "react-reacting-to-input", role: "primary", note: "Visual states, triggers, removing contradictory state." },
    { source: "w3c-apg-keyboard", role: "primary", note: "Roving tabindex and aria-activedescendant." },
    { source: "w3c-apg-tabs", role: "explanatory", note: "Keyboard transitions of tabs." },
    { source: "w3c-wai-aria-12", role: "standard", note: "States and properties per role." },
    { source: "radix-primitives", role: "explanatory", note: "Uncontrolled by default, controllable." },
    { source: "ark-ui", role: "explanatory", note: "State-machine powered components." },
    { source: "typescript-narrowing", role: "explanatory", note: "Discriminated unions and never." },
    { source: "react-use-client", role: "explanatory", note: "State requires client components." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.4.3, 2.4.7, 3.3.1, 4.1.2, 4.1.3." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "A long-established software-engineering formalism (statecharts, cited bibliographically) applied through documented practice in React and headless libraries; keyboard strategies from the informative APG; ARIA states from a W3C Recommendation. No controlled study of state-machine use and defect rates was found.",

  lab: "async-state-lab",

  status: "published",
  quality: { classification: true, explanation: true, research: true, beginner: true, professional: true, examples: true, limitations: true, relationships: true, sources: true, activities: true },
  lastVerifiedAt: "2026-11-11",
});
