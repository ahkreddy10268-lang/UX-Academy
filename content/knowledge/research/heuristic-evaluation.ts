import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "heuristic-evaluation",
  slug: "heuristic-evaluation",
  title: "Heuristic Evaluation",
  alternateNames: ["Heuristic inspection", "Expert review (heuristic-based)", "Discount usability inspection"],
  summary:
    "A usability inspection method in which several evaluators independently examine an interface against a set of heuristics, then merge and rate the problems they find.",
  definition:
    "Heuristic evaluation is a **usability inspection method** in which a small group of evaluators independently examine an interface, judge its compliance with recognised usability principles (the heuristics), and record violations as usability problems. Findings from all evaluators are then aggregated, de-duplicated and rated for severity. It predicts likely problems without involving users, and is therefore evaluative, expert-based and qualitative.",
  primaryType: "method",
  secondaryTypes: ["technique"],
  domain: "research",
  subcategory: "evaluation",
  tags: ["inspection", "expert review", "discount usability", "severity ratings", "evaluation"],
  difficulty: "intermediate",
  disciplines: ["Usability engineering", "UX research", "Interaction design"],
  learningObjectives: [
    "Plan and run a heuristic evaluation with independent evaluators, aggregation and severity ratings.",
    "Write usability findings that are specific, evidenced and actionable.",
    "Explain why multiple evaluators are needed and what the evaluator effect implies for reliability.",
    "Decide when heuristic evaluation is appropriate and when it must be complemented by user research.",
  ],
  prerequisites: ["nielsen-usability-heuristics", "usability"],

  levels: {
    beginner: {
      explanation: [
        "A heuristic evaluation is a structured expert review. Instead of watching users, a few people who understand usability go through the product and look for places where it breaks well-known rules of good design — the **heuristics**, usually [[nielsen-usability-heuristics|Nielsen's ten]].",
        "The important detail is that each evaluator works **alone first**. Different people notice different problems, so the team only combines their lists afterwards. The combined list is then sorted by how serious each problem is.",
        "It is popular because it is quick and cheap: you need no participants, no lab and no recruitment. But it finds *likely* problems, not proven ones — experts can be wrong about what real users will struggle with.",
      ],
      analogy:
        "Several experienced editors proofreading a document independently work the same way. Each catches different mistakes; together they catch most of them. But editors cannot tell you whether readers will find the argument persuasive — only readers can.",
      everydayExamples: [
        "Three designers each spend an hour reviewing a new checkout flow, then meet to merge their findings.",
        "A consultant audits a public-sector website against the ten heuristics before a redesign.",
        "A product team reviews a prototype before deciding which questions to test with users.",
      ],
      vocabulary: [
        { term: "Inspection method", meaning: "An evaluation method where experts examine the interface instead of observing users." },
        { term: "Evaluator", meaning: "The person carrying out the review." },
        { term: "Finding", meaning: "A recorded usability problem, with where it occurs and why it is a problem." },
        { term: "Severity rating", meaning: "A score for how serious a problem is, used to decide what to fix first." },
        { term: "Aggregation", meaning: "Combining and de-duplicating the problems found by different evaluators." },
      ],
    },
    intermediate: {
      explanation: [
        "A sound heuristic evaluation has four parts: **briefing** (users, tasks and context), **independent evaluation** (each evaluator, typically one to two hours, often in two passes — a first pass to understand the flow, a second to inspect elements), **aggregation** (merging duplicates into a master list) and **severity rating** (each evaluator rates every merged problem; ratings are averaged).",
        "Nielsen and Molich's original studies showed that a single evaluator finds only a minority of the problems that a group finds {{src:nielsen-molich-1990}}. Across six case studies, single evaluators found a given major problem about 42% of the time and a given minor one about 32% of the time {{src:nielsen-1995-problems-found}}. This is why **three to five evaluators** is the common recommendation {{src:moran-gordon-2023}}.",
        "Evaluator expertise matters. Nielsen (1992) found that usability specialists outperformed non-specialists, and that **'double experts'** — people with expertise in both usability and the kind of interface being evaluated — performed best {{src:nielsen-1992-heuristic}}.",
      ],
      howItWorks: [
        "Each finding should state: location (screen and element), the observation, the heuristic violated, why it matters to users, evidence (screenshot), severity, and a suggested direction — not a full redesign.",
        "Nielsen's severity scale runs from 0 (not a usability problem) through 1 (cosmetic), 2 (minor), 3 (major) to 4 (usability catastrophe), judged on frequency, impact and persistence, with market impact as a further consideration {{src:nielsen-severity-ratings}}.",
        "Severity ratings from a single evaluator are unreliable; averaging independent ratings from several evaluators is more dependable {{src:nielsen-severity-ratings}}.",
        "Walking through specific user tasks keeps the evaluation grounded; free exploration alone tends to over-report surface issues and miss task-flow problems.",
      ],
      implementation: [
        "Write a one-page brief: target users, key tasks, platform, scope, heuristic set.",
        "Give evaluators the same brief and time box; forbid sharing findings until everyone is done.",
        "Use a shared template (spreadsheet or board) with one finding per row and a fixed set of fields.",
        "Hold an aggregation session to merge duplicates and agree problem descriptions.",
        "Collect severity ratings independently, average them, then present findings ordered by severity and frequency.",
        "Mark findings that need user validation, and feed them into the next usability test.",
      ],
      scenarios: [
        "Before a usability test, an evaluation removes obvious problems so participants' time reveals deeper issues.",
        "A team with no research budget uses heuristic evaluation as a minimum quality gate on each release.",
        "A regulator's portal is evaluated with domain experts (double experts) because its legal terminology is unfamiliar to generic reviewers.",
      ],
    },
    advanced: {
      explanation: [
        "Heuristic evaluation was introduced as part of **discount usability engineering**: an argument that cheap, imperfect methods used widely improve more products than rigorous methods used rarely {{src:nielsen-molich-1990}} {{src:nielsen-1993}}. Its validity must be judged on those terms — as a cost-effective problem-finding aid, not a measurement instrument.",
        "The method's main threat to validity is the **evaluator effect**. Hertzum and Jacobsen reviewed 11 studies of heuristic evaluation, cognitive walkthrough and think-aloud testing and found that evaluators using the same method on the same interface detect markedly different sets of problems {{src:hertzum-jacobsen-2001}}. Aggregating several evaluators mitigates but does not remove this; it also means that the *number* of problems found is not a stable property of an interface.",
        "A second threat is **false positives**: predicted problems that real users never experience. Comparing inspection findings with user-test findings is the usual way to estimate them, but such comparisons are methodologically difficult. Gray and Salzman's review argued that many published comparisons of evaluation methods had serious validity problems, including small samples and inconsistent definitions of a 'problem' {{src:gray-salzman-1998}}.",
      ],
      evidence: [
        "Nielsen and Molich (1990) reported four experiments in which aggregating evaluators substantially increased the proportion of known problems found {{src:nielsen-molich-1990}}.",
        "Nielsen and Landauer (1993) modelled problem discovery for both heuristic evaluation and user testing with the same diminishing-returns curve, arguing that small numbers of evaluators give the best benefit–cost ratio {{src:nielsen-landauer-1993}}. That model's assumption of a constant discovery rate per problem is debated — see [[usability-testing|usability testing]].",
        "Evidence on expertise: specialists find more problems than novices, and double experts more still, especially domain-specific problems {{src:nielsen-1992-heuristic}}.",
      ],
      debates: [
        "**Is it research?** Heuristic evaluation produces expert predictions, not observations of users. Some practitioners present its findings with the same authority as user research; methodologists object to this.",
        "**Problem counting as a metric.** Counting problems to compare methods or designs is unreliable because problem definitions, granularity and evaluators differ.",
        "**Generic or domain heuristics?** Domain-specific heuristic sets may find more relevant problems, but are often less rigorously developed and reduce comparability.",
      ],
      alternativeModels: [
        "[[cognitive-walkthrough|Cognitive walkthrough]] — a task-based inspection grounded in a theory of exploratory learning; better for first-time use, narrower in scope.",
        "[[usability-testing|Usability testing]] — observation of representative users; slower and costlier, but provides direct evidence.",
        "Expert review without heuristics — faster, but less structured and harder to audit.",
      ],
    },
  },

  origin: {
    contributors: ["Jakob Nielsen", "Rolf Molich"],
    period: "1990, Technical University of Denmark and Bellcore era",
    problem:
      "Most development teams could not afford formal usability testing. Nielsen and Molich wanted a cheap method that developers and designers could learn quickly and apply throughout development.",
    narrative: [
      "Nielsen and Molich presented heuristic evaluation at CHI '90, using nine dialogue principles and four experiments on evaluator performance {{src:nielsen-molich-1990}}.",
      "Nielsen's 1992 study examined how evaluator expertise affects results {{src:nielsen-1992-heuristic}}, and his 1994 work revised the heuristics themselves {{src:nielsen-1994-heuristics}}.",
      "The method was consolidated alongside other inspection methods in *Usability Inspection Methods* (1994) {{src:nielsen-mack-1994}}.",
    ],
  },

  application: {
    summary: [
      "Heuristic evaluation is best used **early and often**: on wireframes, prototypes and live products, before user testing, as a release quality gate, or to audit a competitor. It is a complement to, never a substitute for, research with users.",
    ],
    web: [
      "Audit key journeys (search, sign-up, checkout) task by task.",
      "Include responsive breakpoints and error states, which reviewers often skip.",
    ],
    mobile: [
      "Evaluate on real devices, not desktop emulators, to catch touch-target and gesture problems.",
      "Add platform conventions (Apple HIG, Material) to the evaluation brief.",
    ],
    enterprise: [
      "Recruit at least one evaluator with domain knowledge — generic reviewers miss domain-specific problems.",
      "Focus on high-frequency expert tasks as well as first-time use.",
    ],
    services: [
      "Extend the evaluation across channels — emails, letters and call scripts often violate the same heuristics as the screens.",
    ],
    steps: [
      "Define scope, users, tasks and heuristic set.",
      "Recruit three to five evaluators, including a domain expert if possible.",
      "Brief evaluators identically; time-box independent sessions (≈1–2 hours).",
      "Each evaluator records findings in a common template.",
      "Aggregate and de-duplicate findings in a joint session.",
      "Collect independent severity ratings and average them.",
      "Report findings by severity, with evidence and suggested directions; flag those needing user validation.",
    ],
  },

  method: {
    procedure: [
      "Prepare a brief describing target users, key tasks, platform, scope and the heuristic set.",
      "Each evaluator independently inspects the interface, usually in two passes (flow, then detail).",
      "Each evaluator records findings: location, description, heuristic violated, evidence, suggested direction.",
      "The team aggregates findings into a de-duplicated master list.",
      "Evaluators independently rate the severity of every master-list problem (0–4); ratings are averaged.",
      "Findings are reported, prioritised and — for uncertain or high-impact ones — validated with users.",
    ],
    participants: "Three to five evaluators (usability specialists; ideally at least one with domain expertise). No end users.",
    duration: "About 1–2 hours per evaluator for inspection, plus 1–3 hours for aggregation and rating; a few days end to end.",
    inputs: ["Prototype or live interface", "User and task description", "Heuristic set", "Findings template"],
    outputs: ["Prioritised list of usability problems with severity ratings", "Evidence (screenshots)", "Suggested fix directions", "Questions for user research"],
    purpose: "evaluative",
    data: "qualitative",
  },

  whenToUse: [
    "Early in design, on wireframes or prototypes, to remove obvious problems before testing.",
    "When budget or time rules out user testing for a given iteration.",
    "As a recurring quality check on releases or design-system components.",
    "To audit a competitor or legacy product quickly.",
  ],
  whenNotToUse: [
    "As the only evidence for major product decisions — validate with users.",
    "When evaluators know little about the users, domain or tasks and no domain expert is available.",
    "To measure usability or compare designs quantitatively (problem counts are unstable).",
    "For problems rooted in users' goals, motivations or real-world context, which inspectors cannot observe.",
  ],
  advantages: [
    "Fast, inexpensive and needs no participants.",
    "Can be applied to early, low-fidelity designs.",
    "Produces explanations (the violated principle) alongside problems.",
    "Trains teams in usability thinking.",
  ],
  limitations: [
    "Evaluator effect — different evaluators find different problems.",
    "Produces false positives and misses problems only users reveal.",
    "Quality depends on evaluator expertise and domain knowledge.",
    "Tends to over-report minor, surface-level issues.",
    "Severity ratings are subjective and unreliable from a single rater.",
  ],
  misconceptions: [
    {
      myth: "One expert reviewer is enough.",
      reality:
        "Single evaluators find only a minority of problems; independent evaluation by three to five people, then aggregation, is the core of the method.",
    },
    {
      myth: "Heuristic evaluation is a cheaper form of usability testing.",
      reality:
        "It is a different kind of evidence. Testing observes real users; heuristic evaluation predicts problems from expert judgment. Each finds problems the other misses.",
    },
    {
      myth: "The more problems found, the better the evaluation.",
      reality:
        "Long lists of low-severity findings can bury the problems that matter. Quality is measured by the accuracy, severity and actionability of findings.",
    },
  ],

  relations: [
    { target: "nielsen-usability-heuristics", type: "derived-from", note: "The method was created together with, and most often uses, Nielsen's heuristics." },
    { target: "cognitive-walkthrough", type: "contrasts-with", note: "Both are inspection methods; the walkthrough is task- and theory-driven and focused on learnability, heuristic evaluation is principle-driven and broader." },
    { target: "usability-testing", type: "complementary-to", note: "Inspection finds predicted problems cheaply; testing confirms them and reveals problems experts miss." },
    { target: "shneiderman-golden-rules", type: "related-to", note: "Shneiderman's rules can serve as an alternative heuristic set." },
    { target: "affinity-mapping", type: "related-to", note: "Affinity mapping is commonly used to aggregate findings from multiple evaluators." },
    { target: "accessibility-audits", type: "contrasts-with", note: "Accessibility audits inspect against WCAG success criteria — a normative standard — rather than broad heuristics." },
  ],

  exercises: [
    {
      id: "heuristic-evaluation-ex-run",
      kind: "assignment",
      level: "intermediate",
      title: "Run a mini heuristic evaluation",
      prompt: [
        "Choose a public website's sign-up or checkout flow. Write a half-page brief (users, tasks, scope). Evaluate it alone for 45 minutes using Nielsen's heuristics, recording at least eight findings in a template.",
        "Ask a colleague to do the same independently, then merge your lists and compare: how many problems did both of you find?",
      ],
      deliverable: "Brief, two independent finding lists, a merged master list with averaged severity ratings, and an overlap count.",
      criteria: [
        "Findings are specific (location, observation, heuristic, evidence)",
        "Severity ratings use the 0–4 scale with reasons",
        "Reflection on the overlap demonstrates understanding of the evaluator effect",
      ],
    },
    {
      id: "heuristic-evaluation-ex-rewrite",
      kind: "critique",
      level: "beginner",
      title: "Improve weak findings",
      prompt: [
        "Rewrite these findings so they are specific and actionable: (a) 'The navigation is confusing.' (b) 'Bad error messages.' (c) 'The design looks cluttered.'",
      ],
      deliverable: "Three rewritten findings using the template fields.",
      criteria: ["Each names a location and an observable problem", "Each cites a heuristic and the user impact", "Each proposes a direction, not a full redesign"],
      exampleSolution: [
        "(a) Main navigation, all pages: the labels 'Solutions' and 'Services' overlap in meaning, so users cannot predict which contains pricing (Match between system and real world). Severity 3. Direction: card-sort the navigation labels with users.",
        "(b) Sign-up form, password field: on submission the error 'Invalid input' appears at the top of the form, without saying which rule failed (Help users recognise, diagnose and recover from errors). Severity 3. Direction: inline message naming the unmet rule.",
        "(c) Dashboard home: six promotional banners compete with the account balance for attention (Aesthetic and minimalist design). Severity 2. Direction: reduce to one contextual promotion below key account information.",
      ],
    },
    {
      id: "heuristic-evaluation-ex-plan",
      kind: "scenario",
      level: "advanced",
      title: "Design a validated inspection programme",
      prompt: [
        "Your organisation wants to replace quarterly usability tests with monthly heuristic evaluations to save money. Write a recommendation that explains the risks, proposes a mixed programme, and describes how you would measure false positives and misses over six months.",
      ],
      deliverable: "A one-page recommendation.",
      criteria: ["Explains the evaluator effect and false positives", "Proposes comparing inspection findings with test findings", "Gives a realistic cadence and budget logic"],
    },
  ],

  quiz: [
    {
      id: "heuristic-evaluation-q-independent",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why should evaluators in a heuristic evaluation work independently before combining results?",
      options: [
        { text: "Because different evaluators notice different problems, and discussing early would make their findings converge", correct: true, explanation: "Independent inspection maximises the variety of problems found; aggregation then combines them." },
        { text: "Because the heuristics forbid collaboration", correct: false, explanation: "The heuristics are design principles; they say nothing about how evaluators collaborate." },
        { text: "Because it shortens the evaluation", correct: false, explanation: "Independence does not save time; aggregation adds a step." },
        { text: "Because severity ratings must be identical", correct: false, explanation: "Ratings are collected independently precisely because they differ; they are averaged." },
      ],
      explanation: "Each evaluator finds only part of the problem set, so independence followed by aggregation is the core of the method.",
    },
    {
      id: "heuristic-evaluation-q-evidence",
      kind: "true-false",
      level: "intermediate",
      prompt: "A problem found in heuristic evaluation is confirmed evidence that users will experience it.",
      options: [
        { text: "True", correct: false, explanation: "Inspection findings are expert predictions and include false positives." },
        { text: "False", correct: true, explanation: "Findings are predictions; high-impact or uncertain ones should be validated with users." },
      ],
      explanation: "Heuristic evaluation is an inspection method; it does not observe users.",
      revise: "usability-testing",
    },
    {
      id: "heuristic-evaluation-q-severity",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "On Nielsen's severity scale, what does a rating of 4 mean?",
      options: [
        { text: "Cosmetic problem — fix if time allows", correct: false, explanation: "That is a 1." },
        { text: "Major usability problem — high priority", correct: false, explanation: "That is a 3." },
        { text: "Usability catastrophe — must fix before release", correct: true, explanation: "4 is the top of the 0–4 scale." },
        { text: "Not a usability problem", correct: false, explanation: "That is a 0." },
      ],
      explanation: "The scale combines frequency, impact and persistence; averaged independent ratings are more reliable than one rater's judgment.",
    },
    {
      id: "heuristic-evaluation-q-expertise",
      kind: "scenario",
      level: "advanced",
      prompt:
        "You are evaluating clinical prescribing software. Your team has three experienced UX designers with no healthcare background. What is the most important change to the plan?",
      options: [
        { text: "Add more UX designers to reach five evaluators.", correct: false, explanation: "More generic evaluators help less than domain expertise for domain-specific problems." },
        { text: "Include an evaluator with clinical and usability expertise (a 'double expert') and brief everyone on clinical tasks.", correct: true, explanation: "Double experts find more problems, especially domain-specific ones — critical in safety-related contexts." },
        { text: "Skip severity ratings to save time.", correct: false, explanation: "Severity is essential for prioritising fixes in safety-critical software." },
        { text: "Replace Nielsen's heuristics with Shneiderman's rules.", correct: false, explanation: "Changing the heuristic set does not compensate for missing domain knowledge." },
      ],
      explanation: "Evaluator expertise, especially domain expertise, strongly affects what an inspection can find.",
    },
  ],

  flashcards: [
    { id: "heuristic-evaluation-fc-1", front: "Core steps of heuristic evaluation", back: "Brief → independent inspection → aggregation → independent severity ratings (averaged) → report & validate." },
    { id: "heuristic-evaluation-fc-2", front: "Recommended number of evaluators", back: "Three to five, working independently; single evaluators find only a minority of problems." },
    { id: "heuristic-evaluation-fc-3", front: "The evaluator effect", back: "Evaluators applying the same method to the same interface find markedly different problems (Hertzum & Jacobsen, 2001)." },
  ],

  references: [
    { source: "nielsen-molich-1990", role: "primary", note: "Introduction of the method and evaluator aggregation experiments." },
    { source: "nielsen-1992-heuristic", role: "primary", note: "Effect of evaluator expertise; double experts." },
    { source: "hertzum-jacobsen-2001", role: "primary", note: "Evaluator effect across inspection and test methods." },
    { source: "nielsen-landauer-1993", role: "primary", note: "Problem-discovery model applied to evaluators." },
    { source: "gray-salzman-1998", role: "primary", note: "Validity of evaluation-method comparison studies." },
    { source: "nielsen-1994-heuristics", role: "further", note: "Revision of the heuristic set." },
    { source: "nielsen-mack-1994", role: "explanatory", note: "Inspection methods handbook." },
    { source: "nielsen-1993", role: "explanatory", note: "Discount usability engineering." },
    { source: "nielsen-severity-ratings", role: "explanatory", note: "0–4 severity scale and factors." },
    { source: "nielsen-1995-problems-found", role: "explanatory", note: "Probability of finding major vs. minor problems." },
    { source: "moran-gordon-2023", role: "explanatory", note: "Current practitioner procedure." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Peer-reviewed studies support the method's cost-effectiveness for finding many problems and the benefit of multiple and expert evaluators. The same literature documents a strong evaluator effect and false positives, so findings are predictions with limited reliability — they do not measure usability and should be validated with users for consequential decisions.",

  lab: "heuristic-report-lab",
  guide: { id: "nielsen-heuristics", anchor: "process", label: "The method step by step, severity rating and a 12-finding case study" },

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
