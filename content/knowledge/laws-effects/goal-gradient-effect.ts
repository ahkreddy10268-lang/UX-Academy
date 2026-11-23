import { defineEntry } from "../../../lib/content/define";

export default defineEntry({
  id: "goal-gradient-effect",
  slug: "goal-gradient-effect",
  title: "Goal-Gradient Effect",
  alternateNames: ["Goal-gradient hypothesis", "Goal gradient"],
  summary:
    "Effort and persistence often rise as people near a goal they value, but not always and not smoothly: how progress is framed, where a person measures it from and how fast it seems to move can flatten, reverse or reshape the curve. Progress feedback helps only when it is real, legible and honest about what remains.",
  definition:
    "The **goal-gradient effect** is the tendency for effort, persistence or motivation to intensify as a person approaches a valued goal. It began as Hull's **goal-gradient hypothesis** about animals, which expend more effort as they near a reward {{src:hull-1932}} {{src:kivetz-urminsky-zheng-2006}}, and was later shown in people, for example in reward programmes where customers bought more often as a free item came closer {{src:kivetz-urminsky-zheng-2006}}. It is a tendency under conditions, not a law: motivation can also be high at the start, sag in the middle and rise again at the end, depending on how progress is perceived {{src:bonezzi-brendl-de-angelis-2011}} {{src:koo-fishbach-2012}}.",
  primaryType: "cognitive-bias",
  secondaryTypes: [],
  domain: "laws-effects",
  subcategory: "decision-biases",
  tags: ["goal gradient", "motivation", "progress indicators", "endowed progress", "small-area hypothesis", "onboarding", "loyalty programmes", "near-misses", "persuasion ethics"],
  difficulty: "intermediate",
  disciplines: ["Behavioural psychology", "Consumer research", "Motivation science", "Interaction design"],
  learningObjectives: [
    "Distinguish the goal-gradient effect from the endowed progress effect, the small-area hypothesis and progress monitoring, and say which one a given design or claim relies on.",
    "Explain why motivation does not always rise smoothly toward a goal, using the 'stuck in the middle' pattern and the accumulated-versus-remaining framing evidence.",
    "Decide, for a progress indicator in a real flow, whether it will help people plan and persist or discourage them, and redesign it so the unit, the total and the pace are honest.",
    "Evaluate progress and reward mechanics for deception, including fabricated advancement and near-misses that imitate real progress.",
  ],
  prerequisites: [],

  levels: {
    beginner: {
      explanation: [
        "Many people find it easier to keep going when the finish is in sight. The last few stamps on a coffee card, the last module of a course, the last screen of a sign-up: effort often picks up near the end. Psychologists call this the **goal-gradient effect**. In one study, members of a café reward programme bought coffee more often the closer they were to earning a free one {{src:kivetz-urminsky-zheng-2006}}.",
        "The idea is old. Hull proposed it in 1932 for animals learning a maze {{src:hull-1932}}: they moved with more vigour as the distance to the goal shrank {{src:devine-et-al-2025}}. Researchers later tested whether people show something similar, in shopping, rating tasks and attention-demanding computer tasks {{src:kivetz-urminsky-zheng-2006}} {{src:devine-et-al-2025}}.",
        "Two warnings come with it. First, the effect is not guaranteed: people can also be keen at the start and flag in the middle {{src:bonezzi-brendl-de-angelis-2011}}. Second, what matters is how near the goal **seems**. A progress bar is only a picture of progress; how a person reacts depends on what the picture tells them about how much is done, how much is left and how fast it is going {{src:koo-fishbach-2012}} {{src:conrad-et-al-2010}}.",
      ],
      analogy:
        "On a long walk, the last kilometre often goes quickest once the village is in view. But if a sign at the halfway point says '12 km to go' when you expected 5, your pace may drop, even though you are exactly as close as you were a minute before. What you see about the distance changes how you feel about it.",
      everydayExamples: [
        "Buying one more coffee because the loyalty card is nearly full.",
        "Finishing a course faster once only one module remains.",
        "Completing a sign-up form after seeing 'Step 4 of 4'.",
        "Abandoning a survey when an early progress bar barely moves.",
      ],
      vocabulary: [
        { term: "Goal-gradient effect", meaning: "Effort or persistence tends to increase as a valued goal gets closer, under conditions where closeness is meaningful." },
        { term: "Goal proximity", meaning: "How close the goal is, in the units that matter for it: stamps, steps, questions, minutes." },
        { term: "Progress indicator", meaning: "An interface element that represents progress: a bar, a step counter, a checklist, a filled card." },
        { term: "Accumulated progress", meaning: "What has been done so far ('3 of 10 complete')." },
        { term: "Remaining distance", meaning: "What is left to do ('7 steps to go')." },
        { term: "Near-miss", meaning: "An outcome that looks close to success but is not success, such as a guess one letter off the answer." },
      ],
    },
    intermediate: {
      explanation: [
        "**From animals to people.** Hull's hypothesis was about animal learning {{src:hull-1932}}; Brown later confirmed experimentally that animals' vigour increases as distance to a goal shrinks {{src:devine-et-al-2025}}. Kivetz, Urminsky and Zheng tested it in people and found it in a real café programme and in people rating songs for rewards, who visited more often, rated more songs and persisted longer as the reward neared {{src:kivetz-urminsky-zheng-2006}}. They modelled effort as depending on the **proportion of the original distance remaining** {{src:kivetz-urminsky-zheng-2006}}, Academy reading: the model already makes relative position, not the absolute number of steps, the quantity that matters.",
        "**Goal-gradient versus endowed progress.** The goal-gradient effect concerns change in effort as the goal nears. The **endowed progress effect** concerns starting with some progress already done: turning an 8-step task into a 10-step task with 2 steps pre-completed increased completion and sped it up {{src:nunes-dreze-2006}}. Kivetz and colleagues found the same with a 12-stamp card carrying 2 bonus stamps against a plain 10-stamp card {{src:kivetz-urminsky-zheng-2006}}. Nunes and Drèze report that the effect seems to depend on the task feeling undertaken and incomplete, not on not wanting to waste the free progress, and that it depends on the reason given for the endowment and the units used {{src:nunes-dreze-2006}}. The two are related: an endowment moves a person along the gradient. But endowed progress is a design manipulation of the starting point; the goal gradient is a pattern of effort over the whole pursuit.",
        "**Accumulated or remaining: the small-area hypothesis.** Koo and Fishbach found that people are more motivated when their attention is drawn to whichever is smaller, progress made or progress left. Early on, '20% completed' motivated more than '80% remaining'; near the end, '20% remaining' motivated more than '80% completed'. Their account is that a small area makes each step look like a big proportional change, creating an illusion of fast progress {{src:koo-fishbach-2012}}. This differs from the classic prediction: it is not only how close the goal is, but which part of the distance the person is looking at.",
        "**Progress monitoring is a different finding.** A meta-analysis of 138 randomised studies found that interventions that made people monitor their progress more often helped them reach their goals, with larger effects when progress was recorded physically or made public {{src:harkin-et-al-2016}}. That shows monitoring helps; it does not show that effort rises with proximity. A progress bar can work by helping people plan and check, without any goal-gradient mechanism at all.",
        "**Representation and response are different things.** In online questionnaires, a progress bar that moved slowly early on increased abandonment and made the experience worse; one that moved fast early on improved the experience but not necessarily completion; intermittent feedback reduced the cost of discouraging feedback {{src:conrad-et-al-2010}}. Making a goal easier to visualise made people judge it closer and work harder, but only when they were already close, and the benefit faded when the goal was split into subgoals {{src:cheema-bagchi-2011}}. The same indicator can motivate or discourage depending on what it reveals.",
      ],
      howItWorks: [
        "A person pursues a goal they value, with a clear end state and a sense of how far away it is.",
        "They perceive their position: from the start (accumulated progress) or from the end (remaining distance), and how fast it seems to change {{src:bonezzi-brendl-de-angelis-2011}} {{src:koo-fishbach-2012}}.",
        "Effort follows the perceived marginal value of the next step: when a step looks like a large share of what is left (or of what has been done), motivation rises {{src:bonezzi-brendl-de-angelis-2011}} {{src:koo-fishbach-2012}}.",
        "Near the goal, attention to progress information and effort can both rise, as in an eye-tracking study where people looked at a progress bar more often and made more correct responses per second as a block neared its end {{src:devine-et-al-2025}}.",
        "If what the indicator shows lags behind what the person expected, the same mechanism can discourage them instead {{src:conrad-et-al-2010}}.",
      ],
      implementation: [
        "Measure progress in a unit people recognise (steps, questions, lessons, stamps) and show the total: '3 of 6 steps', not an unlabelled bar.",
        "Make the estimate honest. If some steps are long, say so ('about 10 minutes left') rather than letting a bar crawl; slow early progress increased abandonment in questionnaire experiments {{src:conrad-et-al-2010}}.",
        "Early in a long task, highlight what is done; near the end, highlight what remains, in line with the small-area findings {{src:koo-fishbach-2012}}. Always keep both available in text.",
        "Give real, earned credit for work already done (a saved draft, an imported profile) rather than inventing steps. In the endowed progress studies the head-start steps counted toward the goal, and the effect depended on the reason given for the endowment {{src:nunes-dreze-2006}}.",
        "Split long journeys into named stages when the end is far away, but recognise that subgoals can weaken the pull of the final goal {{src:cheema-bagchi-2011}}.",
        "Let people pause, save and leave without losing work, and show progress in text and shape as well as colour.",
      ],
      scenarios: [
        "Illustrative scenario: a bank's account-opening flow shows a bar that fills by screen. The identity check takes five screens out of eight, so the bar sits at 'halfway' for most of the effort. Replacing it with named stages ('Your details · Identity check (about 4 minutes) · Review') and a time estimate sets expectations, so a long middle stage does not look like stalled progress.",
        "Illustrative scenario: a language course shows '12% complete' after the first week. A learner who expected faster progress feels the course is endless. Showing '3 lessons done this week' early, and 'two lessons to finish the unit' later, uses the same data framed by the smaller quantity.",
        "Illustrative scenario: a coffee chain's app card needs 10 purchases and starts with 2 stamps already filled 'as a welcome'. Because the two stamps are real credits the customer can redeem, this is endowed progress used honestly. Filling two stamps that do not count, or quietly raising the card to 12, would be deception.",
        "Illustrative scenario: a file export shows a bar that jumps to 90% and then waits for minutes. The early jump borrows the motivating feel of near completion without being true; a stage label ('Packaging 4 of 12 files') is more honest and more useful.",
      ],
    },
    advanced: {
      explanation: [
        "**Not one curve.** Bonezzi, Brendl and De Angelis argue that motivation depends on the perceived marginal value of progress, judged against a reference point, and that the shape of the gradient depends on whether a person measures progress from the starting state or from the end state. Their model predicts a non-monotonic gradient, higher far from and close to the goal and lower about halfway, as well as two monotonic gradients {{src:bonezzi-brendl-de-angelis-2011}}. The classic rising curve is therefore one case, not the rule. For design, the middle of a long journey is where motivation is most at risk, and it is where honest pacing information and real milestones matter most.",
        "**Framing changes the curve, not only proximity.** The small-area hypothesis explains why the same position can motivate more or less depending on whether accumulated or remaining progress is in focus, through perceived velocity {{src:koo-fishbach-2012}}. Koo and Fishbach also report that when people want to prolong an activity, small-area focus slows them down {{src:koo-fishbach-2012}}: the mechanism is about pace toward an end state, and it reverses for ends people do not want to reach. Academy interpretation: in enjoyable activities (a book, a game), progress displays may make people slow down rather than speed up.",
        "**Near-miss is not approach.** In a study using the word game Wordle, feedback showing that players were approaching the answer increased motivation and positive affect, while thwarted outcomes increased frustration; near-misses were especially arousing, and a first near-miss was more motivating than a repeated one that showed no further progress {{src:dixon-et-al-2024}}. The authors connect this to slot-machine players who misread slot games as having goal-gradient properties {{src:dixon-et-al-2024}}. The distinction for design: a near-miss in a game of skill can carry real information about distance to the goal; a near-miss in a chance-based reward (a spin, a draw, a 'so close!' animation) carries none, and presenting it as progress exploits the goal gradient.",
        "**Attention, not only effort.** In an eye-tracking study of 81 participants, people looked at a progress bar increasingly often as they neared the end of a block, and made more correct responses per second {{src:devine-et-al-2025}}. The authors could not tell whether this reflects deliberate pacing (saving effort for the end) or a reflexive pull toward a cue that signals reward {{src:devine-et-al-2025}}. Either way, near-goal moments are when people read progress information most closely, so they are also when misleading information does most harm.",
        "**Ethics.** Endowed progress is, in the researchers' own phrase, artificial advancement {{src:nunes-dreze-2006}}, and Kivetz and colleagues call it illusionary goal progress {{src:kivetz-urminsky-zheng-2006}}. Academy position: giving people real credit is legitimate; inventing completed steps, inflating a bar, hiding the true total or dressing up chance outcomes as near-wins is a [[deceptive-patterns|deceptive pattern]]. The same applies to using reward proximity to push purchases people would not otherwise make.",
      ],
      evidence: [
        "Field and online experiments with reward programmes: purchase frequency and rating effort rose toward a reward; 2 bonus stamps on a 12-stamp card sped completion of 10 purchases; acceleration predicted retention {{src:kivetz-urminsky-zheng-2006}}. Abstract only.",
        "Endowed progress: a 10-step task with 2 steps given increased completion and speed over an 8-step task; moderated by the reason for the endowment and the progress currency {{src:nunes-dreze-2006}}. Abstract only.",
        "Non-monotonic gradient: motivation higher far from and near the goal, lower in the middle, depending on the reference point used to monitor progress {{src:bonezzi-brendl-de-angelis-2011}}. Abstract only.",
        "Small-area hypothesis: four studies; focus on the smaller of accumulated or remaining progress increases adherence through perceived velocity {{src:koo-fishbach-2012}}. Abstract only.",
        "Progress monitoring meta-analysis: 138 randomised studies, N = 19,951; monitoring interventions improved goal attainment (d+ = 0.40), mediated by monitoring frequency {{src:harkin-et-al-2016}}. Abstract only; not a test of the goal gradient.",
        "Progress indicators in online questionnaires: slow early progress increased abandonment; intermittent feedback reduced its cost {{src:conrad-et-al-2010}}. Abstract only.",
        "Goal visualisation: easier visualisation made goals seem closer and increased effort only near the goal; weaker with subgoals {{src:cheema-bagchi-2011}}. Abstract only.",
        "Eye tracking (n = 81): effort and attention to a progress bar both rose near the end of a block {{src:devine-et-al-2025}}. Read in full.",
        "Wordle: approaching outcomes motivating, thwarted outcomes frustrating, near-misses arousing {{src:dixon-et-al-2024}}. Read in relevant sections.",
      ],
      debates: [
        "**Monotonic or not?** The classic hypothesis and reward-programme findings describe effort rising toward the goal {{src:kivetz-urminsky-zheng-2006}}; the psychophysical account predicts that this is one of several shapes, including a dip in the middle {{src:bonezzi-brendl-de-angelis-2011}}. Which shape appears depends on the reference point people use, which designers partly control through framing {{src:koo-fishbach-2012}}.",
        "**Strategy or reflex?** Near-goal increases in effort and attention may be deliberate pacing or a learned pull toward reward cues; current eye-tracking evidence cannot separate them {{src:devine-et-al-2025}}.",
        "**What progress indicators really do.** Monitoring helps goal attainment on average {{src:harkin-et-al-2016}}, but a specific indicator can discourage when it lags expectations {{src:conrad-et-al-2010}}. Whether an indicator helps is an empirical question for each flow.",
      ],
      alternativeModels: [
        "**Goal-distance model**: effort depends on the proportion of the original distance remaining {{src:kivetz-urminsky-zheng-2006}}.",
        "**Psychophysical (reference-point) model**: motivation follows the perceived marginal value of progress from the start or from the end, producing monotonic or U-shaped gradients {{src:bonezzi-brendl-de-angelis-2011}}.",
        "**Small-area / perceived-velocity account**: attending to the smaller of done and remaining makes progress look faster {{src:koo-fishbach-2012}}.",
        "**Strategic pacing versus sign-tracking**: effort is saved for the end, or attention is drawn reflexively to cues of imminent reward {{src:devine-et-al-2025}}.",
      ],
    },
  },

  origin: {
    contributors: ["Clark Hull", "Judson Brown", "Ran Kivetz", "Oleg Urminsky", "Yuhuang Zheng", "Joseph Nunes", "Xavier Drèze", "Andrea Bonezzi", "Minjung Koo", "Ayelet Fishbach"],
    period: "Animal learning research from 1932; human consumer studies from 2006; boundary conditions from 2011–2012",
    problem:
      "Whether effort really increases as a goal approaches, and whether a finding from animal learning applies to people pursuing rewards and tasks.",
    narrative: [
      "Hull proposed the goal-gradient hypothesis in 1932 to explain animal maze learning {{src:hull-1932}}; Brown later confirmed experimentally that vigour increases as animals near a goal {{src:devine-et-al-2025}}.",
      "In 2006 two consumer studies brought the idea to people: Kivetz, Urminsky and Zheng showed purchase acceleration in reward programmes and illusionary progress from bonus stamps {{src:kivetz-urminsky-zheng-2006}}, and Nunes and Drèze named the endowed progress effect {{src:nunes-dreze-2006}}.",
      "Later work qualified the simple curve. Bonezzi and colleagues predicted a dip in the middle {{src:bonezzi-brendl-de-angelis-2011}}, Koo and Fishbach showed that framing progress as done or remaining changes motivation at different stages {{src:koo-fishbach-2012}}, and Cheema and Bagchi showed that visualising a goal helps only near it {{src:cheema-bagchi-2011}}. Recent studies examine attention to progress bars {{src:devine-et-al-2025}} and how near-misses differ from approach {{src:dixon-et-al-2024}}.",
    ],
    attributionNote:
      "Hull (1932) was not read; it is cited only as the origin of the hypothesis, described as such by Kivetz et al. (2006) and Devine et al. (2025). Brown (1948) is mentioned only as reported by Devine et al. and is not a separate reference. Kivetz et al., Nunes and Drèze, Bonezzi et al., Koo and Fishbach, Harkin et al., Conrad et al. and Cheema and Bagchi were read as abstracts; Devine et al. was read in full; Dixon et al. was read in relevant sections.",
  },

  application: {
    summary: [
      "Use progress feedback to help people understand where they are, plan the rest and decide whether to continue, and let any extra motivation come from honest information. Design for the middle of long journeys, where motivation is most at risk, and never manufacture closeness.",
      "Six checks for a progress element (academy checklist): (1) Is every step shown real? (2) Is the unit named and the total shown? (3) Does the pace match reality, including slow stages? (4) Does it frame the smaller quantity (done early, remaining late) without hiding the other? (5) Can the person pause, save and leave? (6) Is progress conveyed in text and shape as well as colour?",
    ],
    web: [
      "Checkout and application flows: name the stages and say which ones take longest; a bar that stalls on a long stage reads as a broken promise {{src:conrad-et-al-2010}}.",
      "Learning paths and course completion: early on, report lessons done; near the end of a unit, report what is left {{src:koo-fishbach-2012}}; show the real total, including optional and planned items, separately.",
      "Surveys and long forms: if early pages are slow, consider showing progress intermittently or by section rather than a constantly visible bar {{src:conrad-et-al-2010}}.",
    ],
    mobile: [
      "Onboarding and setup: count only steps that are actually needed, show 'Step 2 of 4', allow skipping optional ones, and credit what the person already did (imported contacts, a verified email) rather than inventing completed steps {{src:nunes-dreze-2006}}.",
      "Games and streaks: separate skill-based progress from chance outcomes; do not present random outcomes as 'almost there' {{src:dixon-et-al-2024}}.",
    ],
    enterprise: [
      "Long-running jobs (imports, reports, migrations): report stages and counts ('4,120 of 10,000 records'), with an honest time estimate and a way to cancel or run in the background.",
      "Training and compliance programmes: show progress by module, give people a way to save and resume, and avoid public leaderboards that turn monitoring into pressure, even though public reporting strengthened monitoring effects in research {{src:harkin-et-al-2016}}.",
    ],
    services: [
      "Loyalty and reward programmes: state the rules, the total and any expiry up front; welcome stamps must count toward the reward, as the bonus stamps in the research did {{src:kivetz-urminsky-zheng-2006}}; do not move the goal once people are close.",
      "Service interactions (claims, applications, support cases): show the stages the case passes through and which one it is in, so waiting is understood as progress rather than silence.",
    ],
    steps: [
      "List every progress element in the journey: bars, step counters, checklists, cards, streaks, percentage labels.",
      "For each, write down the unit, the true total, how the value is computed and where the slow stages are; answer the six checks.",
      "Fix anything fabricated or misleading first: invented steps, non-linear bars presented as linear, hidden totals, chance outcomes shown as near-wins.",
      "Redesign the middle: named stages, time estimates for long stages, saved progress and a clear way to pause or exit.",
      "Test with people: compare completion, abandonment by stage, accuracy of their estimate of what is left, satisfaction and later complaints, not only completion rate.",
    ],
  },

  whenToUse: [
    "Designing multi-step flows, courses, setup, long-running tasks and reward programmes where people need to know where they are.",
    "Diagnosing where people abandon a long journey, especially in the middle.",
    "Reviewing progress and reward mechanics for honesty.",
  ],
  whenNotToUse: [
    "As a guarantee that showing progress raises completion: an indicator that reveals slow progress can lower it {{src:conrad-et-al-2010}}.",
    "To justify fabricated advancement, inflated bars or hidden totals.",
    "To make chance outcomes look like near-wins or to push people toward rewards that cost them more than they gain.",
    "To cite progress-monitoring research as proof of the goal gradient {{src:harkin-et-al-2016}}.",
  ],
  advantages: [
    "Explains why the end of a journey often goes well and the middle often does not, and points designers to the middle {{src:bonezzi-brendl-de-angelis-2011}}.",
    "Gives concrete framing guidance: done early, remaining late {{src:koo-fishbach-2012}}.",
    "Honest progress information supports planning and persistence, and monitoring progress helps goal attainment on average {{src:harkin-et-al-2016}}.",
  ],
  limitations: [
    "Most human evidence comes from consumer reward programmes and laboratory tasks; transfer to a given product is untested until measured.",
    "The gradient's shape varies with reference point and framing, so no single curve can be assumed {{src:bonezzi-brendl-de-angelis-2011}} {{src:koo-fishbach-2012}}.",
    "Most key papers were read as abstracts only; effect sizes for the goal gradient itself are not reported here.",
    "Motivation near a goal is not the same as benefit to the person; the effect can drive purchases or play people would not choose on reflection.",
  ],
  misconceptions: [
    {
      myth: "Motivation always rises steadily as people get closer to a goal.",
      reality:
        "It can be high at the start and the end and lower in the middle {{src:bonezzi-brendl-de-angelis-2011}}, and framing progress as done or remaining changes motivation at each stage {{src:koo-fishbach-2012}}.",
    },
    {
      myth: "Adding a progress bar always increases completion.",
      reality:
        "In questionnaire experiments, bars showing slow early progress increased abandonment {{src:conrad-et-al-2010}}. An indicator helps when it matches or beats expectations honestly.",
    },
    {
      myth: "The endowed progress effect and the endowment effect are the same thing.",
      reality:
        "Endowed progress is about starting a task with steps already complete; Nunes and Drèze report that it depends on perceived completion, not on reluctance to waste what was given {{src:nunes-dreze-2006}}. The endowment effect concerns valuing things one owns.",
    },
    {
      myth: "Research shows that monitoring progress works, so the goal-gradient effect is proven.",
      reality:
        "The meta-analysis shows that monitoring interventions improve goal attainment {{src:harkin-et-al-2016}}; it does not test whether effort rises with proximity. The two claims need separate evidence.",
    },
    {
      myth: "A near-miss is a sign that success is close.",
      reality:
        "Only when the outcome carries real information about distance to the goal. Near-misses in chance outcomes carry none, and treating them as progress is the misreading Dixon and colleagues link to slot-machine play {{src:dixon-et-al-2024}}.",
    },
  ],

  relations: [
    { target: "visibility-of-system-status", type: "related-to", note: "Progress indicators are a form of system status; the goal-gradient research adds that what they show can change motivation as well as understanding." },
    { target: "loading-states", type: "applied-in", note: "Long-running tasks show progress; honest stages and estimates avoid the discouragement of a stalled bar." },
    { target: "feedback-principle", type: "related-to", note: "Progress feedback is feedback about the state of a task; its timing and pace shape whether people continue." },
    { target: "goal-setting-theory", type: "related-to", note: "Goal-setting theory concerns how goals are set; the goal gradient concerns how effort changes while pursuing one." },
    { target: "endowment-effect", type: "contrasts-with", note: "Despite the similar name, endowed progress concerns pre-completed steps toward a goal, not valuing what one owns." },
    { target: "deceptive-patterns", type: "applied-in", note: "Fake progress, inflated bars, moved goal posts and chance near-wins exploit the goal gradient." },
    { target: "user-autonomy", type: "related-to", note: "Reward proximity can pull people into purchases or play they would not choose; pause, exit and honest totals protect autonomy." },
  ],

  exercises: [
    {
      id: "goal-gradient-ex-identify",
      kind: "scenario",
      level: "beginner",
      title: "Name the mechanism",
      prompt: [
        "Illustrative scenario: a fitness app shows (a) 'Day 18 of 20' on a challenge; (b) a new 10-workout plan that starts with 2 workouts ticked because you logged them last week; (c) a weekly chart of minutes exercised; (d) a spinning prize wheel that often stops one slot away from the top prize.",
        "For each, say whether it relies on the goal gradient, endowed progress, progress monitoring or a near-miss, and whether the progress it shows is real.",
      ],
      deliverable: "A four-row table: element, mechanism, real or not, one-line reason.",
      criteria: [
        "Separates endowed progress (b) from the goal gradient (a)",
        "Identifies (c) as monitoring rather than a proximity effect",
        "Identifies (d) as a chance near-miss that carries no information about progress",
      ],
    },
    {
      id: "goal-gradient-ex-critique",
      kind: "critique",
      level: "intermediate",
      title: "Fix a progress bar that stalls in the middle",
      prompt: [
        "Illustrative scenario: an insurance claim flow has 9 screens. A bar fills by screen, but screens 4–7 (uploading documents and describing the incident) take about 80% of the time. Analytics show most abandonment on screen 5.",
        "Explain the problem using the non-monotonic gradient, the small-area findings and the progress-indicator experiments. Redesign the progress display and copy for the start, the middle and the end, and say how people can pause and return.",
      ],
      deliverable: "A short diagnosis and annotated sketches or copy for three moments in the flow.",
      criteria: [
        "Diagnoses the mismatch between the bar's unit (screens) and effort (time)",
        "Uses done-early, remaining-late framing without hiding either quantity",
        "Adds time estimates or named stages for the long middle",
        "Provides save-and-resume and an honest total",
      ],
    },
    {
      id: "goal-gradient-ex-evaluate",
      kind: "assignment",
      level: "advanced",
      title: "Audit a loyalty programme and design a test",
      prompt: [
        "A retailer wants to (1) start every new card with 3 of 12 stamps 'as a gift', (2) show an animation saying 'So close!' after purchases when the customer still needs 4 stamps, and (3) make stamps expire after 30 days of inactivity, shown only in the terms.",
        "Evaluate each proposal for honesty and for effects on customers' spending. Then design an experiment comparing the current card with a redesign of your own, with measures of completion, spending relative to the customer's previous baseline, understanding of the rules and complaints.",
        "State a decision rule under which you would not ship a variant even if it raises completion.",
      ],
      deliverable: "An audit table and a one-page test plan.",
      criteria: [
        "Accepts real, redeemable welcome stamps while rejecting any that do not count",
        "Rejects the misleading 'So close!' message and the hidden expiry",
        "Measures understanding and spending, not only completion",
        "States a decision rule based on customer benefit, not only revenue",
      ],
    },
  ],

  quiz: [
    {
      id: "goal-gradient-q-define",
      kind: "multiple-choice",
      level: "beginner",
      prompt: "Which statement best describes the goal-gradient effect?",
      options: [
        { text: "Effort or persistence tends to rise as a valued goal gets closer, under some conditions", correct: true, explanation: "It is a tendency observed in animals and people, not a guaranteed law." },
        { text: "People always work hardest at the start of a task", correct: false, explanation: "Motivation can be high at the start, but the effect describes the increase near the goal." },
        { text: "Any progress bar increases completion", correct: false, explanation: "Bars that show slow progress can increase abandonment." },
        { text: "People value things more once they own them", correct: false, explanation: "That is the endowment effect, a different phenomenon." },
      ],
      explanation: "The effect concerns change in effort with proximity to a goal people care about.",
    },
    {
      id: "goal-gradient-q-endowed",
      kind: "scenario",
      level: "intermediate",
      prompt: "A card needs 10 stamps. Version A is a plain 10-stamp card. Version B is a 12-stamp card with 2 real bonus stamps already filled. Customers with B finish faster. What does this illustrate?",
      options: [
        { text: "Endowed progress: starting with some progress done increased persistence toward the same 10 purchases", correct: true, explanation: "Both versions require 10 purchases; B only changes how much seems already done." },
        { text: "Progress monitoring, because customers can see the card", correct: false, explanation: "Both cards are equally visible; the difference is the starting point." },
        { text: "The endowment effect, because customers own the stamps", correct: false, explanation: "The endowed progress effect is about perceived task completion, not ownership value." },
        { text: "Social proof, because others also use the card", correct: false, explanation: "Nothing in the design refers to other people." },
      ],
      explanation: "Endowed progress manipulates the starting point; the goal gradient describes effort over the pursuit.",
    },
    {
      id: "goal-gradient-q-small-area",
      kind: "multiple-choice",
      level: "intermediate",
      prompt: "A learner is 85% through a course. According to the small-area hypothesis, which message is likely to motivate more?",
      options: [
        { text: "'15% to go'", correct: true, explanation: "Near the end, the remaining amount is the smaller area, so focusing on it makes progress feel faster." },
        { text: "'85% complete'", correct: false, explanation: "This focuses on the larger area; early in a course the 'done' framing would be the smaller area." },
        { text: "Both are equally motivating because the position is the same", correct: false, explanation: "The studies found that framing changed adherence at the same position." },
        { text: "Neither: showing progress always reduces motivation", correct: false, explanation: "Progress information can help or hurt depending on framing and expectations." },
      ],
      explanation: "Focus on whichever is smaller: done early, remaining late.",
    },
    {
      id: "goal-gradient-q-evidence",
      kind: "critique",
      level: "advanced",
      prompt: "A designer says: 'A meta-analysis of 138 studies proves the goal-gradient effect, so our progress bar will increase completion.' What is the best response?",
      options: [
        { text: "That meta-analysis shows progress-monitoring interventions help goal attainment; it does not test the goal gradient, and a specific bar can still discourage if it shows slow progress", correct: true, explanation: "Monitoring and goal gradient are different claims, and indicator effects depend on expectations." },
        { text: "Correct: the meta-analysis covers all progress indicators", correct: false, explanation: "It covers interventions that increase monitoring, not the shape of effort near a goal or any particular interface." },
        { text: "Wrong: progress bars never affect completion", correct: false, explanation: "Experiments with questionnaires found that indicator speed affected abandonment." },
        { text: "Correct, provided the bar is green", correct: false, explanation: "Colour is not the mechanism, and progress must not be conveyed by colour alone." },
      ],
      explanation: "Match the evidence to the claim, and test the specific indicator.",
    },
  ],

  flashcards: [
    { id: "goal-gradient-fc-1", front: "Goal-gradient effect", back: "Effort or persistence tends to rise as a valued goal nears. Originally Hull's hypothesis about animals; shown in people in reward programmes. Not a universal law." },
    { id: "goal-gradient-fc-2", front: "Stuck in the middle", back: "Motivation can be higher far from and close to a goal and lower halfway, depending on whether progress is judged from the start or from the end." },
    { id: "goal-gradient-fc-3", front: "Small-area hypothesis", back: "Focus on the smaller of done or remaining: 'done' early, 'remaining' late. It makes progress feel faster." },
    { id: "goal-gradient-fc-4", front: "Endowed progress vs goal gradient", back: "Endowed progress: starting with steps already complete increases persistence. Goal gradient: effort changes as the goal approaches." },
    { id: "goal-gradient-fc-5", front: "Honest progress checklist", back: "Real steps only; unit and total shown; pace matches reality; pause and exit; not colour alone; no chance near-wins shown as progress." },
  ],

  references: [
    { source: "hull-1932", role: "primary", note: "Origin of the goal-gradient hypothesis; not read, cited for the origin only." },
    { source: "kivetz-urminsky-zheng-2006", role: "primary", note: "Goal gradient in people: reward programmes, illusionary progress, goal-distance model; abstract only." },
    { source: "nunes-dreze-2006", role: "primary", note: "Endowed progress effect; abstract only." },
    { source: "bonezzi-brendl-de-angelis-2011", role: "primary", note: "Non-monotonic 'stuck in the middle' gradient; abstract only." },
    { source: "koo-fishbach-2012", role: "primary", note: "Small-area hypothesis; accumulated vs remaining progress; abstract only." },
    { source: "devine-et-al-2025", role: "primary", note: "Effort and attention to a progress bar near a goal; read in full." },
    { source: "dixon-et-al-2024", role: "primary", note: "Goal gradients and near-misses in Wordle; read in relevant sections." },
    { source: "conrad-et-al-2010", role: "primary", note: "Progress indicators and questionnaire completion; abstract only." },
    { source: "cheema-bagchi-2011", role: "primary", note: "Goal visualisation helps only near the goal; abstract only." },
    { source: "harkin-et-al-2016", role: "explanatory", note: "Meta-analysis of progress monitoring, not of the goal gradient; abstract only." },
  ],
  evidence: "peer-reviewed",
  evidenceNote:
    "The goal-gradient effect in people rests on field and online studies of reward programmes, a few laboratory tasks and a recent eye-tracking study read in full. Its shape is contested: a psychophysical account predicts a dip in the middle, and framing progress as done or remaining changes motivation at different stages. Most key papers were read as abstracts only, so their samples and effect sizes are not reported here, and Hull (1932) was not read. The meta-analysis of progress monitoring is evidence that monitoring helps goal attainment, not evidence for the goal gradient. Questionnaire experiments show that progress indicators can discourage as well as encourage. The design checklist, the near-miss distinction for chance outcomes and the ethical position on endowed progress are the academy's interpretation.",

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
