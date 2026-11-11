# Design Systems curriculum — Phase 1 research programme

> Status: **Phase 1 complete (research and blueprint), 2026-11-10.** No content, code, taxonomy or dependency changes were made in this phase. Branch `claude/pensive-cannon-t1o6sy`, starting commit `6b37b10`.

## Purpose

Plan a complete, evidence-backed programme that teaches the discipline of design systems across all 29 topics of the frozen `design-systems` domain: what each concept is, the principles and rules behind it, how to apply it, what good and poor implementations look like, how to correct them, when not to use them, and how to lead the work.

## Two things kept apart

- **The educational curriculum** (this package) lives in `/topics/design-systems`, `/library/[slug]`, `/learn/design-systems`, labs and practice.
- **UX Academy's own design system** lives in `/system` (24 documents: 8 foundations, 10 components, 6 patterns). It is used as a real case study in lessons, never merged with or replaced by the curriculum.

## Scope: 29 topics

| Subcategory | Topics | Published | Planned |
|---|---|---:|---:|
| System foundations | design-system, atomic-design, design-language, design-tokens, primitive-tokens, semantic-tokens, theme-architecture, multi-brand-systems | 2 | 6 |
| Scales & visual systems | spacing-scales, typography-scales, colour-systems, elevation-systems, icon-systems, responsive-systems | 0 | 6 |
| Components & patterns | component-libraries, component-architecture, variants, component-properties, component-state-management, data-tables, empty-states, loading-states, error-states, skeleton-screens, progressive-loading | 0 | 11 |
| Governance & operations | design-governance, design-system-versioning, design-qa, design-system-audits | 0 | 4 |
| **Total** | | **2** | **27** |

All IDs match `content/taxonomy.ts` and the generated `docs/KNOWLEDGE_TAXONOMY.md`.

## Method

1. Audited the live repository: taxonomy, learning path, the two published entries, entry schema and completeness gates, source registry, `/system` docs, labs and workshops.
2. Read the official documentation of nine reference systems (UX4G 3.0, GOV.UK, Carbon, Atlassian, Spectrum 2, Fluent 2, USWDS, Apple HIG, Material 3) and three authorities (DTCG 2025.10, WCAG 2.2, WAI-ARIA APG). Pages that rendered client-side were read with a headless browser or the publisher's data endpoints. Every finding names its page; unreadable pages are listed as gaps.
3. Designed the curriculum, lesson specification, practice plan, source plan and roadmap from the evidence, keeping vendor practice separate from standards.

## Documents

| File | Contents |
|---|---|
| [REFERENCE_AUDIT.md](REFERENCE_AUDIT.md) | The nine systems and three standards: architecture, documentation, tokens, components, patterns, good/bad examples, accessibility, governance, strengths, limits, what transfers and what does not |
| [TOPIC_RESEARCH_MATRIX.md](TOPIC_RESEARCH_MATRIX.md) | All 29 topics: purpose, concepts, principles and labelled rules, use/non-use, comparison, correction, sources, dependencies, visuals, assessment, Academy links |
| [CURRICULUM_ARCHITECTURE.md](CURRICULUM_ARCHITECTURE.md) | Five-stage programme with dependency map, outcomes, practice, completion and capstone contributions |
| [TOPIC_LESSON_SPECIFICATION.md](TOPIC_LESSON_SPECIFICATION.md) | The reusable lesson blueprint mapped onto the existing entry schema, with the good/poor/correction structure |
| [PRACTICE_AND_INTERACTION_PLAN.md](PRACTICE_AND_INTERACTION_PLAN.md) | Nine labs, workshops and the capstone, with flows, outputs, evaluation and limits |
| [SOURCE_AND_EVIDENCE_PLAN.md](SOURCE_AND_EVIDENCE_PLAN.md) | Evidence hierarchy, records to reuse, proposed new records, topic-to-source map, open research questions |
| [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) | Eight batches with files, dependencies, tests and acceptance criteria |

## Discrepancies found

1. **Learning path coverage:** the current `design-systems` path places 22 of the 29 topics; `elevation-systems`, `icon-systems`, `responsive-systems`, `data-tables`, `loading-states`, `skeleton-screens` and `progressive-loading` are missing.
2. **Scope overlaps to manage, not merge:** `icon-systems` vs `iconography` (Visual); `error-states` vs `error-messages` (UX Writing) and `error-prevention`/`error-recovery` (Interaction); `component-state-management` vs `interaction-states`/`state-transitions` (Interaction); `typography-scales` vs `modular-type-scale` (published); `responsive-systems` vs three planned responsive topics. Boundaries are written into the matrix.
3. **Name ambiguity:** "Component State Management" means UI states in this taxonomy, not application data stores; the entry must say so.
4. **Gate fit:** most topics are typed `concept`, whose completeness gate expects replication evidence; design-system practice is documented, not experimental (see lesson specification §5–6).
5. **Registry check:** `dtcg-format-2025` lists five authors; the 2025.10 index names six editors. Verify before the next citation.
6. **Reference inconsistencies (dated findings, useful for the Audits topic):** UX4G cites WCAG 2.5.5 under an AA claim (it is AAA); Fluent 2's large-text figure (18.5 px bold) differs from WCAG's definition; USWDS pages reference different WCAG versions.

## Decisions needed from the owner

1. ~~Approve the five-stage path restructure~~ — approved and applied in session 34 (D-122); see [PATH_RESTRUCTURE_PROPOSAL.md](PATH_RESTRUCTURE_PROPOSAL.md).
2. ~~Optional `practice` block~~ — approved and built (D-113).
3. Consider a "practice concept" completeness family for design-system concepts.
4. Prefer page-level source records or root records with precise notes.

## Next phase

Stages 1–3 are published (Batches 1–4) and Stage 4 concepts (Batch 5). Next: Batch 6, the Stage 4 state patterns (see docs/PROGRESS.md).
