import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "mapping",
  slug: "mapping",
  title: "Mapping",
  alternateNames: ["Natural mapping", "Control-display mapping", "Stimulus-response compatibility", "Spatial compatibility"],
  summary:
    "The relationship between controls and what they affect. When the layout, direction or grouping of controls mirrors their effects, people know which control to use without labels or trial and error.",
  definition:
    "Mapping is the relationship between a control and its result: which switch turns on which light, which way a slider moves a value, which button in a row acts on which item. A **natural mapping** is one people understand at once because it borrows a spatial analogy or a convention they already know {{src:norman-2013}}. In human factors the same idea is studied as **stimulus-response (S-R) compatibility**: some arrangements of displays and responses are performed faster and with fewer errors than others {{src:fitts-seeger-1953}} {{src:chapanis-lindenbaum-1959}}. Mapping is not a label or an instruction: a good mapping makes those unnecessary.",
  primaryType: "concept",
  secondaryTypes: ["principle"],
  domain: "interaction",
  subcategory: "principles",
  tags: ["natural mapping", "stimulus-response compatibility", "controls", "direction", "layout", "Norman", "match between system and the real world", "spatial mapping", "right-to-left"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "Human factors", "UI design", "Accessibility"],
  learningObjectives: [
    "Explain mapping and natural mapping, and give examples from physical and digital interfaces.",
    "Recognise poor mappings by the errors and hesitation they cause.",
    "Design layouts, directions and groupings that mirror the effects of controls, including in right-to-left languages.",
    "Keep mappings true for keyboard and screen-reader users, whose order is not spatial.",
  ],
  prerequisites: ["signifiers", "constraints"],

  levels: {
    beginner: {
      explanation: [
        "A cooker has four rings in a square and four knobs in a straight line. Which knob controls the back-left ring? You read the tiny diagrams, guess, and sometimes heat the wrong pan. The knobs work perfectly; the **mapping** between knobs and rings is the problem.",
        "Mapping is the link between a control and what it does. A **natural mapping** needs no explanation: if the knobs were laid out in the same square as the rings, you would reach for the right one without thinking. The same goes for screens: a volume slider that goes up for louder, arrows that point the way content moves, a settings list in the same order as the parts of the device it controls.",
        "Good mapping matters because it removes a step people should never have had to take: working out which control does what.",
      ],
      analogy:
        "A seating plan on a theatre ticket. Because the plan is drawn the way the seats are laid out, you find row F, seat 12 by looking, not by reading instructions. A plan drawn as an alphabetical list would hold the same information and be much harder to use.",
      everydayExamples: [
        "Light switches arranged in the same order as the lights they control.",
        "Swiping a photo left to see the next one in a left-to-right gallery.",
        "A car's window switches placed in the same layout as the windows.",
        "A map that zooms in when you spread two fingers apart.",
      ],
      vocabulary: [
        { term: "Mapping", meaning: "The relationship between a control and the result it produces." },
        { term: "Natural mapping", meaning: "A mapping people understand immediately, usually because it copies a spatial layout or a familiar convention." },
        { term: "S-R compatibility", meaning: "How well an arrangement of signals (stimuli) and actions (responses) fits people's expectations." },
        { term: "Spatial analogy", meaning: "Using position, direction or grouping on the control to mirror position, direction or grouping in the effect." },
        { term: "Convention", meaning: "A learned rule, such as 'up means more', that can serve as a mapping when space cannot." },
      ],
    },
    intermediate: {
      explanation: [
        "Mappings work in three ways. **Spatial**: controls are arranged like the things they affect, or placed on them. **Directional**: the movement of a control matches the movement of the effect (drag right, value increases; scroll down, content moves up). **Conventional**: where no spatial link exists, a learned rule carries the meaning, such as up for more, or clockwise to increase. Conventions vary across cultures and reading directions, so they are weaker than spatial mappings.",
        "Human factors research measured the effect long before screens. Fitts and Seeger (1953) introduced the term S-R compatibility for how well spatial arrangements of stimuli and responses fit together {{src:fitts-seeger-1953}}; NN/g summarises their finding that people responded faster when stimulus and response were on the same side {{src:nng-natural-mappings}}. Chapanis and Lindenbaum (1959) measured reaction times and errors on four cooker models with different knob-to-ring arrangements: after practice, one arrangement was superior to all the others {{src:chapanis-lindenbaum-1959}}. Practice reduced but did not remove the differences.",
        "In interfaces, mapping appears in layout (a toolbar above the content it acts on), in direction (sliders, steppers, carousels, scrolling), in grouping (controls next to the item they change) and in localisation: in right-to-left languages, directional mappings such as 'next' arrows and progress must be mirrored, while clocks and media play buttons usually are not.",
      ],
      howItWorks: [
        "A natural mapping lets people choose a control by perception rather than by reading or remembering. Norman places it alongside signifiers, constraints and feedback as one of the ways the world can carry the knowledge people would otherwise need in their heads {{src:norman-2013}}.",
        "When a mapping is poor, people must translate between the control layout and the effect layout. That translation takes time and fails under stress or distraction, which is why poor mappings produce errors even in practised users {{src:chapanis-lindenbaum-1959}}.",
      ],
      implementation: [
        "Put controls on or next to what they affect: row actions in the row, a crop handle on the image, a field's clear button inside the field.",
        "Match movement to effect: drag, swipe and slider direction should move content or values the way the hand moves.",
        "When controls cannot sit next to their targets, copy the target's layout (a floor plan of rooms for a smart-home app).",
        "Mirror directional icons and layouts for right-to-left languages; leave non-directional icons alone.",
        "Keep the reading and focus order consistent with the visual mapping [WCAG 2.2 SC 1.3.2 Meaningful Sequence, A; SC 2.4.3 Focus Order, A] {{src:w3c-wcag-22}}.",
        "Do not rely on position alone in instructions ('use the button on the right') [WCAG 2.2 SC 1.3.3 Sensory Characteristics, A] {{src:w3c-wcag-22}}.",
      ],
      scenarios: [
        "**Illustrative.** A library app's seat-booking screen lists study desks alphabetically. People cannot find 'the desk by the window'. Drawing the room plan and letting people tap a desk maps the choice onto the space they know.",
        "**Illustrative.** A thermostat app's '+' button sits below the '−' button. People press the top button to raise the temperature and get the opposite. Placing '+' above, matching 'up means more', removes the error.",
        "**Critique protocol.** For each group of controls, ask: Is each control on or next to its target? Does its movement match its effect? Where neither is possible, is the convention the one people expect in this language and culture? Watch for hesitation and wrong first choices in testing; they are the signature of a poor mapping.",
      ],
    },
    advanced: {
      explanation: [
        "In a design system, mapping is encoded in **layout and direction rules** rather than in any single component. Using logical CSS properties (`margin-inline-start`, `inset-inline-end`) instead of left and right lets layouts mirror correctly in right-to-left languages; directional icons need a 'mirrors in RTL' flag in the icon library; component specifications state where actions sit relative to the content they act on. These are tokens and conventions in the broad sense: decisions made once so every team maps the same way.",
        "Mapping also has a **non-visual form**. Keyboard and screen-reader users experience order, not space. A grid of controls that maps well visually can be meaningless if the DOM order differs, so the programmatic order must express the same relationships, and accessible names must say what each control affects ('Increase temperature', not '+').",
        "Poor mappings leave measurable traces: immediate reversals (a control used and then its opposite within seconds), repeated adjustments that overshoot, and wrong-target selections followed by undo. These signals identify where to look; observation confirms whether the cause is the mapping.",
      ],
      evidence: [
        "S-R compatibility is a well-established finding in human factors research, beginning with Fitts and Seeger (1953) {{src:fitts-seeger-1953}}; this entry cites that paper bibliographically, without having re-read its full text. Chapanis and Lindenbaum (1959), whose abstract was read, found that one control-burner arrangement was superior to all others after practice {{src:chapanis-lindenbaum-1959}}. The application of 'natural mapping' to everyday design comes from Norman's design writing {{src:norman-2013}}, which is explanatory rather than experimental. Claims about specific digital mappings (for example scrolling direction) rest mostly on convention and practice.",
      ],
      debates: [
        "**Natural or learned?** Some mappings feel natural only because they are familiar. Touchpad scrolling that moves content with the fingers was presented as 'natural', yet many people used to scroll bars found it backwards. Which is natural depends on whether people think they move the content or the viewport.",
        "**Mirroring in right-to-left languages.** Which icons and gestures to mirror is not always obvious (media controls, clocks, charts); platforms document conventions, but products still disagree.",
        "**Mapping vs consistency.** A layout that maps well to one device can break consistency with the rest of a product; designers must decide which matters more for the task.",
      ],
      alternativeModels: [
        "**Labels and instructions** make up for poor mappings, but they add reading and fail under time pressure; good mapping is preferable where possible.",
        "**Direct manipulation** removes the separate control altogether: people act on the object itself, which is the strongest mapping of all.",
      ],
    },
  },

  origin: {
    contributors: ["Paul Fitts", "Charles Seeger", "Alphonse Chapanis", "Donald Norman"],
    period: "1950s (S-R compatibility); 1988 onwards (natural mapping in design)",
    problem:
      "Operators of aircraft, machines and appliances made errors because the arrangement of controls did not correspond to the arrangement of what they controlled.",
    narrative: [
      "Human factors research after the Second World War studied how the arrangement of displays and controls affected speed and errors; Fitts and Seeger named stimulus-response compatibility {{src:fitts-seeger-1953}}, and Chapanis and Lindenbaum's cooker study became a standard example {{src:chapanis-lindenbaum-1959}}.",
      "Donald Norman brought the idea to everyday design as natural mapping in The Design of Everyday Things (1988; revised 2013), alongside affordances, signifiers, constraints and feedback {{src:norman-2013}}.",
    ],
    attributionNote:
      "Norman's book first appeared in 1988 as The Psychology of Everyday Things; this entry cites the revised 2013 edition.",
  },

  application: {
    summary: [
      "Mapping matters wherever there is more than one control or a control has a direction: device and smart-home apps, editors, media players, maps, dashboards, settings that reflect physical things, and any layout that must work in right-to-left languages.",
    ],
    web: [
      "Use logical CSS properties so layouts mirror correctly with `dir=\"rtl\"`; keep DOM order equal to visual order.",
      "Place actions next to what they act on, not in a distant global toolbar.",
    ],
    mobile: [
      "Match swipe and drag directions to the movement of content; mirror directional gestures in right-to-left locales where the platform does.",
    ],
    enterprise: [
      "Control rooms and dashboards should lay out controls like the system they monitor (floor plans, process diagrams) rather than as lists.",
    ],
    services: [
      "Signage, kiosks and physical controls in a service (lifts, ticket machines) follow the same principles; digital and physical mappings should agree.",
    ],
    steps: [
      "List each control and the effect it produces.",
      "Place controls on or next to their targets; where impossible, copy the target layout.",
      "Match control movement to the movement of the effect.",
      "Check conventions for the languages and cultures you serve, including right-to-left.",
      "Make reading and focus order follow the same relationships, and name controls by their effect.",
      "Test first choices and watch for immediate reversals.",
    ],
  },

  whenToUse: [
    "Any interface with several similar controls or with directional controls.",
    "Interfaces that represent physical spaces or devices.",
  ],
  whenNotToUse: [
    "As a reason to force a spatial layout on abstract options: when no spatial relationship exists, a clear labelled list works better than an invented analogy.",
    "As a replacement for accessible names: a mapping seen visually must still be expressed in order and labels for people who do not see the layout.",
  ],
  advantages: [
    "Lets people choose controls by looking, without reading or recalling.",
    "Reduces errors under time pressure and distraction.",
    "Supported by long-standing human factors research.",
  ],
  limitations: [
    "Many digital controls have no physical counterpart, so mappings rely on conventions that vary by culture and experience.",
    "What feels natural is partly learned; changing a familiar mapping can cause errors even if the new one is more logical.",
    "Visual mappings do not carry over to keyboard and screen-reader use without deliberate ordering and naming.",
  ],
  misconceptions: [
    {
      myth: "A good label fixes a poor mapping.",
      reality:
        "Labels help, but people still have to read and translate them, and they fail under pressure. In Chapanis and Lindenbaum's study, practice reduced but did not remove the differences between arrangements {{src:chapanis-lindenbaum-1959}}.",
    },
    {
      myth: "Natural mappings are universal.",
      reality:
        "Spatial mappings travel well; conventional ones such as direction of progress or 'next' depend on reading direction and experience, and must be checked for each language.",
    },
  ],

  relations: [
    { target: "signifiers", type: "complementary-to", note: "Signifiers show where to act; mapping shows which control affects what." },
    { target: "constraints", type: "complementary-to", note: "Constraints limit what can be done; mapping makes the right choice obvious among what remains." },
    { target: "gulfs-of-execution-and-evaluation", type: "related-to", note: "Good mapping narrows the gulf of execution: people can see how to achieve their goal." },
    { target: "direct-manipulation", type: "related-to", note: "Acting on the object itself is the strongest possible mapping." },
    { target: "nielsen-usability-heuristics", type: "related-to", note: "Heuristic 2, match between the system and the real world, includes following real-world conventions such as natural mappings." },
    { target: "mental-models", type: "related-to", note: "A mapping feels natural when it matches the model people already hold." },
  ],

  practice: {
    dos: [
      { text: "Put controls on or next to the thing they affect.", why: "People choose by looking; there is nothing to translate.", kind: "industry" },
      { text: "Match the direction of a control to the direction of its effect, and mirror directional controls in right-to-left languages.", why: "Directional mappings depend on reading direction; mirrored layouts keep 'next' and 'previous' meaningful.", kind: "context" },
      { text: "Make DOM and focus order express the same relationships as the visual layout.", why: "Keyboard and screen-reader users follow order, not space [WCAG 2.2 SC 1.3.2 and 2.4.3, A] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't arrange controls in a line when their targets form a grid or a plan.", why: "This is the classic cooker problem: arrangements differed in speed and errors even after practice {{src:chapanis-lindenbaum-1959}}.", kind: "industry" },
      { text: "Don't write instructions that depend only on position ('tap the button on the right').", why: "Position means nothing to people who do not see the layout, and it changes in right-to-left languages [WCAG 2.2 SC 1.3.3, A] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't label controls by their symbol instead of their effect ('+' instead of 'Increase temperature').", why: "The accessible name should say what the control does, so the mapping is not lost without sight.", kind: "industry" },
    ],
    examples: [
      {
        title: "A layout that mirrors correctly in right-to-left languages",
        language: "css",
        code: `/* Logical properties: "start" and "end" follow the reading direction. */
.pager {
  display: flex;
  justify-content: space-between;
  padding-inline: var(--space-4);
}
.pager .next { margin-inline-start: auto; }

/* Directional icons flip in RTL; non-directional icons do not. */
[dir="rtl"] .icon[data-directional="true"] { transform: scaleX(-1); }`,
        caption:
          "Illustrative. With `dir=\"rtl\"` the 'Next' control moves to the left and its arrow points left, so the mapping between control and direction of travel is preserved. `--space-4` stands for a spacing token.",
      },
      {
        title: "Mapping audit of a smart-thermostat screen",
        language: "text",
        code: `Control          Effect                   Mapping type   Problem                     Fix
---------------  -----------------------  -------------  --------------------------  ------------------------------
+ / −  buttons   raise / lower target     conventional   "+" placed below "−"        "+" above; names "Increase …"
Room list        choose room to adjust    none (A–Z)     people think in floor plan  floor plan with tappable rooms
Schedule slider  shift heating period     directional    drag right moves earlier    drag right moves later
"Next day" arrow move to next day         directional    not mirrored in Arabic UI   mirror with dir="rtl"`,
        caption: "Illustrative structured analysis: each row names the mapping type and a fix that restores it.",
      },
    ],
  },

  exercises: [
    {
      id: "mapping-ex-spot",
      kind: "assignment",
      level: "beginner",
      title: "Find a poor mapping",
      prompt: [
        "Find one physical and one digital example where you had to work out which control does what. Sketch the controls and their targets, and redraw them with a natural mapping.",
      ],
      deliverable: "Two before/after sketches with one sentence explaining each change.",
      criteria: ["Control and target layouts shown", "Mapping type identified", "Redesign removes the translation step"],
    },
    {
      id: "mapping-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Fix a thermostat's buttons",
      prompt: [
        "Illustrative case. A thermostat app shows '−' above '+'. Support tickets mention rooms heated when people wanted them cooler; analytics show many '−' presses immediately followed by '+'.",
        "Work through the correction sequence.",
      ],
      deliverable: "A corrected control layout with accessible names and a validation plan.",
      criteria: ["Cause identified as mapping, not user error", "Convention named", "Accessibility requirements cited", "Validation uses reversal data"],
      exampleSolution: [
        "1. Symptom: wrong-direction changes and immediate reversals.",
        "2. Impact: rooms at the wrong temperature; frustration; energy waste.",
        "3. Cause: the vertical order contradicts the 'up means more' convention, so people press the top button to raise the temperature.",
        "4. Principle: match the control's position and direction to its effect; name controls by effect [WCAG 2.2 SC 1.3.3, A].",
        "5. Correction: '+' above '−'; accessible names 'Increase temperature' and 'Decrease temperature'; show the new target value beside the buttons.",
        "6. Validation: compare the rate of immediate reversals before and after; test with a screen reader.",
        "7. Trade-off: people who learned the old layout will make errors for a while; say so in the release notes.",
      ],
    },
    {
      id: "mapping-ex-rtl",
      kind: "reflection",
      level: "advanced",
      title: "Write a mirroring policy",
      prompt: [
        "Your product is being translated into Arabic and Hebrew. Decide which layouts, icons, gestures and charts mirror, which do not, and how the design system enforces it.",
      ],
      deliverable: "A one-page policy with examples and an icon-library flag.",
      criteria: ["Directional vs non-directional distinguished", "Logical properties used", "Charts and media controls considered", "Testing defined"],
    },
  ],

  quiz: [
    {
      id: "mapping-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "A cooker's four knobs are arranged in the same square as its four rings. This is an example of…",
      options: [
        { text: "A natural mapping", correct: true, explanation: "The control layout copies the layout of what it controls." },
        { text: "A constraint", correct: false, explanation: "Constraints limit possible actions; this makes the right choice obvious." },
        { text: "Feedback", correct: false, explanation: "Feedback reports results after the action." },
        { text: "Consistency", correct: false, explanation: "Consistency is about sameness across a product; this is about control-effect correspondence." },
      ],
      explanation: "Mapping is the relationship between controls and effects; natural mappings need no explanation.",
    },
    {
      id: "mapping-q-evidence",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "What did Chapanis and Lindenbaum (1959) find when people used four cooker models with different knob arrangements?",
      options: [
        { text: "After practice, one arrangement was still superior to all the others", correct: true, explanation: "Practice improved performance, but differences between arrangements remained." },
        { text: "All arrangements performed equally once people had practised", correct: false, explanation: "Differences persisted in the later trials." },
        { text: "Labels removed all differences", correct: false, explanation: "The study compared arrangements, not labels." },
        { text: "People preferred alphabetical arrangements", correct: false, explanation: "No such arrangement was tested." },
      ],
      explanation: "Arrangement affects speed and errors even with practice: the core of S-R compatibility.",
    },
    {
      id: "mapping-q-rtl",
      kind: "scenario",
      level: "advanced",
      prompt: "A product adds Hebrew. Which change best preserves mapping?",
      options: [
        { text: "Use logical CSS properties and mirror directional icons such as 'next' arrows, but not clocks or play buttons", correct: true, explanation: "Directional mappings follow reading direction; non-directional symbols keep their meaning." },
        { text: "Flip the entire interface image horizontally", correct: false, explanation: "That mirrors text and non-directional icons too, breaking them." },
        { text: "Keep the left-to-right layout and translate the text", correct: false, explanation: "'Next' would then point against the reading direction." },
        { text: "Remove all arrows", correct: false, explanation: "That removes useful signifiers instead of fixing the mapping." },
      ],
      explanation: "Mirror what has direction; keep what does not.",
    },
  ],

  flashcards: [
    { id: "mapping-fc-define", front: "Natural mapping", back: "A control-effect relationship people understand immediately, usually by spatial analogy or a familiar convention." },
    { id: "mapping-fc-three", front: "Three ways mappings work", back: "Spatial (layout mirrors targets), directional (movement mirrors effect), conventional (learned rule such as up = more)." },
    { id: "mapping-fc-src", front: "S-R compatibility", back: "Fitts & Seeger (1953): some arrangements of stimuli and responses are faster and less error-prone than others." },
  ],

  references: [
    { source: "norman-2013", role: "primary", note: "Natural mapping in everyday design." },
    { source: "fitts-seeger-1953", role: "primary", note: "Origin of S-R compatibility (bibliographic record only)." },
    { source: "chapanis-lindenbaum-1959", role: "primary", note: "Cooker control-burner arrangements (abstract read)." },
    { source: "nng-natural-mappings", role: "explanatory", note: "Definitions of S-R compatibility and natural mapping; summary of Fitts and Seeger." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 1.3.2 Meaningful Sequence, 1.3.3 Sensory Characteristics, 2.4.3 Focus Order (all A)." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Stimulus-response compatibility is an established human factors finding with experimental support from the 1950s onward; this entry relies on bibliographic records and one abstract, not full texts. Norman's natural mapping is an influential design explanation rather than an experimental result. Specific digital conventions rest on practice and familiarity.",

  status: "published",
  quality: {
    classification: true,
    explanation: true,
    research: true,
    beginner: true,
    professional: true,
    examples: true,
    limitations: true,
    relationships: true,
    sources: true,
    activities: true,
  },
  lastVerifiedAt: "2026-11-11",
});
