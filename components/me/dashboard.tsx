"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import { actions, exportJson, isDue, parseImport, useLearner, type LearnerState } from "@/lib/store/store";

export type EntryMeta = { title: string; prerequisites: string[]; domain: string; summary?: string; planned?: boolean };

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

const noopSubscribe = () => () => {};
let pageLoadedAt: number | undefined;
/** Client-only clock snapshot, fixed for the life of the page so renders stay pure. */
const clientNow = () => (pageLoadedAt ??= Date.now());

const day = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Recommend entries whose prerequisites are complete but which are not themselves complete. */
function recommend(s: LearnerState, meta: Record<string, EntryMeta>, paths: { id: string; title: string; steps: string[] }[]) {
  const done = (slug: string) => Boolean(s.progress[slug]?.completedAt);
  const ready = Object.entries(meta)
    .filter(([slug, m]) => !m.planned && !done(slug) && m.prerequisites.every((p) => done(p) || meta[p]?.planned))
    .map(([slug]) => slug);
  // Prefer next steps on paths the learner has started.
  const started = paths.filter((p) => p.steps.some((x) => s.progress[x]));
  const fromPaths = started.flatMap((p) => p.steps.filter((x) => !done(x)).slice(0, 1).map((x) => ({ slug: x, reason: `Next in ${p.title}` })));
  const prereqReady = ready
    .filter((x) => meta[x].prerequisites.length && meta[x].prerequisites.some(done))
    .map((x) => ({ slug: x, reason: `You've completed its prerequisites` }));
  const out = [...fromPaths, ...prereqReady];
  if (!out.length) out.push(...(paths[0]?.steps.slice(0, 3).map((x) => ({ slug: x, reason: "A good place to start" })) ?? []));
  const seen = new Set<string>();
  return out.filter((r) => (seen.has(r.slug) ? false : (seen.add(r.slug), true))).slice(0, 5);
}

