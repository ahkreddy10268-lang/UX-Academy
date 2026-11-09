"use client";

/**
 * Knowledge Atlas explorer (`/topics`): the whole taxonomy as nested lists with
 * native disclosure buttons. Domains are collapsed by default; opening one
 * shows its subcategories, each of which can be collapsed. A search or filter
 * reveals every matching branch with its context. Filters live in the URL
 * (`q`, `status`, `type`, `domain`) so views are shareable and the browser's
 * back and forward buttons restore them.
 */
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { Icon } from "@/components/shell/icons";
import { StatusTag } from "./status-tag";
import { TOPIC_STATUS_LABEL, TOPIC_STATUSES, type TopicStatus } from "@/lib/content/topic-status";
import {
  atlasQuery,
  countTopics,
  domainTopics,
  filterAtlas,
  highlightParts,
  isFiltering,
  readAtlasParams,
  type Atlas,
  type AtlasFilters,
  type FilteredDomain,
  type FilteredSub,
  type MatchedTopic,
  type StatusCounts,
} from "@/lib/content/atlas-filter";


function Hl({ text, q }: { text: string; q: string }) {
  return (
    <>
      {highlightParts(text, q).map((p, i) =>
        p.hit ? (
          <mark key={i} className="rounded-xs bg-accent-wash px-0.5 text-ink">
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

function countLine(c: StatusCounts, total: number) {
  const parts = [`${total} topics`, `${c.published} published`];
  const progress = c.research + c.drafted + c.reviewed;
  if (progress) parts.push(`${progress} in progress`);
  if (c.addressed) parts.push(`${c.addressed} addressed within`);
  parts.push(`${c.planned} planned`);
  return parts.join(" · ");
}

function TopicRow({ t, q, typeLabel }: { t: MatchedTopic; q: string; typeLabel: string }) {
  return (
    <li>
      <Link href={t.href} className="group flex min-h-10 flex-wrap items-center gap-x-3 gap-y-1 rounded-sm px-2 py-1.5 hover:bg-sunken">
        <span className={`min-w-0 flex-1 text-sm ${t.status === "published" ? "font-medium text-ink group-hover:text-accent-ink" : "text-ink-2 group-hover:text-ink"}`}>
          <Hl text={t.title} q={q} />
          {t.aliasHit && (
            <span className="ml-1.5 text-xs text-ink-3">
              (also: <Hl text={t.aliasHit} q={q} />)
            </span>
          )}
          {t.coveredBy && <span className="block text-xs text-ink-3">Explained in {t.coveredBy.title} →</span>}
        </span>
        <span className="text-[11px] uppercase tracking-[0.06em] text-ink-3">{typeLabel}</span>
        <StatusTag status={t.status} />
      </Link>
    </li>
  );
}

function SubSection({ s, open, onToggle, q, typeLabels, idBase }: { s: FilteredSub; open: boolean; onToggle: () => void; q: string; typeLabels: Record<string, string>; idBase: string }) {
  const c = countTopics(s.topics);
  const panel = `${idBase}-${s.id}`;
  return (
    <li className="border-t border-rule first:border-t-0">
      <h4 className="text-sm">
        <button type="button" aria-expanded={open} aria-controls={panel} onClick={onToggle} className="flex min-h-10 w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-sunken">
          <Icon name="chevron-down" size={16} className={`shrink-0 text-ink-3 ${open ? "" : "-rotate-90"}`} />
          <span className="t-sub min-w-0 flex-1 text-ink">
            <Hl text={s.title} q={q} />
          </span>
          <span className="tabular text-xs text-ink-3">{countLine(c, s.topics.length)}</span>
        </button>
      </h4>
      <ul id={panel} hidden={!open} className="pb-2 pl-6" aria-label={`Topics in ${s.title}`}>
        {s.topics.map((t) => (
          <TopicRow key={t.slug} t={t} q={q} typeLabel={typeLabels[t.type] ?? t.type} />
        ))}
      </ul>
    </li>
  );
}

function DomainSection({
  d,
  full,
  open,
  onToggle,
  subOpen,
  onSubToggle,
  q,
  typeLabels,
  filtering,
}: {
  d: FilteredDomain;
  full: StatusCounts & { total: number; subs: number };
  open: boolean;
  onToggle: () => void;
  subOpen: (sub: string) => boolean;
  onSubToggle: (sub: string) => void;
  q: string;
  typeLabels: Record<string, string>;
  filtering: boolean;
}) {
  const base = useId();
  const panel = `${base}-panel`;
  const shown = d.subcategories.reduce((a, s) => a + s.topics.length, 0);
  const pct = full.total ? Math.round((full.published / full.total) * 100) : 0;
  return (
    <li className={`cat-${d.palette} overflow-hidden rounded-lg border border-rule bg-surface`}>
      <div className="flex flex-col gap-3 p-3 sm:p-4 @3xl:flex-row @3xl:items-start">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span aria-hidden className="tabular mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-c-wash text-xs font-semibold text-c-ink">
            {String(d.n).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <h3>
              <button type="button" aria-expanded={open} aria-controls={panel} onClick={onToggle} className="flex min-h-8 items-center gap-2 rounded-sm text-left">
                <span className="t-sub text-base text-ink">
                  <span className="sr-only">Domain {d.n}: </span>
                  <Hl text={d.title} q={q} />
                </span>
                <Icon name="chevron-down" size={16} className={`shrink-0 text-ink-3 ${open ? "" : "-rotate-90"}`} />
              </button>
            </h3>
            <p className="mt-0.5 text-sm text-ink-2">{d.description}</p>
            <p className="tabular mt-1 text-xs text-ink-3">
              {full.subs} {full.subs === 1 ? "subcategory" : "subcategories"} · {countLine(full, full.total)}
              {filtering && ` · ${shown} shown`}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 pl-11 @3xl:w-52 @3xl:pl-0">
          <div>
            <div role="img" aria-label={`${d.title}: ${full.published} of ${full.total} topics published (${pct}%)`} className="h-1.5 w-full overflow-hidden rounded-full bg-sunken">
              <div className="h-full bg-accent" style={{ width: `${Math.max(pct, full.published ? 2 : 0)}%` }} />
            </div>
            <p className="tabular mt-1.5 text-xs text-ink-3">{pct}% published</p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
            <Link className="tap link" href={`/topics/${d.id}`}>
              Subject page<span className="sr-only">: {d.title}</span>
            </Link>
            <Link className="tap link" href={`/library?domain=${d.id}`}>
              Entries in Library<span className="sr-only">: {d.title}</span>
            </Link>
          </div>
        </div>
      </div>
      <div id={panel} hidden={!open} className="border-t border-rule bg-soft px-2 py-1 sm:px-3">
        <ul aria-label={`Subcategories of ${d.title}`}>
          {d.subcategories.map((s) => (
            <SubSection key={s.id} s={s} open={subOpen(s.id)} onToggle={() => onSubToggle(s.id)} q={q} typeLabels={typeLabels} idBase={`${base}-s`} />
          ))}
        </ul>
      </div>
    </li>
  );
}

export function AtlasExplorer({ atlas }: { atlas: Atlas }) {
  const params = useSearchParams();
  const paramKey = params.toString();
  const f = useMemo(() => readAtlasParams(new URLSearchParams(paramKey), atlas), [paramKey, atlas]);
  const ids = useId();

  // The search box keeps its own draft so typing is not interrupted; it follows the URL on back/forward.
  const [draft, setDraft] = useState(f.q);
  const [seenQ, setSeenQ] = useState(f.q);
  if (seenQ !== f.q) {
    setSeenQ(f.q);
    if (draft.trim() !== f.q) setDraft(f.q);
  }

  const write = (next: AtlasFilters, push: boolean) => {
    const url = `${window.location.pathname}${atlasQuery(next)}`;
    if (url === `${window.location.pathname}${window.location.search}`) return;
    // Next's App Router integrates the History API with useSearchParams.
    if (push) window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
  };
  // Merge onto the URL as it is now, not the last render: the router applies history updates asynchronously.
  const current = () => readAtlasParams(new URLSearchParams(window.location.search), atlas);
  const setFilter = <K extends keyof AtlasFilters>(k: K, v: AtlasFilters[K]) => write({ ...current(), [k]: v }, true);
  const onQuery = (v: string) => {
    setDraft(v);
    write({ ...current(), q: v }, false);
  };
  const clearAll = () => {
    setDraft("");
    write({ q: "", status: "", type: "", domain: "" }, true);
  };

  const filtering = isFiltering(f);
  const visible = useMemo(() => filterAtlas(atlas, f), [atlas, f]);
  const full = useMemo(
    () =>
      new Map(
        atlas.domains.map((d) => {
          const ts = domainTopics(d);
          return [d.id, { ...countTopics(ts), total: ts.length, subs: d.subcategories.length }];
        }),
      ),
    [atlas],
  );
  const all = useMemo(() => atlas.domains.flatMap(domainTopics), [atlas]);
  const statusCounts = useMemo(() => countTopics(all), [all]);
  const typeCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of all) m.set(t.type, (m.get(t.type) ?? 0) + 1);
    return m;
  }, [all]);

  // Expansion. Browsing: domains start collapsed and subcategories start open inside an opened domain.
  // Filtering: every matching branch starts open; toggles during a search reset when the search changes.
  const [openDomains, setOpenDomains] = useState<Set<string>>(() => new Set());
  const [closedSubs, setClosedSubs] = useState<Set<string>>(() => new Set());
  const [searchClosed, setSearchClosed] = useState<Set<string>>(() => new Set());
  const filterKey = atlasQuery(f);
  const [seenKey, setSeenKey] = useState(filterKey);
  if (seenKey !== filterKey) {
    setSeenKey(filterKey);
    setSearchClosed(new Set());
  }
  const flip = (set: Set<string>, key: string) => {
    const n = new Set(set);
    if (n.has(key)) n.delete(key);
    else n.add(key);
    return n;
  };
  const domainOpen = (id: string) => (filtering ? !searchClosed.has(id) : openDomains.has(id));
  const toggleDomain = (id: string) => (filtering ? setSearchClosed((s) => flip(s, id)) : setOpenDomains((s) => flip(s, id)));
  const subOpen = (d: string) => (s: string) => (filtering ? !searchClosed.has(`${d}/${s}`) : !closedSubs.has(`${d}/${s}`));
  const toggleSub = (d: string) => (s: string) => (filtering ? setSearchClosed((x) => flip(x, `${d}/${s}`)) : setClosedSubs((x) => flip(x, `${d}/${s}`)));

  const shownTopics = visible.reduce((a, d) => a + d.subcategories.reduce((b, s) => b + s.topics.length, 0), 0);
  const control = "mt-1 h-11 w-full rounded-sm border border-line-control bg-surface px-2.5 text-sm";

  return (
    <div className="space-y-5">
      <div role="search" className="panel p-4 sm:p-5" aria-label="Find a topic">
        <div className="grid gap-3 @3xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] @3xl:items-end">
          <div className="min-w-0">
            <label htmlFor={`${ids}-q`} className="text-xs font-medium text-ink-2">
              Search the atlas
            </label>
            <div className="relative mt-1">
              <Icon name="search" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
              <input
                id={`${ids}-q`}
                type="search"
                value={draft}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="Search domains, subcategories and topics…"
                autoComplete="off"
                className="h-11 w-full rounded-sm border border-line-control bg-surface pl-10 pr-3 text-base"
              />
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor={`${ids}-status`} className="text-xs font-medium text-ink-2">
              Status
            </label>
            <select id={`${ids}-status`} className={control} value={f.status} onChange={(e) => setFilter("status", e.target.value as TopicStatus | "")}>
              <option value="">All topics ({all.length})</option>
              {TOPIC_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {TOPIC_STATUS_LABEL[s]} ({statusCounts[s]})
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label htmlFor={`${ids}-type`} className="text-xs font-medium text-ink-2">
              Knowledge type
            </label>
            <select id={`${ids}-type`} className={control} value={f.type} onChange={(e) => setFilter("type", e.target.value)}>
              <option value="">All types</option>
              {Object.entries(atlas.typeLabels).map(([t, l]) => (
                <option key={t} value={t}>
                  {l} ({typeCounts.get(t) ?? 0})
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label htmlFor={`${ids}-domain`} className="text-xs font-medium text-ink-2">
              Domain
            </label>
            <select id={`${ids}-domain`} className={control} value={f.domain} onChange={(e) => setFilter("domain", e.target.value)}>
              <option value="">All domains</option>
              {atlas.domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {String(d.n).padStart(2, "0")} {d.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p role="status" className="text-sm text-ink-2">
            {filtering
              ? shownTopics
                ? `${shownTopics} ${shownTopics === 1 ? "topic" : "topics"} in ${visible.length} ${visible.length === 1 ? "domain" : "domains"} match.`
                : "No topics match. Try fewer words or clear a filter."
              : `${atlas.domains.length} domains, ${atlas.domains.reduce((a, d) => a + d.subcategories.length, 0)} subcategories and ${all.length} topics.`}
          </p>
          <div className="flex flex-wrap gap-2">
            {filtering ? (
              <button type="button" onClick={clearAll} className="btn btn-secondary btn-sm">
                Clear search and filters
              </button>
            ) : (
              <>
                <button type="button" onClick={() => setOpenDomains(new Set(atlas.domains.map((d) => d.id)))} className="btn btn-secondary btn-sm">
                  Expand all domains
                </button>
                <button type="button" onClick={() => setOpenDomains(new Set())} className="btn btn-secondary btn-sm">
                  Collapse all
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <ol className="space-y-3" aria-label="Domains">
        {visible.map((d) => (
          <DomainSection
            key={d.id}
            d={d}
            full={full.get(d.id)!}
            open={domainOpen(d.id)}
            onToggle={() => toggleDomain(d.id)}
            subOpen={subOpen(d.id)}
            onSubToggle={toggleSub(d.id)}
            q={f.q}
            typeLabels={atlas.typeLabels}
            filtering={filtering}
          />
        ))}
      </ol>
    </div>
  );
}
