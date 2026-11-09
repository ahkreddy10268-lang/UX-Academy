/**
 * The seven moments of an AI interaction. The organisation is AX Patterns'
 * (axpatterns.design, credited on /ai); the wording here is UX Academy's own.
 */
import type { AiMoment } from "../../lib/content/ai";

export const aiMoments: AiMoment[] = [
  { id: "discover", n: 1, title: "Discover", question: "What can this AI do for me?", summary: "Before anyone types, they need to know that AI is available here, what it is good at and what it cannot do, so their first request has a reasonable chance of working.", risk: "People either never find the feature or expect it to do things it cannot, and the first failure ends their trust." },
  { id: "ask", n: 2, title: "Ask", question: "How do I tell it what I want?", summary: "Turning an intention into a request: typing, speaking, attaching files or pointing at content, with enough context for the system to act on it.", risk: "Requests are vague or missing context, so the output misses, and people blame themselves or the tool without knowing how to improve the request." },
  { id: "wait", n: 3, title: "Wait", question: "Is it still working, and can I stop it?", summary: "Generative models take noticeable time. Waiting is designed: what the system shows while it processes and generates, and how people stay in control during it.", risk: "A silent pause reads as a failure; a long answer that cannot be stopped wastes time and attention." },
  { id: "read", n: 4, title: "Read", question: "What did it produce, and where did it come from?", summary: "Presenting output so it can be read, checked and used: clear labelling of AI content, structure, sources, and interfaces generated for the task.", risk: "Fluent text is taken as fact; people cannot tell AI-written from human-written content or trace a claim to its source." },
  { id: "refine", n: 5, title: "Refine", question: "How do I make the result better?", summary: "Few first results are final. Refining covers follow-up suggestions, regenerating, comparing versions, branching and editing the output directly.", risk: "The only way to improve a result is to start again from a blank prompt, so people accept a mediocre answer or give up." },
  { id: "trust", n: 6, title: "Trust", question: "Can I rely on this?", summary: "Calibrating trust: explaining what the system did and why, handling errors and refusals honestly, and showing limits so people rely on it as much as it deserves and no more.", risk: "Over-trust leads people to act on wrong output; under-trust means a useful system goes unused." },
  { id: "delegate", n: 7, title: "Delegate", question: "Can it act for me, safely?", summary: "When AI acts rather than answers (booking, sending, changing data), people need to see what it intends to do, approve consequential steps and follow or stop the work.", risk: "An agent takes an irreversible action the person did not intend, or works out of sight until something goes wrong." },
];
