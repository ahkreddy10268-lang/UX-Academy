"use client";
/**
 * Local-first personal learning store. All personal data lives in this
 * browser's localStorage under one versioned key, and can be exported and
 * imported as JSON. No network, no accounts.
 */
import { useSyncExternalStore } from "react";

export type Level = "beginner" | "intermediate" | "advanced";

export type LearnerState = {
  version: 1;
  bookmarks: Record<string, { at: string }>;
  notes: Record<string, { text: string; updatedAt: string }>;
  history: { slug: string; at: string }[];
  progress: Record<string, { levels: Level[]; completedAt?: string }>;
  quiz: Record<string, { attempts: number; correct: number; lastAt: string; lastCorrect: boolean; entry: string }>;
  cards: Record<string, { box: number; due: string; reviews: number; entry: string }>;
  savedCalculations: { id: string; formula: string; label: string; summary: string; at: string }[];
  collections: Record<string, { name: string; slugs: string[]; createdAt: string }>;
  workshops: Record<string, { status: "started" | "submitted"; response: string; updatedAt: string }>;
  labRuns: Record<string, { at: string; summary: string }[]>;
  prefs: { level: Level };
};

export const STORAGE_KEY = "ux-academy:v1";

export const emptyState = (): LearnerState => ({
  version: 1,
  bookmarks: {},
  notes: {},
  history: [],
  progress: {},
  quiz: {},
  cards: {},
  savedCalculations: [],
  collections: {},
  workshops: {},
  labRuns: {},
  prefs: { level: "beginner" },
});

const SERVER_SNAPSHOT = emptyState();
let state: LearnerState | null = null;
const listeners = new Set<() => void>();

function load(): LearnerState {
  if (state) return state;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    state = raw ? migrate(JSON.parse(raw)) : emptyState();
  } catch {
    state = emptyState();
  }
  return state;
}

/** Accept older or partial shapes; unknown keys are dropped. */
export function migrate(input: unknown): LearnerState {
  const base = emptyState();
  if (!input || typeof input !== "object") return base;
  const s = input as Partial<LearnerState>;
  return {
    version: 1,
    bookmarks: { ...base.bookmarks, ...(s.bookmarks ?? {}) },
    notes: { ...(s.notes ?? {}) },
    history: Array.isArray(s.history) ? s.history.slice(0, 300) : [],
    progress: { ...(s.progress ?? {}) },
    quiz: { ...(s.quiz ?? {}) },
    cards: { ...(s.cards ?? {}) },
    savedCalculations: Array.isArray(s.savedCalculations) ? s.savedCalculations : [],
    collections: { ...(s.collections ?? {}) },
    workshops: { ...(s.workshops ?? {}) },
    labRuns: { ...(s.labRuns ?? {}) },
    prefs: { ...base.prefs, ...(s.prefs ?? {}) },
  };
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or disabled — keep working in memory.
  }
  listeners.forEach((l) => l());
}

export function update(mutator: (draft: LearnerState) => void) {
  const next = structuredClone(load());
  mutator(next);
  state = next;
  persist();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Subscribe to the learner state. Returns the empty state during server render and hydration. */
export function useLearner<T>(select: (s: LearnerState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => select(load()),
    () => select(SERVER_SNAPSHOT),
  );
}

/* ---------------- Actions ---------------- */

const now = () => new Date().toISOString();
const today = () => new Date().toISOString().slice(0, 10);
const addDays = (days: number) => new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);

