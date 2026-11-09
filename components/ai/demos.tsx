"use client";
/**
 * Interactive AI pattern demonstrations (D-098). Everything is simulated in the
 * browser with fixed mock data and timers: no AI service is called and nothing
 * leaves the page. Each demo exercises the states its patterns describe. Motion
 * is optional: under prefers-reduced-motion, streaming shows text in larger
 * chunks and nothing pulses. Status changes are announced in a polite live region.
 */
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { AiDemoId } from "@/lib/content/ai";

type Device = "phone" | "tablet" | "desktop";
const WIDTH: Record<Device, string> = { phone: "max-w-[23.5rem]", tablet: "max-w-[38rem]", desktop: "max-w-none" };

const subscribeMotion = (cb: () => void) => {
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
function useReducedMotion() {
  return useSyncExternalStore(subscribeMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => false);
}

/** Clears every pending timer when the demo resets or unmounts. */
function useTimers() {
  const ids = useRef<number[]>([]);
  useEffect(() => () => ids.current.forEach((i) => window.clearTimeout(i)), []);
  return {
    after(ms: number, fn: () => void) {
      ids.current.push(window.setTimeout(fn, ms));
    },
    clear() {
      ids.current.forEach((i) => window.clearTimeout(i));
      ids.current = [];
    },
  };
}

function AiLabel() {
  return <span className="rounded-xs border border-rule-strong bg-soft px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink-2">AI-generated</span>;
}

function Bubble({ who, children }: { who: "you" | "ai"; children: ReactNode }) {
  return (
    <div className={`flex ${who === "you" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[88%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${who === "you" ? "bg-ink text-surface" : "border border-rule bg-surface text-ink"}`}>
        <p className="sr-only">{who === "you" ? "You said:" : "Assistant:"}</p>
        {children}
      </div>
    </div>
  );
}

/** Frame with a device-width switcher, a mock window and a status line. */
export function DemoFrame({ title, status, children, onReset }: { title: string; status: string; children: ReactNode; onReset?: () => void }) {
  const [device, setDevice] = useState<Device>("desktop");
  return (
    <section aria-label={`Interactive demo: ${title}`} className="rounded-xl border border-rule bg-soft p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="label">Live demo · simulated with local data</p>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Preview width">
          {(["phone", "tablet", "desktop"] as Device[]).map((d) => (
            <button key={d} type="button" className="btn btn-secondary btn-sm capitalize" aria-pressed={device === d} onClick={() => setDevice(d)}>
              {d}
            </button>
          ))}
          {onReset && (
            <button type="button" className="btn btn-tertiary btn-sm" onClick={onReset}>
              Reset
            </button>
          )}
        </div>
      </div>
      <div className={`mx-auto mt-3 w-full ${WIDTH[device]} overflow-hidden rounded-lg border border-rule-strong bg-paper shadow-card`}>
        <div className="flex items-center gap-1.5 border-b border-rule bg-surface px-3 py-2">
          {[0, 1, 2].map((i) => (
            <span key={i} aria-hidden className="h-2 w-2 rounded-full bg-rule-strong" />
          ))}
          <span className="ml-2 truncate font-mono text-[11px] text-ink-3">{title}</span>
        </div>
        <div className="space-y-3 p-3 sm:p-4">{children}</div>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-xs text-ink-2">
        {status}
      </p>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* 1 · Suggested prompts and capability disclosure                       */
/* --------------------------------------------------------------------- */
const SUGGESTIONS = [
  { kind: "Summarise", text: "Summarise this week's support tickets by theme" },
  { kind: "Compare", text: "Compare the two refund policies and list the differences" },
  { kind: "Draft", text: "Draft a reply to the customer asking about a late delivery" },
];

function PromptsDemo() {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [status, setStatus] = useState("Empty conversation: scope, limits and suggestions are shown.");
  const reset = () => {
    setDraft("");
    setSent(null);
    setStatus("Reset.");
  };
  return (
    <DemoFrame title="Support assistant" status={status} onReset={reset}>
      {!sent ? (
        <>
          <div className="rounded-md border border-rule bg-surface p-3 text-sm">
            <p className="font-semibold text-ink">Ask about your team&apos;s support tickets</p>
            <p className="mt-1 text-ink-2">Works with tickets from the last 90 days. It can&apos;t see customers&apos; payment details. Check figures before sharing them.</p>
          </div>
          <div>
            <p id="sp-h" className="label">Try one of these</p>
            <ul aria-labelledby="sp-h" className="mt-2 grid gap-2">
              {SUGGESTIONS.map((s) => (
                <li key={s.text}>
                  <button
                    type="button"
                    className="w-full rounded-md border border-rule bg-surface px-3 py-2 text-left text-sm text-ink hover:border-ink-3"
                    onClick={() => {
                      setDraft(s.text);
                      setStatus(`Suggestion placed in the composer: edit it or send.`);
                    }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{s.kind} · </span>
                    {s.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <Bubble who="you">{sent}</Bubble>
          <Bubble who="ai">
            <div className="mb-1">
              <AiLabel />
            </div>
            This is where the answer would appear. The suggestions have been replaced by the conversation, and the composer stays available for the next request.
          </Bubble>
        </>
      )}
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          setSent(draft.trim());
          setDraft("");
          setStatus("Request sent. Suggestions hidden now the conversation has context.");
        }}
      >
        <label className="sr-only" htmlFor="sp-input">
          Your request
        </label>
        <textarea id="sp-input" rows={2} className="field resize-none" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Describe what you need" />
        <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
          Send
        </button>
      </form>
    </DemoFrame>
  );
}

/* --------------------------------------------------------------------- */
/* 2 · Prompt composer with attachments                                  */
/* --------------------------------------------------------------------- */
function ComposerDemo() {
  const [draft, setDraft] = useState("");
  const [files, setFiles] = useState<{ name: string; size: string; ok: boolean; note?: string }[]>([]);
  const [enterSends, setEnterSends] = useState(true);
  const [phase, setPhase] = useState<"idle" | "generating" | "done">("idle");
  const [status, setStatus] = useState("Composer ready. Nothing is uploaded: files stay in your browser.");
  const t = useTimers();
  const send = () => {
    if (!draft.trim() || phase === "generating") return;
    setPhase("generating");
    setStatus("Generating. The send button is now Stop.");
    t.after(2200, () => {
      setPhase("done");
      setStatus("Response complete.");
    });
  };
  return (
    <DemoFrame
      title="Writing assistant"
      status={status}
      onReset={() => {
        t.clear();
        setDraft("");
        setFiles([]);
        setPhase("idle");
        setStatus("Reset.");
      }}
    >
      {phase !== "idle" && (
        <>
          <Bubble who="you">
            {draft || "(request)"}
            {files.filter((f) => f.ok).length > 0 && <span className="mt-1 block text-xs opacity-80">+ {files.filter((f) => f.ok).map((f) => f.name).join(", ")}</span>}
          </Bubble>
          <Bubble who="ai">{phase === "generating" ? <span className="text-ink-2">Reading your files and drafting…</span> : <>Draft ready. Your request and attachments are kept above, so you can edit and send again.</>}</Bubble>
        </>
      )}
      <div className="rounded-md border border-line-control bg-surface p-2">
        <label htmlFor="cp-input" className="field-label px-1">
          Your request
        </label>
        <span id="cp-hint" className="field-hint px-1">
          Describe the outcome you want and who it is for.
        </span>
        <textarea
          id="cp-input"
          aria-describedby="cp-hint cp-keys"
          rows={3}
          className="mt-1.5 w-full resize-y border-0 bg-transparent px-1 text-sm text-ink focus-visible:outline-none"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && enterSends) {
              e.preventDefault();
              send();
            }
          }}
        />
        {files.length > 0 && (
          <ul aria-label="Attachments" className="flex flex-wrap gap-1.5 px-1 pb-1">
            {files.map((f, i) => (
              <li key={f.name + i} className={`inline-flex items-center gap-1.5 rounded-xs border px-2 py-1 text-xs ${f.ok ? "border-rule bg-soft text-ink" : "border-error bg-error-wash text-error"}`}>
                <span>
                  {f.name} · {f.ok ? f.size : f.note}
                </span>
                <button type="button" className="btn btn-text text-xs" aria-label={`Remove ${f.name}`} onClick={() => setFiles((x) => x.filter((_, j) => j !== i))}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rule px-1 pt-2">
          <label className="btn btn-secondary btn-sm cursor-pointer">
            Attach files
            <input
              type="file"
              multiple
              className="sr-only"
              onChange={(e) => {
                const list = Array.from(e.target.files ?? []).map((f) => (f.size > 5_000_000 ? { name: f.name, size: "", ok: false, note: "too large (max 5 MB)" } : { name: f.name, size: `${Math.max(1, Math.round(f.size / 1024))} KB`, ok: true }));
                setFiles((x) => [...x, ...list]);
                setStatus(`${list.length} file${list.length === 1 ? "" : "s"} added. Each can be removed before sending.`);
                e.target.value = "";
              }}
            />
          </label>
          <span id="cp-keys" className="text-xs text-ink-3">
            {enterSends ? "Enter sends · Shift+Enter adds a line" : "Enter adds a line · use Send"}
          </span>
          {phase === "generating" ? (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                t.clear();
                setPhase("done");
                setStatus("Stopped. Your request is kept.");
              }}
            >
              Stop
            </button>
          ) : (
            <button type="button" className="btn btn-primary btn-sm" disabled={!draft.trim()} onClick={send}>
              Send
            </button>
          )}
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs text-ink-2">
        <input type="checkbox" checked={enterSends} onChange={(e) => setEnterSends(e.target.checked)} /> Enter sends the request
      </label>
    </DemoFrame>
  );
}

/* --------------------------------------------------------------------- */
/* 3 · Processing, streaming and stop                                    */
/* --------------------------------------------------------------------- */
const STEPS = ["Reading 3 attached files", "Comparing the delivery terms", "Drafting the summary"];
const ANSWER =
  "The three contracts differ mainly in delivery terms. Northside commits to 5 working days and charges for late changes. Harbour Supplies offers 3 days but excludes remote regions. Brightline has no committed time but allows free changes until dispatch. If speed matters most, Harbour fits; if flexibility matters, Brightline.";

function WaitDemo() {
  const reduce = useReducedMotion();
  const t = useTimers();
  const [phase, setPhase] = useState<"idle" | "processing" | "streaming" | "done" | "stopped">("idle");
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState("");
  const [slow, setSlow] = useState(false);
  const [status, setStatus] = useState("Send the request to see the processing and streaming states.");
  const start = () => {
    t.clear();
    setShown("");
    setStep(0);
    setPhase("processing");
    setStatus(`Processing: ${STEPS[0]}.`);
    const k = slow ? 2.5 : 1;
    STEPS.forEach((s, i) =>
      t.after(i * 900 * k, () => {
        setStep(i);
        setStatus(`Processing: ${s}.`);
      }),
    );
    const words = ANSWER.split(" ");
    const begin = STEPS.length * 900 * k;
    t.after(begin, () => {
      setPhase("streaming");
      setStatus("Generating the answer. Stop is available.");
    });
    const chunk = reduce ? 12 : 1;
    for (let i = chunk; i <= words.length + chunk - 1; i += chunk)
      t.after(begin + (i / chunk) * (reduce ? 250 : 70) * k, () => {
        setShown(words.slice(0, Math.min(i, words.length)).join(" "));
        if (i >= words.length) {
          setPhase("done");
          setStatus("Answer complete.");
        }
      });
  };
  const stop = () => {
    t.clear();
    setPhase("stopped");
    setStatus("Stopped. The partial answer is kept.");
  };
  const busy = phase === "processing" || phase === "streaming";
  return (
    <DemoFrame title="Procurement assistant" status={status} onReset={() => { t.clear(); setPhase("idle"); setShown(""); setStatus("Reset."); }}>
      <Bubble who="you">Compare the delivery terms in the three attached contracts.</Bubble>
      {phase === "processing" && (
        <div className="rounded-lg border border-rule bg-surface px-3.5 py-2.5 text-sm">
          <p className="flex items-center gap-2 text-ink">
            <span aria-hidden className={`h-2 w-2 rounded-full bg-accent ${reduce ? "" : "animate-pulse"}`} />
            {STEPS[step]}…
          </p>
          <ol className="mt-2 space-y-0.5 text-xs text-ink-3">
            {STEPS.map((s, i) => (
              <li key={s}>{i < step ? "✓ " : i === step ? "→ " : "· "}{s}</li>
            ))}
          </ol>
        </div>
      )}
      {(phase === "streaming" || phase === "done" || phase === "stopped") && (
        <Bubble who="ai">
          <div className="mb-1 flex items-center gap-2">
            <AiLabel />
            {phase === "stopped" && <span className="text-xs font-semibold text-warn">Stopped</span>}
          </div>
          <p aria-busy={phase === "streaming"}>{shown}</p>
          {phase !== "streaming" && (
            <p className="mt-2 flex flex-wrap gap-3">
              <button type="button" className="btn btn-text text-xs" onClick={start}>
                Regenerate
              </button>
              <button type="button" className="btn btn-text text-xs" onClick={() => navigator.clipboard?.writeText(shown).then(() => setStatus("Copied."), () => setStatus("Copy is not available here."))}>
                Copy
              </button>
            </p>
          )}
        </Bubble>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="flex items-center gap-2 text-xs text-ink-2">
          <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} disabled={busy} /> Simulate a slow model
        </label>
        {busy ? (
          <button type="button" className="btn btn-primary" onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={start}>
            {phase === "idle" ? "Send" : "Send again"}
          </button>
        )}
      </div>
      {reduce && <p className="text-xs text-ink-3">Reduced motion is on: text appears in larger chunks.</p>}
    </DemoFrame>
  );
}

/* --------------------------------------------------------------------- */
/* 4 · Labels, citations and explanations                                */
/* --------------------------------------------------------------------- */
const SOURCES = [
  { n: 1, title: "Returns policy (help centre)", quote: "You can return most items within 30 days of delivery for a full refund." },
  { n: 2, title: "Delivery FAQ", quote: "Refunds are paid to the original payment method within 5 working days of the item arriving at our warehouse." },
];

function SourcesDemo() {
  const [open, setOpen] = useState<number | null>(null);
  const [why, setWhy] = useState(false);
  const [ungrounded, setUngrounded] = useState(false);
  const [status, setStatus] = useState("Select a numbered marker to see what the source says.");
  return (
    <DemoFrame title="Help centre assistant" status={status} onReset={() => { setOpen(null); setWhy(false); setUngrounded(false); setStatus("Reset."); }}>
      <Bubble who="you">How long do refunds take?</Bubble>
      <Bubble who="ai">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <AiLabel />
          <span className="text-xs text-ink-3">Based on 2 help-centre articles</span>
        </div>
        <p>
          You can return most items within 30 days{" "}
          <button type="button" className="btn btn-text text-xs align-baseline" aria-expanded={open === 1} aria-label="Source 1: Returns policy" onClick={() => { setOpen(open === 1 ? null : 1); setStatus(open === 1 ? "Source closed." : "Source 1 opened."); }}>
            [1]
          </button>
          . Refunds reach your original payment method within 5 working days of the item arriving at the warehouse{" "}
          <button type="button" className="btn btn-text text-xs align-baseline" aria-expanded={open === 2} aria-label="Source 2: Delivery FAQ" onClick={() => { setOpen(open === 2 ? null : 2); setStatus(open === 2 ? "Source closed." : "Source 2 opened."); }}>
            [2]
          </button>
          .
          {ungrounded && (
            <span className="mt-2 block rounded-xs border border-dashed border-warn bg-warn-wash px-2 py-1 text-xs text-ink">
              Express refunds may be faster. <span className="font-semibold text-warn">Not found in the help centre; check before relying on it.</span>
            </span>
          )}
        </p>
        {open && (
          <blockquote className="mt-2 rounded-xs border-l-2 border-accent bg-soft px-3 py-2 text-xs text-ink-2">
            <p className="font-semibold text-ink">
              [{open}] {SOURCES[open - 1].title}
            </p>
            <p className="mt-0.5">&ldquo;{SOURCES[open - 1].quote}&rdquo;</p>
          </blockquote>
        )}
        <button type="button" className="btn btn-text mt-2 text-xs" aria-expanded={why} onClick={() => { setWhy(!why); setStatus(why ? "Explanation closed." : "Explanation opened."); }}>
          Why this answer?
        </button>
        {why && (
          <p className="mt-1 text-xs text-ink-2">
            It searched the help centre for refund timing and used the two articles that mention it. It did not use order history, so it cannot say when your own refund will arrive.
          </p>
        )}
      </Bubble>
      <label className="flex items-center gap-2 text-xs text-ink-2">
        <input type="checkbox" checked={ungrounded} onChange={(e) => { setUngrounded(e.target.checked); setStatus(e.target.checked ? "An ungrounded statement is now shown and marked." : "Ungrounded statement hidden."); }} /> Show a statement with no supporting source
      </label>
    </DemoFrame>
  );
}

/* --------------------------------------------------------------------- */
/* 5 · Refine: follow-ups, versions, adjustments, branching              */
/* --------------------------------------------------------------------- */
const VERSIONS = [
  "Hi Sam, thanks for your patience. Your order left our warehouse on Monday and should arrive by Thursday. I've added tracking below.",
  "Hello Sam, sorry for the wait. Your parcel shipped on Monday; the courier expects to deliver it by Thursday. Tracking is below.",
  "Sam, your order is on its way: it shipped Monday and is due Thursday. Here is the tracking link.",
];
const ADJUST: Record<string, string> = {
  Shorter: "Hi Sam, your order shipped Monday and is due Thursday. Tracking below.",
  "More formal": "Dear Sam, thank you for your patience. Your order was dispatched on Monday and is expected to be delivered by Thursday. Please find the tracking details below.",
};

function RefineDemo() {
  const [v, setV] = useState(0);
  const [adjusted, setAdjusted] = useState<string | null>(null);
  const [branch, setBranch] = useState<0 | 1>(0);
  const [status, setStatus] = useState("Try another version, adjust the draft or choose a follow-up.");
  const text = adjusted ? ADJUST[adjusted] : VERSIONS[v];
  return (
    <DemoFrame title="Reply drafting" status={status} onReset={() => { setV(0); setAdjusted(null); setBranch(0); setStatus("Reset."); }}>
      <div>
        <Bubble who="you">{branch === 0 ? "Draft a reply to Sam about the late delivery." : "Draft a short, apologetic reply to Sam about the late delivery."}</Bubble>
        <div className="mt-1 flex items-center justify-end gap-1 text-xs text-ink-3" role="group" aria-label="Conversation branch">
          <button type="button" className="btn btn-text text-xs" aria-label="Previous branch" disabled={branch === 0} onClick={() => { setBranch(0); setStatus("Branch 1 of 2: the original request."); }}>
            ‹
          </button>
          <span>{branch + 1} / 2</span>
          <button type="button" className="btn btn-text text-xs" aria-label="Next branch" disabled={branch === 1} onClick={() => { setBranch(1); setStatus("Branch 2 of 2: the edited request. The original is kept."); }}>
            ›
          </button>
        </div>
      </div>
      <Bubble who="ai">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
          <AiLabel />
          <span className="flex items-center gap-1 text-xs text-ink-3" role="group" aria-label="Versions">
            <button type="button" className="btn btn-text text-xs" aria-label="Previous version" disabled={v === 0 || !!adjusted} onClick={() => { setV(v - 1); setStatus(`Version ${v} of 3.`); }}>
              ‹
            </button>
            Version {v + 1} of 3
            <button type="button" className="btn btn-text text-xs" aria-label="Next version" disabled={v === 2 || !!adjusted} onClick={() => { setV(v + 1); setStatus(`Version ${v + 2} of 3.`); }}>
              ›
            </button>
          </span>
        </div>
        <p>{branch === 1 && !adjusted ? "Hi Sam, I'm sorry your order is late. It shipped Monday and is due Thursday; tracking is below." : text}</p>
        {adjusted && (
          <p className="mt-1.5 text-xs text-ink-2">
            Made {adjusted.toLowerCase()} ·{" "}
            <button type="button" className="btn btn-text text-xs" onClick={() => { setAdjusted(null); setStatus("Change undone."); }}>
              Undo
            </button>
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {Object.keys(ADJUST).map((k) => (
            <button key={k} type="button" className="btn btn-secondary btn-sm" onClick={() => { setAdjusted(k); setStatus(`Made ${k.toLowerCase()}. Undo is available.`); }}>
              {k}
            </button>
          ))}
          <button type="button" className="btn btn-tertiary btn-sm" disabled={!!adjusted} onClick={() => { setV((v + 1) % 3); setStatus(`New attempt: version ${((v + 1) % 3) + 1} of 3. Earlier versions are kept.`); }}>
            Try again
          </button>
        </div>
      </Bubble>
      <div>
        <p id="fu-h" className="label">Follow-ups</p>
        <ul aria-labelledby="fu-h" className="mt-1.5 flex flex-wrap gap-1.5">
          {["Add a 10% discount code", "Translate into Spanish", "Make it a text message"].map((f) => (
            <li key={f}>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStatus(`Follow-up chosen: "${f}". In a real product this is sent as the next request.`)}>
                {f}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </DemoFrame>
  );
}

/* --------------------------------------------------------------------- */
/* 6 · Errors and refusals                                               */
/* --------------------------------------------------------------------- */
type Case = "network" | "timeout" | "refusal" | "scope";
const CASES: Record<Case, { label: string; request: string }> = {
  network: { label: "Network failure", request: "Summarise the attached board minutes." },
  timeout: { label: "Timeout with partial answer", request: "Summarise the attached board minutes." },
  refusal: { label: "Not allowed", request: "Show me Priya's salary and bank details." },
  scope: { label: "Out of scope", request: "Book me a flight to Lisbon." },
};

function RecoverDemo() {
  const [c, setC] = useState<Case>("network");
  const [retried, setRetried] = useState(false);
  const [status, setStatus] = useState("Choose a failure to see how it is handled.");
  const pick = (k: Case) => {
    setC(k);
    setRetried(false);
    setStatus(`${CASES[k].label} selected.`);
  };
  return (
    <DemoFrame title="Workplace assistant" status={status} onReset={() => pick("network")}>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Failure to simulate">
        {(Object.keys(CASES) as Case[]).map((k) => (
          <button key={k} type="button" className="btn btn-secondary btn-sm" aria-pressed={c === k} onClick={() => pick(k)}>
            {CASES[k].label}
          </button>
        ))}
      </div>
      <Bubble who="you">{CASES[c].request}</Bubble>
      {retried ? (
        <Bubble who="ai">
          <div className="mb-1">
            <AiLabel />
          </div>
          The board agreed the budget, delayed the office move to spring and asked for a hiring plan by March.
        </Bubble>
      ) : c === "network" ? (
        <div role="alert" className="rounded-lg border border-error bg-error-wash px-3.5 py-2.5 text-sm text-ink">
          <p className="font-semibold text-error">Your request didn&apos;t reach the assistant.</p>
          <p className="mt-0.5 text-ink-2">Check your connection. Your question and attachment are still here.</p>
          <button type="button" className="btn btn-secondary btn-sm mt-2" onClick={() => { setRetried(true); setStatus("Retried with the same request: answer received."); }}>
            Retry
          </button>
        </div>
      ) : c === "timeout" ? (
        <Bubble who="ai">
          <div className="mb-1 flex items-center gap-2">
            <AiLabel />
            <span className="text-xs font-semibold text-warn">Incomplete</span>
          </div>
          <p>The board agreed the budget and…</p>
          <p className="mt-2 text-xs text-ink-2">The answer stopped because the request took too long. Retry, or remove the 40-page appendix to make it faster.</p>
          <span className="mt-2 flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setRetried(true); setStatus("Retried: complete answer received."); }}>
              Retry
            </button>
            <button type="button" className="btn btn-tertiary btn-sm" onClick={() => setStatus("Appendix removed from the request (simulated). Retry when ready.")}>
              Remove appendix
            </button>
          </span>
        </Bubble>
      ) : c === "refusal" ? (
        <Bubble who="ai">
          I can&apos;t share other people&apos;s salary or bank details. I can help you request a pay report from HR, which shows the information your role is allowed to see.
          <span className="mt-2 block">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStatus("Alternative chosen: request a pay report from HR.")}>
              Request a pay report
            </button>
          </span>
        </Bubble>
      ) : (
        <Bubble who="ai">
          I can&apos;t book travel. I can help with documents, email and calendars in your workspace, for example finding free days for a trip.
          <span className="mt-2 block">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setStatus("Alternative chosen: find free days in your calendar.")}>
              Find free days
            </button>
          </span>
        </Bubble>
      )}
    </DemoFrame>
  );
}

/* --------------------------------------------------------------------- */
/* 7 · Intent preview, approval and delegation                           */
/* --------------------------------------------------------------------- */
type Step = { id: string; text: string; risky?: boolean };
const PLAN: Step[] = [
  { id: "s1", text: "Check stock of printer paper and toner in the office inventory" },
  { id: "s2", text: "Ask Northside Supplies and Harbour Supplies for quotes" },
  { id: "s3", text: "Choose the cheaper quote that delivers by Friday" },
  { id: "s4", text: "Pay up to £240 from the office card", risky: true },
];

function ApprovalDemo() {
  const t = useTimers();
  const [plan, setPlan] = useState(PLAN);
  const [phase, setPhase] = useState<"preview" | "running" | "gate" | "paused" | "done" | "cancelled" | "rejected">("preview");
  const [done, setDone] = useState(0);
  const [status, setStatus] = useState("Nothing has run yet. Review the plan.");
  const runFrom = (from: number) => {
    setPhase("running");
    const steps = plan.slice(from);
    steps.forEach((s, i) =>
      t.after((i + 1) * 1100, () => {
        if (s.risky) {
          setPhase("gate");
          setStatus(`Waiting for your approval: ${s.text}.`);
          t.clear();
          return;
        }
        setDone(from + i + 1);
        setStatus(`Done: ${s.text}.`);
        if (from + i + 1 === plan.length) {
          setPhase("done");
          setStatus("All steps complete.");
        }
      }),
    );
  };
  const reset = () => {
    t.clear();
    setPlan(PLAN);
    setDone(0);
    setPhase("preview");
    setStatus("Reset. Nothing has run.");
  };
  const gateStep = plan.findIndex((s) => s.risky);
  return (
    <DemoFrame title="Office agent" status={status} onReset={reset}>
      <Bubble who="you">Reorder printer supplies before Friday.</Bubble>
      <div className="rounded-lg border border-rule bg-surface p-3.5 text-sm">
        <p className="font-semibold text-ink">{phase === "preview" ? "Here is what I plan to do. Nothing has run yet." : "Task: reorder printer supplies"}</p>
        <ol className="mt-2 space-y-1.5">
          {plan.map((s, i) => (
            <li key={s.id} className="flex items-start gap-2">
              <span aria-hidden className="mt-0.5 w-4 shrink-0 text-center font-mono text-xs text-ink-3">
                {i < done ? "✓" : phase === "running" && i === done ? "→" : i + 1}
              </span>
              <span className="min-w-0 flex-1 text-ink">
                {s.text}
                {s.risky && <span className="ml-1.5 rounded-xs border border-warn px-1 font-mono text-[10px] uppercase tracking-[0.06em] text-warn">needs approval · payment</span>}
                <span className="sr-only">{i < done ? " (done)" : ""}</span>
              </span>
              {phase === "preview" && !s.risky && (
                <button type="button" className="btn btn-text text-xs" aria-label={`Remove step: ${s.text}`} onClick={() => { setPlan(plan.filter((x) => x.id !== s.id)); setStatus("Step removed from the plan. Nothing has run."); }}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ol>
        {phase === "preview" && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => { setStatus("Started. Payment will wait for your approval."); runFrom(0); }}>
              Start
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setPhase("cancelled"); setStatus("Cancelled. Nothing was done."); }}>
              Cancel
            </button>
          </div>
        )}
        {phase === "running" && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { t.clear(); setPhase("paused"); setStatus(`Paused after ${done} completed step${done === 1 ? "" : "s"}.`); }}>
              Pause
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { t.clear(); setPhase("cancelled"); setStatus(`Stopped. ${done} step${done === 1 ? "" : "s"} completed; nothing was paid.`); }}>
              Stop
            </button>
          </div>
        )}
        {phase === "paused" && (
          <button type="button" className="btn btn-primary btn-sm mt-3" onClick={() => { setStatus("Resumed."); runFrom(done); }}>
            Resume
          </button>
        )}
      </div>
      {phase === "gate" && (
        <div role="alertdialog" aria-labelledby="ap-h" aria-describedby="ap-d" className="rounded-lg border-2 border-ink bg-surface p-3.5 text-sm">
          <p id="ap-h" className="font-semibold text-ink">
            Approve payment?
          </p>
          <p id="ap-d" className="mt-1 text-ink-2">
            Pay <strong className="text-ink">£212.40</strong> to <strong className="text-ink">Harbour Supplies</strong> from the office card ending 4417. Delivery Thursday. This cannot be undone here.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={() => { setDone(gateStep + 1); setPhase("done"); setStatus("Payment approved and made (simulated). Task complete."); }}>
              Approve payment
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setPhase("rejected"); setStatus("Payment rejected. The agent stopped; nothing was paid."); }}>
              Reject
            </button>
          </div>
        </div>
      )}
      {(phase === "done" || phase === "rejected" || phase === "cancelled") && (
        <p className="rounded-md border border-rule bg-soft px-3 py-2 text-xs text-ink-2">
          {phase === "done" ? "Summary: stock checked, two quotes compared, Harbour Supplies chosen (£212.40, delivery Thursday), payment made after your approval." : phase === "rejected" ? "Summary: quotes gathered; payment rejected by you; no order placed." : "Summary: stopped by you; no order placed and nothing paid."}
        </p>
      )}
    </DemoFrame>
  );
}

const DEMOS: Record<AiDemoId, () => ReactNode> = {
  prompts: PromptsDemo,
  composer: ComposerDemo,
  wait: WaitDemo,
  sources: SourcesDemo,
  refine: RefineDemo,
  recover: RecoverDemo,
  approval: ApprovalDemo,
};

export function AiDemo({ id }: { id: AiDemoId }) {
  const D = DEMOS[id];
  return <D />;
}
