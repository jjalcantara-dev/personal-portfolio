"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { SLIDE_SIZE as N, SLIDE_EXIT_ROW, type SlideLevel } from "@/lib/games";
import { Actions, Solved, StartScreen, StatusBar, fill, formatTime, puzzleUi, useContainerWidth, useElapsed } from "./shared";
import { useOnSolve } from "./useOnSolve";

type Snapshot = { pos: number[]; moves: number; last: number };
type Drag = { b: number; origin: number; min: number; max: number; offset: number };

export default function SlidePuzzle({ level, locale, onSolve }: { level: SlideLevel; locale: Locale; onSolve?: () => void }) {
  const ui = puzzleUi(locale);
  const blocks = level.blocks;
  const initial = useMemo(() => blocks.map((b) => b[3]), [blocks]);

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [pos, setPos] = useState(initial);
  const [moves, setMoves] = useState(0);
  const [last, setLast] = useState(-1);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [drag, setDrag] = useState<Drag | null>(null);
  const pointerStart = useRef(0);

  const solved = pos[0] === N - 2;
  const elapsed = useElapsed(startedAt, solved);
  useOnSolve(solved, onSolve);

  const [boxRef, boxWidth] = useContainerWidth<HTMLDivElement>();
  // leave room on the right for the exit arrow
  const cell = Math.max(36, Math.min(64, Math.floor(((boxWidth || 360) - 28) / N)));

  // Free range of block b along its axis, given the other blocks.
  const range = useCallback(
    (b: number) => {
      const grid = new Uint8Array(N * N);
      blocks.forEach(([h, len, fixed], i) => {
        if (i === b) return;
        for (let k = 0; k < len; k++) grid[h ? fixed * N + pos[i] + k : (pos[i] + k) * N + fixed] = 1;
      });
      const [h, len, fixed] = blocks[b];
      const at = (c: number) => (h ? fixed * N + c : c * N + fixed);
      let min = pos[b], max = pos[b];
      while (min - 1 >= 0 && !grid[at(min - 1)]) min--;
      while (max + len < N && !grid[at(max + len)]) max++;
      return { min, max };
    },
    [blocks, pos],
  );

  // One move = one block, any distance: consecutive slides of the same block
  // count once, like the optimal count does.
  const commit = (b: number, to: number) => {
    if (to === pos[b] || solved) return;
    setHistory((h) => [...h, { pos, moves, last }]);
    setPos((p) => p.map((v, i) => (i === b ? to : v)));
    if (last !== b) setMoves((m) => m + 1);
    setLast(b);
  };

  const undo = () => {
    const prev = history.at(-1);
    if (!prev || solved) return;
    setHistory((h) => h.slice(0, -1));
    setPos(prev.pos);
    setMoves(prev.moves);
    setLast(prev.last);
  };

  const reset = () => {
    setPos(initial);
    setMoves(0);
    setLast(-1);
    setHistory([]);
  };

  if (startedAt === null) {
    return (
      <div ref={boxRef} className="w-full">
        <StartScreen ui={ui} onStart={() => setStartedAt(Date.now())} />
      </div>
    );
  }

  const onPointerDown = (b: number) => (e: React.PointerEvent) => {
    if (solved) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerStart.current = blocks[b][0] ? e.clientX : e.clientY;
    const { min, max } = range(b);
    setDrag({ b, origin: pos[b], min, max, offset: 0 });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const delta = ((blocks[drag.b][0] ? e.clientX : e.clientY) - pointerStart.current) / cell;
    setDrag({ ...drag, offset: Math.max(drag.min - drag.origin, Math.min(drag.max - drag.origin, delta)) });
  };
  const onPointerUp = () => {
    if (!drag) return;
    commit(drag.b, drag.origin + Math.round(drag.offset));
    setDrag(null);
  };
  const onKeyDown = (b: number) => (e: React.KeyboardEvent) => {
    const horizontal = blocks[b][0] === 1;
    const step =
      (horizontal && e.key === "ArrowLeft") || (!horizontal && e.key === "ArrowUp") ? -1
      : (horizontal && e.key === "ArrowRight") || (!horizontal && e.key === "ArrowDown") ? 1
      : 0;
    if (!step) return;
    e.preventDefault();
    const { min, max } = range(b);
    const to = pos[b] + step;
    if (to >= min && to <= max) commit(b, to);
  };

  const size = cell * N;
  const gap = Math.max(3, Math.round(cell * 0.07));

  return (
    <div ref={boxRef} className="w-full">
      <StatusBar
        items={[
          { label: ui.time, value: formatTime(elapsed) },
          { label: ui.moves, value: moves },
          { label: ui.minimum, value: level.minMoves },
        ]}
      />

      <div className="flex justify-center">
        <div
          role="group"
          aria-label={ui.board}
          className="relative border-2 border-black bg-white select-none"
          style={{
            width: size + 4,
            height: size + 4,
            backgroundImage: "linear-gradient(#f3f4f6 1px, transparent 1px), linear-gradient(90deg, #f3f4f6 1px, transparent 1px)",
            backgroundSize: `${cell}px ${cell}px`,
          }}
        >
          {/* Exit: a gap in the right wall, next to the red block's row */}
          <div
            aria-label={ui.exit}
            className="absolute bg-white"
            style={{ right: -2, top: SLIDE_EXIT_ROW * cell + 2, width: 2, height: cell }}
          />
          <svg
            aria-hidden="true"
            className="absolute text-red-600"
            style={{ left: size + 10, top: SLIDE_EXIT_ROW * cell + cell / 2 - 8 }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>

          {blocks.map(([h, len, fixed], b) => {
            const dragging = drag?.b === b;
            const p = pos[b] + (dragging ? drag.offset : 0) + (b === 0 && solved ? 2.5 : 0);
            const x = h ? p : fixed, y = h ? fixed : p;
            const label = b === 0 ? ui.redBlock : h ? ui.hBlock : ui.vBlock;
            return (
              <button
                key={b}
                type="button"
                aria-label={label}
                onPointerDown={onPointerDown(b)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={onKeyDown(b)}
                disabled={solved}
                className={`absolute rounded-md touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${
                  b === 0 ? "bg-red-600" : h ? "bg-gray-800" : "bg-gray-500"
                } ${h ? "cursor-ew-resize" : "cursor-ns-resize"} ${dragging ? "z-10 shadow-lg" : "transition-[left,top,opacity] duration-150 ease-out"}`}
                style={{
                  left: x * cell + gap / 2 + 2,
                  top: y * cell + gap / 2 + 2,
                  width: (h ? len : 1) * cell - gap,
                  height: (h ? 1 : len) * cell - gap,
                  opacity: b === 0 && solved ? 0 : 1,
                }}
              />
            );
          })}
        </div>
      </div>

      {solved ? (
        <Solved
          ui={ui}
          lines={[
            fill(ui.solvedTime, { time: formatTime(elapsed) }),
            moves <= level.minMoves ? ui.perfect : fill(ui.solvedMoves, { moves, min: level.minMoves }),
          ]}
        />
      ) : (
        <Actions ui={ui} onUndo={undo} canUndo={history.length > 0} onReset={reset} />
      )}
    </div>
  );
}