export const actions = {
  toggleBookmark(slug: string) {
    update((s) => {
      if (s.bookmarks[slug]) delete s.bookmarks[slug];
      else s.bookmarks[slug] = { at: now() };
    });
  },
  saveNote(slug: string, text: string) {
    update((s) => {
      if (text.trim()) s.notes[slug] = { text, updatedAt: now() };
      else delete s.notes[slug];
    });
  },
  visit(slug: string) {
    update((s) => {
      s.history = [{ slug, at: now() }, ...s.history.filter((h) => h.slug !== slug)].slice(0, 300);
    });
  },
  readLevel(slug: string, level: Level) {
    update((s) => {
      const p = (s.progress[slug] ??= { levels: [] });
      if (!p.levels.includes(level)) p.levels.push(level);
    });
  },
  setComplete(slug: string, complete: boolean) {
    update((s) => {
      const p = (s.progress[slug] ??= { levels: [] });
      if (complete) p.completedAt = now();
      else delete p.completedAt;
    });
  },
  answer(questionId: string, entry: string, correct: boolean) {
    update((s) => {
      const q = (s.quiz[questionId] ??= { attempts: 0, correct: 0, lastAt: now(), lastCorrect: correct, entry });
      q.attempts++;
      if (correct) q.correct++;
      q.lastAt = now();
      q.lastCorrect = correct;
    });
  },
  addCards(cards: { id: string; entry: string }[]) {
    update((s) => {
      for (const c of cards) s.cards[c.id] ??= { box: 1, due: today(), reviews: 0, entry: c.entry };
    });
  },
  removeCards(ids: string[]) {
    update((s) => ids.forEach((id) => delete s.cards[id]));
  },
  /** Leitner system: correct → next box (intervals 1, 3, 7, 14, 30 days); wrong → box 1, due tomorrow. */
  reviewCard(id: string, remembered: boolean) {
    update((s) => {
      const c = s.cards[id];
      if (!c) return;
      c.reviews++;
      c.box = remembered ? Math.min(5, c.box + 1) : 1;
      c.due = addDays(remembered ? LEITNER_INTERVALS[c.box - 1] : 1);
    });
  },
  saveCalculation(formula: string, label: string, summary: string) {
    update((s) => {
      s.savedCalculations.unshift({ id: crypto.randomUUID(), formula, label, summary, at: now() });
      s.savedCalculations = s.savedCalculations.slice(0, 200);
    });
  },
  deleteCalculation(id: string) {
    update((s) => {
      s.savedCalculations = s.savedCalculations.filter((c) => c.id !== id);
    });
  },
  createCollection(name: string) {
    const id = crypto.randomUUID();
    update((s) => {
      s.collections[id] = { name, slugs: [], createdAt: now() };
    });
    return id;
  },
  toggleInCollection(id: string, slug: string) {
    update((s) => {
      const c = s.collections[id];
      if (!c) return;
      c.slugs = c.slugs.includes(slug) ? c.slugs.filter((x) => x !== slug) : [...c.slugs, slug];
    });
  },
  deleteCollection(id: string) {
    update((s) => {
      delete s.collections[id];
    });
  },
  saveWorkshop(id: string, response: string, status: "started" | "submitted") {
    update((s) => {
      s.workshops[id] = { response, status, updatedAt: now() };
    });
  },
  recordLabRun(lab: string, summary: string) {
    update((s) => {
      (s.labRuns[lab] ??= []).unshift({ at: now(), summary });
      s.labRuns[lab] = s.labRuns[lab].slice(0, 20);
    });
  },
  setLevel(level: Level) {
    update((s) => {
      s.prefs.level = level;
    });
  },
  replaceAll(next: LearnerState) {
    state = migrate(next);
    persist();
  },
  reset() {
    state = emptyState();
    persist();
  },
};

export const LEITNER_INTERVALS = [1, 3, 7, 14, 30];

export function isDue(card: { due: string }) {
  return card.due <= today();
}

export function exportJson(): string {
  return JSON.stringify({ exportedAt: now(), app: "ux-academy", data: load() }, null, 2);
}

export function parseImport(text: string): LearnerState {
  const parsed = JSON.parse(text);
  const data = parsed?.app === "ux-academy" ? parsed.data : parsed;
  if (!data || typeof data !== "object" || data.version !== 1) throw new Error("This file is not a UX Academy export (version 1).");
  return migrate(data);
}
