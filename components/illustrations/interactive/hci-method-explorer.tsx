"use client";
/**
 * HCI research-method selector (Level 3). A decision aid, not a simulation: it
 * pairs a research question with the method that usually answers it, and states
 * the evidence the method produces, its limits and a method to pair it with.
 * Nothing is computed. Sources are ids from the entry's own references (tested in
 * tests/hci.test.ts).
 */
import { useId, useState } from "react";

export type HciMethodQuestion = {
  id: string;
  question: string;
  method: string;
  fits: string;
  evidence: string;
  limits: string;
  pair: string;
  sources: string[];
};

export const HCI_METHOD_QUESTIONS: HciMethodQuestion[] = [
  {
    id: "compare",
    question: "Which of two designs is faster and less error-prone for the same task?",
    method: "Controlled comparison (experiment)",
    fits: "The question compares conditions on a measure, so participants complete the same tasks on each design while time and errors are recorded.",
    evidence: "Measured times and error counts, analysed statistically for the tasks and participants chosen.",
    limits: "The result holds for the tasks, sample and apparatus used; it says little about why people differ or how the design fits real settings.",
    pair: "A field trial or observation to check the finding in real use.",
    sources: ["mackenzie-2013", "lazar-feng-hochheiser-2017"],
  },
  {
    id: "stuck",
    question: "Where do first-time users get stuck, and why?",
    method: "Usability test with think-aloud",
    fits: "People attempt realistic tasks while an observer watches and, if asked, they say what they are thinking, which shows both the difficulty and the reasoning.",
    evidence: "Observed difficulties and errors, with the participants' own explanations.",
    limits: "Small samples and artificial tasks; speaking aloud can change how people perform the task.",
    pair: "A survey or analytics to learn how widespread a problem is.",
    sources: ["nielsen-1993", "ericsson-simon-1993"],
  },
  {
    id: "fit",
    question: "How does the system fit what people actually do at work?",
    method: "Field study or contextual inquiry",
    fits: "The question is about practice in a setting, which is best seen where the work happens, with people doing real tasks.",
    evidence: "Observed sequences, interruptions, workarounds and artefacts in use, with the people's explanations.",
    limits: "Slow, covers few sites and people, and the observer may affect behaviour; it does not give statistical generalisation.",
    pair: "A survey or usage logs across sites to see how typical the observations are.",
    sources: ["beyer-holtzblatt-1998", "suchman-1987"],
  },
  {
    id: "common",
    question: "How common is a problem or an attitude across many users?",
    method: "Survey",
    fits: "A structured questionnaire reaches many people cheaply and lets you count how often something is reported.",
    evidence: "Self-reported answers from a sample, summarised as counts and comparisons.",
    limits: "What people report can differ from what they do; results depend on who responds and on how questions are worded.",
    pair: "Interviews or observation to understand the reasons behind the numbers.",
    sources: ["lazar-feng-hochheiser-2017"],
  },
  {
    id: "needs",
    question: "What do people need, think and want, in their own words?",
    method: "Interviews",
    fits: "A conversation lets people explain their goals, reasons and vocabulary and lets the researcher follow up.",
    evidence: "Accounts, reasons and language from a small number of people.",
    limits: "Self-report and memory are imperfect, the interviewer can influence answers, and samples are small.",
    pair: "Observation of the same people in use, to compare what they say with what they do.",
    sources: ["lazar-feng-hochheiser-2017"],
  },
  {
    id: "time",
    question: "How does an experience change over days or weeks in daily life?",
    method: "Diary study",
    fits: "Participants record events or feelings as they happen over time, so the researcher sees change without being present.",
    evidence: "Participants' own records over time, in situ.",
    limits: "It asks a lot of participants, some drop out, and entries can be incomplete or biased by what people choose to record.",
    pair: "An interview at the end to discuss entries and fill the gaps.",
    sources: ["carter-mankoff-2005", "lazar-feng-hochheiser-2017"],
  },
  {
    id: "decide",
    question: "How can the people affected help decide the design?",
    method: "Participatory design workshop",
    fits: "The aim is to involve the people who will use or be affected by the system in design decisions, not only to gather their opinions.",
    evidence: "Design ideas, priorities and decisions produced with the participants.",
    limits: "Outcomes depend on who takes part and on power in the room; it does not measure performance.",
    pair: "Usability testing of what the group produces.",
    sources: ["muller-kuhn-1993"],
  },
  {
    id: "predict",
    question: "Roughly how long would an expert take, before anything is built?",
    method: "Predictive model (keystroke-level model, GOMS)",
    fits: "The question is about expert, routine task time, which models built from sequences of actions can estimate without recruiting users.",
    evidence: "A predicted task time for expert, error-free performance.",
    limits: "It does not cover novices, errors, learning or whether people will adopt the design.",
    pair: "A usability test with real users to check the predictions and see what the model leaves out.",
    sources: ["card-moran-newell-1983"],
  },
];

export function HciMethodExplorer() {
  const name = useId();
  const [pick, setPick] = useState(HCI_METHOD_QUESTIONS[0].id);
  const q = HCI_METHOD_QUESTIONS.find((x) => x.id === pick)!;
  return (
    <section aria-label="HCI research method selector" className="overflow-hidden rounded-xl border border-rule bg-surface shadow-card">
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <fieldset className="min-w-0 border-b border-rule bg-c-wash p-5 md:border-b-0 md:border-r">
          <legend className="label mb-3">Explore · choose a research question</legend>
          <div className="space-y-1.5">
            {HCI_METHOD_QUESTIONS.map((x) => (
              <label key={x.id} className={`tap flex cursor-pointer items-start gap-2.5 rounded-md border px-3 py-2 text-sm ${pick === x.id ? "border-accent bg-surface text-ink" : "border-transparent text-ink-2 hover:bg-surface/60"}`}>
                <input type="radio" name={name} checked={pick === x.id} onChange={() => setPick(x.id)} className="mt-1" />
                <span>{x.question}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div aria-live="polite" className="space-y-3 p-5 text-sm">
          <p className="label">Method that usually fits</p>
          <p className="t-sub text-lg text-ink">{q.method}</p>
          <dl className="space-y-2.5">
            <div>
              <dt className="font-semibold text-ink">Why it fits</dt>
              <dd className="text-ink-2">{q.fits}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Evidence it produces</dt>
              <dd className="text-ink-2">{q.evidence}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Limits</dt>
              <dd className="text-ink-2">{q.limits}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Pair it with</dt>
              <dd className="text-ink-2">{q.pair}</dd>
            </div>
          </dl>
        </div>
      </div>
      <dl className="grid gap-4 border-t border-rule bg-soft p-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="t-sub text-ink">What this shows</dt>
          <dd className="mt-1 text-ink-2">Which method usually answers which kind of question, and what evidence each can and cannot give. It is a decision aid, not a simulation.</dd>
        </div>
        <div>
          <dt className="t-sub text-ink">Assumptions</dt>
          <dd className="mt-1 text-ink-2">The questions are simplified. Real studies depend on the sample, resources and ethics, and usually combine methods.</dd>
        </div>
        <div>
          <dt className="t-sub text-ink">What this cannot show</dt>
          <dd className="mt-1 text-ink-2">The right method for your project, or how to run any method well. The research-methods textbooks cited in the entry cover that.</dd>
        </div>
      </dl>
    </section>
  );
}
