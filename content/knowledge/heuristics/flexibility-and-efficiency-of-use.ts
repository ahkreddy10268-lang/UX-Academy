import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "flexibility-and-efficiency-of-use",
  slug: "flexibility-and-efficiency-of-use",
  title: "Flexibility and Efficiency of Use",
  alternateNames: ["Usability heuristic #7", "Accelerators", "Shortcuts", "Provide shortcuts"],
  summary:
    "A system should serve beginners and experienced people at once: clear, guided paths for learning, and faster accelerators — shortcuts, gestures, batch actions — that experts can adopt without getting in the novice's way.",
  definition:
    "Flexibility and efficiency of use is the principle that shortcuts and other **accelerators**, unseen by novices, should speed up interaction for experienced users, so one system can cater to both {{src:nielsen-ten-heuristics-article}}. NN/g describes two aspects: **multiple methods** to accomplish the same task, and **accelerators** that do not slow down inexperienced users but speed up advanced ones {{src:nng-flexibility-efficiency}}. It is the seventh of Nielsen's ten heuristics. It is not a call to add options for their own sake: every alternative path is something to design, document and maintain.",
  primaryType: "principle",
  secondaryTypes: ["heuristic"],
  domain: "heuristics",
  subcategory: "heuristic-sets",
  tags: ["shortcuts", "accelerators", "expert users", "keyboard", "command palette", "batch actions", "customisation", "heuristics"],
  difficulty: "beginner",
  disciplines: ["Interaction design", "UI design", "Front-end engineering", "Accessibility"],
  learningObjectives: [
    "Explain why novices and experts need different paths to the same result.",
    "Design accelerators that are discoverable but unobtrusive.",
    "Estimate the time an accelerator saves with the keystroke-level model.",
    "Specify shortcuts and gestures that meet WCAG 2.2, and measure whether accelerators are adopted.",
  ],
  prerequisites: ["nielsen-usability-heuristics", "keystroke-level-model"],

  levels: {
    beginner: {
      explanation: [
        "The first time you use an app, you want clear menus and step-by-step help. The hundredth time, the same steps feel slow: you know what you want and would rather press a key. A product that only serves the first visit frustrates regular users; one that only serves experts is hard to learn.",
        "Flexibility and efficiency of use means offering both. The visible, guided path stays for everyone, and **accelerators** — keyboard shortcuts, swipe gestures, 'select all' and batch actions, saved templates — let experienced people go faster. A good accelerator is invisible to beginners until they are ready for it.",
        "Flexibility also means letting people work in their own way: there is often more than one sensible route to the same result.",
      ],
      analogy:
        "A kitchen with a recipe card on the wall and knives in a block. Beginners follow the card step by step; experienced cooks reach for the knife and do it their own faster way. Both cook the same dish in the same kitchen.",
      everydayExamples: [
        "Ctrl+C / ⌘C instead of Edit › Copy.",
        "Swiping across the letters of a word on a phone keyboard instead of tapping each one.",
        "Checkboxes in an email list to archive many messages at once.",
        "A command palette that finds any action by typing part of its name.",
      ],
      vocabulary: [
        { term: "Accelerator", meaning: "A faster, usually less obvious way to do something that also has a visible path." },
        { term: "Keyboard shortcut", meaning: "A key combination that triggers a command directly." },
        { term: "Batch action", meaning: "An action applied to many selected items at once." },
        { term: "Macro", meaning: "A recorded or written sequence of commands run with one trigger." },
        { term: "Novice and expert", meaning: "People new to a system and people who use it often; the same person moves from one to the other." },
      ],
    },
    intermediate: {
      explanation: [
        "NN/g explains the tension: a system designed only to be learnable slows repeat users with guidance they no longer need; one designed only for efficiency is hard to learn, like replacing a graphical interface with a command line {{src:nng-flexibility-efficiency}}. The answer is layering. The visible path teaches; the accelerator speeds up.",
        "The key design problem is **discoverability without obstruction**. The classic solution is to show keyboard shortcuts next to commands in menus and tooltips: novices can ignore them, and repeated exposure lets regular users learn them {{src:nng-flexibility-efficiency}}. Gestures with no visible hint, such as swipe-typing, are efficient but hard to discover.",
        "Accelerators come in several forms: keyboard shortcuts; gestures; batch selection and actions; macros and automations that chain steps; templates, defaults and recent items; and customisation, where people rearrange or add commands {{src:nng-flexibility-efficiency}}. Each suits a different kind of repetition.",
      ],
      howItWorks: [
        "Accelerators save time by removing physical and mental steps. The keystroke-level model estimates expert task time from operators such as pointing, clicking, keystrokes and mental preparation {{src:card-moran-newell-1980}} {{src:card-moran-newell-1983}}. With the operator times in UX Academy's calculator, copying via a menu (home hand to mouse, prepare, point, click, point, click, home back) comes to 4.75 s, and the shortcut (prepare, two keystrokes) to 1.91 s.",
        "The saving only appears for people who have learned the accelerator. Until then, the visible path must remain, which is why accelerators are added to the guided path, never substituted for it.",
      ],
      implementation: [
        "Keep a visible path for every action; add accelerators on top.",
        "Show shortcuts beside commands in menus, tooltips and the command palette.",
        "Do not use single-character shortcuts unless people can turn them off, remap them, or they only work when the relevant component has focus [WCAG 2.2 SC 2.1.4 Character Key Shortcuts, A] {{src:w3c-wcag-22}}.",
        "Make every function available from a keyboard [WCAG 2.2 SC 2.1.1 Keyboard, A] {{src:w3c-wcag-22}}.",
        "Give multi-finger or path-based gestures a single-pointer alternative [WCAG 2.2 SC 2.5.1 Pointer Gestures, A], and dragging a single-pointer alternative such as buttons [SC 2.5.7 Dragging Movements, AA] {{src:w3c-wcag-22}}.",
        "Support batch selection and actions in lists and tables where people repeat the same action on many items.",
      ],
      scenarios: [
        "**Illustrative.** Library staff renew dozens of loans a day, one at a time, through a three-step dialog. Adding row checkboxes and a 'Renew selected' action keeps the dialog for one-off renewals and saves the repeated steps.",
        "**Illustrative.** A design tool hides a frequently used command two menus deep. Showing its shortcut in the menu and adding it to the command palette lets regular users find and learn the faster route.",
        "**Critique protocol.** List the five most frequent tasks. For each, count the steps on the visible path, check whether an accelerator exists, whether it is shown anywhere, and whether it works with keyboard only. Findings are missing accelerators for frequent tasks and accelerators nobody can discover.",
      ],
    },
    advanced: {
      explanation: [
        "In a design system, accelerators need **a single source of truth**: a command registry that defines each command once, with its label, icon, shortcut, scope (global or within a component) and availability. Menus, toolbars, the command palette and the shortcut help screen are generated from it, so a shortcut shown in one place is never different in another, and conflicts are caught before release. Density settings (comfortable and compact spacing, expressed as alternative spacing tokens) are another form of flexibility the system can offer centrally.",
        "Flexibility has a cost. Every alternative path must be designed, tested, documented and kept consistent; customisation multiplies the states to support. Add accelerators where measured repetition justifies them, not everywhere.",
        "Adoption can be measured: the share of a command's uses that come through the accelerator, how long it takes users to start using it, use of the command palette and batch actions, and task time for repeat users. Low adoption of a shortcut for a frequent task points to a discoverability problem; high use of the palette for one command may mean it deserves a visible place.",
      ],
      evidence: [
        "The heuristic is professional guidance. 'Provide shortcuts' appeared in Nielsen and Molich's 1990 principles {{src:molich-nielsen-1990}}, and NN/g's current guidance comes from practice rather than experiments {{src:nng-flexibility-efficiency}}. The time saved by accelerators can be estimated with the keystroke-level model, which predicts skilled, error-free performance and was validated against observed times in its original study {{src:card-moran-newell-1980}}; it does not capture learning or errors. The WCAG 2.2 criteria on shortcuts and gestures are normative {{src:w3c-wcag-22}}.",
      ],
      debates: [
        "**Hidden vs visible accelerators.** Hidden accelerators keep the interface clean but may never be found; visible ones teach but add clutter. Showing shortcuts in menus is the common compromise.",
        "**Customisation.** Letting people rearrange interfaces serves experts but makes support, documentation and teaching harder, and most people never customise.",
        "**Single-key shortcuts.** They are fast for experts but can be triggered by speech-input users and accidental key presses, which is why WCAG requires a way to turn them off or remap them.",
      ],
      alternativeModels: [
        "**Recognition rather than recall** explains why the visible path must stay: accelerators rely on recall, which is harder for people who use a feature rarely.",
        "**Adaptive interfaces** change themselves based on use (recent items, predicted commands); they offer efficiency without setup but can be unpredictable.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich"],
    period: "1990 ('provide shortcuts'); 1994 ('flexibility and efficiency of use')",
    problem:
      "Interfaces were either easy to learn and slow for frequent users, or fast for experts and impossible for newcomers.",
    narrative: [
      "Nielsen and Molich's 1990 principles included 'provide shortcuts' {{src:molich-nielsen-1990}}.",
      "Nielsen's 1994 revision named the heuristic flexibility and efficiency of use, framing accelerators as a way to serve inexperienced and experienced users with one system {{src:nielsen-1994-heuristics}} {{src:nielsen-ten-heuristics-article}}.",
    ],
  },

  application: {
    summary: [
      "The heuristic matters most in tools people use often or for long periods — editors, email, administration, data tools — and wherever the same action is repeated on many items.",
    ],
    web: [
      "Provide keyboard shortcuts with a discoverable list (often on `?`), a command palette, and batch actions in tables.",
    ],
    mobile: [
      "Offer gestures as accelerators only alongside visible buttons; use long-press menus and swipe actions for frequent list operations.",
    ],
    enterprise: [
      "Bulk operations, saved views, templates and automations matter most for staff who repeat tasks all day.",
    ],
    services: [
      "Returning customers benefit from saved details and 'repeat last order'; first-time customers still need the full, guided path.",
    ],
    steps: [
      "Identify the most frequent tasks and who repeats them.",
      "Keep a clear visible path for each; add accelerators for the frequent ones.",
      "Define commands, shortcuts and scopes once in a command registry.",
      "Show accelerators where people already look (menus, tooltips, palette).",
      "Check keyboard access, single-key shortcut controls and gesture alternatives.",
      "Measure adoption and repeat-user task time.",
    ],
  },

  whenToUse: [
    "Products used frequently or for long sessions, and any task repeated many times.",
    "Reviews of power-user workflows and keyboard support.",
  ],
  whenNotToUse: [
    "As a replacement for the visible path: accelerators that are the only way to do something fail novices and occasional users.",
    "For rarely used tasks in simple products: the cost of designing and maintaining accelerators outweighs the time saved; keep one clear path.",
  ],
  advantages: [
    "Serves novices and experts with one system.",
    "Saves measurable time on frequent tasks.",
    "Lets people work in the way that suits them.",
  ],
  limitations: [
    "Each alternative path adds design, testing and documentation cost.",
    "Accelerators that are not discoverable are rarely adopted.",
    "Time estimates from the keystroke-level model assume skilled, error-free use.",
  ],
  misconceptions: [
    {
      myth: "Flexibility means adding as many options as possible.",
      reality:
        "Flexibility is a small number of well-chosen alternative paths for frequent tasks, layered on a clear default path {{src:nng-flexibility-efficiency}}.",
    },
    {
      myth: "Keyboard shortcuts are only for power users.",
      reality:
        "Keyboard access is an accessibility requirement for everyone who cannot use a pointer [WCAG 2.2 SC 2.1.1, A] {{src:w3c-wcag-22}}; shortcuts are an additional layer on top.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "Heuristic 7 of Nielsen's ten usability heuristics." },
    { target: "keystroke-level-model", type: "measured-by", note: "The keystroke-level model estimates the time an accelerator saves." },
    { target: "recognition-over-recall", type: "contrasts-with", note: "Accelerators rely on recall; the visible path relies on recognition, so both are needed." },
    { target: "power-law-of-practice", type: "related-to", note: "People speed up with practice, which is when accelerators start to pay off." },
    { target: "progressive-disclosure", type: "complementary-to", note: "Advanced features revealed when needed keep the default path simple for novices." },
    { target: "interaction-cost", type: "related-to", note: "Accelerators reduce the interaction cost of frequent tasks." },
  ],

  practice: {
    dos: [
      { text: "Show each command's shortcut beside it in menus, tooltips and the command palette.", why: "Novices can ignore it; repeated exposure teaches regular users {{src:nng-flexibility-efficiency}}.", kind: "industry" },
      { text: "Add batch selection and actions where people repeat the same action on many items.", why: "Batch actions are accelerators for repetition that need no memorisation {{src:nng-flexibility-efficiency}}.", kind: "industry" },
      { text: "Define commands and shortcuts once in a registry and generate menus, palette and help from it.", why: "One source prevents conflicting or mismatched shortcuts across a product.", kind: "team" },
    ],
    donts: [
      { text: "Don't make an accelerator the only way to do something.", why: "Gestures and shortcuts depend on recall; people who have not learned them need a visible path.", kind: "industry" },
      { text: "Don't ship single-character shortcuts that cannot be turned off or remapped.", why: "They can be triggered by speech input or stray key presses [WCAG 2.2 SC 2.1.4, A] {{src:w3c-wcag-22}}.", kind: "standard" },
      { text: "Don't require dragging or multi-finger gestures without a single-pointer alternative.", why: "Some people cannot perform them [WCAG 2.2 SC 2.5.1, A; SC 2.5.7, AA] {{src:w3c-wcag-22}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "A command registry: one definition, many surfaces",
        language: "ts",
        code: `type Command = {
  id: string;
  label: string;              // shown in menus, palette and help
  shortcut?: string;          // displayed next to the label everywhere
  scope: "global" | "list";   // "list": works only when a list has focus
  run: (ctx: Context) => void;
};

export const commands: Command[] = [
  { id: "loan.renew", label: "Renew selected loans", shortcut: "Mod+R", scope: "list", run: renewSelected },
  { id: "search.open", label: "Search the catalogue", shortcut: "Mod+K", scope: "global", run: openSearch },
  { id: "help.shortcuts", label: "Keyboard shortcuts", shortcut: "?", scope: "global", run: showShortcutHelp },
];
// "?" is a single-character shortcut: a settings toggle lets people turn it off
// or remap it (WCAG 2.2 SC 2.1.4). Menus, the palette and the help screen are
// all generated from this list, and a test fails on duplicate shortcuts.`,
        caption: "Illustrative. `Mod` stands for Ctrl on Windows and Linux and ⌘ on macOS; `renewSelected`, `openSearch` and `showShortcutHelp` are placeholders.",
      },
      {
        title: "What a shortcut saves, estimated with the keystroke-level model",
        language: "text",
        code: `Route      Operators                            Time (s)
---------  -----------------------------------  --------
Menu       H M P B B P B B H                       4.75
Shortcut   M K K                                   1.91

H home hands 0.40 · M mentally prepare 1.35 · P point 1.10 · B button press/release 0.10 · K keystroke 0.28`,
        caption: "Computed with UX Academy's keystroke-level-model calculator (`lib/formulas`). Estimates assume a skilled user making no errors {{src:card-moran-newell-1980}}.",
      },
    ],
  },

  exercises: [
    {
      id: "flexibility-and-efficiency-of-use-ex-find",
      kind: "assignment",
      level: "beginner",
      title: "Find the accelerators",
      prompt: [
        "Pick an app you use every day. List five things you do often and, for each, the slow visible way and any faster way. How did you discover the faster way, if at all?",
      ],
      deliverable: "A table of tasks, visible path, accelerator and how it is discovered.",
      criteria: ["Five frequent tasks", "Visible path and accelerator distinguished", "Discoverability judged"],
    },
    {
      id: "flexibility-and-efficiency-of-use-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Speed up repeated renewals",
      prompt: [
        "Illustrative case. Library staff renew 40–60 loans a day. Each renewal needs: open the loan, click Renew, confirm in a dialog. There is no keyboard shortcut and no way to select several loans.",
        "Work through the correction sequence.",
      ],
      deliverable: "A design adding accelerators while keeping the visible path, with how you would measure success.",
      criteria: ["Visible path kept", "Accelerators chosen for the repetition", "WCAG criteria cited", "Adoption measured"],
      exampleSolution: [
        "1. Symptom: staff spend a lot of time on a repetitive task.",
        "2. Impact: slow service and frustration; errors from repetitive clicking.",
        "3. Cause: the system offers only the guided one-item path.",
        "4. Principle: accelerators unseen by novices that speed up experts {{src:nng-flexibility-efficiency}}; keyboard operable [WCAG 2.2 SC 2.1.1, A].",
        "5. Correction: row checkboxes with 'Renew selected'; a scoped shortcut shown on the button; the existing dialog stays for single renewals.",
        "6. Validation: estimate saved time with the keystroke-level model; after release, measure the share of renewals done in batches and time per renewal.",
        "7. Trade-off: batch renewal needs a clear summary of failures (loans that cannot be renewed), which adds design work.",
      ],
    },
    {
      id: "flexibility-and-efficiency-of-use-ex-registry",
      kind: "reflection",
      level: "advanced",
      title: "Govern shortcuts across a product suite",
      prompt: [
        "Three products in a suite use different shortcuts for the same commands. Propose a command registry, conflict rules, platform mappings (Ctrl vs ⌘), WCAG 2.1.4 handling and an adoption metric.",
      ],
      deliverable: "A short specification with a migration plan.",
      criteria: ["Single source of truth", "Conflicts and scopes handled", "Accessibility handled", "Migration respects learned habits"],
    },
  ],

  quiz: [
    {
      id: "flexibility-and-efficiency-of-use-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which is an accelerator?",
      options: [
        { text: "Pressing Ctrl+S to save, with File › Save still in the menu", correct: true, explanation: "It is a faster route that sits alongside the visible one." },
        { text: "Removing the Save menu item to encourage the shortcut", correct: false, explanation: "That removes the visible path novices need." },
        { text: "A bigger Save button", correct: false, explanation: "That improves the visible path but is not an alternative route." },
        { text: "A tutorial video about saving", correct: false, explanation: "Help, not an accelerator." },
      ],
      explanation: "Accelerators are faster alternatives layered on a visible path.",
    },
    {
      id: "flexibility-and-efficiency-of-use-q-discover",
      kind: "scenario",
      level: "intermediate",
      prompt: "A team adds keyboard shortcuts, but analytics show almost nobody uses them. What is the most likely fix?",
      options: [
        { text: "Show the shortcuts next to their commands in menus and tooltips", correct: true, explanation: "Repeated exposure is how people learn shortcuts; hidden ones are rarely found." },
        { text: "Remove the menu items so people must use shortcuts", correct: false, explanation: "That breaks the visible path for everyone else." },
        { text: "Add more shortcuts", correct: false, explanation: "More hidden shortcuts do not solve discoverability." },
        { text: "Nothing; experts will find them", correct: false, explanation: "Low adoption is the signal that they are not being found." },
      ],
      explanation: "Accelerators must be discoverable but unobtrusive.",
    },
    {
      id: "flexibility-and-efficiency-of-use-q-wcag",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "A web app uses 'd' to delete the selected message from anywhere on the page. What does WCAG 2.2 require?",
      options: [
        { text: "A way to turn the shortcut off or remap it, or limiting it to when the list has focus (SC 2.1.4, A)", correct: true, explanation: "Single-character shortcuts can be triggered accidentally, for example by speech input." },
        { text: "Nothing; shortcuts are optional", correct: false, explanation: "Single-character shortcuts carry a specific Level A requirement." },
        { text: "A confirmation dialog for every key press", correct: false, explanation: "Not what the criterion requires." },
        { text: "Only that the shortcut is documented", correct: false, explanation: "Documentation alone does not meet the criterion." },
      ],
      explanation: "WCAG 2.2 SC 2.1.4 Character Key Shortcuts.",
    },
  ],

  flashcards: [
    { id: "flexibility-and-efficiency-of-use-fc-two", front: "Two aspects of flexibility and efficiency (NN/g)", back: "Multiple methods for the same task; accelerators that speed up experts without slowing novices." },
    { id: "flexibility-and-efficiency-of-use-fc-discover", front: "Classic way to make shortcuts discoverable", back: "Show them next to commands in menus and tooltips." },
    { id: "flexibility-and-efficiency-of-use-fc-wcag", front: "WCAG 2.2 criteria for accelerators", back: "2.1.1 Keyboard (A), 2.1.4 Character Key Shortcuts (A), 2.5.1 Pointer Gestures (A), 2.5.7 Dragging Movements (AA)." },
  ],

  references: [
    { source: "nielsen-ten-heuristics-article", role: "primary", note: "Heuristic 7 as currently stated." },
    { source: "nielsen-1994-heuristics", role: "primary", note: "Revision that named the heuristic." },
    { source: "molich-nielsen-1990", role: "primary", note: "'Provide shortcuts'." },
    { source: "nng-flexibility-efficiency", role: "explanatory", note: "Novices vs experts, multiple methods, accelerators, discoverability." },
    { source: "card-moran-newell-1980", role: "primary", note: "Keystroke-level model for estimating time saved." },
    { source: "card-moran-newell-1983", role: "primary", note: "The Psychology of Human-Computer Interaction, which presents the model within the wider GOMS framework." },
    { source: "w3c-wcag-22", role: "standard", note: "SC 2.1.1, 2.1.4, 2.5.1 (A) and 2.5.7 (AA)." },
  ],
  evidence: "professional-guideline",
  evidenceNote:
    "Flexibility and efficiency of use is professional guidance from Nielsen's heuristics and NN/g's practice. Time savings can be estimated with the keystroke-level model, an empirically derived model of skilled performance; adoption and learning effects are not captured by it. The accessibility requirements are WCAG 2.2 success criteria, a W3C Recommendation.",

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
