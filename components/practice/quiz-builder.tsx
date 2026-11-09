"use client";

import { useState } from "react";
import type { LinkInfo } from "@/components/ui/rich";
import { useLearner } from "@/lib/store/store";
import { Quiz, type QuizItem } from "./quiz";

type Q = QuizItem & { domain: string };

export function QuizBuilder({ questions, links, domains }: { questions: Q[]; links: Record<string, LinkInfo>; domains: { id: string; title: string }[] }) {
  const [domain, setDomain] = useState("");
  const [level, setLevel] = useState("");
  const [count, setCount] = useState(10);
  const [focus, setFocus] = useState<"all" | "missed" | "new">("all");
  const [session, setSession] = useState<Q[] | null>(null);
  const history = useLearner((s) => s.quiz);

  const pool = questions.filter((q) => {
    if (domain && q.domain !== domain) return false;
    if (level && q.level !== level) return false;
    if (focus === "missed" && !(history[q.id] && !history[q.id].lastCorrect)) return false;
    if (focus === "new" && history[q.id]) return false;
    return true;
  });

  if (session)
    return (
      <div>
        <button type="button" onClick={() => setSession(null)} className="mb-4 text-sm text-ink-2 underline">
          ← Change quiz settings
        </button>
        <Quiz key={session.map((q) => q.id).join()} questions={session} links={links} showSource />
      </div>
    );

  const select = "mt-1 h-10 w-full rounded-sm border border-line-control bg-surface px-2";
  return (
    <form
      className="space-y-5 rounded-sm border border-rule bg-surface p-6"
      onSubmit={(e) => {
        e.preventDefault();
        const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
        setSession(shuffled);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Subject
          <select className={select} value={domain} onChange={(e) => setDomain(e.target.value)}>
            <option value="">All subjects (interleaved)</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Level
          <select className={select} value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Questions
          <select className={select} value={count} onChange={(e) => setCount(Number(e.target.value))}>
            {[5, 10, 20, 40].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Focus
          <select className={select} value={focus} onChange={(e) => setFocus(e.target.value as "all")}>
            <option value="all">Any question</option>
            <option value="new">Only questions I haven&apos;t seen</option>
            <option value="missed">Only questions I last got wrong</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
        <p className="text-sm text-ink-2" aria-live="polite">
          {pool.length} matching {pool.length === 1 ? "question" : "questions"}
        </p>
        <button disabled={!pool.length} className="btn btn-primary">
          Start quiz
        </button>
      </div>
    </form>
  );
}
