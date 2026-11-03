# Editorial style guide

UX Academy writes like a careful educator who has read the primary sources: **clear, precise, natural, approachable, confident without exaggeration, academically responsible.** It is an original house voice, not an imitation of any writer.

Enforced in part by `tests/editorial.test.ts`, which blocks stock phrases in content and UI and limits repeated templates. The test catches regressions. It cannot make prose good; editing does that.

## 1. Principles

| Principle | Weak | Better |
|---|---|---|
| **Lead with the idea** | "User experience is one of the most essential components of today's digital ecosystem." | "User experience describes how a person perceives and responds to using a product or service." |
| **Show the mechanism with a concrete case** | "Fitts's law helps create intuitive experiences." | "A large confirmation button next to the thumb is quicker to hit than a small icon in the far corner, because the distance-to-width ratio is lower." |
| **Prefer precise words** | powerful, seamless, intuitive, amazing | faster, fewer steps, lower error rate, easier to recognise — *only when supported* |
| **Say what is uncertain** | "Studies show users prefer…" | "In Iyengar and Lepper's jam study… later meta-analyses found the average effect near zero." |
| **Explain a term before relying on it** | "Reduce extraneous load." | "Reduce *extraneous load*, the effort spent on presentation rather than on the material itself." |

## 2. Never write

These are blocked by the editorial test. Do not swap one cliché for a synonym.

"In today's fast-paced digital world" · "Let's dive into / explore" · "delve" · "At its core" · "It is worth noting" · "ever-evolving landscape" · "Unlock the power" · "seamless(ly)" · "next level" · "comprehensive guide" · "Whether you're a beginner or an expert" · "In conclusion" · "game-changer" · "Navigate the complexities" · "revolutionary / cutting-edge / unparalleled / groundbreaking" · "It's important to understand that".

Also avoid, without a test enforcing it:
- Announcing importance instead of explaining.
- Restating a paragraph as an analogy that adds nothing.
- Ending sections with a summary of what was just said.
- Advertising UX Academy inside educational content.

`robust` is fine in its technical senses (robust statistics, WCAG's *Robust* principle, a robust replication). It is not fine as general praise.

## 3. Structure follows the subject

- **A law or formula:** the relationship → the variables → an example with numbers → where it fails.
- **A theory:** the claim → the mechanism → the evidence → competing accounts.
- **A method:** when to use it → the procedure → what it outputs → common mistakes.
- **A principle or heuristic:** what it asks of a design → examples and counter-examples → where it conflicts with other principles.

Do not open every entry with "X is a concept in UX that helps designers…". Vary the first sentence according to what the thing *is*.

**Analogies** must carry information the explanation does not. Open them with the situation itself ("Throwing a ball into a wide bucket at your feet is easy."), not a stock frame. The test allows at most three analogies that open "Think of", "It is like" or "Imagine".

**Rhythm:** mix short and long sentences. Use a numbered list only for real sequences, bullets only for genuinely parallel items, a table when there are two or more dimensions. Use at most one em dash per sentence; a colon or a full stop is often clearer.

## 4. Three voices

| Voice | Where | Rules | Examples |
|---|---|---|---|
| **Interface** | buttons, navigation, labels, system messages | Short, literal, action first, no marketing | "Browse the library" · "Open the lab" · "Save note" · "Reset" · "Show 24 more" · "Clear 2 filters" · "Choose a subject first" |
| **Educational** | concepts, lessons, exercises, quizzes | Define → mechanism → example → limits; introduce terms before use; never talk down | "The index of difficulty grows by one bit each time the distance doubles relative to the width." |
| **Editorial** | home, discovery sections, page ledes | Specific value, restrained confidence, real numbers only | "Not every 'law of UX' is a law." · "Experiments fit a line to your own clicks." |

**Empty states** say what is missing and what to do: "Nothing recorded yet. Progress, saved concepts and flashcards appear here once you start." **Errors** say what went wrong and how to fix it: "Width W must be greater than 0."

## 5. Accuracy is not negotiable

Natural style never overrides research integrity:
- Never invent authors, quotes, experiments, statistics, user stories, findings or outcomes.
- Label illustrative scenarios and examples as illustrative ("A hospital website…", "An illustrative interface").
- Keep attribution, DOIs, evidence classes, assumptions, limitations, standard versions and stated uncertainty intact when editing.
- Do not paraphrase a source so closely that it becomes a copy; write original explanations and link out.

## 6. Terminology

British English spelling (organise, colour, behaviour, centred). The product is "UX Academy". Content units are "entries" or "concepts"; "lessons" only inside paths. "Planned topic" means a topic with no researched entry yet; never describe it as content. Use the evidence class labels from `lib/content/labels.ts` verbatim. Formula symbols are set in mono (`D`, `W`, `ID`).

## 7. Audit log

| Date | Change |
|---|---|
| 2026-11-03 | Audit of all content strings and UI copy. Classic stock phrases: none found. Repeated template: 17 of 45 analogies opened "Think of…/It is like…", rewritten to open with the situation (meaning unchanged). Six beginner explanations open "When you…" (left as is: each is a concrete situation). UI ledes rebalanced to use fewer em dashes. The editorial test was added. |
