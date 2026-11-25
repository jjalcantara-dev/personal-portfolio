import { slideLevels, bridgesLevels } from "./library";
import type { DailyPuzzle } from "./types";

// Day 1 of the daily puzzles. Days change at 00:00 UTC.
const EPOCH = Date.UTC(2026, 0, 1);
const DAY = 86_400_000;

const mod = (a: number, n: number) => ((a % n) + n) % n;

/** Days since EPOCH (UTC), 0-based. */
export function dayNumber(date: Date = new Date()): number {
  const utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return Math.floor((utc - EPOCH) / DAY);
}

/**
 * Today's puzzle, the same for every visitor. Kinds alternate day by day and
 * each list is walked in order, so nothing repeats until a list runs out
 * (60 + 60 levels = 120 days).
 */
export function getDailyPuzzle(date: Date = new Date()): DailyPuzzle {
  const day = dayNumber(date);
  const i = Math.floor(day / 2);
  const number = day + 1;
  return mod(day, 2) === 0
    ? { kind: "slide", number, level: slideLevels[mod(i, slideLevels.length)] }
    : { kind: "bridges", number, level: bridgesLevels[mod(i, bridgesLevels.length)] };
}
