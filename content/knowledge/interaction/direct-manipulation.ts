import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "direct-manipulation",
  slug: "direct-manipulation",
  title: "Direct Manipulation",
  alternateNames: ["Direct manipulation interfaces", "Direct-manipulation interaction style", "Drag and drop (one form of it)", "Directness"],
  summary:
    "Direct manipulation lets people act on visible representations of the things they care about — dragging, resizing, adjusting — and see the result at once, instead of describing the action in a command language.",
  definition:
    "**Direct manipulation** is an interaction style in which the objects of a task stay **visible on the screen**, people act on them with **physical actions** such as pointing and dragging rather than typed syntax, and every action is **rapid, incremental and reversible**, with its effect on the object **shown immediately**. Shneiderman named it in 1983 from systems such as display editors, spreadsheets and video games {{src:shneiderman-1983}}. Hutchins, Hollan and Norman then explained *why* such interfaces feel direct: the feeling comes from a short **distance** between what people want and what the interface asks of them, and from **engagement** — the sense of acting on the objects themselves rather than talking to an intermediary {{src:hutchins-hollan-norman-1985}}. Directness is a matter of degree and depends on the task; it is not the same as ease of use.",
  primaryType: "principle",
  secondaryTypes: ["concept"],
  domain: "interaction",
  subcategory: "principles",
  tags: ["direct manipulation", "drag and drop", "directness", "engagement", "reversibility", "immediate feedback", "interaction styles", "command languages", "dragging movements"],
  difficulty: "intermediate",
  disciplines: ["Interaction design", "UI design", "Human-computer interaction", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Describe direct manipulation by its properties, not by any single technique such as drag and drop.",
    "Explain why direct manipulation feels direct, using distance and engagement.",
    "Recognise tasks where a command, a script or a dialog serves people better than direct manipulation.",
    "Design direct manipulation that can also be operated without dragging and from the keyboard.",
    "Evaluate claims about direct manipulation against what its sources actually show.",
  ],
  prerequisites: ["gulfs-of-execution-and-evaluation", "feedback-principle"],

  levels: {
    beginner: {
      explanation: [
        "Think of two ways to move a file into a folder. In one, you type a command such as `mv report.pdf archive/` and then look somewhere else to check it worked. In the other, you see the file and the folder, drag one onto the other, watch the folder light up as you arrive, and see the file inside when you let go. The second is **direct manipulation**: you act on the thing itself and see what happened straight away.",
        "Most everyday interfaces work this way somewhere: cropping a photo by dragging its edges, reordering a playlist, resizing a window, pinching a map, moving a calendar event to another day. What they share is not dragging as such, but four qualities: the objects stay **visible**, you act on them **physically** (point, drag, tap) instead of typing instructions, each step is **small, fast and undoable**, and the **result shows at once** {{src:shneiderman-1983}}.",
        "Direct manipulation is not always best. Renaming two hundred files by dragging each one would be slow; a single command or a 'rename all' dialog says what you mean in one step. Good products combine both: something you can grab when you want control, and a way to describe the action when you want it done at scale.",
      ],
      analogy:
        "Rearranging furniture yourself versus phoning a removal company with instructions. Moving the sofa yourself, you see where it fits and adjust as you go; describing it on the phone, you have to put the result into words and only learn later whether it worked. Phoning still wins when there are fifty sofas to move.",
      everydayExamples: [
        "Dragging the corner of a photo to crop it, with the crop shown live.",
        "Moving an event in a calendar by dragging it to another time.",
        "Reordering songs in a playlist by dragging them up or down.",
        "Pinching and panning a map.",
        "Changing a spreadsheet value and watching every dependent total update.",
      ],
      vocabulary: [
        { term: "Direct manipulation", meaning: "Acting on visible representations of objects with physical actions, with rapid, reversible steps whose effect is shown at once." },
        { term: "Object of interest", meaning: "The thing the person is working on — a file, a photo, a value — rather than the commands that change it." },
        { term: "Command language", meaning: "An interface where you describe the action in words or syntax, such as typing a command." },
        { term: "Directness", meaning: "The feeling that you are working on the task itself rather than through the computer; a matter of degree." },
        { term: "Reversible action", meaning: "A step that can be undone easily, so trying something costs little." },
      ],
    },
    intermediate: {
      explanation: [
        "Shneiderman coined the term after studying systems that users were enthusiastic about. He saw three central ideas: visibility of the object of interest; rapid, reversible, incremental actions; and replacing complex command syntax with direct manipulation of the object {{src:shneiderman-1983}}. Later in the same paper he set out an integrated portrait with **four** principles — continuous representation of the object of interest; physical actions or labelled button presses instead of complex syntax; rapid, incremental, reversible operations whose impact is immediately visible; and a layered or spiral approach to learning that lets people start with minimal knowledge {{src:shneiderman-1983}}. Popular summaries usually keep only the first three.",
        "His examples show that direct manipulation was never only about dragging. Full-screen display editors, where the document is shown in its final form and edits appear at once; VisiCalc, where changing one cell visibly updates every dependent value; spatial data systems navigated by zooming in on a map; video games; and computer-assisted lessons in which students build and run a simulated experiment by touching the screen {{src:shneiderman-1983}}. Labelled buttons count as physical actions too: what matters is that people select and see, rather than recall syntax.",
        "Hutchins, Hollan and Norman asked why these interfaces *feel* direct {{src:hutchins-hollan-norman-1985}}. Their answer has two parts. **Distance**: an interface is direct when little cognitive effort is needed to get from what you want to the actions the system needs, and from the system's output to knowing whether it worked — the [[gulfs-of-execution-and-evaluation|gulfs of execution and evaluation]]. **Engagement**: in a *model-world* interface the objects of the task are represented and you act on them yourself; in a *conversation* interface you talk to an intermediary about a world you cannot see. Direct manipulation is the combination of small distance and high engagement.",
        "They also warned that directness is **always relative** — to the task and to the person — and that some of the feeling comes from practice: people adapt, so an interface can come to feel direct even when it was not designed that way {{src:hutchins-hollan-norman-1985}}.",
      ],
      howItWorks: [
        "**Keep the object of interest on screen.** The thing being changed stays visible throughout, so people never have to remember its state or ask for it ([[recognition-over-recall]]).",
        "**Replace syntax with action.** Point, drag, tap or press a labelled control; the action's form resembles its meaning (move by moving, resize by stretching). This shortens the distance Hutchins, Hollan and Norman call articulatory {{src:hutchins-hollan-norman-1985}}.",
        "**Show the effect during and after the action.** A drop target highlights while you drag, the crop updates while you pull, the total updates as you type. Immediate, continuous feedback lets people correct an action while it is still happening ([[feedback-principle]]).",
        "**Make steps small and reversible.** Incremental changes and undo make exploration cheap and reduce anxiety about mistakes {{src:shneiderman-1983}} ([[user-control-and-freedom]]).",
        "**Offer the same operation without the gesture.** Every drag needs a single-pointer alternative and a keyboard route to the same result [WCAG 2.2 SC 2.5.7, SC 2.1.1] {{src:w3c-wcag-22}}.",
      ],
      implementation: [
        "Build one operation (move, resize, reorder) and connect several inputs to it — drag, buttons or a menu, and keys — so every route produces the same result, feedback and undo.",
        "Show where a drag can land: highlight valid drop targets during the drag and do nothing, visibly, over invalid ones. Signal what can be dragged before the drag starts ([[signifiers]]).",
        "Give every dragging operation a way to do the same thing with single clicks or taps — move up/down buttons, a 'Move to…' menu, arrow buttons on a map. WCAG 2.2 requires it at Level AA unless dragging is essential [SC 2.5.7] {{src:w3c-wcag-22}}.",
        "Support the keyboard separately: WCAG 2.2 SC 2.1.1 requires all functionality through a keyboard interface, except where the function depends on the path of movement {{src:w3c-wcag-22}}. A keyboard route alone does not satisfy SC 2.5.7, and a click alternative alone does not satisfy SC 2.1.1; the two are evaluated independently {{src:w3c-understanding-dragging-movements}}.",
        "Announce the result of a move in text (for example 'Report moved to position 2 of 5') so screen-reader users get the immediate feedback sighted users get from the motion.",
        "Make the drag handles and targets large enough to grab: WCAG 2.2 sets a 24 × 24 CSS px minimum for pointer targets, with exceptions [SC 2.5.8] {{src:w3c-wcag-22}}.",
        "Keep a high-level route for repetitive or precise work — batch actions, numeric fields, search and replace — instead of forcing people to repeat a gesture.",
      ],
      scenarios: [
        "**Illustrative.** A kanban board lets people drag cards between columns. Testing with a person who uses a head pointer shows that holding the drag across the board fails half-way. Adding a 'Move to…' menu on each card gives the same result with two clicks, and the menu also works from the keyboard.",
        "**Illustrative.** A photo editor offers a crop rectangle with handles. Designers who need an exact 1200 × 630 crop find dragging imprecise, so the editor adds width and height fields that move the handles as they type — direct manipulation for exploration, a description for precision.",
        "**Critique protocol.** For each manipulable object, ask: Is the object visible throughout? Does the action resemble its meaning? Is the effect shown during the action, not only after? Can it be undone? Can it be done without dragging, and from the keyboard? Is there a faster route for doing it many times?",
      ],
    },
    advanced: {
      explanation: [
        "Hutchins, Hollan and Norman map interfaces onto two dimensions: distance from the user's goals (small or large) and engagement (interface as conversation or as model world) {{src:hutchins-hollan-norman-1985}}. A **model world at the wrong level** — objects you can grab, but not the ones your task is about — produces a sense of engagement while making people do too much at too low a level; they describe such interfaces as appearing on the surface to be direct manipulation while failing to produce direct engagement with the task world. A **high-level language** can have very small semantic distance without engagement, and for some classes of task they judged it may be superior to direct manipulation.",
        "Their list of problems is still the best guide to where direct manipulation struggles {{src:hutchins-hollan-norman-1985}}. **Repetition** is better expressed once, symbolically, than performed many times. **Generality** is hard: a picture shows one particular thing, so variables, sets and rules ('every file older than a year') are awkward to express by pointing. **Precision** suffers when accuracy depends on a steady hand. And directness is **not ease of use**: if the interface becomes transparent, the difficulty of the task itself is left fully with the person.",
        "Shneiderman's own paper already listed problems: graphical representations did not improve performance in every study he cited, icons have to be learned and can take as long to learn as words, a representation can mislead people about which operations are allowed, and pictures can use too much screen space — he noted that experienced users may prefer a table of 50 document names to 10 icons {{src:shneiderman-1983}}. He presented direct manipulation as a model to be refined and validated by empirical tests and careful measurement {{src:shneiderman-1983}}.",
        "Accessibility changes what 'direct' must mean. Dragging asks people to hold a pointer down while moving it to the right place; some people cannot do that precisely, and trackballs, head pointers, eye-gaze systems and speech-controlled mouse emulators make it cumbersome {{src:w3c-understanding-dragging-movements}}. WCAG 2.2 added SC 2.5.7 Dragging Movements at Level AA, requiring a single-pointer way to do anything that uses dragging unless dragging is essential {{src:w3c-wcag-22}}. The principle survives the requirement: the object stays visible, the action stays small and reversible, the effect is still shown at once — only the means of acting on it multiplies.",
      ],
      evidence: [
        "Shneiderman's 1983 account is built from the reported enthusiasm of users, close study of successful systems and a cognitive model of syntactic and semantic knowledge; he cited a comparison by Roberts in which overall performance time with display editors was about half that with line editors, and studies in which flowcharts or graphical representations did no better than text {{src:shneiderman-1983}}. He called for empirical tests to validate the model.",
        "Hutchins, Hollan and Norman offer a cognitive analysis, not an experiment: they explicitly set out to account for both advantages and disadvantages, and state that they knew of no way to measure the trade-offs involved {{src:hutchins-hollan-norman-1985}}.",
        "Frohlich's review traces the history of direct manipulation and its limitations, and argues that selectively reintroducing language — 'graceful interaction', with directness as a property of both action- and language-based systems — could overcome them {{src:frohlich-1993}}.",
      ],
      debates: [
        "**Manipulation or delegation?** Shneiderman and Maes publicly debated direct manipulation against software agents that act on a person's behalf {{src:shneiderman-maes-1997}}. The underlying question — when should people act themselves, and when should they describe a goal and let the system act — remains open. This entry cites the debate only as a record that it took place, not for its arguments.",
        "**Action or language?** Hutchins, Hollan and Norman judged that high-level languages may be better for some tasks {{src:hutchins-hollan-norman-1985}}, and Frohlich argued for combining action and language rather than choosing {{src:frohlich-1993}}. Many tools combine the two — a canvas with numeric fields, a file manager with search — so the useful design question is often *which* operations to make direct.",
        "**Is the feeling designed or learned?** Because people adapt, an interface can come to feel direct through practice {{src:hutchins-hollan-norman-1985}}; studies of 'directness' therefore need to separate novice and practised use.",
      ],
      alternativeModels: [
        "**Conversation metaphor / command languages.** The person describes actions to an intermediary; strong for repetition, generality and scripting, weaker for exploration ([[gulfs-of-execution-and-evaluation]]).",
        "**Graceful interaction.** Frohlich's proposal that directness can be a property of both action- and language-based interaction, mixing the two {{src:frohlich-1993}}.",
        "**Delegation to agents.** The person states a goal and the system acts, trading control and visibility for effort {{src:shneiderman-maes-1997}}.",
      ],
    },
  },

  origin: {
    contributors: ["Ben Shneiderman", "Edwin L. Hutchins", "James D. Hollan", "Donald A. Norman"],
    period: "1983 (term and principles); 1985 (cognitive account of directness); 1990s debates on limits and agents",
    problem: "Command languages asked people to memorise arbitrary syntax and to check results separately; some new interactive systems produced enthusiasm instead of grudging acceptance, and no one had described what they had in common or why they worked.",
    narrative: [
      "Shneiderman described display editors, VisiCalc, spatial data management, video games and computer-assisted instruction, and named what they shared 'direct manipulation' {{src:shneiderman-1983}}.",
      "Hutchins, Hollan and Norman, at UC San Diego, replaced the list of features with a cognitive account — distance and engagement — and introduced the gulfs of execution and evaluation to explain it {{src:hutchins-hollan-norman-1985}}.",
      "Frohlich reviewed the history and limits of the style {{src:frohlich-1993}}, and Shneiderman and Maes debated it against interface agents {{src:shneiderman-maes-1997}}.",
    ],
  },

  application: {
    summary: ["Direct manipulation applies wherever people arrange, shape or adjust objects they can see: editors, canvases, calendars, maps, lists, boards, sliders and spreadsheets."],
    web: [
      "Pair every drag with a single-pointer alternative and a keyboard route, announce results in a status message, and keep drop targets visible and large enough to hit [WCAG 2.2 SC 2.5.7, 2.1.1, 2.5.8].",
    ],
    mobile: [
      "Multipoint and path-based gestures such as pinch and swipe need a single-pointer alternative unless the gesture is essential [WCAG 2.2 SC 2.5.1]; keep drag handles away from scroll and system-gesture areas, where the same movement means something else.",
    ],
    enterprise: [
      "Offer batch actions, filters and numeric entry beside manipulation for repetitive and precise work; specialists often prefer a table to a canvas for large sets of items.",
    ],
    services: [
      "Across channels, keep the object people manipulate (a booking, a basket, a schedule) the same thing everywhere, so a change made by dragging on one device appears at once on another.",
    ],
    steps: [
      "Identify the objects of interest in the task and decide which should be visible and directly adjustable.",
      "Define each operation once (move, resize, reorder) and connect drag, single-pointer controls and keys to it.",
      "Design feedback during the action (targets, previews) and after it (the new state, an announcement, undo).",
      "Add a high-level route for repetition, sets and precision.",
      "Test with keyboard-only use, a screen reader, and a non-dragging pointer, as well as with a mouse and touch.",
    ],
  },

  whenToUse: [
    "When the objects of the task can be shown and people benefit from seeing and adjusting them: layout, scheduling, editing, navigation in space.",
    "When exploration and quick correction matter more than doing one thing many times.",
    "For novices and occasional users, who can recognise objects and actions instead of recalling syntax.",
  ],
  whenNotToUse: [
    "As the only route for repetitive operations, sets of items or rules — offer a command, a batch action or a script.",
    "Where precision matters more than speed of adjustment — add numeric entry.",
    "Where dragging is the only way to complete an action, because some people cannot drag.",
  ],
  advantages: [
    "Objects and results are visible, so people recognise rather than recall and can see whether an action worked.",
    "Small, reversible steps make exploration cheap and errors easy to undo.",
    "Actions resemble their meaning, which shortens the gap between intention and action.",
  ],
  limitations: [
    "Weak for repetition, generality and abstraction — variables, sets and rules are hard to express by pointing.",
    "Precision depends on motor control; dragging excludes some people unless alternatives exist.",
    "Representations can mislead, need to be learned, and use screen space.",
    "Directness is not ease of use: a transparent interface leaves the task's own difficulty with the person.",
  ],
  misconceptions: [
    {
      myth: "Direct manipulation means drag and drop.",
      reality:
        "Dragging is one form. Shneiderman's examples included display editors, spreadsheets and labelled buttons; what defines the style is visible objects, physical actions instead of syntax, and rapid, reversible steps with immediately visible effects {{src:shneiderman-1983}}.",
    },
    {
      myth: "Shneiderman defined three principles of direct manipulation.",
      reality:
        "The 1983 paper first names three central ideas, then sets out an integrated portrait of four principles; the fourth is a layered or spiral approach to learning that lets people start with minimal knowledge {{src:shneiderman-1983}}.",
    },
    {
      myth: "A more direct interface is always easier to use.",
      reality:
        "Hutchins, Hollan and Norman warn against equating directness with ease of use and list tasks — repetition, generality, precision — where less direct interfaces can serve better {{src:hutchins-hollan-norman-1985}}.",
    },
    {
      myth: "Keyboard support makes a drag-and-drop interface accessible.",
      reality:
        "Keyboard access is required [SC 2.1.1], but WCAG 2.2 also requires a single-pointer alternative to dragging [SC 2.5.7]; one does not satisfy the other {{src:w3c-wcag-22}} {{src:w3c-understanding-dragging-movements}}.",
    },
  ],

  relations: [
    { target: "gulfs-of-execution-and-evaluation", type: "related-to", note: "Hutchins, Hollan and Norman introduced the gulfs to explain why direct manipulation feels direct." },
    { target: "shneiderman-golden-rules", type: "influences", note: "Several golden rules — feedback, easy reversal, internal locus of control — restate properties of direct manipulation." },
    { target: "feedback-principle", type: "related-to", note: "Direct manipulation depends on immediate, continuous feedback about the object being changed." },
    { target: "user-control-and-freedom", type: "related-to", note: "Rapid, reversible steps and undo are what make manipulation safe to explore." },
    { target: "mapping", type: "related-to", note: "Acting on the object itself is the closest mapping between control and effect." },
    { target: "signifiers", type: "related-to", note: "People need signifiers to know what can be grabbed, dragged or resized, and where it can land." },
    { target: "recognition-over-recall", type: "related-to", note: "Visible objects and actions replace recalled command syntax." },
  ],

  practice: {
    dos: [
      { text: "Give every dragging operation a single-click or single-tap alternative, such as move buttons or a 'Move to…' menu.", why: "WCAG 2.2 SC 2.5.7 (AA) requires a single-pointer way to achieve anything that uses dragging, unless dragging is essential {{src:w3c-wcag-22}}; some people cannot drag precisely {{src:w3c-understanding-dragging-movements}}.", kind: "standard" },
      { text: "Show the effect during the action, not only after it: highlight drop targets, preview the crop, update totals live.", why: "Shneiderman's principles call for rapid, incremental operations whose impact on the object is immediately visible {{src:shneiderman-1983}}.", kind: "industry" },
      { text: "Make every manipulation undoable.", why: "Reversible steps lower the cost of trying; Shneiderman linked easily reversible actions to reduced anxiety {{src:shneiderman-1983}}.", kind: "industry" },
      { text: "Offer a high-level route for repetition, sets and precision.", why: "Hutchins, Hollan and Norman identify repetition, generality and accuracy as weaknesses of direct manipulation {{src:hutchins-hollan-norman-1985}}.", kind: "context" },
    ],
    donts: [
      { text: "Don't treat keyboard support as a substitute for a single-pointer alternative, or the reverse.", why: "SC 2.1.1 and SC 2.5.7 are separate requirements, evaluated independently {{src:w3c-understanding-dragging-movements}}.", kind: "standard" },
      { text: "Don't make people perform the same gesture dozens of times.", why: "A repetitive operation is better expressed once, as a batch action or script {{src:hutchins-hollan-norman-1985}}.", kind: "context" },
      { text: "Don't rely on motion alone to show that something moved.", why: "Screen-reader users and people who miss the animation need the new position stated in text.", kind: "industry" },
    ],
    examples: [
      {
        title: "One move operation, three ways to trigger it",
        language: "ts",
        code: `// Reorder a list item. Drag, the up/down buttons and the keyboard all call the
// same pure function, so the result, the announcement and undo are identical.
function move<T>(items: readonly T[], from: number, to: number): T[] {
  if (!Number.isInteger(from) || from < 0 || from >= items.length) throw new RangeError("from is out of range");
  if (!Number.isInteger(to)) throw new RangeError("to must be a whole number");
  const target = Math.max(0, Math.min(items.length - 1, to)); // clamp to the list
  const next = items.slice();
  const [item] = next.splice(from, 1);
  next.splice(target, 0, item);
  return next;
}

// Text for a status message, so the result is perceivable without seeing the motion.
function moveMessage(label: string, to: number, total: number): string {
  return \`\${label} moved to position \${to + 1} of \${total}.\`;
}

// <li draggable="true">Report
//   <button type="button" aria-label="Move Report up">↑</button>
//   <button type="button" aria-label="Move Report down">↓</button>
// </li>
// <p role="status">{message}</p>   <!-- announced politely -->
// Keep the previous array to offer Undo.`,
        caption: "Dragging is the direct path; the buttons are the single-pointer alternative WCAG 2.2 SC 2.5.7 asks for, and they are also reachable by keyboard (SC 2.1.1). The status message gives everyone the immediate feedback that motion gives sighted mouse users.",
      },
    ],
  },

  exercises: [
    {
      id: "direct-manipulation-ex-spot",
      kind: "assignment",
      level: "beginner",
      title: "Same task, two styles",
      prompt: [
        "Choose a task you can do both ways — moving files, editing a photo's size, reordering a list, filtering data. Do it once by direct manipulation and once by describing it (a command, a dialog, a formula or a search).",
        "For each, note: what was visible, what you had to remember, how you knew it had worked, and how you would undo it.",
      ],
      deliverable: "A two-column comparison with a sentence on which style suited this task and why.",
      criteria: ["Both styles actually tried", "Visibility, memory, feedback and undo compared", "The conclusion depends on the task, not on a general preference"],
    },
    {
      id: "direct-manipulation-ex-alternatives",
      kind: "critique",
      level: "intermediate",
      title: "Make a drag-and-drop board operable without dragging",
      prompt: [
        "Illustrative case. A task board lets people move cards between three columns only by dragging. Cards can also be reordered within a column by dragging.",
        "Redesign both operations so they can be done with single clicks or taps and with the keyboard, with the same feedback and undo as the drag. Check your design against WCAG 2.2 SC 2.5.7, SC 2.1.1 and SC 2.5.8.",
      ],
      deliverable: "Annotated sketches or a short specification of the controls, the keyboard behaviour and the announcements.",
      criteria: ["A single-pointer alternative for both moving and reordering", "A keyboard route that does not depend on dragging", "Results announced in text and undoable", "Targets large enough to hit"],
      exampleSolution: [
        "Moving between columns: a 'Move to…' button on each card opens a menu listing the other columns — the pattern the WCAG Understanding document gives as an example {{src:w3c-understanding-dragging-movements}}. The menu works with clicks, taps and arrow keys plus Enter.",
        "Reordering: 'Move up' and 'Move down' buttons appear on the focused or selected card, like the sortable-list example in the same document {{src:w3c-understanding-dragging-movements}}.",
        "After any move, a status message says where the card went ('Fix login moved to Done, position 1 of 4') and an Undo action restores the previous state.",
        "Buttons are at least 24 × 24 CSS px, or spaced so they meet the exception [SC 2.5.8] {{src:w3c-wcag-22}}.",
      ],
    },
    {
      id: "direct-manipulation-ex-limits",
      kind: "reflection",
      level: "advanced",
      title: "Where should this product stop being direct?",
      prompt: [
        "Take a direct-manipulation tool you know well (a design canvas, a spreadsheet, a photo editor, a map). List three tasks it handles well by manipulation and three it handles badly.",
        "For each bad case, name which limitation applies — repetition, generality, precision, or the task's own difficulty — and propose a less direct route that would serve better.",
      ],
      deliverable: "A short analysis (around 400 words) with the six tasks and the proposed routes.",
      criteria: ["Limitations named accurately and tied to the tasks", "Proposed routes keep visibility and undo where possible", "Recognises that directness and ease of use differ"],
    },
  ],

  quiz: [
    {
      id: "direct-manipulation-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which design is the clearest case of direct manipulation?",
      options: [
        { text: "Dragging the edge of a photo to crop it while the crop updates live", correct: true, explanation: "The object is visible, the action is physical, and the effect is shown immediately and can be adjusted." },
        { text: "Typing a crop size into a dialog and pressing OK", correct: false, explanation: "You describe the action instead of acting on the object; the result appears only afterwards." },
        { text: "Asking an assistant to 'crop it to a square'", correct: false, explanation: "This delegates the action through conversation rather than manipulating the photo." },
        { text: "Any interface that uses a mouse", correct: false, explanation: "A mouse can be used to choose menu commands too; the style is defined by its properties, not the device." },
      ],
      explanation: "Direct manipulation is defined by visible objects, physical actions and rapid, visible, reversible effects — not by any particular device.",
    },
    {
      id: "direct-manipulation-q-why",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "According to Hutchins, Hollan and Norman, what two aspects produce the feeling of directness?",
      options: [
        { text: "A short distance between goals and the interface's actions and outputs, and engagement with a world of objects rather than a conversation", correct: true, explanation: "Distance covers the gulfs of execution and evaluation; engagement is the sense of acting on the objects themselves." },
        { text: "Speed of the computer and size of the screen", correct: false, explanation: "Responsiveness matters, but their account is cognitive, not about hardware." },
        { text: "Use of icons and use of colour", correct: false, explanation: "Surface features alone do not create directness; they warned that a checklist of features misses the real sources of it." },
        { text: "Novelty and enjoyment", correct: false, explanation: "Enthusiasm was what Shneiderman observed; Hutchins, Hollan and Norman sought its causes." },
      ],
      explanation: "Directness = small distance + high engagement, always relative to the task and the person.",
    },
    {
      id: "direct-manipulation-q-limits",
      kind: "scenario",
      level: "advanced",
      prompt: "A photo library lets people tag photos only by dragging a tag onto each photo. Users need to tag 400 photos from one trip. What is the best critique?",
      options: [
        { text: "Repetition is a known weakness of direct manipulation; add a way to select a set (for example by date) and tag it in one action, while keeping drag for single photos", correct: true, explanation: "Hutchins, Hollan and Norman note that repetitive operations are better expressed symbolically; the set selection keeps visibility and undo." },
        { text: "Dragging is fine; users should be faster", correct: false, explanation: "The cost is in the design: 400 identical gestures for one intention." },
        { text: "Remove dragging entirely and use only commands", correct: false, explanation: "Dragging still suits single photos; the fix is to add a route, not remove one." },
        { text: "Make the tags bigger", correct: false, explanation: "Target size helps each drag, but the problem is the number of drags." },
      ],
      explanation: "Add a high-level route for repetition and sets; keep manipulation for exploration and single items.",
    },
    {
      id: "direct-manipulation-q-a11y",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A sortable list supports dragging and full keyboard reordering with arrow keys, but nothing else. Under WCAG 2.2, what is missing?",
      options: [
        { text: "A way to reorder with single clicks or taps without dragging, such as move up/down buttons (SC 2.5.7)", correct: true, explanation: "Keyboard equivalence does not by itself meet SC 2.5.7 unless it also provides controls that can be clicked or tapped." },
        { text: "Nothing: keyboard support satisfies every pointer requirement", correct: false, explanation: "SC 2.1.1 and SC 2.5.7 are evaluated independently." },
        { text: "A longer animation", correct: false, explanation: "Animation does not help people who cannot drag." },
        { text: "Removing drag support", correct: false, explanation: "Dragging can stay; it needs an alternative alongside it." },
      ],
      explanation: "Provide drag, single-pointer controls and keyboard access, all calling the same operation.",
    },
  ],

  flashcards: [
    { id: "direct-manipulation-fc-four", front: "Shneiderman's four principles (1983)", back: "Continuous representation of the object of interest · physical actions or labelled buttons instead of syntax · rapid, incremental, reversible operations with immediately visible impact · layered or spiral learning." },
    { id: "direct-manipulation-fc-two", front: "Two aspects of directness (Hutchins, Hollan & Norman 1985)", back: "Distance (gulfs of execution and evaluation: semantic and articulatory) and engagement (model world, not conversation)." },
    { id: "direct-manipulation-fc-limits", front: "Where direct manipulation struggles", back: "Repetition, generality (variables, sets, rules), precision — and directness is not the same as ease of use." },
    { id: "direct-manipulation-fc-257", front: "WCAG 2.2 SC 2.5.7 Dragging Movements", back: "Level AA, new in 2.2: anything done by dragging can be done with a single pointer without dragging, unless dragging is essential. Keyboard support is a separate requirement (2.1.1)." },
  ],

  references: [
    { source: "shneiderman-1983", role: "primary", note: "Coins the term; examples; four principles; claimed benefits; problems with graphic representations; call for empirical tests." },
    { source: "hutchins-hollan-norman-1985", role: "primary", note: "Cognitive account: distance and engagement; directness is relative; requirements for engagement; problems with direct manipulation." },
    { source: "frohlich-1993", role: "primary", note: "History and limits of direct manipulation; graceful interaction mixing action and language." },
    { source: "shneiderman-maes-1997", role: "primary", note: "Published debate: direct manipulation versus interface agents (cited as a record of the debate only)." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.1.1 Keyboard, 2.5.1 Pointer Gestures, 2.5.7 Dragging Movements (new in 2.2), 2.5.8 Target Size (Minimum)." },
    { source: "w3c-understanding-dragging-movements", role: "explanatory", note: "Intent of SC 2.5.7, its examples, and its independence from keyboard requirements." },
  ],
  evidence: "established-theory",
  evidenceNote:
    "Direct manipulation is an established framework in HCI. Its foundations are an analysis of successful systems and users' reports (Shneiderman 1983) and a cognitive account of directness (Hutchins, Hollan & Norman 1985); neither is a controlled experiment, and both state limitations. Shneiderman's own cited studies were mixed on whether graphical representations improve performance. The comparison with language-based and agent-based interaction remains a matter of trade-offs by task rather than a settled result. Accessibility statements are drawn from WCAG 2.2 and its Understanding document.",

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
  lastVerifiedAt: "2026-11-13",
});
