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
| D-017 | 2026-11-03 | v2: evolve Rubric into brand accent + 11 subject palettes; supersedes D-014's single-accent rule | Learners need wayfinding across 20 subjects; colour is restricted to identity/illustration and never encodes evidence | Per-concept colours (Laws of UX) — weaker as a system; status-quo single accent — no wayfinding |
| D-018 | 2026-11-03 | Illustrations are explanatory "plates" (atlas-style diagrams with annotations), original SVG | Ownable and educational: shows the mechanism; distinct from Laws of UX's abstract glyphs | Abstract emblems; stock imagery; icon sets |
| D-019 | 2026-11-03 | Plates colour via CSS variables only, server-rendered, passed to client components as nodes | Zero client JS for art; recolourable by context; renderable standalone for QA | Tailwind classes in SVG; client-side registry |
| D-020 | 2026-11-03 | Subject washes mixed from `--paper` with `color-mix` | Dark theme gets designed tints automatically | Separate hand-picked dark washes per family |
| D-021 | 2026-11-03 | Learning paths adopt Levels → Lessons → Level test with derived counts and a dedicated lesson route | Uxcel-like clarity of progression without inventing data | Article-style path pages |
| D-022 | 2026-11-03 | Library filter state mirrored with `history.replaceState` | Shareable URLs without RSC navigations or effect loops | `router.replace` (v1) |
| D-023 | 2026-11-03 | Hover is border/background only — no transform | A 2px lift moved click targets under the pointer | Lift on hover |
| D-024 | 2026-11-03 | Base rule `.grid { grid-template-columns: minmax(0,1fr) }` | Implicit `auto` tracks let unbreakable content widen phone layouts (found at 1336px) | Patching each grid |
| D-025 | 2026-11-03 | Explorers and curves call only `lib/formulas` (added `peakEnd`, `chunk` with tests) | One tested implementation of every quantity | Inline maths in components |
