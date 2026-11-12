"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  INITIAL,
  INSTANT_MS,
  LATENCY_RANGE,
  MIN_VISIBLE_MS,
  SHOW_AFTER_MS,
  allowedEvents,
  announcement,
  asyncTransition,
  indicatorPlan,
  type AsyncEvent,
  type AsyncState,
  type IndicatorMode,
  type Show,
} from "@/lib/formulas/async-state";

/* Illustrative data: a library member's loans. */
const LOANS = [
  { title: "Middlemarch", author: "George Eliot", due: "2 Dec" },
  { title: "Persuasion", author: "Jane Austen", due: "4 Dec" },
  { title: "Bleak House", author: "Charles Dickens", due: "6 Dec" },
  { title: "The Mill on the Floss", author: "George Eliot", due: "9 Dec" },
  { title: "North and South", author: "Elizabeth Gaskell", due: "11 Dec" },
  { title: "Villette", author: "Charlotte Brontë", due: "13 Dec" },
] as const;
const ROWS = LOANS.length;
const ROW_H = 40; // px, real rows and skeleton rows share it
const MODES: { id: IndicatorMode; label: string }[] = [
  { id: "skeleton", label: "Skeleton" },
  { id: "spinner", label: "Spinner" },
  { id: "progressive", label: "Progressive" },
];
const STATES: AsyncState["status"][] = ["idle", "loading", "populated", "empty", "error"];
const SHOW_LABEL: Record<Show, string> = { previous: "previous view", busy: "busy state", skeleton: "skeleton", spinner: "spinner", progressive: "progressive rows", content: "content" };

const match = (q: string) => {
  const s = q.trim().toLowerCase();
  return s ? LOANS.filter((l) => `${l.title} ${l.author}`.toLowerCase().includes(s)) : [...LOANS];
};

type Log = { t: string; text: string };

const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  try {
    const m = window.matchMedia(RM);
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
  } catch {
    return () => {};
  }
};
const getRM = () => {
  try {
    return window.matchMedia(RM).matches;
  } catch {
    return false;
  }
};
const noop = () => () => {};
const clsSupported = () => typeof PerformanceObserver !== "undefined" && Boolean(PerformanceObserver.supportedEntryTypes?.includes("layout-shift"));

/**
 * Async State Lab: the unified async state machine (component-state-management)
 * driving a table and a card list, with a latency slider, three indicator modes,
 * a network-error switch, a live-region log, a reduced-motion switch and a
 * broken anti-pattern preset. All rules come from lib/formulas/async-state.
 */
