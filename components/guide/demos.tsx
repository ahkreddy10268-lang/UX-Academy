"use client";

/**
 * Small interactive demonstrations for the Nielsen guide (D-127). Each pairs
 * a broken version with a better one, uses real controls (keyboard and
 * screen-reader operable) and announces outcomes in a polite status region.
 * Timings are illustrative.
 */
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { GUIDE_DEMOS } from "@/lib/content/guide";

type Mode = "bad" | "good";

function ModeSwitch({ mode, setMode, labels }: { mode: Mode; setMode: (m: Mode) => void; labels: [string, string] }) {
  return (
    <div role="group" aria-label="Version" className="flex flex-wrap gap-1.5">
      {(["bad", "good"] as Mode[]).map((m, i) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className="chip h-9 hover:border-rule-strong hover:text-ink">
          <span aria-hidden>{m === "bad" ? "✕ " : "✓ "}</span>
          {labels[i]}
        </button>
      ))}
    </div>
  );
}

function useTimers() {
  const t = useRef<number[]>([]);
  useEffect(() => () => t.current.forEach((x) => window.clearTimeout(x)), []);
  return {
    later: (ms: number, fn: () => void) => t.current.push(window.setTimeout(fn, ms)),
    clear: () => {
      t.current.forEach((x) => window.clearTimeout(x));
      t.current = [];
    },
  };
}

function Frame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-rule-strong bg-surface">
      <div className="border-b border-rule bg-soft px-3 py-1.5 font-mono text-[11px] text-ink-3">{title}</div>
      <div className="space-y-3 p-4">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter 1: the double transfer                                       */
