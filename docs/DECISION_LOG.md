# Decision log

| # | Date | Decision | Why | Alternatives considered |
|---|---|---|---|---|
| D-001 | 2026-11-03 | Next.js 16 App Router, static prerender of every route | Content-rich, read-heavy, personal; no server needed; RSC keeps content off the client | Astro (great for content, weaker for the many interactive client tools); Vite SPA (no prerendered HTML) |
| D-002 | 2026-11-03 | Content as typed TS modules validated by zod — not MDX or a CMS | Entries are highly structured (≈60 fields); type-checking + runtime validation + cross-reference tests are worth more than prose ergonomics | MDX with frontmatter (weak structure), headless CMS (account, network, cost) |
| D-003 | 2026-11-03 | Tiny custom rich-text syntax (`**`, `*`, `` ` ``, `[[slug]]`, `{{src:id}}`) | Validated links and citations; no HTML injection; easy to author | Markdown (unvalidated links), HTML (unsafe) |
| D-004 | 2026-11-03 | Machine source verification via Crossref, stored separately from authoring claims | Never present a citation as verified unless it was checked; UI shows machine status | Trusting authored metadata; manual checks only |
| D-005 | 2026-11-03 | No numeric confidence scores; 8 evidence classes + written evidence note | Spec forbids indefensible numbers | Star ratings, 0–100 scores |
| D-006 | 2026-11-03 | Local-first store in one versioned localStorage document; JSON + Markdown export | Private, portable, no accounts | IndexedDB (more complex for this size), backend sync (out of scope) |
| D-007 | 2026-11-03 | Primary nav by activity (Learn, Library, Formula Lab, Labs, Practice, Graph, Glossary); subjects inside Library | 15 top-level items would be illegible and mix "how" with "what" | Mega-menu of 20 subjects (heavy), spec's 15 items |
| D-008 | 2026-11-03 | Planned topics get real URLs with an honest placeholder page | Links never break as content is written; no fake content | 404 until written; hiding planned topics |
| D-009 | 2026-11-03 | Taxonomy item type is overridden by the written entry's `primaryType` | The researched classification is authoritative (e.g. Doherty threshold → rule of thumb) | Keeping the two in sync by hand |
| D-010 | 2026-11-03 | Calculators implemented as pure functions + tests; UI never computes | Spec requires verified formulas; separation makes tests meaningful | Inline computation in components |
| D-011 | 2026-11-03 | Statistics distributions implemented in-house (erf, Acklam inverse normal, incomplete-beta t) | Avoid a dependency; verified against tables to ≥4 dp | jStat / simple-statistics |
| D-012 | 2026-11-03 | Labs measure the learner (Fitts, Hick, serial position, cognitive load) instead of using canned data | Spec forbids hardcoded results; personal data makes the science tangible | Simulated data |
| D-013 | 2026-11-03 | Seed content written in parallel by 9 discipline-scoped agents with a gold-standard entry, shared schema, tests and DOI verification as guardrails; integrated and re-verified centrally | Independent research streams; consistent quality via executable gates | Sequential writing (much slower) |
| D-014 | 2026-11-03 | Design language: "rubric" — one red accent, Newsreader + IBM Plex, near-square radii, borders over shadows | Academic/editorial authority; colour carries meaning | Neutral SaaS aesthetic; multi-colour category coding |
| D-015 | 2026-11-03 | The single theme source is `app/globals.css` (no prior design system existed; greenfield) | One place for values, light/dark coherence | Tokens JSON + build step (premature) |
| D-016 | 2026-11-03 | Contrast lab defaults to a passing pair; failing example behind a button | The page itself must conform to WCAG while still teaching failure | Failing default (axe violation) |
