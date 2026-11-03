import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "cognitive-walkthrough",
  slug: "cognitive-walkthrough",
  title: "Cognitive Walkthrough",
  alternateNames: ["CW", "Streamlined cognitive walkthrough", "Walkthrough evaluation"],
  summary:
    "A task-based inspection method in which evaluators step through each action a new user must take and ask whether that user would know what to do and recognise that it worked.",
  definition:
    "A cognitive walkthrough is a **usability inspection method** focused on **learnability through exploration**. Evaluators take a defined user, a task and the correct sequence of actions, then step through each action and ask structured questions about whether a first-time user would form the right goal, find the right control, connect it with their goal, and understand the system's response. Each 'no' answer is recorded as a failure story explaining why the user would likely go wrong.",
  primaryType: "method",
  secondaryTypes: ["technique"],
  domain: "research",
  subcategory: "evaluation",
  tags: ["inspection", "learnability", "first-time use", "exploratory learning", "task analysis"],
  difficulty: "intermediate",
  disciplines: ["Human-computer interaction", "Cognitive psychology", "UX research"],
  learningObjectives: [
    "Prepare the inputs a walkthrough requires: user description, tasks and correct action sequences.",
    "Apply the walkthrough questions to each step and write credible success and failure stories.",
    "Explain the theory of exploratory learning behind the method and what that implies about its scope.",
    "Choose between a cognitive walkthrough, a heuristic evaluation and usability testing for a given question.",
  ],
  prerequisites: ["mental-models", "heuristic-evaluation"],

  levels: {
    beginner: {
      explanation: [
        "Imagine someone using your product for the very first time, with no training and no manual. A cognitive walkthrough is a way of pretending to be that person, one step at a time, and asking honest questions at every step: *Would they know what to do here? Would they see the button? Would they understand what happened after pressing it?*",
        "You start by writing down who the user is, what task they want to do, and the exact correct steps. Then a small group walks through those steps on the design. Whenever the answer to a question is 'probably not', you write a short story explaining why the user would get stuck — for example, 'They want to share the file, but the share option is hidden under an icon labelled Export.'",
        "It is narrower than other reviews: it only checks whether a new user can **figure out** the task by exploring. That focus is its strength — it finds the exact moments where first-time users lose their way.",
      ],
      analogy:
        "It is like checking a route for a visitor in an unfamiliar city. At each junction you ask: will they know they need to turn here, will they see the sign, will the sign make sense to them, and once they turn, will they know they are on the right road?",
      everydayExamples: [
        "Checking whether a new user can set up two-factor authentication without help.",
        "Walking through a self-service ticket machine as a first-time traveller.",
        "Reviewing whether a patient can book an appointment on a clinic's website without calling.",
      ],
      vocabulary: [
        { term: "Action sequence", meaning: "The exact list of correct steps needed to complete a task." },
        { term: "Learnability", meaning: "How easily people can learn to use something the first time they meet it." },
        { term: "Exploratory learning", meaning: "Learning to use software by trying things rather than reading instructions." },
        { term: "Failure story", meaning: "A short, plausible explanation of why a user would not take the correct step." },
      ],
    },
    intermediate: {
      explanation: [
        "The practitioner version asks four questions at each step {{src:wharton-et-al-1994}}: **(1)** Will the user try to achieve the right effect? **(2)** Will the user notice that the correct action is available? **(3)** Will the user associate the correct action with the effect they are trying to achieve? **(4)** If the correct action is performed, will the user see that progress is being made towards their goal?",
        "The questions map onto the two halves of Norman's [[gulfs-of-execution-and-evaluation|gulfs of execution and evaluation]]: questions 1–3 probe whether the user can get from intention to action; question 4 probes whether they can interpret the result. They also map onto design concepts — question 2 is about visibility and [[signifiers|signifiers]], question 3 about labels and [[mental-models|mental models]], question 4 about feedback.",
        "Spencer's **streamlined cognitive walkthrough** reduces the questions to two — *Will the user know what to do at this step?* and *If the user does the right thing, will they know that they did the right thing and are making progress towards their goal?* — and adds ground rules to manage the social dynamics of design teams, such as banning design discussions and defensiveness during the walkthrough {{src:spencer-2000}}.",
      ],
      howItWorks: [
        "Inputs: a description of the users (their knowledge and experience), a set of representative tasks, the correct action sequence for each, and an interface at sufficient fidelity to judge each step.",
        "At each step the group agrees an answer to each question and, for every 'no', writes a failure story grounded in what the user knows and what the interface shows.",
        "Outputs are a list of failure points with reasons, plus design ideas captured separately after the walkthrough.",
        "A recorder documents answers and stories; a facilitator keeps the group on the user's perspective and stops redesign discussions mid-walkthrough.",
      ],
      implementation: [
        "Choose tasks that matter for first-time or infrequent use — sign-up, set-up, recovery, rare but critical actions.",
        "Write the user description concretely: what they know about the domain, the product category and the device.",
        "Specify the correct action sequence at the level of individual physical actions (tap, type, select).",
        "Run the walkthrough in a short, focused session; park design ideas in a separate list.",
        "Turn failure stories into design changes and, ideally, test the revised flow with new users.",
      ],
      scenarios: [
        "A banking app's 'freeze card' function: the walkthrough reveals that new users look under 'Security' while the action sits under 'Card settings' (question 1/3 failure).",
        "A library kiosk: the 'renew' action is available only after scanning a card, which first-time users do not know to do (question 2 failure).",
        "A file upload that completes silently: users cannot tell the task succeeded (question 4 failure).",
      ],
    },
    advanced: {
      explanation: [
        "The cognitive walkthrough is unusual among inspection methods because it is **derived from a cognitive theory**. Lewis, Polson and colleagues based it on the CE+ theory of exploratory learning, which models users as choosing actions whose descriptions best match their current goal and learning from the system's feedback {{src:polson-lewis-1990}} {{src:lewis-et-al-1990}}. The walkthrough questions operationalise the points at which that process can fail {{src:polson-et-al-1992}}.",
        "Its theoretical grounding defines its scope. The method assumes users are **goal-driven, exploring without instruction, and choosing among visible actions by label–goal matching**. It is therefore excellent for walk-up-and-use systems and first-time tasks, and weak for expert efficiency, overall satisfaction, aesthetics or problems that arise only over repeated use.",
        "The original form was criticised as tedious and difficult for non-specialists. Successive revisions — the practitioner's guide's simplified questions {{src:wharton-et-al-1994}}, the streamlined version {{src:spencer-2000}} and many domain variants — trade theoretical rigour for practicality. Mahatody, Sagar and Kolski's review catalogues these variants and their evolution {{src:mahatody-sagar-kolski-2010}}.",
      ],
      evidence: [
        "Early studies tested the method's ability to predict problems observed in user testing of walk-up-and-use interfaces {{src:lewis-et-al-1990}}.",
        "Like other inspection methods, the cognitive walkthrough shows a substantial evaluator effect — evaluators walking through the same tasks identify different problems {{src:hertzum-jacobsen-2001}}.",
        "The **Cognitive Walkthrough for the Web** adapted the method to navigation, connecting it to models of label–goal similarity and information scent {{src:blackmon-et-al-2002}}.",
      ],
      debates: [
        "**Rigour versus practicality.** The more the questions are simplified, the easier the method is to run and the further it drifts from the theory that justified it.",
        "**Who should evaluate?** Designers of the system know the correct path too well to simulate a newcomer; including people outside the team helps, but they may lack the user knowledge the method needs.",
        "**Coverage.** Because it evaluates only the correct path, the walkthrough does not show how users recover after taking a wrong turn — usability testing does.",
      ],
      alternativeModels: [
        "[[heuristic-evaluation|Heuristic evaluation]] — broader, principle-based, not tied to tasks or a cognitive theory.",
        "[[usability-testing|Usability testing]] with first-time users — direct evidence of learnability, including recovery from errors.",
        "[[keystroke-level-model|Keystroke-Level Model]] — a task-based analytical model for *expert* execution time, the complement of the walkthrough's focus on novices.",
      ],
    },
  },

  origin: {
    contributors: ["Clayton Lewis", "Peter Polson", "Cathleen Wharton", "John Rieman", "Rick Spencer"],
    period: "1990–1994 (University of Colorado); streamlined version 2000",
    problem:
      "Designers of walk-up-and-use systems such as kiosks needed a way to predict, before testing, whether people with no training could work out how to use them.",
    narrative: [
      "Lewis, Polson, Wharton and Rieman presented the walkthrough at CHI '90 as a theory-based design and evaluation method for walk-up-and-use interfaces {{src:lewis-et-al-1990}}, grounded in the CE+ model of exploratory learning {{src:polson-lewis-1990}}.",
      "The 1992 journal paper set out the method and its theoretical basis in detail {{src:polson-et-al-1992}}; the 1994 practitioner's guide simplified it for practice {{src:wharton-et-al-1994}}.",
      "In 2000 Spencer described a streamlined version adapted to the time pressures and social dynamics of a software company {{src:spencer-2000}}.",
    ],
  },

  application: {
    summary: [
      "Use the walkthrough wherever first-time success without instruction matters: onboarding, set-up, self-service, public kiosks, rarely used but critical functions, and any flow where users cannot ask for help.",
    ],
    web: [
      "Walk through sign-up, password recovery and first purchase for a first-time visitor.",
      "Check that navigation labels match the words users would use for their goals.",
    ],
    mobile: [
      "Evaluate icon-only controls and gestures — common sources of question-2 and question-3 failures.",
      "Check that each step's feedback is visible on small screens and does not disappear too quickly.",
    ],
    enterprise: [
      "Use for infrequent administrative tasks (year-end processes, permission changes) that even experienced users perform rarely.",
    ],
    services: [
      "Walk through ticket machines, check-in kiosks and public digital services used without staff assistance.",
    ],
    steps: [
      "Define the user: background knowledge, experience and context.",
      "Select representative first-time tasks.",
      "Write the correct action sequence for each task.",
      "For each step, answer the walkthrough questions and write failure stories for every 'no'.",
      "Record design ideas separately; prioritise failures by task importance.",
      "Revise the design and confirm with first-time users.",
    ],
  },

  method: {
    procedure: [
      "Define the target users and their prior knowledge.",
      "Choose representative tasks and write the correct action sequence for each.",
      "Assemble a small group (facilitator, recorder, evaluators) and the interface or prototype.",
      "For each action, ask the walkthrough questions (four in the practitioner version; two in the streamlined version).",
      "Record success or failure for each question, with a failure story explaining any likely problem.",
      "After the walkthrough, discuss fixes and prioritise them.",
    ],
    participants: "Typically two to six people from the team or outside it (designers, researchers, developers); no end users.",
    duration: "Preparation of a few hours; walkthrough sessions of about 1–2 hours for a handful of tasks.",
    inputs: ["User description", "Representative tasks", "Correct action sequences", "Prototype or interface"],
    outputs: ["Failure points with explanatory stories", "Prioritised design issues", "Design ideas list"],
    purpose: "evaluative",
    data: "qualitative",
  },

  whenToUse: [
    "When first-time or walk-up-and-use learnability is critical.",
    "Early in design, when correct action sequences are defined but users have not yet been tested.",
    "For rare but important tasks that even experienced users effectively perform as novices.",
  ],
  whenNotToUse: [
    "To evaluate expert efficiency, satisfaction or aesthetics — the method does not address them.",
    "When the task cannot be described as a sequence of correct actions (open-ended, creative or exploratory work).",
    "As the only evaluation of a flow where error recovery matters, since only the correct path is examined.",
  ],
  advantages: [
    "Grounded in a cognitive theory of exploratory learning.",
    "Pinpoints the exact step where a newcomer is likely to fail, and why.",
    "Usable early, on prototypes, without recruiting users.",
    "Builds empathy for first-time users within design teams.",
  ],
  limitations: [
    "Narrow scope: learnability by exploration on the correct path.",
    "Can be slow and repetitive for long tasks.",
    "Depends on evaluators' ability to imagine the user's knowledge accurately.",
    "Subject to the evaluator effect, like other inspection methods.",
  ],
  misconceptions: [
    {
      myth: "A cognitive walkthrough is just a general expert review done step by step.",
      reality:
        "It asks specific questions derived from a theory of how people learn by exploration, about a defined user and a defined correct action sequence. Without those inputs, it is not a cognitive walkthrough.",
    },
    {
      myth: "Walkthroughs evaluate the whole user experience.",
      reality:
        "They evaluate whether a new user can discover and confirm each correct step. Satisfaction, efficiency for experts and error recovery need other methods.",
    },
  ],

  relations: [
    { target: "heuristic-evaluation", type: "contrasts-with", note: "Both are inspection methods; the walkthrough is task- and theory-driven and focused on learnability, heuristic evaluation is principle-driven and broader." },
    { target: "gulfs-of-execution-and-evaluation", type: "related-to", note: "The walkthrough questions probe the gulf of execution (goal, visibility, association) and the gulf of evaluation (feedback)." },
    { target: "signifiers", type: "related-to", note: "Question 2 — will users notice the correct action — tests whether signifiers make the action discoverable." },
    { target: "information-scent", type: "related-to", note: "Label–goal matching in the walkthrough is closely related to information scent; the web variant draws on it directly." },
    { target: "usability-testing", type: "complementary-to", note: "Testing with first-time users validates walkthrough predictions and reveals how users recover from wrong turns." },
    { target: "learnability", type: "measured-by", note: "Learnability is the quality the walkthrough inspects; it can be measured directly in first-use testing." },
  ],

  exercises: [
    {
      id: "cognitive-walkthrough-ex-prepare",
      kind: "assignment",
      level: "beginner",
      title: "Prepare a walkthrough",
      prompt: [
        "Choose a task in an app you know well that a newcomer would find hard (for example, sharing a document with edit rights). Write the user description and the full correct action sequence at the level of individual taps and clicks.",
      ],
      deliverable: "A user description (3–5 sentences) and a numbered action sequence.",
      criteria: ["User knowledge is concrete", "Every physical action is listed", "No step is skipped because 'everyone knows it'"],
    },
    {
      id: "cognitive-walkthrough-ex-run",
      kind: "scenario",
      level: "intermediate",
      title: "Walk through and write failure stories",
      prompt: [
        "Using your prepared sequence, apply the four walkthrough questions to every step. For each 'no', write a failure story that refers to what the user knows and what the screen shows.",
        "Then repeat with the two streamlined questions and compare what you found.",
      ],
      deliverable: "A step-by-step table of answers and failure stories, plus a short comparison of the two question sets.",
      criteria: [
        "Answers are argued from the user's perspective, not the designer's",
        "Failure stories are specific and plausible",
        "Comparison notes what the four-question version catches that the two-question version may miss",
      ],
      exampleSolution: [
        "Step 3, 'Tap the ⋯ menu': Q1 yes (user wants to share). Q2 no — the menu icon is small and grey on a busy toolbar. Q3 no — the user is looking for the word 'Share', which is not visible until the menu is opened. Q4 yes — the menu opens visibly. Failure story: 'A user wanting to share scans for a Share label; the only entry point is an unlabelled ⋯ icon, so they are unlikely to notice or associate it with sharing.'",
      ],
    },
    {
      id: "cognitive-walkthrough-ex-choose",
      kind: "reflection",
      level: "advanced",
      title: "Choose the right inspection",
      prompt: [
        "For each situation, choose a cognitive walkthrough, heuristic evaluation or usability test, and justify your choice: (a) a hospital self-check-in kiosk prototype; (b) a mature analytics tool used daily by experts; (c) a redesign of an onboarding flow with a two-day deadline and no recruiting budget.",
      ],
      deliverable: "Three choices with justifications referring to the methods' scope and assumptions.",
      criteria: ["Links walkthrough to first-time, walk-up use", "Recognises expert efficiency is outside walkthrough scope", "Acknowledges limits of whichever inspection is chosen under constraints"],
    },
  ],

  quiz: [
    {
      id: "cognitive-walkthrough-q-focus",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What does a cognitive walkthrough primarily evaluate?",
      options: [
        { text: "Whether first-time users can work out each step of a task by exploring", correct: true, explanation: "The method focuses on learnability through exploration on the correct action path." },
        { text: "How fast expert users can complete a task", correct: false, explanation: "Expert execution time is the domain of models like KLM, not the walkthrough." },
        { text: "Whether the interface is visually attractive", correct: false, explanation: "Aesthetics are outside the method's scope." },
        { text: "Whether the interface follows Nielsen's ten heuristics", correct: false, explanation: "That is heuristic evaluation." },
      ],
      explanation: "The walkthrough simulates a newcomer choosing actions by matching labels to goals.",
    },
    {
      id: "cognitive-walkthrough-q-question",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "At step 2, the correct action is long-pressing a photo to reveal a 'Move' option. New users want to move the photo, but nothing on screen suggests a long press. Which walkthrough question fails?",
      options: [
        { text: "Will the user try to achieve the right effect?", correct: false, explanation: "The user does want to move the photo, so the goal is right." },
        { text: "Will the user notice that the correct action is available?", correct: true, explanation: "Long-press has no visible signifier, so the action is undiscoverable." },
        { text: "Will the user see that progress is being made?", correct: false, explanation: "This concerns feedback after the action, which the user never reaches." },
        { text: "None — long-press is a standard gesture", correct: false, explanation: "Hidden gestures are a classic walkthrough failure for first-time users, whatever the platform." },
      ],
      explanation: "Question 2 tests visibility of the correct action; hidden gestures fail it unless something signals them.",
      revise: "signifiers",
    },
    {
      id: "cognitive-walkthrough-q-theory",
      kind: "multiple-choice",
      level: "advanced",
      prompt: "What theoretical basis distinguishes the cognitive walkthrough from heuristic evaluation?",
      options: [
        { text: "A factor analysis of usability problems", correct: false, explanation: "That describes the derivation of Nielsen's 1994 heuristics." },
        { text: "The CE+ theory of exploratory learning", correct: true, explanation: "The walkthrough questions operationalise points where exploratory, label-matching learning can fail." },
        { text: "Fitts's law of aimed movement", correct: false, explanation: "Motor performance is not part of the walkthrough model." },
        { text: "Gestalt principles of grouping", correct: false, explanation: "Perceptual grouping is not the walkthrough's theoretical foundation." },
      ],
      explanation: "The method's grounding in a learning theory defines both its precision and its narrow scope.",
    },
    {
      id: "cognitive-walkthrough-q-tf",
      kind: "true-false",
      level: "intermediate",
      prompt: "A cognitive walkthrough shows how users recover after taking a wrong action.",
      options: [
        { text: "True", correct: false, explanation: "The walkthrough follows only the correct action sequence." },
        { text: "False", correct: true, explanation: "It predicts where users will go wrong, but not what happens next; usability testing reveals recovery behaviour." },
      ],
      explanation: "Use testing to understand error recovery.",
    },
  ],

  flashcards: [
    { id: "cognitive-walkthrough-fc-1", front: "The four walkthrough questions (Wharton et al., 1994)", back: "Right effect? Notice the action? Associate action with effect? See progress after acting?" },
    { id: "cognitive-walkthrough-fc-2", front: "Spencer's streamlined questions", back: "Will the user know what to do at this step? If they do the right thing, will they know it was right and that they are making progress?" },
    { id: "cognitive-walkthrough-fc-3", front: "Inputs to a cognitive walkthrough", back: "User description, representative tasks, correct action sequences, interface/prototype." },
  ],

  references: [
    { source: "lewis-et-al-1990", role: "primary", note: "Original method for walk-up-and-use interfaces." },
    { source: "polson-et-al-1992", role: "primary", note: "Full method and theoretical basis." },
    { source: "polson-lewis-1990", role: "primary", note: "CE+ theory of exploratory learning." },
    { source: "wharton-et-al-1994", role: "primary", note: "Practitioner's guide; four questions." },
    { source: "spencer-2000", role: "primary", note: "Streamlined walkthrough and ground rules." },
    { source: "mahatody-sagar-kolski-2010", role: "explanatory", note: "Review of variants." },
    { source: "blackmon-et-al-2002", role: "further", note: "Web adaptation (CWW)." },
    { source: "hertzum-jacobsen-2001", role: "further", note: "Evaluator effect in walkthroughs." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "A peer-reviewed, theory-derived method. Evidence supports its usefulness for predicting first-time learnability problems; it is subject to the evaluator effect, and simplified variants used in practice have weaker links to the original theory.",

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
  lastVerifiedAt: "2026-11-03",
});
