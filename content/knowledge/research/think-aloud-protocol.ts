import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "think-aloud-protocol",
  slug: "think-aloud-protocol",
  title: "Think-Aloud Protocol",
  alternateNames: ["Thinking aloud", "Think-aloud method", "Concurrent verbal protocol", "Verbal protocol analysis"],
  summary:
    "Participants say what they are thinking while they use a product, so the researcher hears expectations and misreadings at the moment they happen rather than reconstructed afterwards.",
  definition:
    "The think-aloud protocol is a **research method** in which a participant performs realistic tasks while continuously voicing what they are looking at, expecting, trying and puzzling over; the researcher records both the talk and the actions. It comes from cognitive psychology, where Ericsson and Simon argued that such reports are *data*: what a person says while working reflects what they are attending to, while instructions that demand more — such as reasons — can change the thinking or force people to infer {{src:ericsson-simon-1980}}. In usability work it is usually run **concurrently** (talking during the task), sometimes **retrospectively** (talking afterwards while watching a recording), and usually in a **relaxed** form in which the moderator also asks questions — a departure from the classic method with measurable effects on behaviour {{src:hertzum-2009-thinking-aloud}}.",
  primaryType: "method",
  secondaryTypes: ["technique"],
  domain: "research",
  subcategory: "qualitative",
  tags: ["usability testing", "verbal protocols", "moderation", "reactivity", "qualitative data", "formative evaluation"],
  difficulty: "intermediate",
  disciplines: ["UX research", "Cognitive psychology", "Human–computer interaction"],
  learningObjectives: [
    "Explain what a think-aloud report can and cannot tell you, using Ericsson and Simon's model of verbal reports.",
    "Choose between concurrent, retrospective and hybrid think-aloud for a study, and justify the choice with its costs.",
    "Moderate a session with neutral prompts, and recognise when an intervention has changed the participant's behaviour.",
    "Separate what a participant did from what they said about it when analysing a session.",
  ],
  prerequisites: ["usability-testing"],

  levels: {
    beginner: {
      explanation: [
        "When you watch someone use a website, you see what they click. You do not see why: whether they misread a label, expected something else to happen, or were simply checking. Thinking aloud asks the person to say their thoughts as they go — 'I'm looking for the delivery cost… I expected it here… maybe under Help?' — so you hear the reasoning that led to each action.",
        "The participant gets a real task ('Find out whether this jacket can be returned after 30 days'), not a tour. The researcher mostly stays quiet. If the participant falls silent, the researcher gives a short, neutral reminder such as 'Please keep talking', rather than asking leading questions or helping.",
        "What people say is evidence, not a verdict. A participant who says 'This is easy' and then fails the task has shown you a problem. The value is in the moments where talk and action disagree with what the designer expected.",
      ],
      analogy:
        "A driving instructor learns more from a learner who says 'I'm checking the mirror… the light might change… I'll slow down' than from watching the car alone. The commentary shows what the driver noticed and expected, not just where the car went.",
      everydayExamples: [
        "A participant searching a library catalogue says 'I'll try the title… no, that gave me 400 results' — the search, not the participant, is the problem.",
        "While booking a train, someone says 'I'm not sure if this price is for one way or return' — a labelling problem that click data alone would hide.",
        "On a banking app, a participant reads 'Pending' aloud and says 'so the money has gone?' — revealing a mismatch between the label and their understanding.",
      ],
      vocabulary: [
        { term: "Concurrent think-aloud", meaning: "The participant talks while doing the task." },
        { term: "Retrospective think-aloud", meaning: "The participant works silently, then talks through a recording of their session afterwards." },
        { term: "Classic think-aloud", meaning: "The moderator only reminds the participant to keep talking; no other questions." },
        { term: "Relaxed think-aloud", meaning: "The moderator also asks questions or probes during the task — common in practice." },
        { term: "Reactivity", meaning: "When the act of thinking aloud, or the moderator's prompts, changes how the participant behaves." },
      ],
    },
    intermediate: {
      explanation: [
        "**Where the words come from.** Ericsson and Simon modelled thinking aloud as a person voicing what is already in their attention. Saying it aloud should not change the course of thinking — unless the instructions demand information the person would not otherwise attend to, such as explanations of their reasons. Reports become unreliable when people are asked for information they never heeded, because they then infer rather than remember {{src:ericsson-simon-1980}}. This is the reason classic instructions ask people to *say* what they are thinking, not to *explain* it.",
        "**Practice is looser than the theory.** Boren and Ramey found that usability practice, and textbook descriptions of it, diverge from the Ericsson and Simon model that most practitioners cite; they proposed treating the session as a kind of conversation with its own rules, which can justify some interventions the classic model forbids {{src:boren-ramey-2000}}. A survey of 207 practitioners found the same divergence in instructions, practice tasks, demonstrations and interventions, and that practitioners knowingly traded some reliability for useful data in limited time {{src:mcdonald-2012-think-aloud-survey}}.",
        "**Interventions change behaviour.** In a study comparing classic thinking aloud, relaxed thinking aloud and working in silence, the classic form had little effect beyond making tasks longer, while the relaxed form changed how people searched and navigated and raised their mental workload {{src:hertzum-2009-thinking-aloud}}. In another experiment, a coaching protocol — where the moderator helped and encouraged — produced significantly higher task accuracy and higher satisfaction than the other protocols {{src:olmsted-hawala-2010}}. Coached participants did better *because of the moderator*, so their success says less about the design.",
      ],
      howItWorks: [
        "Before tasks: explain that you are testing the product, not the person; ask them to say whatever they are looking at, thinking, doing and feeling; let them practise on a neutral task (for example, counting the windows in their home).",
        "During tasks: stay quiet. After a silence of several seconds, use a neutral reminder ('Keep talking'). Do not answer questions about the interface; reflect them back ('What would you expect?').",
        "Capture the screen, the voice and, where possible, the face or hands. Note time-stamped observations: what was said, what was done, and where the two diverge.",
        "After tasks: ask any follow-up questions you held back — a short retrospective section is the place for 'why' questions, kept separate from the concurrent data.",
      ],
      implementation: [
        "Write tasks as goals with a success criterion, never as instructions that name interface elements.",
        "Decide in advance which interventions are allowed (only reminders, or also neutral probes) and use the same rules in every session.",
        "Record which sessions included unplanned help, and treat those tasks' success data with caution.",
        "Analyse in two passes: first behaviour (success, errors, paths), then talk (expectations, misreadings, confusion), linking each problem to the moment it occurred.",
      ],
      scenarios: [
        "A participant goes quiet on a payment page. The moderator says 'What are you looking at?' rather than 'Is the security code confusing?' — the first asks for what is in attention, the second plants a problem.",
        "A team needs time-on-task figures for a benchmark. They run silent sessions for timing, because thinking aloud lengthens tasks, and hold think-aloud sessions separately to find out why tasks are slow.",
        "A participant keeps asking 'Should I click this?'. The moderator replies 'What would you do if I weren't here?' and notes the hesitation as a finding, instead of answering.",
      ],
    },
    advanced: {
      explanation: [
        "**What a report can contain.** Ericsson and Simon's claim is narrow: concurrent reports of what is currently attended to are valid data; requests to explain or justify invite inference {{src:ericsson-simon-1980}}. This aligns with the older finding that people often cannot report the causes of their own judgments and instead offer plausible theories about what probably influenced them {{src:nisbett-wilson-1977}}. A participant's 'I clicked it because the button was blue' is therefore a hypothesis about themselves, not an observation. A researcher should weigh it below what was seen.",
        "**Concurrent versus retrospective.** Van den Haak, de Jong and Schellens found that both forms revealed comparable sets of problems but by different routes — more through what was said in retrospective sessions, more through what was observed in concurrent ones — and that thinking aloud while working lowered task performance {{src:van-den-haak-2003}}. Alhadreti and Mayhew, with 20 participants in each of three conditions on a university library site, found concurrent think-aloud detected more problems than retrospective, matched a hybrid of the two, showed no reactivity, and needed roughly half the evaluator time {{src:alhadreti-mayhew-2018}}. The studies disagree about reactivity. On cost, Alhadreti and Mayhew found that retrospective and hybrid sessions took about twice the testing and analysis time, because each session is effectively run twice {{src:alhadreti-mayhew-2018}}.",
        "**Analysis is where the cost lies.** Reviewing every utterance is slow. Fan and colleagues found that some categories and patterns of verbalisation are more telling of usability problems than others, and that the patterns held across physical and digital products and across audio and video {{src:fan-2019-verbalizations}}. This supports focused analysis, but not skipping the observation of behaviour.",
      ],
      evidence: [
        "Classic thinking aloud had little or no effect on behaviour apart from longer tasks; relaxed thinking aloud changed navigation behaviour and raised mental workload {{src:hertzum-2009-thinking-aloud}}.",
        "Concurrent and retrospective protocols found comparable problem sets in one study, with concurrent sessions lowering task performance {{src:van-den-haak-2003}}; in another (n = 60), concurrent found more problems than retrospective with no observed reactivity and about half the evaluator time {{src:alhadreti-mayhew-2018}}.",
        "A coaching protocol produced significantly higher task accuracy than traditional and speech-communication protocols and a silent control, and higher satisfaction than the traditional and speech-communication protocols (n = 80) {{src:olmsted-hawala-2010}}.",
        "Practitioners' instructions, demonstrations and interventions vary widely, and many knowingly accept some loss of reliability {{src:mcdonald-2012-think-aloud-survey}}.",
        "Evaluators who observe users thinking aloud detect markedly different sets of problems: across 11 studies of three evaluation methods, average agreement between any two evaluators ranged from 5 % to 65 %, so a think-aloud study analysed by one evaluator is not an authoritative list of problems {{src:hertzum-jacobsen-2001}}.",
      ],
      debates: [
        "**Classic or relaxed?** The classic method protects validity; the relaxed method gets explanations and keeps sessions moving. Boren and Ramey's speech-genre framework argues some interventions are legitimate if they follow consistent conversational rules {{src:boren-ramey-2000}}; the experimental evidence shows that what the moderator says can change both behaviour and outcomes {{src:hertzum-2009-thinking-aloud}} {{src:olmsted-hawala-2010}}.",
        "**Does talking change performance?** One comparison found concurrent thinking aloud lowered task performance {{src:van-den-haak-2003}}; another observed no reactivity {{src:alhadreti-mayhew-2018}}. Differences in tasks, participants and protocol details make the results hard to reconcile, so timing data from think-aloud sessions should not be reported as natural performance.",
        "**Is it 'the #1 usability tool'?** Nielsen has called thinking aloud perhaps the single most valuable usability method, because it is cheap, robust and flexible, while listing its unnatural situation, filtered statements and the risk of biasing users {{src:nielsen-thinking-aloud-article}}. The robustness claim holds for finding problems qualitatively; it does not extend to measurement.",
      ],
      alternativeModels: [
        "**Retrospective think-aloud** — silent task, then commentary over the recording; avoids interference during the task at roughly double the session time.",
        "**Co-discovery or constructive interaction** — two participants work together and talk to each other, which can feel more natural than a monologue.",
        "[[cognitive-walkthrough|Cognitive walkthrough]] — evaluators predict what a user would think at each step, without users; cheaper, but the reasoning is the evaluator's, not the user's.",
        "Silent observation with analytics or [[eye-tracking|eye tracking]] — measures behaviour without verbal interference, but cannot say what people expected.",
      ],
    },
  },

  origin: {
    contributors: ["K. Anders Ericsson", "Herbert A. Simon", "Ted Boren", "Judith Ramey", "Jakob Nielsen"],
    period: "Protocol analysis formalised in cognitive psychology around 1980; standard in usability practice from the late 1980s and 1990s",
    problem:
      "Psychologists needed a defensible way to study thinking as it happens. Usability practitioners later needed to know not only where people failed with an interface but what they believed was happening when they did.",
    narrative: [
      "Ericsson and Simon argued in 1980 that verbal reports are data whose production can be modelled, and specified the conditions under which they are trustworthy {{src:ericsson-simon-1980}}; a book-length account followed in *Protocol Analysis* (bibliographic record only; not read for this entry) {{src:ericsson-simon-1993}}.",
      "Usability engineering adopted thinking aloud as a cheap way to find problems with small numbers of users. Nielsen's 1993 *Usability Engineering* called it perhaps the single most valuable usability engineering method, a judgment he repeated in 2012 {{src:nielsen-thinking-aloud-article}}.",
      "By 2000 Boren and Ramey argued that practice had drifted from the theory it cited {{src:boren-ramey-2000}}, which led to experimental comparisons of protocols and moderator behaviour during the following two decades {{src:hertzum-2009-thinking-aloud}} {{src:olmsted-hawala-2010}} {{src:alhadreti-mayhew-2018}}.",
    ],
    attributionNote:
      "The theory of verbal reports is Ericsson and Simon's; no single person introduced thinking aloud into interface design, and this entry does not name one because the early adoption has not been checked against primary sources here.",
  },

  application: {
    summary: [
      "Use thinking aloud whenever you need to understand *why* people succeed or fail with a design — most often inside formative [[usability-testing|usability tests]], from paper prototypes to live products.",
    ],
    web: [
      "Find misread labels, mistrusted prices and missed calls to action on key journeys such as checkout, sign-up or search.",
      "Use remote moderated sessions with screen sharing; ask participants to keep their microphone on and talking.",
    ],
    mobile: [
      "Record the screen and the hands or touches; small screens make it harder to see where attention is, so the commentary carries more of the evidence.",
      "Expect more silences during fast gestures; schedule brief retrospective questions after each task.",
    ],
    enterprise: [
      "Test with experienced staff on their real data where possible; experienced people may say little about steps that have become routine, so watch for skipped steps rather than waiting for comments.",
    ],
    services: [
      "Apply it to forms, letters and phone scripts as well as screens: ask people to read a benefits letter aloud and say what they think it requires of them.",
    ],
    steps: [
      "Write realistic goal-based tasks with success criteria.",
      "Set the moderation rules: which prompts are allowed and which are not.",
      "Brief and practise: explain the method and let the participant warm up on a neutral task.",
      "Run tasks with minimal neutral prompts; record screen, voice and actions.",
      "Ask held-back 'why' questions after the tasks, separately from the concurrent data.",
      "Analyse behaviour and talk, linking each problem to the moment it occurred.",
    ],
  },

  method: {
    procedure: [
      "Define what you need to learn and pick tasks that exercise it; write each as a goal with a success criterion.",
      "Decide concurrent, retrospective or hybrid, and fix the intervention rules for all sessions.",
      "Introduce the session: the product is being tested, not the person; demonstrate or practise thinking aloud on a neutral task.",
      "Run each task; give only neutral reminders after silences; do not answer questions about the interface.",
      "After the tasks, ask follow-up and 'why' questions, keeping them apart from concurrent data.",
      "Analyse: code behaviour and verbalisations, link problems to evidence, rate severity, and note any sessions where moderation altered behaviour.",
    ],
    participants:
      "A handful of representative participants per round is usual for formative work; run several rounds rather than one large study. Comparisons of protocols need far larger groups (method studies have used 20 per condition).",
    duration: "Sessions of about 45–90 minutes; retrospective sessions take roughly twice as long because the participant reviews the recording.",
    inputs: ["Research questions", "Goal-based task scenarios", "Moderator script with allowed prompts", "Prototype or product", "Recording set-up", "Consent form"],
    outputs: ["Recordings and time-stamped notes", "Problems linked to quotes and observed actions", "Severity-rated findings", "Participants' expectations and vocabulary"],
    purpose: "evaluative",
    data: "qualitative",
  },

  whenToUse: [
    "To find out why people struggle with a design, not only where.",
    "In formative testing of prototypes and products, from paper sketches to live services.",
    "To hear users' own words for things — useful for labels and content.",
  ],
  whenNotToUse: [
    "When you need natural task times or performance benchmarks — thinking aloud lengthens tasks; measure silently.",
    "For very fast, highly practised or physically demanding tasks where talking interferes or experts cannot verbalise automatic steps.",
    "With participants for whom a continuous monologue is a barrier (for example some screen-reader users, who are listening to speech output) — adapt with retrospective or paired methods.",
    "To ask people what they would want or would do in future — use interviews or other methods; thinking aloud reports current attention.",
  ],
  advantages: [
    "Reveals expectations, misreadings and confusion at the moment they occur.",
    "Works with few participants and simple equipment.",
    "Applies at every stage, from paper prototypes to live systems.",
    "Recordings with participants' own words persuade teams more readily than written findings.",
  ],
  limitations: [
    "Talking is unnatural and slows people down; timing and success data from think-aloud sessions are not natural performance.",
    "Moderator prompts and help change behaviour and can inflate success and satisfaction.",
    "Participants filter or tidy their comments to appear competent.",
    "People cannot reliably report the causes of their own choices; explanations are interpretations.",
    "Analysis is slow, and different evaluators watching the same sessions report different problems.",
  ],
  misconceptions: [
    {
      myth: "Asking 'Why did you do that?' during the task gets better data.",
      reality:
        "It asks for an explanation the person may not have, and invites a plausible theory instead {{src:nisbett-wilson-1977}}. It also changes how they carry on with the task. Hold 'why' questions until after the task.",
    },
    {
      myth: "If participants say they like it, the design works.",
      reality:
        "Comments and behaviour often disagree. Successful completion and observed errors outrank stated opinions; a participant who praises a page and then fails the task has shown a problem.",
    },
    {
      myth: "Thinking aloud has no effect on what people do.",
      reality:
        "Classic thinking aloud mainly makes tasks longer, but relaxed, question-heavy moderation changes navigation behaviour and workload {{src:hertzum-2009-thinking-aloud}}, and coaching raises success and satisfaction {{src:olmsted-hawala-2010}}.",
    },
    {
      myth: "Retrospective think-aloud is always the cleaner choice.",
      reality:
        "It avoids interference during the task but depends on memory and the recording, roughly doubles session time, and in one comparison found fewer problems than concurrent think-aloud {{src:alhadreti-mayhew-2018}}.",
    },
  ],

  relations: [
    { target: "usability-testing", type: "applied-in", note: "Thinking aloud is the usual way of hearing participants' reasoning during formative usability tests." },
    { target: "cognitive-walkthrough", type: "contrasts-with", note: "A walkthrough predicts what a user would think at each step; thinking aloud records what real users actually say." },
    { target: "in-depth-interviews", type: "contrasts-with", note: "Interviews collect recollections and opinions afterwards; thinking aloud captures attention during use." },
    { target: "eye-tracking", type: "complementary-to", note: "Eye tracking shows where people looked; thinking aloud suggests what they made of it. Talking can alter gaze, so combine them with care." },
    { target: "qualitative-coding", type: "related-to", note: "Think-aloud recordings are analysed by coding verbalisations and linking them to observed actions." },
  ],

  practice: {
    dos: [
      { text: "Ask people to say what they are doing and thinking, not to explain it.", why: "Reports of what is in attention are valid data; demands for explanation make people infer instead of report {{src:ericsson-simon-1980}}.", kind: "standard" },
      { text: "Show what thinking aloud looks like before the first real task — a short demonstration or a neutral practice task.", why: "A running monologue is unnatural; Nielsen suggests a short video demo to explain what is expected {{src:nielsen-thinking-aloud-article}}, and practitioners also use practice tasks, though how they do so varies {{src:mcdonald-2012-think-aloud-survey}}.", kind: "industry" },
      { text: "Use the same small set of allowed prompts in every session, and write them in the script.", why: "Practitioners' interventions vary widely and affect reliability {{src:mcdonald-2012-think-aloud-survey}}; consistency makes sessions comparable.", kind: "team" },
      { text: "Have at least two people analyse the recordings, and reconcile their problem lists.", why: "Evaluators watching the same think-aloud sessions find markedly different problems; involving several is the simplest way to reduce the effect {{src:hertzum-jacobsen-2001}}.", kind: "team" },
      { text: "Note every time you helped or hinted, and flag that task's outcome.", why: "Coaching raises success and satisfaction, so those results describe the moderator as much as the design {{src:olmsted-hawala-2010}}.", kind: "standard" },
    ],
    donts: [
      { text: "Don't report time on task from think-aloud sessions as normal performance.", why: "Thinking aloud lengthens tasks even in its classic form {{src:hertzum-2009-thinking-aloud}}.", kind: "standard" },
      { text: "Don't answer questions about the interface during a task.", why: "An answer removes the very problem the session exists to observe; reflect the question back instead.", kind: "context" },
      { text: "Don't treat a participant's explanation of a choice as its cause.", why: "People report plausible theories about their behaviour rather than direct access to its causes {{src:nisbett-wilson-1977}}.", kind: "standard" },
    ],
    examples: [
      {
        title: "Moderator script: briefing and the only prompts allowed during tasks",
        language: "text",
        code: `BRIEFING (read as written)
We're testing this website, not you. Anything that's hard is
something we need to fix.
While you work, please say out loud whatever you're looking at,
thinking, trying or feeling, as it happens. You don't need to
explain or justify anything; just keep a running commentary.
Let's practise: tell me, out loud, how many windows there are
in your home, and how you're working it out.

ALLOWED DURING TASKS
- After ~10 s of silence:     "Please keep talking."
- If they ask how something works: "What would you expect?"
- If they ask whether to continue: "Do whatever you would do
                                    if I weren't here."

NOT ALLOWED DURING TASKS (move to after the task)
- "Why did you click that?"
- "Did you notice the filter on the left?"
- "Was that label confusing?"
- Any hint, confirmation or praise of a choice.`,
        caption:
          "The allowed prompts ask for what is in attention or hand the decision back; the forbidden ones ask for explanations, point at interface elements, or suggest a problem.",
      },
    ],
  },

  exercises: [
    {
      id: "think-aloud-protocol-ex-script",
      kind: "assignment",
      level: "beginner",
      title: "Write a briefing and a prompt list",
      prompt: [
        "You are testing a food-delivery app's checkout. Write a 100-word briefing that explains thinking aloud to a participant, including a short practice task.",
        "List up to three prompts you will allow during tasks, and three you will save for afterwards.",
      ],
      deliverable: "A briefing and two short lists of prompts.",
      criteria: [
        "Says the product, not the person, is being tested",
        "Asks for a running commentary, not explanations",
        "Includes a neutral practice task unrelated to the app",
        "Allowed prompts neither name interface elements nor suggest problems",
      ],
    },
    {
      id: "think-aloud-protocol-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Correct a moderator's transcript",
      prompt: [
        "Here is part of a session on a train-booking site. Identify each moderator turn that compromises the data, say what it does wrong, and rewrite it.",
        "P: 'OK, I need the 7:15… I'm looking for the return option.' (8 s silence)",
        "M: 'Did you see the Return tab at the top?'",
        "P: 'Oh — yes. Right. That's easy.' (selects Return) 'Hm, this price… is that per person?'",
        "M: 'Yes, it's per person. Why did you not see the tab earlier?'",
        "P: 'I suppose it's quite small and grey.'",
      ],
      deliverable: "Each problematic moderator turn, the problem, and a replacement — plus a note on how the task's success should be recorded.",
      criteria: [
        "Identifies the pointing hint ('Return tab at the top') as revealing the answer",
        "Identifies answering the price question as removing a finding",
        "Identifies the mid-task 'why' question as inviting a theory, and the reply as a hypothesis, not evidence",
        "Rewrites with neutral prompts and records the task as assisted",
      ],
      exampleSolution: [
        "Turn 1 points at the element the participant was searching for, so the task is no longer unassisted. Replace with 'Please keep talking' or, if needed, 'What are you looking for?'.",
        "Turn 2 answers an interface question, which hides a real finding (the price basis is unclear), then asks 'why' mid-task. Replace with 'What would you expect?' and save any 'why' question for after the task.",
        "'Small and grey' is the participant's theory about their own miss, not an observation; note it as a hypothesis to check (for example, against other participants' behaviour).",
        "Record the return-ticket task as completed with assistance, and log 'price basis unclear' as a finding.",
      ],
    },
    {
      id: "think-aloud-protocol-ex-choose",
      kind: "scenario",
      level: "advanced",
      title: "Choose a protocol for two studies",
      prompt: [
        "Study A: a benchmark of task time on a tax-filing service, to compare with last year's figures. Study B: an early prototype of the same service, where the team wants to know what confuses people.",
        "For each, choose silent observation, concurrent, retrospective or hybrid think-aloud, and give two reasons drawn from the evidence on reactivity and cost.",
      ],
      deliverable: "A choice and two reasons for each study, and one risk you would still need to manage.",
      criteria: [
        "Study A uses silent sessions because thinking aloud lengthens tasks",
        "Study B uses concurrent (or justifies retrospective/hybrid with its time cost)",
        "Cites the evidence on reactivity and on retrospective cost",
        "Names a remaining risk such as moderator influence or memory loss",
      ],
      exampleSolution: [
        "A: silent observation. Even classic thinking aloud lengthens tasks, and the result must be comparable with silent baselines. Collect 'why' data separately, after the measured tasks.",
        "B: concurrent think-aloud. It finds problems at about half the evaluator time of retrospective or hybrid in one comparison, and early prototypes need explanations of confusion. Risk: relaxed probing changing behaviour, so fix the allowed prompts in advance.",
      ],
    },
  ],

  quiz: [
    {
      id: "think-aloud-protocol-q-instruction",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which instruction best follows the classic think-aloud method?",
      options: [
        { text: "“Please say whatever you're looking at and thinking as you go.”", correct: true, explanation: "It asks for what is in attention, which the person can report without inferring." },
        { text: "“Explain each decision and why you made it.”", correct: false, explanation: "Explanations require information the person may not have attended to, so they infer — and the demand can change their thinking." },
        { text: "“Tell me what you'd change about each page.”", correct: false, explanation: "That asks for design opinions, a different activity that pulls attention from the task." },
        { text: "“Only speak when something goes wrong.”", correct: false, explanation: "Problems often show first in hesitations and expectations, before anything 'goes wrong'." },
      ],
      explanation: "Classic think-aloud asks for a report of current thought, not explanations or opinions.",
    },
    {
      id: "think-aloud-protocol-q-silence",
      kind: "scenario",
      level: "intermediate",
      prompt: "A participant has been silent for 15 seconds, staring at a form. What is the best moderator response?",
      options: [
        { text: "“Please keep talking.”", correct: true, explanation: "A neutral reminder restores the commentary without pointing at anything." },
        { text: "“Are you stuck on the postcode field?”", correct: false, explanation: "It names an element and suggests a problem the participant may not have." },
        { text: "“Take your time — it's the field at the bottom.”", correct: false, explanation: "This is a hint; the task is no longer unassisted." },
        { text: "Say nothing for the rest of the task.", correct: false, explanation: "Long silences lose the data the method exists to collect; a neutral reminder is expected." },
      ],
      explanation: "Use neutral reminders; any hint or suggested problem changes behaviour and the meaning of the result.",
      revise: "usability-testing",
    },
    {
      id: "think-aloud-protocol-q-coaching",
      kind: "true-false",
      level: "intermediate",
      prompt: "Encouraging and helping participants during tasks makes think-aloud results more accurate.",
      options: [
        { text: "True", correct: false, explanation: "Coaching raised task accuracy and satisfaction in an experiment — which means results reflected the moderator's help, not the design alone." },
        { text: "False", correct: true, explanation: "Higher success under coaching is an artefact of moderation, not a more accurate picture of the product." },
      ],
      explanation: "Olmsted-Hawala and colleagues found a coaching protocol produced significantly higher accuracy than the other protocols and a silent control, and higher satisfaction than the traditional and speech-communication protocols.",
    },
    {
      id: "think-aloud-protocol-q-explanation",
      kind: "critique",
      level: "advanced",
      prompt:
        "A report states: “Participants missed the filter because it is grey — 4 of 5 said so when asked why.” What is the main weakness?",
      options: [
        { text: "Answers to 'why' questions are people's theories about their behaviour, not observations of its cause.", correct: true, explanation: "People report plausible causes rather than direct access to them; the claim needs behavioural evidence, such as a variant test." },
        { text: "Five participants is too few for any finding.", correct: false, explanation: "Five can reveal a problem; the issue is treating the explanation as the cause." },
        { text: "Grey is never a problem for visibility.", correct: false, explanation: "It may well be a problem; the point is that the participants' account does not establish it." },
        { text: "The participants should have been asked during the task, not after.", correct: false, explanation: "Asking mid-task would add reactivity without making the explanation more reliable." },
      ],
      explanation: "Treat stated reasons as hypotheses; weigh what was observed above what was explained.",
    },
  ],

  flashcards: [
    { id: "think-aloud-protocol-fc-1", front: "Classic vs relaxed think-aloud", back: "Classic: only 'keep talking' reminders. Relaxed: the moderator also asks questions and probes — common in practice, and it changes behaviour." },
    { id: "think-aloud-protocol-fc-2", front: "Ericsson & Simon: when are verbal reports unreliable?", back: "When people are asked for information they never attended to (such as reasons), so they infer rather than report." },
    { id: "think-aloud-protocol-fc-3", front: "Concurrent vs retrospective think-aloud", back: "Concurrent: talk during the task. Retrospective: silent task, then commentary over the recording — about double the time." },
    { id: "think-aloud-protocol-fc-4", front: "Why not report time on task from think-aloud sessions?", back: "Thinking aloud lengthens tasks even in its classic form; benchmark timing needs silent sessions." },
    { id: "think-aloud-protocol-fc-5", front: "Where do 'why' questions belong?", back: "After the task, separate from the concurrent data — and their answers are hypotheses, not causes." },
  ],

  references: [
    { source: "ericsson-simon-1980", role: "primary", note: "Abstract read: verbal reports as data; when verbalisation does and does not alter thinking." },
    { source: "ericsson-simon-1993", role: "primary", note: "Book-length account of protocol analysis; bibliographic record only, not read here." },
    { source: "boren-ramey-2000", role: "primary", note: "Abstract read: practice diverges from Ericsson and Simon; speech genre as an alternative framework." },
    { source: "hertzum-2009-thinking-aloud", role: "primary", note: "Abstract read: classic vs relaxed thinking aloud vs silence." },
    { source: "van-den-haak-2003", role: "primary", note: "Abstract read: concurrent vs retrospective protocols; reactivity." },
    { source: "alhadreti-mayhew-2018", role: "primary", note: "Full text read (author version): concurrent, retrospective and hybrid compared, n = 60." },
    { source: "olmsted-hawala-2010", role: "primary", note: "Abstract read: coaching raised accuracy and satisfaction." },
    { source: "mcdonald-2012-think-aloud-survey", role: "explanatory", note: "Abstract read: survey of 207 practitioners on think-aloud practice." },
    { source: "fan-2019-verbalizations", role: "explanatory", note: "Abstract read: verbalisation patterns linked to usability problems." },
    { source: "nisbett-wilson-1977", role: "explanatory", note: "Abstract read: limits of introspective reports on the causes of behaviour." },
    { source: "hertzum-jacobsen-2001", role: "explanatory", note: "Abstract read: evaluator effect in thinking-aloud studies; agreement between two evaluators 5–65 %." },
    { source: "nielsen-thinking-aloud-article", role: "further", note: "Read 2026-11-16: practitioner overview of benefits and downsides." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "Grounded in Ericsson and Simon's theory of verbal reports and in a body of experimental comparisons of protocols and moderation. Most experimental sources were read as abstracts only (one full text); the 1993 book was not read. The comparisons used different products, tasks and participants and disagree on reactivity, so effects are stated per study rather than as general sizes.",

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
  lastVerifiedAt: "2026-11-16",
});
