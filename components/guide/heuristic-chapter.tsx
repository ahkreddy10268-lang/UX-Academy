/**
 * One heuristic chapter of a guide (D-127). The guide supplies the narrative,
 * the mockups and the checklist; the depth (analogy, scenario, practice rules,
 * implementation, platform notes, misconceptions, knowledge check, exercise)
 * is read from the heuristic's published entry by slug, or from the guide's
 * own block when the heuristic has no entry. Server component.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { MockScreen } from "@/components/guide/mock-screen";
import { GuideDemo } from "@/components/guide/demos";
import { Quiz, type QuizItem } from "@/components/practice/quiz";
import { Callout } from "@/components/ui/callout";
import { Checklist, DoDont } from "@/components/ui/doc-layout";
import { Rich, type RichContext } from "@/components/ui/rich";
import type { GuideHeuristic } from "@/lib/content/guide";
import type { Exercise, KnowledgeEntry } from "@/lib/content/schema";
import { linkMapFor } from "@/lib/content/context";

export type ChapterData = {
  analogy?: string;
  scenario?: string;
  dos: string[];
  donts: string[];
  implementation: string[];
  web: string[];
  mobile: string[];
  enterprise: string[];
  mistakes: { myth: string; reality: string }[];
  quiz?: QuizItem;
  exercise?: Exercise;
  source: { slug: string; title: string; dedicated: boolean };
};

/** Collect a chapter's entry-derived parts (or the guide's own block for a heuristic without an entry). */
export function chapterData(h: GuideHeuristic, entryBySlug: Map<string, KnowledgeEntry>): ChapterData {
  if (h.own) {
    const host = entryBySlug.get(h.addressedIn!)!;
    return {
      ...h.own,
      quiz: { ...h.own.quiz, entry: host.slug, entryTitle: host.title },
      source: { slug: host.slug, title: host.title, dedicated: false },
    };
  }
  const e = entryBySlug.get(h.entry!)!;
  const q = h.check ? e.quiz.find((x) => x.id === h.check) : undefined;
  return {
    analogy: e.levels.beginner.analogy,
    scenario: e.levels.intermediate.scenarios[0],
    dos: e.practice?.dos.map((d) => d.text) ?? e.whenToUse,
    donts: e.practice?.donts.map((d) => d.text) ?? e.whenNotToUse,
    implementation: e.levels.intermediate.implementation,
    web: e.application.web,
    mobile: e.application.mobile,
    enterprise: e.application.enterprise,
    mistakes: e.misconceptions,
    quiz: q ? { ...q, entry: e.slug, entryTitle: e.title } : undefined,
    exercise: h.exercise ? e.exercises.find((x) => x.id === h.exercise) : undefined,
    source: { slug: e.slug, title: e.title, dedicated: true },
  };
}

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="t-sub text-base">{title}</h4>
      {children}
    </div>
  );
}

function RichList({ items, ctx, ordered = false }: { items: string[]; ctx: RichContext; ordered?: boolean }) {
  const T = ordered ? "ol" : "ul";
  return (
    <T className={`max-w-read space-y-1.5 pl-5 text-sm leading-relaxed text-ink ${ordered ? "list-decimal marker:font-mono marker:text-ink-3" : "list-disc marker:text-ink-3"}`}>
      {items.map((t, i) => (
        <li key={i}>
          <Rich text={t} ctx={ctx} />
        </li>
      ))}
    </T>
  );
}