/* ------------------------------------------------------------------ */
function TransferDemo() {
  const id = useId();
  const [mode, setMode] = useState<Mode>("bad");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(0);
  const [status, setStatus] = useState("");
  const count = useRef(0);
  const inFlight = useRef(false); // a ref, not state: a second press in the same frame must also be refused
  const { later, clear } = useTimers();
  const reset = (m: Mode = mode) => {
    clear();
    count.current = 0;
    inFlight.current = false;
    setMode(m);
    setPending(false);
    setSent(0);
    setStatus("");
  };
  const press = () => {
    if (mode === "good") {
      if (inFlight.current) return; // repeat presses ignored
      inFlight.current = true;
      setPending(true);
      setStatus("Sending £250 to Jo Smith…");
      later(2200, () => {
        inFlight.current = false;
        setPending(false);
        count.current += 1;
        setSent(count.current);
        setStatus("£250 sent to Jo Smith. Reference TX-2291.");
      });
      return;
    }
    // bad: every press silently queues another transfer
    later(2200, () => {
      count.current += 1;
      setSent(count.current);
      setStatus(count.current > 1 ? `${count.current} transfers of £250 were sent.` : "");
    });
  };
  return (
    <div className="space-y-3">
      <ModeSwitch mode={mode} setMode={(m) => reset(m)} labels={["No feedback", "With feedback"]} />
      <Frame title="Mobile banking · Send money">
        <p className="text-sm text-ink">
          To <span className="font-semibold">Jo Smith</span> · £250.00
        </p>
        <button type="button" onClick={press} aria-describedby={`${id}-hint`} aria-disabled={(mode === "good" && pending) || undefined} className="btn btn-primary" aria-busy={(mode === "good" && pending) || undefined}>
          {mode === "good" && pending ? "Sending…" : "Transfer"}
        </button>
        <p id={`${id}-hint`} className="text-xs text-ink-3">
          Press Transfer, and if nothing seems to happen, do what most people would.
        </p>
        <p role="status" className={`min-h-5 text-sm ${sent > 1 ? "font-semibold text-error" : "text-ink-2"}`}>
          {status}
        </p>
        {sent > 0 && (
          <p className="formula text-xs text-ink-2">
            Transfers made: {sent} · Total sent: £{(sent * 250).toFixed(2)}
          </p>
        )}
      </Frame>
      <button type="button" className="btn btn-tertiary btn-sm" onClick={() => reset()}>
        Reset
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Heuristic 1: save feedback                                           */
/* ------------------------------------------------------------------ */
function SaveDemo() {
  const id = useId();
  const [mode, setMode] = useState<Mode>("bad");
  const [fail, setFail] = useState(false);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const { later, clear } = useTimers();
  const save = () => {
    if (state === "saving") return;
    clear();
    setState("saving");
    later(1500, () => setState(fail ? "failed" : "saved"));
  };
  const showStatus = mode === "good";
  return (
    <div className="space-y-3">
      <ModeSwitch
        mode={mode}
        setMode={(m) => {
          clear();
          setMode(m);
          setState("idle");
        }}
        labels={["Silent save", "Saving · Saved · Failed"]}
      />
      <Frame title="Profile settings">
        <label htmlFor={`${id}-name`} className="field-label">
          Display name
        </label>
        <input id={`${id}-name`} className="field" defaultValue="Ama Mensah" />
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" onClick={save} aria-busy={(showStatus && state === "saving") || undefined}>
            {showStatus && state === "saving" ? "Saving…" : "Save"}
          </button>
          <label className="flex items-center gap-2 text-sm text-ink-2">
            <input type="checkbox" className="h-5 w-5" checked={fail} onChange={(e) => setFail(e.target.checked)} /> Simulate a failed save
          </label>
        </div>
        <p role="status" className={`min-h-5 text-sm ${state === "failed" ? "text-error" : "text-ok"}`}>
          {showStatus && state === "saved" && "✓ Saved just now"}
          {showStatus && state === "failed" && "⚠ Couldn't save. Check your connection and try again — your changes are still here."}
        </p>
        {!showStatus && state !== "idle" && <p className="text-xs text-ink-3">(The real outcome was “{state === "saving" ? "still saving" : state}”, but this version never tells you.)</p>}
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Heuristic 3: undo                                                     */
/* ------------------------------------------------------------------ */
const ADDRESSES = ["Home · 14 Elm Road", "Work · 2 Market Street", "Parents · 9 Mill Lane"];

function UndoDemo() {
  const [mode, setMode] = useState<Mode>("bad");
  const [items, setItems] = useState<string[]>(ADDRESSES);
  const [last, setLast] = useState<{ item: string; index: number } | null>(null);
  const [status, setStatus] = useState("");
  const undoRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { later, clear } = useTimers();
  const remove = (i: number) => {
    clear();
    const item = items[i];
    setItems((xs) => xs.filter((_, k) => k !== i));
    if (mode === "good") {
      setLast({ item, index: i });
      setStatus(`${item.split(" · ")[0]} address removed. Undo is available.`);
      later(10000, () => setLast(null));
      window.setTimeout(() => undoRef.current?.focus(), 0);
    } else {
      setLast(null);
      setStatus("Address deleted.");
    }
  };
  const undo = () => {
    if (!last) return;
    setItems((xs) => [...xs.slice(0, last.index), last.item, ...xs.slice(last.index)]);
    setStatus(`${last.item.split(" · ")[0]} address restored.`);
    setLast(null);
    clear();
    window.setTimeout(() => listRef.current?.querySelector<HTMLButtonElement>("button")?.focus(), 0);
  };
  const reset = (m: Mode = mode) => {
    clear();
    setMode(m);
    setItems(ADDRESSES);
    setLast(null);
    setStatus("");
  };
  return (
    <div className="space-y-3">
      <ModeSwitch mode={mode} setMode={(m) => reset(m)} labels={["Deleted for good", "Undo available"]} />
      <Frame title="Saved addresses">
        <ul ref={listRef} className="divide-y divide-rule rounded-sm border border-rule">
          {items.length === 0 && <li className="px-3 py-2 text-sm text-ink-3">No saved addresses.</li>}
          {items.map((a, i) => (
            <li key={a} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
              <span className="min-w-0 truncate text-ink">{a}</span>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => remove(i)} aria-label={`Remove ${a.split(" · ")[0]} address`}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p role="status" className="sr-only">
          {status}
        </p>
        {mode === "good" && last ? (
          <div className="flex items-center gap-3 rounded-sm bg-ink px-3 py-2 text-sm text-surface">
            <span className="min-w-0 flex-1">{last.item.split(" · ")[0]} address removed</span>
            <button ref={undoRef} type="button" onClick={undo} className="tap rounded-xs px-2 font-semibold underline">
              Undo
            </button>
          </div>
        ) : (
          mode === "bad" && status && <p className="text-sm text-error">{status}</p>
        )}
      </Frame>
      <button type="button" className="btn btn-tertiary btn-sm" onClick={() => reset()}>
        Reset list
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Heuristic 5: date constraints                                        */
/* ------------------------------------------------------------------ */
const ISO = (d: Date) => d.toISOString().slice(0, 10);
const noSubscribe = () => () => {};
/** Today's date, read on the client only (the page is prerendered). */
const useToday = () => useSyncExternalStore(noSubscribe, () => ISO(new Date()), () => "");

function DateDemo() {
  const id = useId();
  const [mode, setMode] = useState<Mode>("bad");
  const [text, setText] = useState("31/02/2026");
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");
  const today = useToday();
  const min = today || undefined;
  const max = today ? ISO(new Date(new Date(today).getTime() + 14 * 86400000)) : undefined;
  const submitBad = () => {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text.trim());
    const d = m ? new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])) : null;
    const valid = d && d.getDate() === Number(m![1]) && d >= new Date(new Date().toDateString());
    setResult(valid ? "Room booked." : "Booking failed. Please check the form.");
  };
  const submitGood = () => setResult(date ? `Room booked for ${new Date(date + "T12:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}.` : "Choose a date first.");
  return (
    <div className="space-y-3">
      <ModeSwitch
        mode={mode}
        setMode={(m) => {
          setMode(m);
          setResult("");
        }}
        labels={["Free-text date", "Constrained picker"]}
      />
      <Frame title="Book a study room">
        {mode === "bad" ? (
          <>
            <label htmlFor={`${id}-t`} className="field-label">
              Date
            </label>
            <input id={`${id}-t`} className="field" value={text} onChange={(e) => setText(e.target.value)} />
            <button type="button" className="btn btn-primary" onClick={submitBad}>
              Book room
            </button>
          </>
        ) : (
          <>
            <label htmlFor={`${id}-d`} className="field-label">
              Date
            </label>
            <p id={`${id}-dh`} className="field-hint">
              Rooms can be booked from today up to 14 days ahead. Earlier and later dates can&rsquo;t be chosen.
            </p>
            <input id={`${id}-d`} type="date" className="field" min={min} max={max} value={date} onChange={(e) => setDate(e.target.value)} aria-describedby={`${id}-dh`} />
            <button type="button" className="btn btn-primary" onClick={submitGood}>
              Book room
            </button>
          </>
        )}
        <p role="status" className={`min-h-5 text-sm ${/failed|first/.test(result) ? "text-error" : "text-ok"}`}>
          {result}
        </p>
      </Frame>
    </div>
  );
}

const DEMOS: Record<(typeof GUIDE_DEMOS)[number], () => React.JSX.Element> = {
  transfer: TransferDemo,
  save: SaveDemo,
  undo: UndoDemo,
  date: DateDemo,
};

export function GuideDemo({ id }: { id: (typeof GUIDE_DEMOS)[number] }) {
  const D = DEMOS[id];
  return <D />;
}
