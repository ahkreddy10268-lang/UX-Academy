/**
 * Machine-verifies the source registry.
 *  - Sources with a DOI are resolved against the Crossref REST API; the record's
 *    title and year are compared with ours.
 *  - Sources with only a URL get an HTTP GET; many publishers block automated
 *    clients, so a failure is recorded as "url-unreachable", never as "invalid".
 * Results are written to content/sources/verification.json and shown in the UI.
 *
 *   npm run sources:verify            # verify everything not checked in 30 days
 *   npm run sources:verify -- --all   # re-verify everything
 *   npm run sources:verify -- id1 id2 # verify specific ids
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { rawSources } from "../content/sources/_index";

type Result = {
  status: "doi-verified" | "doi-mismatch" | "doi-not-found" | "url-reachable" | "url-unreachable";
  checkedAt: string;
  registeredTitle?: string;
  registeredYear?: number;
  registeredContainer?: string;
  similarity?: number;
  httpStatus?: number;
  detail?: string;
};

const file = join(import.meta.dirname, "..", "content", "sources", "verification.json");
const existing: Record<string, Result> = existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
const args = process.argv.slice(2);
const all = args.includes("--all");
const only = args.filter((a) => !a.startsWith("--"));
const today = new Date().toISOString().slice(0, 10);
const stale = (r?: Result) => !r || Date.now() - Date.parse(r.checkedAt) > 30 * 864e5;

function tokens(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/<[^>]+>/g, " ")
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2),
  );
}
function similarity(a: string, b: string): number {
  const A = tokens(a);
  const B = tokens(b);
  if (!A.size || !B.size) return 0;
  let shared = 0;
  A.forEach((t) => B.has(t) && shared++);
  return shared / Math.min(A.size, B.size);
}

async function checkDoi(doi: string, title: string, year?: number): Promise<Result> {
  const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
    headers: { "User-Agent": "UXAcademy-source-verifier/1.0" },
  });
  if (res.status === 404) return { status: "doi-not-found", checkedAt: today, httpStatus: 404 };
  if (!res.ok) throw new Error(`Crossref HTTP ${res.status}`);
  const m = (await res.json()).message;
  const registeredTitle: string = [m.title?.[0], m.subtitle?.[0]].filter(Boolean).join(": ");
  const parts = m.issued?.["date-parts"]?.[0] ?? m.published?.["date-parts"]?.[0];
  const registeredYear: number | undefined = parts?.[0];
  const sim = similarity(title, registeredTitle);
  const yearOk = !year || !registeredYear || Math.abs(registeredYear - year) <= 1;
  return {
    status: sim >= 0.6 && yearOk ? "doi-verified" : "doi-mismatch",
    checkedAt: today,
    registeredTitle,
    registeredYear,
    registeredContainer: m["container-title"]?.[0],
    similarity: Math.round(sim * 100) / 100,
    detail: yearOk ? undefined : `year differs: registry ${year}, Crossref ${registeredYear}`,
  };
}

async function checkUrl(url: string): Promise<Result> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (UXAcademy-source-verifier/1.0)" },
      signal: AbortSignal.timeout(20000),
    });
    return { status: res.ok ? "url-reachable" : "url-unreachable", checkedAt: today, httpStatus: res.status };
  } catch (e) {
    return { status: "url-unreachable", checkedAt: today, detail: String(e) };
  }
}

const targets = rawSources.filter((s) =>
  only.length ? only.includes(s.id) : all || stale(existing[s.id]),
);
console.log(`Verifying ${targets.length} of ${rawSources.length} sources…`);

for (const s of targets) {
  try {
    const r = s.doi ? await checkDoi(s.doi, s.title, s.year) : s.url ? await checkUrl(s.url) : undefined;
    if (!r) continue;
    existing[s.id] = r;
    const flag = r.status === "doi-verified" || r.status === "url-reachable" ? "✓" : "✗";
    console.log(`${flag} ${s.id.padEnd(34)} ${r.status}${r.registeredTitle ? ` — "${r.registeredTitle}" (${r.registeredYear})` : ""}${r.detail ? ` — ${r.detail}` : ""}`);
  } catch (e) {
    console.log(`? ${s.id.padEnd(34)} check failed: ${String(e)}`);
  }
  await new Promise((r) => setTimeout(r, 150)); // be polite to Crossref
}

const sorted = Object.fromEntries(Object.entries(existing).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(file, JSON.stringify(sorted, null, 2) + "\n");
const failures = targets.filter((s) => ["doi-mismatch", "doi-not-found"].includes(existing[s.id]?.status));
if (failures.length) {
  console.log(`\n${failures.length} DOI problem(s): ${failures.map((f) => f.id).join(", ")}`);
  process.exitCode = 1;
}
