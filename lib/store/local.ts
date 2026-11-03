"use client";
/** Small localStorage-backed values (theme, lab tallies) read through useSyncExternalStore. */
import { useCallback, useSyncExternalStore } from "react";

const EVENT = "ux-academy:local";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocal(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

/** Returns the raw string (null on the server and when unset). */
export function useLocalString(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    useCallback(() => read(key), [key]),
    () => null,
  );
}

/** JSON value with a fallback. The raw string is the snapshot, so references stay stable. */
export function useLocalJson<T>(key: string, fallback: T, valid: (v: unknown) => v is T): T {
  const raw = useLocalString(key);
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return valid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
