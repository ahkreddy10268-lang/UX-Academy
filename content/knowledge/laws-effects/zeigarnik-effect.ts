import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "zeigarnik-effect",
  slug: "zeigarnik-effect",
  title: "Zeigarnik Effect",
  alternateNames: ["Zeigarnik phenomenon", "Interrupted-task recall effect"],
  summary:
    "The claim that interrupted tasks are remembered better than completed ones. A 2025 meta-analysis found no general memory advantage, but a fairly consistent tendency to resume interrupted tasks. Design for resumption and honest saved state, not for a contested memory effect.",
  definition:
    "The **Zeigarnik effect** is the proposed advantage in remembering interrupted or unfinished tasks over completed ones. Bluma Zeigarnik reported it in her 1927 dissertation in Kurt Lewin's group in Berlin, where participants recalled about twice as many interrupted as completed tasks {{src:zeigarnik-1927}} {{src:macleod-2020}}. Later research has not supported a general advantage: a 2025 meta-analysis found that interrupted and completed tasks are recalled about equally (a ratio of 0.99), while people did tend to **resume** interrupted tasks, the separate **Ovsiankina effect** {{src:ghibellini-meier-2025}} {{src:ovsiankina-1928}}.",
  primaryType: "concept",
  secondaryTypes: [],
  domain: "laws-effects",
  subcategory: "memory-attention-effects",
  tags: ["Zeigarnik effect", "Ovsiankina effect", "interrupted tasks", "task resumption", "unfulfilled goals", "replication", "saved state", "reminders", "persuasion ethics"],
  difficulty: "intermediate",
  disciplines: ["Memory research", "Motivation psychology", "History of psychology", "Interaction design"],
  learningObjectives: [
    "Distinguish the Zeigarnik effect (better recall of interrupted tasks), the Ovsiankina effect (resuming interrupted tasks) and unfulfilled-goal activation (persistent goal-related thought), and say which one a given claim or design relies on.",
    "Summarise the replication history and the 2025 meta-analytic evidence, and explain which conditions (interruption, involvement, experimental demands, individual differences, measurement) the recall effect seems to depend on.",
    "Design resumable flows with saved state, a clear next step and controllable reminders, and reject designs that create artificial incompletion or anxiety to drive engagement.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "In 1927 Bluma Zeigarnik gave adults a series of short tasks, such as winding thread, folding paper, multiplying numbers and drawing a vase, and interrupted about half of them before they were finished. Asked straight afterwards which tasks they remembered, people named about twice as many interrupted tasks as finished ones {{src:macleod-2020}}. That result became known as the **Zeigarnik effect** {{src:zeigarnik-1927}}.",
        "The explanation came from her supervisor Kurt Lewin's theory: an intention creates a kind of tension that is released when the action is completed, so an unfinished task stays active in mind {{src:macleod-2020}}. A colleague of Zeigarnik's, Maria Ovsiankina, showed a related but different thing in 1928: people given a quiet moment after an interruption tended to **go back and finish** the task {{src:ovsiankina-1928}} {{src:macleod-2020}}.",
        "The memory claim did not hold up well. Many later studies failed to find it, and some found the reverse {{src:macleod-2020}}. A 2025 review of the whole literature concluded that there is no general memory advantage for unfinished tasks, but that people do generally tend to resume them {{src:ghibellini-meier-2025}}. So the useful lesson for design is about resuming work, not about remembering it.",
      ],
      analogy:
        "Leaving a book face down at chapter seven does not make you remember chapter seven better than the chapters you finished. But when you next pick it up, you are likely to carry on from where you stopped. The second tendency is the better-supported one.",
      everydayExamples: [
        "Returning to a half-written email saved as a draft.",
        "Picking a crossword back up after lunch.",
        "Thinking about an unfinished work task in the evening.",
        "Seeing 'Continue where you left off' on a course or video service.",
      ],
      vocabulary: [
        { term: "Zeigarnik effect", meaning: "The proposed advantage in remembering interrupted tasks over completed ones. Contested." },
        { term: "Ovsiankina effect", meaning: "The tendency to resume an interrupted task when the chance arises." },
        { term: "Interrupted-task paradigm", meaning: "The experimental method: give several tasks, interrupt some, then measure recall or resumption." },
        { term: "Unfulfilled-goal activation", meaning: "Goal-related thoughts and ideas staying active in mind while a goal remains incomplete." },
        { term: "Rumination", meaning: "Repetitive, often unwanted thinking about something, such as unfinished work during time off." },
        { term: "Replication", meaning: "Repeating a study to see whether the same result appears again." },
      ],
    },
    intermediate: {
      explanation: [
        "**Seven things that are often merged.** (1) The **Zeigarnik effect** is about recall of interrupted tasks {{src:zeigarnik-1927}}. (2) The **Ovsiankina effect** is about resuming them {{src:ovsiankina-1928}}. (3) **Unfulfilled-goal activation** is about goal-related thoughts and word accessibility persisting while a goal is open {{src:masicampo-baumeister-2011-plans}}. (4) **Task resumption** in a product is a behaviour; it can happen without any memory advantage. (5) **Rumination** about unfinished work during time off is a recovery problem studied in workplaces {{src:wendsche-weigelt-syrek-2026}}. (6) **Planning** can reduce some effects of an unfulfilled goal without completing it {{src:masicampo-baumeister-2011-plans}}. (7) **Open-loop UX patterns** (progress prompts, incomplete profiles, 'continue where you left off') are design conventions; academy interpretation: they are not evidence that the 1927 memory effect applies to interfaces.",
        "**What the meta-analysis found.** Ghibellini and Meier gathered 59 publications using Zeigarnik's and Ovsiankina's method. Across 38 publications, the ratio of interrupted to completed tasks recalled was 0.99, and it stayed 0.99 without Zeigarnik's own study; interrupted tasks made up 49.16% of the tasks people recalled. Where an effect size could be computed (8 publications), it was small, d_z = 0.15 {{src:ghibellini-meier-2025}}. For resumption, the weighted rate was 67.00% across 21 publications, 66.79% without Ovsiankina's study {{src:ghibellini-meier-2025}}. These figures come from laboratory tasks; they are not a prediction of how many users will return to an abandoned form.",
        "**Why results vary.** The meta-analysis found interrupted tasks recalled slightly less well in achievement-oriented, test-like settings (ratio 0.88), about equally in neutral ones (0.96) and slightly better in relaxed ones (1.07) {{src:ghibellini-meier-2025}}. Zeigarnik herself reported large individual differences and a bigger advantage for 'ambitious' participants, and her advantage disappeared when recall was delayed by a day {{src:macleod-2020}}. Seifert and Patalano found completed problems remembered better when interrupted ones had received less processing time, but unsolved problems remembered better when people abandoned them at their own impasse with time held constant {{src:seifert-patalano-1991}}. How tasks are interrupted, how involved people are, what the experimenter's manner implies and how recall is measured all change the outcome.",
        "**Unfinished goals and the mind.** In laboratory studies with undergraduates, an unfulfilled goal produced intrusive thoughts during an unrelated reading task, made goal-related words more accessible and worsened anagram performance; making a specific plan for the goal removed these effects {{src:masicampo-baumeister-2011-plans}}. In other studies by the same authors, an unfulfilled goal impaired tasks that need executive functions but not a general-knowledge test, and returning to fulfil the goal removed the interference {{src:masicampo-baumeister-2011-executive}}. This concerns attention and thought, not the recall of task lists.",
      ],
      howItWorks: [
        "A person starts a task with an intention to finish it.",
        "The task is interrupted, by someone else, by an obstacle, or by the person reaching an impasse {{src:seifert-patalano-1991}}.",
        "Recall of that task afterwards may be better, the same or worse than for finished tasks, depending on the situation, the person and the measure {{src:ghibellini-meier-2025}}.",
        "Given an opportunity, the person often returns to the task {{src:ghibellini-meier-2025}}; while it stays open, related thoughts may persist {{src:masicampo-baumeister-2011-plans}}.",
        "A concrete plan for when and how to continue can reduce those persistent thoughts without the task being finished {{src:masicampo-baumeister-2011-plans}}.",
      ],
      implementation: [
        "Preserve unfinished work automatically and say so ('Draft saved'), so leaving costs nothing.",
        "When people return, show where they stopped and the single next step, not the whole task again.",
        "Make remaining work and completion status legible in text: '3 of 5 sections done; next: add photos'.",
        "Let people set or decline reminders, choose when, and turn them off; academy interpretation: since planning reduced intrusive thoughts in the laboratory {{src:masicampo-baumeister-2011-plans}}, offering 'Remind me tomorrow at 9' may help more than repeated nudges.",
        "Make it easy to pause, leave, discard or finish. Do not split a short task to keep it artificially unfinished.",
        "Do not convey status by colour or animation alone.",
      ],
      scenarios: [
        "Illustrative scenario: a benefits application takes 40 minutes and asks for documents people rarely have to hand. Saving each section, showing 'Next: upload proof of address' on return, and letting people choose a reminder date turns an interruption into a planned pause.",
        "Illustrative scenario: a social app shows a profile '60% complete' with a pulsing red badge and daily notifications. The incompleteness was created by the app, the reminders cannot be scheduled, and nothing the user wants depends on the missing fields. This uses the language of unfinished tasks to drive engagement.",
        "Illustrative scenario: a team's project tool highlights 'unfinished' items in a summary sent every evening. Research associates unfinished work tasks with more work-related thought during time off {{src:wendsche-weigelt-syrek-2026}}; a design that lets people schedule the next step for the morning, or mutes evening summaries, respects recovery.",
      ],
    },
    advanced: {
      explanation: [
        "**The original study, read closely.** In Zeigarnik's first experiment, 32 adults each did 22 tasks; she interrupted half when the participant seemed most engrossed, then asked for immediate recall. The ratio of interrupted to completed tasks recalled was 1.9, and three further experiments (15 adults, 47 adults in a group, 45 children) gave 2.0, 1.9 and 2.1 {{src:macleod-2020}}. The effect was absent after a one-day delay, and she stressed that the strength of the 'tension systems' varied greatly between individuals {{src:macleod-2020}}. The theory was Lewin's field theory, and the motivating story was a waiter who could recall what a table owed until it had paid, and not afterwards; MacLeod notes that the anecdote exists in more than one version {{src:macleod-2020}}.",
        "**The replication record.** A 1964 review listed many failures to find the advantage; Atkinson concluded in 1953 that there is no universal pattern; Van Bergen's careful replication found 9 participants with the advantage, 5 with no difference and 20 with the reverse {{src:macleod-2020}}. Seifert and Patalano argued that the effect can appear under particular conditions of processing time, interruption and set size {{src:seifert-patalano-1991}}. The 2025 meta-analysis concluded that the recall effect lacks universal validity while resumption is a general tendency, and suggested that the recall effect may depend on conditions such as experimenter authority, situational demands and task involvement that were more common in early research {{src:ghibellini-meier-2025}}. That last point is the authors' explanation, not a tested result.",
        "**From laboratory to workplace.** A 2026 meta-analysis of field studies found that more unfinished work tasks go with more work-related thoughts during time off, especially affective rumination, both between people (ρ = .382) and within the same person over time (ρ = .247) {{src:wendsche-weigelt-syrek-2026}}. These are associations, not causal tests, and they concern thoughts and recovery, not recall. Their authors frame the work as an application of Zeigarnik's idea; academy interpretation: the evidence is closer to unfulfilled-goal activation than to the 1927 memory claim.",
        "**Comparisons.** The [[goal-gradient-effect|goal-gradient effect]] concerns effort as a goal approaches, not memory for interrupted tasks. The [[serial-position-effect|serial position effect]] concerns recall by position in a list, a well-replicated pattern; the Zeigarnik effect concerns recall by completion status and is contested. The [[von-restorff-effect|von Restorff effect]] came from the same Berlin era and Gestalt framework {{src:macleod-2020}}. The [[working-memory-model|working memory model]] and [[cognitive-load-theory|cognitive load theory]] give a way to think about why open goals might compete with current tasks for limited executive resources, consistent with the interference findings {{src:masicampo-baumeister-2011-executive}}.",
        "**Ethics.** Popular advice uses the 'Zeigarnik effect' to justify open loops: unfinished checklists, partial progress, cliffhanger notifications. Academy position: the evidence does not support a general memory pull of unfinished tasks, and the better-supported findings (resumption, persistent thought, rumination) argue for care. Creating incompleteness that serves the product rather than the person, or reminders people cannot schedule or stop, is a [[deceptive-patterns|deceptive pattern]] in spirit even when no single screen lies.",
      ],
      evidence: [
        "Original dissertation experiments: interrupted tasks recalled about twice as often as completed ones (ratios 1.9–2.1 across four experiments), not after a one-day delay; large individual differences {{src:zeigarnik-1927}} {{src:macleod-2020}}. Original not read; figures as reported by MacLeod.",
        "Historical review of failures: many studies failed to find the advantage; Van Bergen's replication found more participants with the reverse pattern (20) than with the advantage (9) {{src:macleod-2020}}. Read in full.",
        "Meta-analysis of 59 publications: recall ratio 0.99 (38 publications), d_z = 0.15 (8 publications); resumption rate 67.00% (21 publications); recall varied with experimental atmosphere {{src:ghibellini-meier-2025}}. Read in full.",
        "Two experiments with word problems: completed problems recalled better when interrupted ones had less processing time; unsolved problems recalled better after self-generated impasses {{src:seifert-patalano-1991}}. Read in full.",
        "Laboratory studies with undergraduates: unfulfilled goals caused intrusive thoughts and goal accessibility, removed by specific plans {{src:masicampo-baumeister-2011-plans}}; unfulfilled goals impaired executive-function tasks {{src:masicampo-baumeister-2011-executive}}. Read in part; one research group.",
        "Meta-analysis of field studies: unfinished work tasks associated with off-job work-related thoughts, strongest for affective rumination {{src:wendsche-weigelt-syrek-2026}}. Abstract only; correlational.",
      ],
      debates: [
        "**Does the effect exist?** The original results were strong and consistent {{src:macleod-2020}}; pooled later evidence shows no general recall advantage {{src:ghibellini-meier-2025}}. One reading is that the effect is real only under certain conditions {{src:seifert-patalano-1991}}; another is that early results reflected situational features of the research rather than a general property of memory {{src:ghibellini-meier-2025}}.",
        "**What explains the variation?** Candidates include the experimental atmosphere and experimenter authority, task involvement, achievement motivation and individual differences, processing time and the way interruption occurs {{src:ghibellini-meier-2025}} {{src:seifert-patalano-1991}}. The meta-analysis found little difference by achievement motivation (ratios 1.00, 0.92, 0.96) {{src:ghibellini-meier-2025}}.",
        "**Is rumination the same phenomenon?** Field research uses Zeigarnik's name for links between unfinished work and off-job thinking {{src:wendsche-weigelt-syrek-2026}}, but it measures thought, not recall, and cannot establish cause.",
      ],
      alternativeModels: [
        "**Lewin's tension systems**: an intention creates tension released by completion; open tensions keep tasks active {{src:macleod-2020}}.",
        "**Situational account**: the recall advantage depends on experimental demands, authority and involvement, which were more common historically {{src:ghibellini-meier-2025}}.",
        "**Processing and impasse account**: differences in time spent and self-generated impasses, rather than interruption itself, explain when unsolved problems are better remembered {{src:seifert-patalano-1991}}.",
        "**Unfulfilled-goal activation**: open goals keep related thoughts accessible and can interfere with executive tasks until fulfilled or planned for {{src:masicampo-baumeister-2011-plans}} {{src:masicampo-baumeister-2011-executive}}.",
      ],
    },
  },

  origin: {
    contributors: ["Bluma Zeigarnik", "Kurt Lewin", "Maria Ovsiankina"],
    period: "Dissertation research in Berlin, 1927 (recall) and 1928 (resumption); meta-analysis 2025",
    problem:
      "Whether an intention that is not carried out leaves something active in the mind, tested by asking which tasks people remember after some are interrupted.",
    narrative: [
      "Zeigarnik's dissertation, supervised by Kurt Lewin within the Gestalt tradition, tested a prediction of Lewin's field theory with a series of interrupted-task experiments {{src:zeigarnik-1927}} {{src:macleod-2020}}. Ovsiankina, in the same laboratory, showed in 1928 that interrupted tasks tend to be resumed {{src:ovsiankina-1928}} {{src:macleod-2020}}.",
      "The recall result became famous, but later studies produced mixed and often reversed results {{src:macleod-2020}} {{src:seifert-patalano-1991}}. In 2025 a meta-analysis of both effects found no general recall advantage and a consistent resumption tendency {{src:ghibellini-meier-2025}}. Research on unfulfilled goals and on unfinished work and recovery continued under Zeigarnik's name {{src:masicampo-baumeister-2011-plans}} {{src:wendsche-weigelt-syrek-2026}}.",
    ],
    attributionNote:
      "Zeigarnik (1927) and Ovsiankina (1928) were not read (German originals); their methods and results are given as reported by MacLeod (2020) and Ghibellini and Meier (2025), both read in full. The waiter anecdote is a story about the origin, reported in more than one version. Wendsche et al. (2026) was read as an abstract; the two Masicampo and Baumeister papers were read in part. A 2026 study of a 'visual Zeigarnik effect' and its published correction were not used.",
  },

  application: {
    summary: [
      "Design for resumption, not for a memory effect: save state, show the next step, make status legible and let people control when they are reminded. The evidence supports people returning to interrupted work, and suggests unfinished goals can occupy the mind, so the responsible goal is to make pausing safe and returning easy, not to keep people feeling unfinished.",
      "Five checks for an 'unfinished' pattern (academy checklist): (1) Is the incompleteness real and useful to the person? (2) Is work saved and is that stated? (3) Is the next step clear on return? (4) Can reminders be scheduled, changed and turned off? (5) Can the person discard or finish easily?",
    ],
    web: [
      "Long forms and applications: save each section, show 'Saved' and a summary of what is left, and return people to the next unanswered question.",
      "Learning platforms: 'Continue lesson 4' with a short recap is a resumption aid; avoid labelling every unstarted course as 'unfinished'.",
    ],
    mobile: [
      "Drafts and carts: keep them, say how long they are kept, and let people clear them in one step.",
      "Notifications: offer 'Remind me' with a chosen time instead of repeated nudges; never imply an action is pending when it is optional.",
    ],
    enterprise: [
      "Work tools: let people end the day by noting the next step for each open item, an application of plan-making findings from the laboratory {{src:masicampo-baumeister-2011-plans}} that has not been tested in software; avoid evening digests of unfinished work by default {{src:wendsche-weigelt-syrek-2026}}.",
    ],
    services: [
      "Case-based services (claims, applications, support): show which stage a case is in and what the person needs to do next, if anything, so waiting is not mistaken for unfinished work on their side.",
    ],
    steps: [
      "List every place the product shows or creates something 'unfinished': drafts, carts, profiles, progress, streaks, reminders.",
      "For each, answer the five checks and note who benefits if the item stays open.",
      "Remove artificial incompleteness and unschedulable reminders first.",
      "Add saved state, next-step guidance and reminder controls.",
      "Test with people: measure successful resumption, time to resume, errors after resuming, and reported stress or annoyance, not only return rate.",
    ],
  },

  whenToUse: [
    "Designing flows that people may not finish in one sitting.",
    "Reviewing reminders, progress cues and incomplete states for honesty and control.",
    "Teaching why a famous psychological claim should be checked before it is applied.",
  ],
  whenNotToUse: [
    "As evidence that unfinished items are remembered better: no general memory advantage was found {{src:ghibellini-meier-2025}}.",
    "To justify open loops, cliffhangers or artificial incompletion that serve engagement rather than the person.",
    "To predict a resumption rate for a product from the laboratory figure of about two in three {{src:ghibellini-meier-2025}}.",
    "To claim that people feel compelled to finish every incomplete task: individual differences are large {{src:macleod-2020}}.",
  ],
  advantages: [
    "Shows clearly how a famous finding can fail to generalise, and how to separate recall, resumption and goal activation.",
    "Points to well-supported design goals: saved state and easy resumption {{src:ghibellini-meier-2025}}.",
    "Connects interface patterns to wellbeing evidence about unfinished work and rumination {{src:wendsche-weigelt-syrek-2026}}.",
  ],
  limitations: [
    "The central recall claim is contested; the pooled ratio is about 0.99 {{src:ghibellini-meier-2025}}.",
    "The resumption evidence is from laboratory paradigms with heterogeneous measures; no common baseline rate could be computed {{src:ghibellini-meier-2025}}.",
    "Plan-making and interference findings come from laboratory studies with undergraduates in one research group {{src:masicampo-baumeister-2011-plans}}.",
    "Workplace evidence is correlational {{src:wendsche-weigelt-syrek-2026}}.",
    "The original 1927 and 1928 papers were not read for this entry.",
  ],
  misconceptions: [
    {
      myth: "People always remember unfinished tasks better than finished ones.",
      reality:
        "A meta-analysis found interrupted and completed tasks recalled about equally (0.99) {{src:ghibellini-meier-2025}}, and many studies found the reverse {{src:macleod-2020}}.",
    },
    {
      myth: "The Zeigarnik effect explains why people come back to unfinished tasks.",
      reality:
        "Coming back is the Ovsiankina effect, a different and better-supported finding {{src:ovsiankina-1928}} {{src:ghibellini-meier-2025}}.",
    },
    {
      myth: "About 67% of users will return to an unfinished task.",
      reality:
        "That is a weighted rate from laboratory resumption studies with varied methods {{src:ghibellini-meier-2025}}, not a statistic for digital products.",
    },
    {
      myth: "Leaving something unfinished is a good way to keep people engaged.",
      reality:
        "The evidence does not support a general memory pull, and unfinished work is associated with more rumination during time off {{src:wendsche-weigelt-syrek-2026}}. Engagement gained that way may cost the person.",
    },
    {
      myth: "The only way to stop thinking about an unfinished goal is to finish it.",
      reality:
        "In laboratory studies, making a specific plan removed intrusive thoughts and goal accessibility without completion {{src:masicampo-baumeister-2011-plans}}.",
    },
  ],

  relations: [
    { target: "goal-gradient-effect", type: "contrasts-with", note: "Goal-gradient concerns effort or motivation as a goal approaches; Zeigarnik originally concerns recall of interrupted tasks." },
    { target: "serial-position-effect", type: "contrasts-with", note: "Both are memory effects: serial position is about recall by list position and replicates well; Zeigarnik is about recall by completion status and is contested." },
    { target: "von-restorff-effect", type: "related-to", note: "Another eponymous memory effect from the same Berlin era and Gestalt framework." },
    { target: "working-memory-model", type: "related-to", note: "Open goals may compete with current tasks for limited executive resources." },
    { target: "cognitive-load-theory", type: "related-to", note: "Unfinished goals can add to the load on attention while people do something else." },
    { target: "deceptive-patterns", type: "applied-in", note: "Artificial incompleteness and unschedulable reminders misuse the idea to drive engagement." },
    { target: "user-autonomy", type: "related-to", note: "People should control when they are reminded and be able to pause, discard or finish." },
  ],

  exercises: [
    {
      id: "zeigarnik-ex-sort",
      kind: "scenario",
      level: "beginner",
      title: "Recall, resumption or goal activation?",
      prompt: [
        "Classify each statement and say whether the evidence supports it: (a) 'People remember the forms they abandoned better than the ones they submitted.' (b) 'People often go back to a draft they were interrupted in.' (c) 'An unfinished report kept popping into my head during dinner.' (d) 'Our 60%-complete profile badge works because of the Zeigarnik effect.'",
      ],
      deliverable: "Four labelled answers with one sentence of evidence each.",
      criteria: [
        "Identifies (a) as the Zeigarnik recall claim and notes the meta-analytic evidence against a general advantage",
        "Identifies (b) as the Ovsiankina effect",
        "Identifies (c) as unfulfilled-goal activation or rumination",
        "Identifies (d) as a design pattern whose justification is not supported by the recall evidence",
      ],
    },
    {
      id: "zeigarnik-ex-critique",
      kind: "critique",
      level: "intermediate",
      title: "Critique a 'Zeigarnik' growth tactic",
      prompt: [
        "Illustrative scenario: a growth team proposes splitting a 3-step sign-up into 6 steps, ending each session at step 4 with a notification 'You're almost done! Don't leave it unfinished', repeated daily until completion. The proposal cites the Zeigarnik effect.",
        "Explain what the evidence does and does not support, identify the ethical problems, and redesign the flow so that people who are interrupted can resume easily and control reminders.",
      ],
      deliverable: "A one-page critique and a redesigned flow with notification copy.",
      criteria: [
        "Separates the contested recall claim from resumption and goal activation",
        "Identifies artificial incompleteness and uncontrollable reminders as the main problems",
        "Redesign saves state, states the next step and offers scheduled, dismissible reminders",
      ],
    },
    {
      id: "zeigarnik-ex-study",
      kind: "assignment",
      level: "advanced",
      title: "Design a study of resumption in your product",
      prompt: [
        "A long application form has high abandonment. Design an evaluation comparing the current form with a version that has autosave, a 'next step' summary on return and optional scheduled reminders.",
        "Define measures for successful resumption, time to resume, errors after resumption, completion, and reported stress. Explain why the laboratory resumption rate cannot be used as a target, and how you will avoid reminders that increase pressure without helping completion.",
      ],
      deliverable: "A test plan with designs, measures, sample, analysis and an ethical decision rule.",
      criteria: [
        "Measures resumption quality and wellbeing, not only return rate",
        "Does not use the laboratory 67% as a benchmark",
        "Includes a decision rule that rejects reminder variants that raise stress without improving completion",
      ],
    },
  ],

  quiz: [
    {
      id: "zeigarnik-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "What did Zeigarnik originally claim?",
      options: [
        { text: "People recall interrupted tasks better than completed ones", correct: true, explanation: "Her 1927 experiments reported about twice as many interrupted as completed tasks recalled." },
        { text: "People always go back to finish interrupted tasks", correct: false, explanation: "Resumption is the Ovsiankina effect, reported in 1928, and it is a tendency, not a certainty." },
        { text: "People work harder as they approach a goal", correct: false, explanation: "That is the goal-gradient effect." },
        { text: "People remember the first and last items in a list best", correct: false, explanation: "That is the serial position effect." },
      ],
      explanation: "Keep the recall claim distinct from resumption and from effort near a goal.",
    },
    {
      id: "zeigarnik-q-meta",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "What did the 2025 meta-analysis by Ghibellini and Meier conclude?",
      options: [
        { text: "No general memory advantage for unfinished tasks, but a general tendency to resume them", correct: true, explanation: "The recall ratio was about 0.99, while resumption was common across 21 publications." },
        { text: "A large, universal memory advantage for unfinished tasks", correct: false, explanation: "The pooled ratio was about 0.99 and the effect size small where computable." },
        { text: "That neither recall nor resumption differs after interruption", correct: false, explanation: "Resumption was a consistent tendency." },
        { text: "That the effect is strongest in achievement-oriented settings", correct: false, explanation: "Interrupted tasks were recalled slightly less well (0.88) in achievement-oriented settings." },
      ],
      explanation: "Recall and resumption have different evidence.",
    },
    {
      id: "zeigarnik-q-plan",
      kind: "scenario",
      level: "intermediate",
      prompt: "A user keeps thinking about an unfinished tax return. Based on the laboratory evidence, which product feature is most likely to help without forcing completion?",
      options: [
        { text: "A prompt to choose when and how to do the next step, with a reminder at that time", correct: true, explanation: "Specific plans removed intrusive thoughts and goal accessibility in laboratory studies, without the goal being completed." },
        { text: "Hourly notifications until the return is submitted", correct: false, explanation: "Repeated reminders add pressure and are not what the plan-making studies tested." },
        { text: "Hiding the draft so the user forgets it", correct: false, explanation: "Hiding work makes resumption harder and does not resolve the goal." },
        { text: "A red badge showing how much is unfinished", correct: false, explanation: "Colour-coded pressure is not a plan and may add to rumination." },
      ],
      explanation: "A concrete plan can settle an open goal for now; nagging does not.",
    },
    {
      id: "zeigarnik-q-evidence",
      kind: "critique",
      level: "advanced",
      prompt: "A designer says: 'Studies show 67% of people resume interrupted tasks, so two-thirds of our users will come back to abandoned carts.' What is the best response?",
      options: [
        { text: "67% is a weighted rate from laboratory resumption studies with varied methods and no common baseline; it cannot predict cart returns", correct: true, explanation: "The figure describes a research paradigm, not a product population." },
        { text: "Correct, because the figure comes from a meta-analysis", correct: false, explanation: "A meta-analysis of laboratory tasks does not transfer as a product statistic." },
        { text: "Wrong, because resumption has never been found", correct: false, explanation: "Resumption was the better-supported of the two effects." },
        { text: "Correct only if carts are shown in red", correct: false, explanation: "Colour is irrelevant to the evidence and status should not rely on colour." },
      ],
      explanation: "Match the population and method of the evidence to the claim.",
    },
  ],

  flashcards: [
    { id: "zeigarnik-fc-1", front: "Zeigarnik vs Ovsiankina", back: "Zeigarnik: proposed better recall of interrupted tasks (contested). Ovsiankina: tendency to resume interrupted tasks (better supported)." },
    { id: "zeigarnik-fc-2", front: "2025 meta-analysis headline", back: "59 publications: recall ratio about 0.99, no general memory advantage; resumption about 67% across 21 laboratory publications." },
    { id: "zeigarnik-fc-3", front: "Why results vary", back: "Experimental atmosphere, involvement, individual differences, processing time, how interruption happens and how recall is measured." },
    { id: "zeigarnik-fc-4", front: "Plan making and unfinished goals", back: "In laboratory studies, a specific plan removed intrusive thoughts and goal accessibility without finishing the goal." },
    { id: "zeigarnik-fc-5", front: "Responsible resumption design", back: "Save work, show the next step, legible status in text, controllable reminders, easy pause, discard or finish." },
  ],

  references: [
    { source: "zeigarnik-1927", role: "primary", note: "Original interrupted-task recall experiments; not read, reported via MacLeod (2020)." },
    { source: "ovsiankina-1928", role: "primary", note: "Original resumption research; not read, reported via MacLeod (2020) and Ghibellini and Meier (2025)." },
    { source: "ghibellini-meier-2025", role: "primary", note: "Meta-analysis of Zeigarnik and Ovsiankina effects; read in full." },
    { source: "seifert-patalano-1991", role: "primary", note: "Re-examination: conditions under which completed or unsolved problems are better recalled; read in full." },
    { source: "masicampo-baumeister-2011-plans", role: "primary", note: "Unfulfilled goals and plan making; read in part." },
    { source: "masicampo-baumeister-2011-executive", role: "primary", note: "Unfulfilled goals and executive-function tasks; abstract read." },
    { source: "wendsche-weigelt-syrek-2026", role: "primary", note: "Meta-analysis of unfinished work tasks and off-job thoughts; abstract only." },
    { source: "macleod-2020", role: "explanatory", note: "History, original experiments and replication record; read in full." },
  ],
  evidence: "contested",
  evidenceNote:
    "The original recall advantage (ratios about 1.9–2.1 in Zeigarnik's experiments, as reported by MacLeod) has a long record of failed and reversed replications, and a 2025 meta-analysis of 59 publications, read in full, found no general advantage (ratio 0.99; d_z = 0.15 where computable), with results varying by experimental atmosphere. The related tendency to resume interrupted tasks is better supported (weighted rate about 67% across 21 laboratory publications), though measures were heterogeneous and no common baseline exists. Evidence on unfulfilled-goal activation and plan making comes from laboratory studies with undergraduates in one research group; evidence on unfinished work and rumination is correlational. The 1927 and 1928 originals were not read. UX guidance on saved state, next steps and reminder control is the academy's interpretation, not a tested consequence of any of these studies.",

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
  lastVerifiedAt: "2026-11-23",
});