export function AsyncStateLab() {
  const id = useId();
  const [state, setState] = useState<AsyncState>(INITIAL);
  const [query, setQuery] = useState("");
  const [latency, setLatency] = useState(1600);
  const [mode, setMode] = useState<IndicatorMode>("skeleton");
  const [failNext, setFailNext] = useState(false);
  const [anti, setAnti] = useState(false);
  const prefersReduced = useSyncExternalStore(subscribeRM, getRM, () => false);
  const [reduceOverride, setReduce] = useState<boolean | null>(null);
  const reduce = reduceOverride ?? prefersReduced;
  const canMeasure = useSyncExternalStore(noop, clsSupported, () => false);
  const [phase, setPhase] = useState<Show>("previous");
  const [shown, setShown] = useState<typeof LOANS[number][]>([]);
  const [live, setLive] = useState("");
  const [log, setLog] = useState<Log[]>([]);
  const [flashes, setFlashes] = useState(0);
  const [cls, setCls] = useState<number | null>(null);
  const [streamed, setStreamed] = useState<number>(ROWS);
  const timers = useRef<number[]>([]);
  const t0 = useRef(0);
  const stateRef = useRef<AsyncState>(INITIAL);

  // Measured layout shift inside this page (Layout Instability API, where supported).
  useEffect(() => {
    if (!clsSupported()) return;
    let total = 0;
    const po = new PerformanceObserver((list) => {
      for (const e of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
        if (!e.hadRecentInput) total += e.value;
      }
      setCls(total);
    });
    po.observe({ type: "layout-shift", buffered: false });
    return () => po.disconnect();
  }, []);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const later = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
  const say = useCallback((text: string | null) => {
    if (!text) return;
    const ms = Math.round(performance.now() - t0.current);
    setLive(text);
    setLog((l) => [{ t: `+${ms} ms`, text }, ...l].slice(0, 8));
  }, []);
  const dispatch = (event: AsyncEvent) => {
    const next = asyncTransition(stateRef.current, event);
    stateRef.current = next;
    setState(next);
    return next;
  };

  /** Run one request through the plan: indicator timing, then resolve or reject. */
  const run = (event: AsyncEvent, q: string) => {
    if (anti) clearTimers(); // anti-pattern: restart on every keystroke
    const before = stateRef.current;
    const next = dispatch(event);
    if (next === before && !anti) return; // ignored by the machine (already loading)
    if (anti && next === before) {
      // the broken version forces a new request even while loading
      stateRef.current = { status: "loading", query: q, attempt: 1 };
      setState(stateRef.current);
    }
    t0.current = performance.now();
    const plan = indicatorPlan(latency, mode, anti);
    setPhase(plan.segments[0].show);
    if (plan.indicatorFromMs === 0) {
      setFlashes((f) => f + 1);
      say(announcement(stateRef.current, { antiPattern: true }));
    }
    if (plan.indicatorFromMs !== null && plan.indicatorFromMs > 0) {
      later(plan.indicatorFromMs, () => {
        setPhase(mode);
        setFlashes((f) => f + 1);
        say(announcement(stateRef.current, { showedIndicator: true }));
      });
    }
    const fail = failNext;
    later(plan.revealMs, () => {
      const rows = match(q);
      const done = fail ? dispatch({ type: "REJECT", message: "The loans service did not respond." }) : dispatch({ type: "RESOLVE", count: rows.length });
      if (fail && anti) {
        setQuery(""); // the broken version wipes the user's input
        stateRef.current = { ...done, query: "" } as AsyncState;
        setState(stateRef.current);
      }
      const stream = !fail && !anti && mode === "progressive" && !reduce;
      setStreamed(stream ? 0 : ROWS);
      setShown(fail ? [] : rows);
      setPhase("content");
      say(announcement(stateRef.current, { antiPattern: anti }));
      if (stream) {
        for (let i = 1; i <= ROWS; i++) later(i * 70, () => setStreamed(i));
      }
    });
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run({ type: "FETCH", query }, query);
  };
  const onType = (v: string) => {
    setQuery(v);
    if (anti) run({ type: "FETCH", query: v }, v); // anti-pattern: fetch on every keystroke
  };
  const retry = () => run({ type: "RETRY" }, stateRef.current.query);
  const reset = () => {
    clearTimers();
    stateRef.current = INITIAL;
    setState(INITIAL);
    setQuery("");
    setShown([]);
    setPhase("previous");
    setLog([]);
    setLive("");
    setFlashes(0);
    setAnti(false);
    setFailNext(false);
  };
  const breakIt = () => {
    reset();
    setAnti(true);
    setLatency(250);
    setMode("spinner");
    setFailNext(true);
  };

  const plan = useMemo(() => indicatorPlan(latency, mode, anti), [latency, mode, anti]);
  const loading = state.status === "loading";
  const showIndicator = loading && (phase === "skeleton" || phase === "spinner" || phase === "progressive");
  const busy = loading;
  const allowed = allowedEvents(state);
  const reserved = !anti; // reserved height prevents layout shift
  const bandText = plan.band === "instant" ? `≤ ${INSTANT_MS} ms: instantaneous, no indicator` : plan.band === "busy" ? `${INSTANT_MS}–${SHOW_AFTER_MS} ms: busy state only, nothing flashes` : `> ${SHOW_AFTER_MS} ms: ${SHOW_LABEL[mode]} from ${SHOW_AFTER_MS} ms, visible at least ${MIN_VISIBLE_MS} ms`;

  /* ---------- preview pieces ---------- */
  const skeletonRows = (n: number) =>
    Array.from({ length: n }, (_, i) => (
      <tr key={`s${i}`} style={{ height: ROW_H }} aria-hidden="true">
        <td className="px-3">
          <span className="lab-skeleton block h-3 w-32" />
        </td>
        <td className="px-3">
          <span className="lab-skeleton block h-3 w-24" />
        </td>
        <td className="px-3">
          <span className="lab-skeleton block h-3 w-12" />
        </td>
      </tr>
    ));
  const visibleRows = shown.slice(0, streamed);
  const tableBody = () => {
    if (state.status === "error" && !anti) {
      return (
        <tr style={{ height: ROW_H }}>
          <td colSpan={3} className="px-3 text-sm text-ink-2">
            Loans are not shown because loading failed. See the message above.
          </td>
        </tr>
      );
    }
    if (state.status === "error" && anti) {
      return (
        <tr style={{ height: ROW_H }}>
          <td colSpan={3} className="px-3 text-sm text-ink-3">
            No loans
          </td>
        </tr>
      );
    }
    if (showIndicator && phase !== "spinner") return skeletonRows(anti ? 2 : ROWS);
    if (showIndicator && phase === "spinner") return null;
    if (state.status === "empty") {
      return (
        <tr style={{ height: ROW_H }}>
          <td colSpan={3} className="px-3 text-sm text-ink-2">
            No loans match “{state.query}”. <span className="text-ink-3">Try an author or a shorter word.</span>
          </td>
        </tr>
      );
    }
    if (state.status === "idle") {
      return (
        <tr style={{ height: ROW_H }}>
          <td colSpan={3} className="px-3 text-sm text-ink-3">
            Press “Load loans” to start.
          </td>
        </tr>
      );
    }
    return (
      <>
        {visibleRows.map((l) => (
          <tr key={l.title} style={{ height: ROW_H }}>
            <th scope="row" className="px-3 text-left font-medium">
              {l.title}
            </th>
            <td className="px-3 text-ink-2">{l.author}</td>
            <td className="formula px-3">{l.due}</td>
          </tr>
        ))}
        {shown.length > visibleRows.length && skeletonRows(shown.length - visibleRows.length)}
      </>
    );
  };

  return (
    <div className="grid gap-8 2xl:grid-cols-[22rem_minmax(0,1fr)]" data-motion={reduce ? "reduced" : "full"}>
      {/* ---------------- controls ---------------- */}
      <div className="min-w-0 space-y-6">
        <form onSubmit={submit}>
          <label htmlFor={`${id}-q`} className="text-sm font-medium">
            Filter loans
          </label>
          <div className="mt-2 flex gap-2">
            <input id={`${id}-q`} className="field min-w-0 flex-1" value={query} onChange={(e) => onType(e.target.value)} placeholder="title or author" autoComplete="off" />
            <button type="submit" className="btn btn-primary btn-sm" aria-busy={busy || undefined}>
              {busy ? "Loading…" : "Load loans"}
            </button>
          </div>
          <p className="mt-1 text-xs text-ink-3">Try “eliot”, or “zzz” for an empty result.</p>
        </form>

        <div>
          <label htmlFor={`${id}-lat`} className="text-sm font-medium">
            Response time
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input id={`${id}-lat`} type="range" min={LATENCY_RANGE.min} max={LATENCY_RANGE.max} step={50} value={latency} onChange={(e) => setLatency(Number(e.target.value))} className="min-w-0 flex-1" aria-describedby={`${id}-band`} />
            <output htmlFor={`${id}-lat`} className="formula w-20 text-right text-sm">
              {latency} ms
            </output>
          </div>
          <p id={`${id}-band`} className="mt-1 text-xs text-ink-2">
            {bandText}
          </p>
        </div>

        <fieldset>
          <legend className="text-sm font-medium">Indicator after {SHOW_AFTER_MS} ms</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {MODES.map((m) => (
              <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)} className="chip h-9 hover:border-rule-strong hover:text-ink">
                {m.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Conditions</legend>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-5 w-5" checked={failNext} onChange={(e) => setFailNext(e.target.checked)} />
            Simulate a network error
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-5 w-5" checked={reduce} onChange={(e) => setReduce(e.target.checked)} />
            Reduce motion (no shimmer or spin)
          </label>
        </fieldset>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={anti ? reset : breakIt}>
            {anti ? "Fix it: apply the corrections" : "Show the broken anti-pattern"}
          </button>
          <button type="button" className="btn btn-tertiary btn-sm" onClick={reset}>
            Reset
          </button>
        </div>

        <section aria-labelledby={`${id}-sm`}>
          <h3 id={`${id}-sm`} className="text-sm font-medium">
            State machine
          </h3>
          <ol className="mt-2 flex flex-wrap gap-1.5" aria-label="States">
            {STATES.map((s) => (
              <li key={s} aria-current={state.status === s ? "step" : undefined} className={`chip h-8 ${state.status === s ? "!bg-ink !text-surface" : ""}`}>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-2 text-xs text-ink-2">
            Accepts now: <span className="formula">{allowed.join(", ")}</span>. Other events are ignored{anti ? " — except in the broken version, which restarts the request on every keystroke" : ""}.
          </p>
        </section>
      </div>

      {/* ---------------- preview + inspector ---------------- */}
      <div className="min-w-0 space-y-6">
        <section aria-label="Timeline for one request" className="rounded-md border border-rule p-4">
          <p className="label">What people see over time · {latency} ms response</p>
          <div className="relative mt-3 h-8 overflow-hidden rounded-xs border border-rule bg-soft" aria-hidden="true">
            {plan.segments
              .filter((s) => s.to > s.from)
              .map((s, i) => (
                <div
                  key={i}
                  className={`absolute inset-y-0 flex items-center justify-center overflow-hidden whitespace-nowrap px-1 text-xs ${s.show === "busy" || s.show === "previous" ? "bg-soft text-ink-2" : "bg-accent-wash text-ink"}`}
                  style={{ left: `${(s.from / LATENCY_RANGE.max) * 100}%`, width: `${((s.to - s.from) / LATENCY_RANGE.max) * 100}%`, borderRight: "1px solid var(--rule-strong)" }}
                >
                  {SHOW_LABEL[s.show]}
                </div>
              ))}
            {[INSTANT_MS, SHOW_AFTER_MS].map((m) => (
              <div key={m} className="absolute inset-y-0 border-l border-dashed border-accent" style={{ left: `${(m / LATENCY_RANGE.max) * 100}%` }} />
            ))}
          </div>
          <div className="formula mt-1 flex justify-between text-xs text-ink-3" aria-hidden="true">
            <span>0</span>
            <span>1 s</span>
            <span>2 s</span>
            <span>3 s</span>
          </div>
          <p className="mt-2 text-sm text-ink-2">
            {plan.indicatorFromMs === null
              ? `No indicator: content appears at ${plan.revealMs} ms.`
              : plan.indicatorFromMs === 0
                ? `Broken: the ${SHOW_LABEL[mode]} shows at 0 ms for every request and disappears at ${plan.revealMs} ms.`
                : `${SHOW_LABEL[mode]} from ${plan.indicatorFromMs} ms; content at ${plan.revealMs} ms${plan.revealMs > latency ? ` (held ${plan.revealMs - latency} ms so the indicator does not flash)` : ""}.`}
          </p>
        </section>

        {state.status === "error" && !anti && (
          <div role="alert" className="rounded-md border border-error bg-error-wash p-4 text-sm">
            <p className="font-semibold text-ink">
              <span aria-hidden>⚠ </span>Couldn&apos;t load your loans.
            </p>
            <p className="mt-1 text-ink-2">
              {state.message} {state.query ? `Your search “${state.query}” is kept.` : ""} Attempt {state.attempt}.
            </p>
            <button type="button" className="btn btn-secondary btn-sm mt-3" onClick={retry}>
              Try again
            </button>
          </div>
        )}
        {state.status === "error" && anti && <p className="text-sm text-error">Error</p>}

        <section aria-labelledby={`${id}-tbl`} className="rounded-md border border-rule">
          <div className="relative overflow-x-auto" tabIndex={0} role="region" aria-labelledby={`${id}-tbl`} aria-busy={busy || undefined} style={reserved ? { minHeight: ROW_H * (ROWS + 1) + 44 } : undefined}>
            <table className="w-full min-w-[28rem] text-sm">
              <caption id={`${id}-tbl`} className="px-3 py-2 text-left font-semibold">
                Your loans{state.status === "populated" ? `, ${state.count}` : ""}
              </caption>
              <thead className="bg-soft">
                <tr style={{ height: ROW_H }}>
                  <th scope="col" className="label px-3 text-left !text-ink-2">
                    Title
                  </th>
                  <th scope="col" className="label px-3 text-left !text-ink-2">
                    Author
                  </th>
                  <th scope="col" className="label px-3 text-left !text-ink-2">
                    Due
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">{tableBody()}</tbody>
            </table>
            {showIndicator && phase === "spinner" && (
              <div className="absolute inset-x-0 bottom-0 top-[5.25rem] flex items-center justify-center gap-2 text-sm text-ink-2" aria-hidden="true">
                <span className="lab-spinner" /> Loading…
              </div>
            )}
          </div>
        </section>

        <section aria-label="Due soon (card list)" className="grid grid-cols-1 gap-2 sm:grid-cols-3" style={reserved ? { minHeight: 76 } : undefined}>
          {showIndicator && phase !== "spinner"
            ? [0, 1, 2].map((i) => (
                <div key={i} className="rounded-md border border-rule p-3" aria-hidden="true">
                  <span className="lab-skeleton block h-3 w-24" />
                  <span className="lab-skeleton mt-2 block h-3 w-16" />
                </div>
              ))
            : (state.status === "populated" ? shown.slice(0, 3) : []).map((l) => (
                <div key={l.title} className="rounded-md border border-rule p-3 text-sm">
                  <p className="font-medium">{l.title}</p>
                  <p className="text-xs text-ink-3">Due {l.due}</p>
                </div>
              ))}
        </section>

        <section aria-labelledby={`${id}-insp`} className="rounded-md border border-rule bg-soft p-4">
          <h3 id={`${id}-insp`} className="text-sm font-medium">
            Accessibility and telemetry inspector
          </h3>
          <p role="status" className="sr-only">
            {live}
          </p>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
            <div>
              <dt className="label">State</dt>
              <dd className="formula">{state.status}</dd>
            </div>
            <div>
              <dt className="label">Indicators shown</dt>
              <dd className="formula">{flashes}</dd>
            </div>
            <div>
              <dt className="label">Layout shift</dt>
              <dd className="formula">{canMeasure ? (cls ?? 0).toFixed(3) : "not measured here"}</dd>
            </div>
            <div>
              <dt className="label">Motion</dt>
              <dd className="formula">{reduce ? "reduced" : "full"}</dd>
            </div>
          </dl>
          <p className="label mt-4">Screen-reader announcements (role=&quot;status&quot;, polite)</p>
          {log.length === 0 ? (
            <p className="mt-1 text-sm text-ink-3">Nothing announced yet.</p>
          ) : (
            <ol className="mt-1 space-y-1 text-sm">
              {log.map((l, i) => (
                <li key={`${l.t}-${i}`} className="flex gap-3">
                  <span className="formula w-20 shrink-0 text-ink-3">{l.t}</span>
                  <span className="text-ink">“{l.text}”</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        {anti && (
          <section aria-labelledby={`${id}-fix`} className="rounded-md border border-error p-4">
            <h3 id={`${id}-fix`} className="text-sm font-semibold">
              What is broken, and the correction
            </h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-2">
              <li>
                <span className="text-ink">Spinner thrashing:</span> a request on every keystroke shows a spinner at 0 ms. <em>Fix:</em> fetch on submit or debounce; show nothing for 100 ms responses and only a busy state up to {SHOW_AFTER_MS} ms.
              </li>
              <li>
                <span className="text-ink">Layout shift:</span> no reserved height, so the table collapses and grows. <em>Fix:</em> reserve the table&apos;s height; skeleton rows use the real row height.
              </li>
              <li>
                <span className="text-ink">Wiped input:</span> the error clears the search. <em>Fix:</em> keep the query in every state (WCAG 2.2 SC 3.3.7 Redundant Entry).
              </li>
              <li>
                <span className="text-ink">Error shown as empty, no retry:</span> “No loans” plus a red “Error”. <em>Fix:</em> an error state with a message, the kept search and a Try again button (SC 3.3.1 Error Identification).
              </li>
              <li>
                <span className="text-ink">Noisy, vague announcements:</span> “Loading”, “Error”. <em>Fix:</em> announce only when an indicator appears, and say the result: counts, empty, or what failed (SC 4.1.3 Status Messages).
              </li>
            </ol>
            <p className="mt-3 text-xs text-ink-3">Type a few letters into the filter to see the thrashing, then press “Fix it”.</p>
          </section>
        )}
      </div>
    </div>
  );
}
