"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { clr } from "@/lib/constants/colors";

export type PuzzleUi = ReturnType<typeof getContent>["puzzles"]["ui"];

export const puzzleUi = (locale: Locale): PuzzleUi => getContent(locale).puzzles.ui;

export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""));

export const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

/** Seconds since `startedAt`, frozen once `stopped`. */
export function useElapsed(startedAt: number | null, stopped: boolean): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (startedAt === null || stopped) return;
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, [startedAt, stopped]);
  return startedAt === null ? 0 : Math.max(0, Math.floor((now - startedAt) / 1000));
}

/**
 * Width available to the board, tracked with a ResizeObserver. Returns a
 * callback ref, so it follows the element even when it is replaced (start
 * screen -> board).
 */
export function useContainerWidth<T extends HTMLElement>(): [(el: T | null) => void, number] {
  const [el, setEl] = useState<T | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);
  return [setEl, width];
}

export function StartScreen({ ui, onStart }: { ui: PuzzleUi; onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <button
        type="button"
        onClick={onStart}
        className="px-10 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        {ui.start}
      </button>
      <p className={`text-sm ${clr.text.muted}`}>{ui.startHint}</p>
    </div>
  );
}

export function StatusBar({ items }: { items: { label: string; value: ReactNode }[] }) {
  return (
    <div className={`flex justify-center gap-6 mb-5 text-sm ${clr.text.muted}`}>
      {items.map(({ label, value }) => (
        <span key={label}>
          {label}: <span className={`font-mono font-semibold ${clr.text.primary}`}>{value}</span>
        </span>
      ))}
    </div>
  );
}

const actionClass =
  "px-5 py-2.5 border border-gray-300 text-sm font-medium hover:border-black transition-colors min-h-[44px] touch-manipulation disabled:opacity-40 disabled:hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2";

export function Actions({ ui, onUndo, canUndo, onReset }: { ui: PuzzleUi; onUndo: () => void; canUndo: boolean; onReset: () => void }) {
  return (
    <div className="mt-5 flex justify-center gap-3">
      <button type="button" onClick={onUndo} disabled={!canUndo} className={actionClass}>
        {ui.undo}
      </button>
      <button type="button" onClick={onReset} className={actionClass}>
        {ui.reset}
      </button>
    </div>
  );
}

export function Solved({ ui, lines }: { ui: PuzzleUi; lines: string[] }) {
  return (
    <div className="mt-6 text-center" role="status">
      <p className="text-lg font-medium text-emerald-700 mb-1">{ui.solved}</p>
      {lines.map((l) => (
        <p key={l} className={`text-sm ${clr.text.body}`}>{l}</p>
      ))}
    </div>
  );
}
