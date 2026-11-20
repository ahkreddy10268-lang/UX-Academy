import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "contextual-inquiry",
  slug: "contextual-inquiry",
  title: "Contextual Inquiry",
  alternateNames: ["Contextual interview", "CI", "Master–apprentice interview", "Field interview"],
  summary:
    "A field research method in which the researcher watches someone do their real work where they normally do it, and asks about it as it happens — uncovering habits, workarounds and reasons that people cannot recall in an ordinary interview.",
  definition:
    "Contextual inquiry is a **qualitative field research method**: one-on-one sessions in the participant's own setting, in which the researcher observes real work and inquires into actions *as they unfold*, and the two develop a shared interpretation of what the work is and why it is done that way {{src:holtzblatt-beyer-2014-contextual-design}}. It rests on the observation that people are experts at what they do but cannot articulate their own practice, because much of it is tacit and only surfaces while they are doing it {{src:holtzblatt-beyer-2014-contextual-design}}. The researcher takes the role of an **apprentice** learning from a **master**, rather than an interviewer with a list of questions {{src:holtzblatt-beyer-2014-contextual-design}}. It is the first step of Karen Holtzblatt and Hugh Beyer's Contextual Design process {{src:holtzblatt-beyer-2014-contextual-design}}, introduced at CHI in 1990 {{src:wixon-1990-contextual-design}}.",
  primaryType: "method",
  secondaryTypes: ["technique"],
  domain: "research",
  subcategory: "qualitative",
  tags: ["field research", "generative research", "work practice", "observation", "tacit knowledge", "contextual design", "discovery"],
  difficulty: "intermediate",
  disciplines: ["UX research", "Human–computer interaction", "Service design", "Requirements engineering"],
  learningObjectives: [
    "Explain why asking people about their work away from it misses what matters, and what being in context adds.",
    "Run a session with the four-part structure and the master–apprentice stance.",
    "Offer interpretations for the participant to confirm or correct, without steering their work.",
    "Turn field notes into shared team understanding through interpretation sessions.",
  ],
  prerequisites: ["in-depth-interviews", "user-centred-design"],

  levels: {
    beginner: {
      explanation: [
        "Ask a receptionist how they book appointments and they will describe the official steps. Sit beside them for an hour and you see the sticky note on the monitor, the second system they check, the call they make before booking certain doctors. None of that comes up in the interview, not because they hide it, but because it has become automatic.",
        "Contextual inquiry goes to where the work happens and watches it happen. The researcher asks about things as they occur — 'What did you just check?' — rather than asking people to summarise their job from memory. The participant is the expert; the researcher is learning the job like an apprentice.",
        "The aim is not to find bugs in a screen. It is to understand the work well enough to design for it: what people are trying to achieve, the steps they really take, the tools and people they rely on, and the problems they have quietly worked around.",
      ],
      analogy:
        "A new chef learns more in one evening shift beside the head chef — watching, asking 'why did you do that?' between orders — than from any written recipe, because the recipe leaves out everything the head chef no longer notices doing.",
      everydayExamples: [
        "Observing nurses during a shift might show them noting medication times on scraps of paper because the computer is in another room (illustrative).",
        "Watching small-business owners do their monthly accounts might show them reconciling in a spreadsheet first and typing totals into the accounting app afterwards (illustrative).",
        "Sitting with warehouse staff might show them printing pick lists because the handheld scanner is hard to use with cold-storage gloves (illustrative).",
      ],
      vocabulary: [
        { term: "Context", meaning: "The real setting where the work is done — not a lab or meeting room." },
        { term: "Master–apprentice model", meaning: "The participant teaches their work by doing it; the researcher learns by watching and asking." },
        { term: "Work practice", meaning: "What people actually do, with their goals, strategies, tools and workarounds — as opposed to the official process." },
        { term: "Workaround", meaning: "A way people get the job done despite the system, such as notes, spreadsheets or extra checks." },
        { term: "Interpretation session", meaning: "A team meeting soon after a session to retell it and capture what it means for the design." },
      ],
    },
    intermediate: {
      explanation: [
        "**Four principles.** NN/g summarises the method as four principles {{src:nng-contextual-inquiry}}. *Context*: go where the work happens. *Partnership*: the participant and researcher steer the conversation together. *Interpretation*: build a shared understanding of what is happening, checked with the participant. *Focus*: know what the project needs, so you know what to pursue. Holtzblatt and Beyer state the partnership principle as a rejection of the preformed question list used in surveys and focus groups {{src:holtzblatt-beyer-2014-contextual-design}}.",
        "**Interpret out loud, and expect correction.** The originators tell researchers not to just observe, but to suggest interpretations of the participant's actions and motives and to say together what matters about the work {{src:holtzblatt-beyer-2014-contextual-design}}. An interpretation that the participant corrects is a gain: the correction is usually more precise than anything they would have volunteered.",
        "**It is not ethnography, and not an interview.** Contextual inquiry borrows from ethnography but is bounded by a project: sessions last a few hours rather than weeks, and the interaction is a focused conversation whose purpose both people understand {{src:holtzblatt-beyer-2014-contextual-design}}. It differs from a sit-down interview because what is discussed is the work in front of you, not a recollection of it {{src:nng-contextual-inquiry}}.",
      ],
      howItWorks: [
        "Primer: introduce yourself, explain the purpose and that you expect to be corrected, agree recording and confidentiality, and ask for an overview of the work you will see {{src:nng-contextual-inquiry}}.",
        "Transition: say explicitly that you will now watch them work as normal and will interrupt when something is interesting — without this, people stay in 'interview mode' and summarise {{src:nng-contextual-inquiry}}.",
        "Contextual interview: cycles of watching and pausing to ask about what you did not understand, or to check an interpretation {{src:nng-contextual-inquiry}}.",
        "Wrap-up: summarise your interpretations for final corrections {{src:nng-contextual-inquiry}}. Then retell the session to the team in an interpretation session {{src:holtzblatt-beyer-2014-contextual-design}} — soon, while the detail is fresh.",
      ],
      implementation: [
        "Set the focus: the work you need to understand and why; recruit people who do that work for real, across the roles involved.",
        "Schedule sessions when the real work happens, at the participant's place, typically one or two hours each.",
        "Take running notes in three kinds: what you saw, what was said, and your interpretation — kept visibly separate.",
        "Photograph artefacts (with permission): notes, printouts, spreadsheets, whiteboards.",
        "Hold an interpretation session after each visit; consolidate across visits with affinity mapping or work models.",
      ],
      scenarios: [
        "A receptionist checks a sticky note before booking one doctor. The researcher asks what is on it, then offers 'So the system doesn't know about his Friday clinic?' — and is corrected: 'It knows, but it's often out of date, so I keep my own.' The design problem is trust in rota data, not a missing field.",
        "Participants keep turning the session into a list of complaints about the old system. The researcher redirects: 'Show me how you'd do today's batch as normal, and I'll stop you when I want to ask something' {{src:nng-contextual-inquiry}}.",
        "Air-traffic controllers cannot be interrupted. The team switches to silent observation and asks its questions later, accepting that some reasoning will be reconstructed rather than observed {{src:nng-contextual-inquiry}}.",
      ],
    },
    advanced: {
      explanation: [
        "**Why context matters, in the originators' terms.** Holtzblatt and Beyer argue that work practice is tacit and full of seemingly insignificant details that people cannot recall out of context but become 'aware in the doing' (a phrase they take from Polanyi) {{src:holtzblatt-beyer-2014-contextual-design}}. This parallels the evidence on verbal reports: people can report what they are attending to, but explanations of their own behaviour out of the moment become inferences {{src:ericsson-simon-1980}}. Holtzblatt's account explicitly draws on verbal protocol analysis and on grounded theory {{src:holtzblatt-beyer-2014-contextual-design}}.",
        "**Where it came from.** Contextual inquiry began as a response to lab-based, quantitative usability work of the early 1980s, which its authors saw as limited in impact and unable to produce new design directions {{src:holtzblatt-beyer-2014-contextual-design}}. Wixon, Holtzblatt and Knox presented contextual design at CHI in 1990 as emphasising interviews in the context of work, codesign with users and understanding work in context, in contrast to usability engineering {{src:wixon-1990-contextual-design}}. Beyer and Holtzblatt later argued that a new system implicitly designs a new work practice, so requirements depend on the minute-by-minute relationship between designer and customer {{src:beyer-holtzblatt-1995}}.",
        "**The cost question.** Sessions take hours, travel and analysis, and the full Contextual Design process adds team modelling. Holtzblatt and Beyer describe *Rapid Contextual Design* (2005) as a response to the criticism that the method could be too labour-intensive for some projects {{src:holtzblatt-beyer-2014-contextual-design}}. When scaling down, the part to protect is being in context, since that is what produces the method's distinctive data; fewer sessions or lighter models are the smaller loss. (This is this entry's recommendation, not a finding.)",
      ],
      evidence: [
        "The method's main sources are its originators' published descriptions and practitioner guidance {{src:wixon-1990-contextual-design}} {{src:beyer-holtzblatt-1995}} {{src:holtzblatt-beyer-2014-contextual-design}}; no controlled comparison of contextual inquiry with other requirements methods was found or read for this entry.",
        "Its central premise — that people cannot reliably report the details and causes of their own practice out of context — is consistent with research on verbal reports, which finds that reports become inferences when people are asked for information they did not attend to at the time {{src:ericsson-simon-1980}}.",
      ],
      debates: [
        "**Observation versus inquiry.** Interrupting to ask and to offer interpretations yields reasons, but can change what the participant does next; NN/g advises being judicious about how often you check interpretations during the work {{src:nng-contextual-inquiry}}. Where interruption is unsafe or impossible, silent observation followed by questions is the alternative.",
        "**Depth versus generalisation.** A handful of sessions gives deep, situated understanding of a few people. It does not say how common a practice is; surveys or analytics are needed for that, as the originators acknowledge when they call for quantitative data to complement contextual data in business cases {{src:holtzblatt-beyer-2014-contextual-design}}.",
        "**Whose interpretation?** The researcher proposes and the participant confirms, but participants may agree to be polite, or to an interpretation the researcher evidently prefers {{src:nng-contextual-inquiry}}. Open questions and inviting correction ('Tell me where I've got this wrong') help.",
      ],
      alternativeModels: [
        "[[in-depth-interviews|In-depth interviews]] — cheaper and easier to schedule; rely on recollection, so they miss tacit detail.",
        "[[observation|Direct observation]] — watching without interrupting; for work that cannot be paused.",
        "[[ethnographic-research|Ethnographic research]] — longer immersion over weeks or months; broader cultural understanding at much greater cost.",
        "[[diary-studies|Diary studies]] — participants record their own activities over time; good for work spread across days, without a researcher present.",
      ],
    },
  },

  origin: {
    contributors: ["Karen Holtzblatt", "Hugh Beyer", "John Whiteside", "John Bennett", "Dennis Wixon", "Sandra Jones"],
    period: "Developed at Digital Equipment Corporation in the 1980s; published from 1988 to the 1990s",
    problem:
      "Lab-based usability evaluation could measure how well a design performed, but could not tell a team what people's work actually required, or produce new design directions.",
    narrative: [
      "Whiteside, Bennett and Holtzblatt (1988) set out the case for ethnographic and interpretive techniques in systems design, as a response to lab-based usability measurement; Holtzblatt adapted verbal protocol analysis to data collected in the field, and the process was first used at DEC {{src:holtzblatt-beyer-2014-contextual-design}}.",
      "Wixon, Holtzblatt and Knox presented contextual design at CHI '90 {{src:wixon-1990-contextual-design}}; Beyer and Holtzblatt described the master–apprentice relationship in 'Apprenticing with the customer' {{src:beyer-holtzblatt-1995}}.",
      "The full process, from contextual inquiry to work models, consolidation and design, was published as *Contextual Design* {{src:beyer-holtzblatt-1998}}, and later shortened for smaller projects {{src:holtzblatt-beyer-2014-contextual-design}}.",
    ],
    attributionNote:
      "The 1988 handbook chapter and Holtzblatt and Jones's 1993 chapter on contextual inquiry are cited here through the originators' 2014 account, not read directly.",
  },

  application: {
    summary: [
      "Use contextual inquiry early, in discovery, when you need to understand complex, skilled or habitual work well enough to decide what to build.",
    ],
    web: [
      "Understand how people actually do the task a site supports — for example, how families plan a move before they ever visit a removals website.",
    ],
    mobile: [
      "Follow people into the settings where they use phones on the move — shop floors, vehicles, homes — where interruptions and gloves, light or noise shape the design.",
    ],
    enterprise: [
      "The method's home ground: claims handling, clinical work, logistics, finance operations — complex processes, expert users and many workarounds.",
      "Visit several roles in the same process (the person who enters data, the one who checks it, the manager) to see the hand-offs.",
    ],
    services: [
      "Observe front-line staff and the customers they serve together, to see where the service and its systems diverge.",
    ],
    steps: [
      "Set the focus: what work you need to understand and why.",
      "Recruit people who do that work, across the roles involved.",
      "Run sessions in context: primer, transition, watch-and-ask, wrap-up.",
      "Hold a team interpretation session after each visit.",
      "Consolidate across sessions with affinity mapping or work models.",
      "Turn shared understanding into design directions and requirements.",
    ],
  },

  method: {
    procedure: [
      "Define the focus: the work, roles and questions that matter for the project.",
      "Recruit participants who do the work, and arrange to visit when the work happens.",
      "Primer: purpose, consent and recording, an overview of today's work; ask them to correct you.",
      "Transition: explain that you will now watch them work normally and interrupt when something is interesting.",
      "Contextual interview: watch, pause to ask about what you do not understand, offer interpretations to confirm or correct; collect artefacts.",
      "Wrap-up: summarise your understanding for final corrections.",
      "Interpret with the team soon after; consolidate across sessions (affinity mapping, work models).",
    ],
    participants:
      "A small number of people per role (often a handful each), chosen because they do the work for real; the aim is depth, not representativeness.",
    duration: "Sessions of about one to two hours, sometimes longer; a study of several weeks including visits and interpretation.",
    inputs: ["Project focus", "Recruitment across roles", "Consent and recording permissions", "Note-taking template (observed / said / interpretation)", "Camera for artefacts"],
    outputs: ["Session notes and artefact photos", "Interpretation-session notes", "Affinity diagram", "Work models (flow, sequence, artefacts)", "Design implications and requirements"],
    purpose: "generative",
    data: "qualitative",
  },

  whenToUse: [
    "Early in a project, to understand work before deciding what to build.",
    "For complex, skilled or expert work where much is tacit or habitual.",
    "When people rely on workarounds, other tools or other people to get the job done.",
    "When interviews keep producing the official process rather than what really happens.",
  ],
  whenNotToUse: [
    "For simple, targeted interfaces — a product page, a sign-up form — where observation of use or usability testing is enough.",
    "To measure how common a behaviour is or to compare designs — use surveys, analytics or testing.",
    "When the work cannot be interrupted safely (clinicians in an emergency, controllers) — observe silently and ask afterwards.",
    "When you cannot get access to the real setting; a reconstructed interview is a different method.",
  ],
  advantages: [
    "Reveals tacit detail, workarounds and real sequences that people do not report in interviews.",
    "Grounds explanations in actions the researcher has just seen.",
    "Participants correct the researcher's interpretations, so understanding is shared and specific.",
    "Produces design directions, not only problems with an existing design.",
  ],
  limitations: [
    "Time-consuming: travel, scheduling around real work and team interpretation.",
    "Small samples show depth, not how widespread a practice is.",
    "The researcher's presence and questions can change the work being observed.",
    "Access, confidentiality and safety can rule out some settings.",
    "Analysis depends on skilled interpretation and on the team's own assumptions.",
  ],
  misconceptions: [
    {
      myth: "Contextual inquiry is an interview held in the user's office.",
      reality:
        "Location is not the point. The participant must be doing their real work while you watch and ask; an interview at their desk about how they usually work is still an interview {{src:nng-contextual-inquiry}}.",
    },
    {
      myth: "A good researcher just watches and never interrupts.",
      reality:
        "That is direct observation. Contextual inquiry deliberately asks about actions as they happen and offers interpretations for the participant to confirm or correct {{src:holtzblatt-beyer-2014-contextual-design}}.",
    },
    {
      myth: "It is the same as ethnography.",
      reality:
        "It borrows from ethnography but is bounded by a design project: sessions of a few hours with a focus, rather than long immersion {{src:holtzblatt-beyer-2014-contextual-design}}.",
    },
  ],

  relations: [
    { target: "user-centred-design", type: "applied-in", note: "Contextual inquiry is a core method for understanding the context of use in user-centred design." },
    { target: "in-depth-interviews", type: "contrasts-with", note: "Interviews rely on recollection away from the work; contextual inquiry asks about the work while it happens." },
    { target: "ethnographic-research", type: "derived-from", note: "Contextual inquiry borrows ethnographic field techniques but bounds them to a few hours with a project focus." },
    { target: "affinity-mapping", type: "complementary-to", note: "Notes from contextual sessions are consolidated across participants with affinity mapping." },
    { target: "think-aloud-protocol", type: "related-to", note: "Both rest on verbal reports given during the activity; contextual inquiry adds the researcher's questions and interpretations in the real setting." },
    { target: "task-analysis", type: "complementary-to", note: "Observed work sequences from contextual inquiry feed task analysis." },
  ],

  practice: {
    dos: [
      { text: "Make an explicit transition from talking to working.", why: "Without it, participants stay in interview mode and summarise instead of working {{src:nng-contextual-inquiry}}.", kind: "industry" },
      { text: "Offer interpretations as questions the participant can correct.", why: "Shared interpretation is part of the method, and corrections are more precise than volunteered accounts {{src:holtzblatt-beyer-2014-contextual-design}}.", kind: "standard" },
      { text: "Keep observed, said and interpreted notes visibly separate.", why: "Otherwise your interpretations quietly become 'what users do' in the team's memory.", kind: "team" },
      { text: "Retell each session to the team soon after the visit.", why: "Interpretation sessions let the whole team bring its perspectives to the data {{src:holtzblatt-beyer-2014-contextual-design}}; holding them early keeps the detail that memory loses.", kind: "team" },
    ],
    donts: [
      { text: "Don't arrive with a fixed list of questions.", why: "Partnership means following the work, not a script; a preformed list turns the session into a survey {{src:holtzblatt-beyer-2014-contextual-design}}.", kind: "standard" },
      { text: "Don't let the session become a list of complaints.", why: "Grievances about the current system crowd out the work itself; redirect to doing the task as normal {{src:nng-contextual-inquiry}}.", kind: "industry" },
      { text: "Don't check every hunch mid-task.", why: "Frequent interpretations can make participants adjust their work to your theory; save some for the wrap-up {{src:nng-contextual-inquiry}}.", kind: "industry" },
    ],
    examples: [
      {
        title: "Field notes in three columns (illustrative clinic visit)",
        language: "text",
        code: `TIME   OBSERVED                         SAID                              INTERPRETATION (to check)
09:12  Looks at yellow note on monitor  —                                 Note holds booking rules?
       before booking Dr Shah
09:13  —                                "That's his Fridays. I check       Asked: "So the system
                                         it every time."                    doesn't know his Friday
                                                                            clinic?"
09:13  —                                "It knows. It's just wrong half    CORRECTED: problem is trust
                                         the time, so I keep my own."       in rota data, not a missing
                                                                            field
09:20  Phones the practice manager      "Only if it's a double slot."      Double slots need approval
       before a 40-min booking                                              that the system doesn't hold?
                                                                            -> check at wrap-up`,
        caption:
          "Observation, quotation and interpretation stay apart. The interpretation at 09:13 was offered, corrected, and recorded as corrected; the one at 09:20 is held for the wrap-up rather than asked mid-task.",
      },
    ],
  },

  exercises: [
    {
      id: "contextual-inquiry-ex-plan",
      kind: "assignment",
      level: "beginner",
      title: "Plan a session",
      prompt: [
        "You are redesigning the software a library uses to process returned books. Write a one-page plan for one contextual inquiry session.",
        "Include the focus, who you will visit and when, what you will say in the primer and the transition, and how you will take notes.",
      ],
      deliverable: "A one-page session plan.",
      criteria: [
        "Visits when returns are actually being processed",
        "Primer includes purpose, consent and an invitation to correct you",
        "An explicit transition to watching real work",
        "Notes separate what was observed, said and interpreted",
      ],
    },
    {
      id: "contextual-inquiry-ex-correct",
      kind: "critique",
      level: "intermediate",
      title: "Correct a session that became an interview",
      prompt: [
        "Read this excerpt and identify what went wrong, then rewrite the researcher's turns.",
        "R: 'Thanks for meeting me in the café. Can you walk me through how you process a claim?'",
        "P: 'Sure — I open the claim, check the policy, approve or refer it. Pretty simple.'",
        "R: 'What are the biggest problems with the system?'",
        "P: 'Where to start! It's slow, the search is useless, the colours are awful…' (ten minutes of complaints follow)",
        "R: 'Great. Would you want a dashboard?'",
      ],
      deliverable: "Three problems named, and rewritten turns that would bring the session back to contextual inquiry.",
      criteria: [
        "Identifies the loss of context (café, no real claim)",
        "Identifies the request for a summary and for grievances",
        "Identifies the leading, solution-first question",
        "Rewrites move to observing a real claim with questions about actions as they happen",
      ],
      exampleSolution: [
        "Context lost: meet at the desk while claims are being processed. Rewrite: 'Could I sit with you while you work through this morning's claims?'",
        "Asking for a walkthrough invites the official summary, and asking for 'problems' invites grievances. Rewrite: 'Work as you normally would; I'll stop you now and then to ask about what you're doing.' Then: 'You just opened another window — what were you checking?'",
        "'Would you want a dashboard?' proposes a solution and invites a polite yes. Replace it with an interpretation to check: 'It looks like you track referred claims on paper — is that because the system doesn't show them to you?'",
      ],
    },
    {
      id: "contextual-inquiry-ex-choose",
      kind: "scenario",
      level: "advanced",
      title: "Choose and justify a field method",
      prompt: [
        "For each situation choose contextual inquiry, direct observation, in-depth interviews or a survey, and justify it in two sentences.",
        "(a) Understanding how dispatchers coordinate ambulances during live calls. (b) Learning how accountants close the month in small firms. (c) Finding out what share of customers use a printed invoice. (d) Understanding why people abandon a product they used for a year.",
      ],
      deliverable: "A method and a two-sentence justification for each.",
      criteria: [
        "(a) Direct observation with later questions, because the work cannot be interrupted",
        "(b) Contextual inquiry: complex, tacit, observable work",
        "(c) Survey or analytics: a question of prevalence",
        "(d) In-depth interviews: the behaviour is in the past and cannot be observed",
      ],
    },
  ],

  quiz: [
    {
      id: "contextual-inquiry-q-why",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Why does contextual inquiry observe people doing their real work instead of asking them to describe it?",
      options: [
        { text: "Much of how people work is habitual and tacit, so they cannot recall it accurately away from the work.", correct: true, explanation: "Details and workarounds surface while people are doing the work, not when they summarise it." },
        { text: "People tend to lie about their work in interviews.", correct: false, explanation: "The problem is not dishonesty but tacit knowledge." },
        { text: "Observation produces statistics that interviews cannot.", correct: false, explanation: "Contextual inquiry is qualitative and uses small samples." },
        { text: "It is quicker than an interview.", correct: false, explanation: "It usually takes longer, including travel and interpretation." },
      ],
      explanation: "The method's core premise is that people are experts at their work but cannot articulate it out of context.",
    },
    {
      id: "contextual-inquiry-q-interpret",
      kind: "scenario",
      level: "intermediate",
      prompt:
        "A participant prints a report every morning and highlights some rows. Which researcher response best follows the method?",
      options: [
        { text: "“It looks like the highlighted rows are the ones you need to chase today — is that right?”", correct: true, explanation: "It offers an interpretation of what you just saw for the participant to confirm or correct." },
        { text: "“Would a highlighting feature in the app help?”", correct: false, explanation: "That jumps to a solution and invites a polite yes." },
        { text: "Say nothing and note 'prints report'.", correct: false, explanation: "Silent observation misses the reason, which is what makes the workaround useful to design for." },
        { text: "“Why don't you just use the on-screen version?”", correct: false, explanation: "It implies they are doing it wrong and puts them on the defensive." },
      ],
      explanation: "Ask about actions as they happen, and check interpretations with the person doing the work.",
    },
    {
      id: "contextual-inquiry-q-ethno",
      kind: "true-false",
      level: "intermediate",
      prompt: "Contextual inquiry is a form of ethnography that requires weeks of immersion in the participants' setting.",
      options: [
        { text: "True", correct: false, explanation: "It borrows from ethnography but is bounded by the project: sessions of a few hours with a focus." },
        { text: "False", correct: true, explanation: "The originators describe it as constrained to field interviews of a few hours, not days or weeks." },
      ],
      explanation: "Short, focused field sessions distinguish contextual inquiry from ethnographic studies.",
      revise: "ethnographic-research",
    },
    {
      id: "contextual-inquiry-q-generalise",
      kind: "critique",
      level: "advanced",
      prompt:
        "After six contextual inquiry sessions, a report says: “70 % of agents prefer paper checklists.” What is the main problem?",
      options: [
        { text: "A handful of purposively chosen sessions shows practices and reasons, not their prevalence; the percentage invites a false generalisation.", correct: true, explanation: "Report what was seen and why; measure prevalence with a survey or analytics if it matters." },
        { text: "Six sessions is too many for contextual inquiry.", correct: false, explanation: "Six is a normal number; the issue is the claim, not the sample." },
        { text: "Contextual inquiry cannot observe paper.", correct: false, explanation: "Paper artefacts are exactly what it captures well." },
        { text: "Preferences should be measured with think-aloud.", correct: false, explanation: "Neither method measures prevalence." },
      ],
      explanation: "Qualitative depth and quantitative prevalence answer different questions.",
    },
  ],

  flashcards: [
    { id: "contextual-inquiry-fc-1", front: "Four principles of contextual inquiry", back: "Context, partnership, interpretation, focus." },
    { id: "contextual-inquiry-fc-2", front: "Master–apprentice model", back: "The participant teaches their work by doing it; the researcher learns by watching and asking about it as it happens." },
    { id: "contextual-inquiry-fc-3", front: "Four parts of a session", back: "Primer, transition, contextual interview (watch and ask), wrap-up." },
    { id: "contextual-inquiry-fc-4", front: "Contextual inquiry vs ethnography", back: "Same roots, but bounded: sessions of a few hours with a project focus, not weeks of immersion." },
    { id: "contextual-inquiry-fc-5", front: "What to do when an interpretation is corrected", back: "Record the correction — it is usually more precise than anything volunteered." },
  ],

  references: [
    { source: "holtzblatt-beyer-2014-contextual-design", role: "primary", note: "Read in full: the originators' account of principles, contextual inquiry and history." },
    { source: "wixon-1990-contextual-design", role: "primary", note: "Abstract read: contextual design presented at CHI '90." },
    { source: "beyer-holtzblatt-1995", role: "primary", note: "Opening read: designing systems means designing work practice; designer–customer relationship." },
    { source: "beyer-holtzblatt-1998", role: "further", note: "Book-length account of Contextual Design; bibliographic record only, not read here." },
    { source: "nng-contextual-inquiry", role: "explanatory", note: "Read: four principles, four-part session, when not to use it, risks." },
    { source: "ericsson-simon-1980", role: "explanatory", note: "Abstract read: why reports out of the moment become inferences." },
  ],
  evidence: "practitioner-recommendation",
  evidenceNote:
    "Contextual inquiry is supported by its originators' published method descriptions and by long practitioner use; no controlled comparison with other requirements methods was found. Its premise about tacit knowledge is consistent with research on verbal reports. The 1988 and 1993 founding chapters and the 1998 book were not read; they are cited through the originators' 2014 account.",

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