export function Dashboard({ meta, paths, questionEntry }: { meta: Record<string, EntryMeta>; paths: { id: string; title: string; steps: string[] }[]; questionEntry: Record<string, string> }) {
  const s = useLearner((x) => x);
  const fileInput = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState("");
  const now = useSyncExternalStore(noopSubscribe, clientNow, () => 0);

  const completed = Object.entries(s.progress).filter(([, p]) => p.completedAt);
  const dueCards = Object.values(s.cards).filter(isDue).length;
  const missed = [...new Set(Object.entries(s.quiz).filter(([, q]) => !q.lastCorrect).map(([id, q]) => q.entry ?? questionEntry[id]))].filter((x) => meta[x]);
  const staleCompleted = completed.filter(([, p]) => now > 0 && now - Date.parse(p.completedAt!) > 14 * 864e5).map(([slug]) => slug);
  const recs = recommend(s, meta, paths);
  const notes = Object.entries(s.notes).sort(([, a], [, b]) => b.updatedAt.localeCompare(a.updatedAt));
  const bookmarks = Object.entries(s.bookmarks).sort(([, a], [, b]) => b.at.localeCompare(a.at));
  const empty = !s.history.length && !bookmarks.length && !notes.length;

  function exportNotes() {
    const md = [
      "# UX Academy — my notes",
      `Exported ${new Date().toLocaleString()}`,
      "",
      ...notes.flatMap(([slug, n]) => [`## ${meta[slug]?.title ?? slug}`, `_Updated ${day(n.updatedAt)}_`, "", n.text, ""]),
    ].join("\n");
    download(`ux-academy-notes-${new Date().toISOString().slice(0, 10)}.md`, md, "text/markdown");
  }

  const section = "panel p-5 sm:p-6";
  const h2 = "t-section text-lg";

  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {(
          [
            ["Entries completed", completed.length, "cat-green"],
            ["Entries visited", s.history.length, "cat-blue"],
            ["Cards due", dueCards, "cat-amber"],
            ["Questions answered", Object.keys(s.quiz).length, "cat-violet"],
            ["Notes", notes.length, "cat-teal"],
          ] as const
        ).map(([k, v, cat]) => (
          <div key={k} className={`${cat} rounded-lg bg-c-wash p-4`}>
            <dt className="text-xs font-semibold text-c-ink">{k}</dt>
            <dd className="t-page tabular mt-1 text-3xl text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      {empty && (
        <div className="rounded-lg border border-dashed border-rule-strong bg-soft p-6">
          <p className="t-sub text-lg">Nothing here yet</p>
          <p className="mt-2 max-w-read text-ink-2">
            Start with a <Link className="link" href="/learn">learning path</Link> or open any entry in the <Link className="link" href="/library">library</Link>. Saved entries, notes, quiz results and lab runs will collect here.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="next" className={section}>
          <h2 id="next" className={h2}>
            Study next
          </h2>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {recs.map((r) => (
              <li key={r.slug} className="py-3">
                <Link href={`/library/${r.slug}`} className="font-medium hover:text-accent-ink">
                  {meta[r.slug]?.title ?? r.slug}
                </Link>
                <p className="text-xs text-ink-3">{r.reason}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="revise" className={section}>
          <h2 id="revise" className={h2}>
            Revise
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {dueCards > 0 && (
              <li>
                <Link className="link" href="/practice/flashcards">
                  {dueCards} flashcards due today
                </Link>
              </li>
            )}
            {missed.map((slug) => (
              <li key={slug}>
                <Link className="link" href={`/library/${slug}#practice`}>
                  {meta[slug].title}
                </Link>{" "}
                <span className="text-ink-3">— last quiz answer was wrong</span>
              </li>
            ))}
            {staleCompleted.slice(0, 5).map((slug) => (
              <li key={slug}>
                <Link className="link" href={`/library/${slug}#practice`}>
                  {meta[slug]?.title}
                </Link>{" "}
                <span className="text-ink-3">— completed over two weeks ago; test yourself again</span>
              </li>
            ))}
            {!dueCards && !missed.length && !staleCompleted.length && <li className="text-ink-3">Nothing to revise right now.</li>}
          </ul>
        </section>
      </div>

      <section aria-labelledby="paths" className={section}>
        <h2 id="paths" className={h2}>
          Learning paths
        </h2>
        <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {paths.map((p) => {
            const d = p.steps.filter((x) => s.progress[x]?.completedAt).length;
            return (
              <li key={p.id} className="flex items-baseline justify-between gap-4 border-b border-rule py-2 text-sm">
                <Link href={`/learn/${p.id}`} className="hover:text-accent-ink">
                  {p.title}
                </Link>
                <span className="formula tabular text-ink-3">
                  {d}/{p.steps.length}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="saved" className={section}>
          <h2 id="saved" className={h2}>
            Saved entries
          </h2>
          {bookmarks.length ? (
            <ul className="mt-4 space-y-2 text-sm">
              {bookmarks.map(([slug, b]) => (
                <li key={slug} className="flex justify-between gap-4">
                  <Link className="link" href={`/library/${slug}`}>
                    {meta[slug]?.title ?? slug}
                  </Link>
                  <span className="text-ink-3">{day(b.at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-3">Use “Save” on any entry.</p>
          )}
        </section>
        <section aria-labelledby="recent" className={section}>
          <h2 id="recent" className={h2}>
            Recently viewed
          </h2>
          {s.history.length ? (
            <ul className="mt-4 space-y-2 text-sm">
              {s.history.slice(0, 10).map((h) => (
                <li key={h.slug} className="flex justify-between gap-4">
                  <Link className="link" href={`/library/${h.slug}`}>
                    {meta[h.slug]?.title ?? h.slug}
                  </Link>
                  <span className="text-ink-3">{day(h.at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-3">Your learning history will appear here.</p>
          )}
        </section>
      </div>

      <section aria-labelledby="notes" className={section}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="notes" className={h2}>
            Notes
          </h2>
          {notes.length > 0 && (
            <button type="button" onClick={exportNotes} className="h-9 rounded-sm border border-line-control bg-surface px-3 text-sm font-medium hover:border-ink-3">
              Export notes as Markdown
            </button>
          )}
        </div>
        {notes.length ? (
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {notes.map(([slug, n]) => (
              <li key={slug} className="py-4">
                <div className="flex justify-between gap-4">
                  <Link className="link font-medium" href={`/library/${slug}#notes`}>
                    {meta[slug]?.title ?? slug}
                  </Link>
                  <span className="text-xs text-ink-3">{day(n.updatedAt)}</span>
                </div>
                <p className="mt-1 line-clamp-3 whitespace-pre-line font-serif text-ink-2">{n.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-3">Each entry has a notes field at the end.</p>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="calcs" className={section}>
          <h2 id="calcs" className={h2}>
            Formula collection
          </h2>
          {s.savedCalculations.length ? (
            <ul className="mt-4 space-y-3 text-sm">
              {s.savedCalculations.map((c) => (
                <li key={c.id} className="flex items-start justify-between gap-4 border-b border-rule pb-3">
                  <div>
                    <p className="font-medium">{c.label}</p>
                    <p className="formula text-xs text-ink-2">{c.summary}</p>
                    <p className="text-xs text-ink-3">{day(c.at)}</p>
                  </div>
                  <button type="button" onClick={() => actions.deleteCalculation(c.id)} className="text-xs text-ink-3 underline hover:text-ink">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-3">“Save result” on any calculator stores it here.</p>
          )}
        </section>
        <section aria-labelledby="collections" className={section}>
          <h2 id="collections" className={h2}>
            Research collections
          </h2>
          {Object.keys(s.collections).length ? (
            <ul className="mt-4 space-y-4 text-sm">
              {Object.entries(s.collections).map(([id, c]) => (
                <li key={id}>
                  <div className="flex justify-between">
                    <p className="font-medium">{c.name}</p>
                    <button type="button" onClick={() => actions.deleteCollection(id)} className="text-xs text-ink-3 underline">
                      Delete
                    </button>
                  </div>
                  <p className="mt-1 text-ink-2">
                    {c.slugs.length
                      ? c.slugs.map((slug, i) => (
                          <span key={slug}>
                            {i > 0 && ", "}
                            <Link className="link" href={`/library/${slug}`}>
                              {meta[slug]?.title ?? slug}
                            </Link>
                          </span>
                        ))
                      : "Empty"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-3">Group entries into collections from any entry&apos;s “Collections” menu.</p>
          )}
        </section>
      </div>

      {Object.keys(s.labRuns).length > 0 && (
        <section aria-labelledby="labs" className={section}>
          <h2 id="labs" className={h2}>
            Lab results
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {Object.entries(s.labRuns).map(([lab, runs]) => (
              <li key={lab}>
                <Link className="link" href={`/labs/${lab}`}>
                  {lab.replace(/-lab$/, "").replace(/-/g, " ")}
                </Link>
                <span className="formula ml-3 text-xs text-ink-2">
                  {runs[0].summary} · {day(runs[0].at)}
                </span>
                {runs.length > 1 && <span className="ml-2 text-xs text-ink-3">({runs.length} runs)</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="data" className={section}>
        <h2 id="data" className={h2}>
          Your data
        </h2>
        <p className="mt-2 max-w-read text-sm text-ink-2">
          Stored in this browser&apos;s local storage only. Export a JSON backup to keep it safe or move it to another browser; importing replaces what is here.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => download(`ux-academy-backup-${new Date().toISOString().slice(0, 10)}.json`, exportJson(), "application/json")} className="h-10 rounded-sm bg-accent px-4 text-sm font-medium text-surface">
            Export backup (JSON)
          </button>
          <button type="button" onClick={() => fileInput.current?.click()} className="h-10 rounded-sm border border-rule px-4 text-sm font-medium hover:border-rule-strong">
            Import backup…
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            aria-label="Choose a backup file to import"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try {
                const data = parseImport(await f.text());
                if (!confirm("Replace your current learning data with this backup?")) return;
                actions.replaceAll(data);
                setImportMsg("Backup imported.");
              } catch (err) {
                setImportMsg(`Import failed: ${err instanceof Error ? err.message : String(err)}`);
              } finally {
                e.target.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (confirm("Delete all notes, progress and saved items from this browser? Export a backup first if you might want them.")) actions.reset();
            }}
            className="h-10 rounded-sm px-4 text-sm font-medium text-accent-ink hover:bg-accent-wash"
          >
            Delete all my data
          </button>
        </div>
        <p role="status" className="mt-3 text-sm text-ink-2">
          {importMsg}
        </p>
      </section>
    </div>
  );
}