export function ExerciseBlock({ ex, ctx }: { ex: Exercise; ctx: RichContext }) {
  return (
    <div className="rounded-md border border-rule bg-surface p-4">
      <p className="label">Exercise · {ex.kind} · {ex.level}</p>
      <p className="t-sub mt-1 text-base">{ex.title}</p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink">
        {ex.prompt.map((p, i) => (
          <p key={i}>
            <Rich text={p} ctx={ctx} />
          </p>
        ))}
      </div>
      {ex.deliverable && (
        <p className="mt-2 text-sm text-ink-2">
          <span className="font-semibold text-ink">Deliverable: </span>
          {ex.deliverable}
        </p>
      )}
      {ex.criteria.length > 0 && (
        <div className="mt-3">
          <p className="label">A good answer</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-2">
            {ex.criteria.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}
      {ex.exampleSolution && ex.exampleSolution.length > 0 && (
        <details className="mt-3 rounded-sm border border-rule bg-soft px-3 py-2">
          <summary className="tap cursor-pointer text-sm font-medium text-ink">Show an example solution</summary>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink">
            {ex.exampleSolution.map((p, i) => (
              <p key={i}>
                <Rich text={p} ctx={ctx} />
              </p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

export function HeuristicChapter({ h, data, names, ctx }: { h: GuideHeuristic; data: ChapterData; names: Record<number, string>; ctx: RichContext }) {
  const id = `h${h.n}`;
  const platforms = [
    ["Web", data.web],
    ["Mobile", data.mobile],
    ["Enterprise and complex tools", data.enterprise],
  ].filter(([, v]) => (v as string[]).length > 0) as [string, string[]][];
  return (
    <section aria-labelledby={id} className="scroll-mt-24 border-t border-rule pt-10">
      <p className="label">Heuristic {h.n} of 10</p>
      <h3 id={id} className="t-section mt-1 text-[1.5rem]">
        {h.name}
      </h3>
      <p className="t-lede mt-2 max-w-read text-lg">{h.oneLiner}</p>

      <div className="mt-6 space-y-8">
        <Part title="What it means in everyday terms">
          <p className="max-w-read text-read leading-relaxed">
            <Rich text={h.everyday} ctx={ctx} />
          </p>
          {data.analogy && (
            <Callout landmark={false} role="analogy">
              <p className="text-sm leading-relaxed">
                <Rich text={data.analogy} ctx={ctx} />
              </p>
            </Callout>
          )}
        </Part>

        <div className="grid gap-6 md:grid-cols-2">
          <Part title="Why it exists">
            <p className="text-sm leading-relaxed text-ink">
              <Rich text={h.why} ctx={ctx} />
            </p>
          </Part>
          <Part title="The psychology behind it">
            <p className="text-sm leading-relaxed text-ink">
              <Rich text={h.psychology} ctx={ctx} />
            </p>
          </Part>
        </div>

        <Part title="How people behave when it is missing">
          <p className="max-w-read text-sm leading-relaxed text-ink">
            <Rich text={h.behaviour} ctx={ctx} />
          </p>
        </Part>

        <Part title="Poor and better, side by side">
          <div className="grid gap-6 md:grid-cols-2">
            {([
              ["bad", h.bad],
              ["good", h.good],
            ] as const).map(([v, ex]) => (
              <div key={v} className="min-w-0 space-y-2">
                <MockScreen mock={ex.mock} verdict={v} label={ex.title} />
                <p className="text-sm leading-relaxed text-ink-2">
                  <Rich text={ex.description} ctx={ctx} />
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-3">Illustrative interfaces drawn for this guide; not screenshots of real products.</p>
        </Part>

        {h.demo && (
          <Part title="Try it">
            <p className="max-w-read text-sm text-ink-2">A working simulation. Switch between the two versions and use the controls; outcomes are announced to screen readers. Timings are illustrative.</p>
            <GuideDemo id={h.demo} />
          </Part>
        )}

        <Part title="What it costs when it is ignored">
          <RichList items={h.consequences} ctx={ctx} />
        </Part>

        {data.scenario && (
          <Callout landmark={false} role="example" label="A realistic scenario">
            <p className="text-sm leading-relaxed">
              <Rich text={data.scenario} ctx={ctx} />
            </p>
          </Callout>
        )}

        <Part title="Do and don't">
          <DoDont good={data.dos.map((t, i) => <Rich key={i} text={t} ctx={ctx} />)} poor={data.donts.map((t, i) => <Rich key={i} text={t} ctx={ctx} />)} />
        </Part>

        {data.implementation.length > 0 && (
          <Part title="Implementation guidance">
            <RichList items={data.implementation} ctx={ctx} ordered />
          </Part>
        )}

        {platforms.length > 0 && (
          <Part title="Web, mobile and enterprise">
            <div className="grid gap-4 md:grid-cols-3">
              {platforms.map(([label, items]) => (
                <div key={label} className="min-w-0 rounded-md border border-rule bg-surface p-4">
                  <p className="label">{label}</p>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink">
                    {items.map((t, i) => (
                      <li key={i}>
                        <Rich text={t} ctx={ctx} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Part>
        )}

        <Part title="Accessibility">
          <RichList items={h.accessibility} ctx={ctx} />
        </Part>

        {data.mistakes.length > 0 && (
          <Part title="Common misreadings">
            <div className="space-y-3">
              {data.mistakes.map((m, i) => (
                <Callout landmark={false} key={i} role="misconception">
                  <p className="text-sm font-semibold text-ink">
                    <Rich text={m.myth} ctx={ctx} />
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">
                    <Rich text={m.reality} ctx={ctx} />
                  </p>
                </Callout>
              ))}
            </div>
          </Part>
        )}

        <Part title="How it relates to the other heuristics">
          <ul className="space-y-2 text-sm leading-relaxed">
            {h.related.map((r) => (
              <li key={r.n} className="grid gap-0.5 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-4">
                <a href={`#h${r.n}`} className="link font-medium">
                  {r.n}. {names[r.n]}
                </a>
                <span className="min-w-0 text-ink-2">
                  <Rich text={r.difference} ctx={ctx} />
                </span>
              </li>
            ))}
          </ul>
        </Part>

        <Part title="Review checklist">
          <Checklist items={h.checklist} />
        </Part>

        {data.quiz && (
          <Part title="Check your understanding">
            <Quiz questions={[data.quiz]} links={linkMapFor(data.quiz)} />
          </Part>
        )}

        {data.exercise && (
          <Part title="Apply it">
            <ExerciseBlock ex={data.exercise} ctx={ctx} />
          </Part>
        )}

        <p className="text-sm text-ink-2">
          {data.source.dedicated ? "Full entry, with origin, evidence and sources: " : "No dedicated entry yet; this heuristic is addressed within "}
          <Link href={`/library/${data.source.slug}`} className="link font-medium">
            {data.source.title}
          </Link>
          {data.source.dedicated ? "" : "."}
        </p>
      </div>
    </section>
  );
}
