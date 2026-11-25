"use client";

import { useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { BridgesLevel } from "@/lib/games";
import { Actions, Solved, StartScreen, StatusBar, fill, formatTime, puzzleUi, useContainerWidth, useElapsed } from "./shared";
import { useOnSolve } from "./useOnSolve";

type Edge = { a: number; b: number; horizontal: boolean; cells: number[] };

// Every pair of islands that see each other, and which pairs would cross.
function buildEdges(level: BridgesLevel) {
  const { width: W, height: H, islands } = level;
  const at = new Map(islands.map(([x, y], i) => [y * W + x, i]));
  const edges: Edge[] = [];
  islands.forEach(([x0, y0], a) => {
    for (const [dx, dy] of [[1, 0], [0, 1]]) {
      const cells: number[] = [];
      let x = x0 + dx, y = y0 + dy;
      while (x < W && y < H && !at.has(y * W + x)) { cells.push(y * W + x); x += dx; y += dy; }
      if (x < W && y < H && cells.length) edges.push({ a, b: at.get(y * W + x)!, horizontal: dy === 0, cells });
    }
  });
  const crosses = edges.map((e) =>
    edges.flatMap((f, j) => (e.horizontal !== f.horizontal && e.cells.some((c) => f.cells.includes(c)) ? [j] : [])),
  );
  // edgeFrom[island][dir] for keyboard: 0 right, 1 down, 2 left, 3 up
  const edgeFrom = islands.map(() => [-1, -1, -1, -1]);
  edges.forEach((e, i) => {
    edgeFrom[e.a][e.horizontal ? 0 : 1] = i;
    edgeFrom[e.b][e.horizontal ? 2 : 3] = i;
  });
  return { edges, crosses, edgeFrom };
}

export default function BridgesPuzzle({ level, locale, onSolve }: { level: BridgesLevel; locale: Locale; onSolve?: () => void }) {
  const ui = puzzleUi(locale);
  const { islands, width: W, height: H } = level;
  const { edges, crosses, edgeFrom } = useMemo(() => buildEdges(level), [level]);

  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [counts, setCounts] = useState<number[]>(() => edges.map(() => 0));
  const [history, setHistory] = useState<number[][]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [blocked, setBlocked] = useState<number | null>(null);
  const dragFrom = useRef<number | null>(null);

  const have = islands.map(() => 0);
  edges.forEach((e, i) => { have[e.a] += counts[i]; have[e.b] += counts[i]; });

  // Numbers all met and every island in one group (crossings can't happen).
  const parent = islands.map((_, i) => i);
  const find = (x: number): number => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  edges.forEach((e, i) => { if (counts[i]) parent[find(e.a)] = find(e.b); });
  const solved = islands.every(([, , n], i) => have[i] === n) && islands.every((_, i) => find(i) === find(0));

  const elapsed = useElapsed(startedAt, solved);
  useOnSolve(solved, onSolve);

  const [boxRef, boxWidth] = useContainerWidth<HTMLDivElement>();
  const cell = Math.max(30, Math.min(56, Math.floor((boxWidth || 360) / W)));

  const edgeBetween = (i: number, j: number) => edges.findIndex((e) => (e.a === i && e.b === j) || (e.a === j && e.b === i));

  // 0 -> 1 -> 2 -> 0. A new bridge can't cross an existing one.
  const cycle = (e: number) => {
    if (e < 0 || solved) return;
    if (counts[e] === 0 && crosses[e].some((f) => counts[f] > 0)) {
      setBlocked(e);
      setTimeout(() => setBlocked(null), 400);
      return;
    }
    setHistory((h) => [...h, counts]);
    setCounts((c) => c.map((v, i) => (i === e ? (v + 1) % 3 : v)));
  };

  const tap = (i: number) => {
    if (selected === null) return setSelected(i);
    if (selected === i) return setSelected(null);
    const e = edgeBetween(selected, i);
    if (e < 0) return setSelected(i);
    cycle(e);
    setSelected(null);
  };

  const undo = () => {
    const prev = history.at(-1);
    if (!prev || solved) return;
    setHistory((h) => h.slice(0, -1));
    setCounts(prev);
  };
  const reset = () => {
    setCounts(edges.map(() => 0));
    setHistory([]);
    setSelected(null);
  };

  if (startedAt === null) {
    return (
      <div ref={boxRef} className="w-full">
        <StartScreen ui={ui} onStart={() => setStartedAt(Date.now())} />
      </div>
    );
  }

  const onPointerDown = (i: number) => (e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    dragFrom.current = i;
  };
  const onPointerUp = (i: number) => (e: React.PointerEvent) => {
    const from = dragFrom.current;
    dragFrom.current = null;
    if (from === null || solved) return;
    if (from !== i) {
      cycle(edgeBetween(from, i));
      setSelected(null);
    } else {
      e.preventDefault();
      tap(i);
    }
  };
  const onKeyDown = (i: number) => (e: React.KeyboardEvent) => {
    const dir = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].indexOf(e.key);
    if (dir >= 0) {
      e.preventDefault();
      cycle(edgeFrom[i][dir]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      tap(i);
    }
  };

  const c = (v: number) => v * cell + cell / 2;
  // grid dots under a bridge would show between the lines of a double one
  const covered = new Set(edges.flatMap((e, i) => (counts[i] ? e.cells : [])));
  const r = cell * 0.38;

  return (
    <div ref={boxRef} className="w-full">
      <StatusBar
        items={[
          { label: ui.time, value: formatTime(elapsed) },
        ]}
      />
      <div className="flex justify-center">
        <div
          role="group"
          aria-label={ui.board}
          className="relative select-none touch-none"
          style={{ width: W * cell, height: H * cell }}
          // releasing over another island: find it under the pointer
          onPointerUp={(e) => {
            if (dragFrom.current === null) return;
            const el = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-island]");
            if (el) onPointerUp(Number(el.dataset.island))(e);
            else dragFrom.current = null;
          }}
        >
          <svg className="absolute inset-0" width={W * cell} height={H * cell} aria-hidden="true">
            {Array.from({ length: W * H }, (_, k) =>
              covered.has(k) ? null : <circle key={k} cx={c(k % W)} cy={c(Math.floor(k / W))} r={1.2} fill="#e5e7eb" />,
            )}
            {edges.map((e, i) => {
              const [ax, ay] = islands[e.a], [bx, by] = islands[e.b];
              const x1 = c(ax) + (e.horizontal ? r : 0), y1 = c(ay) + (e.horizontal ? 0 : r);
              const x2 = c(bx) - (e.horizontal ? r : 0), y2 = c(by) - (e.horizontal ? 0 : r);
              const off = cell * 0.09;
              const lines = counts[i] === 2 ? [-off, off] : counts[i] === 1 ? [0] : [];
              return (
                <g key={i}>
                  {blocked === i && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#dc2626" strokeWidth={2} strokeDasharray="4 4" />}
                  {lines.map((o) => (
                    <line
                      key={o}
                      x1={x1 + (e.horizontal ? 0 : o)} y1={y1 + (e.horizontal ? o : 0)}
                      x2={x2 + (e.horizontal ? 0 : o)} y2={y2 + (e.horizontal ? o : 0)}
                      stroke={solved ? "#047857" : "#111827"} strokeWidth={2.5} strokeLinecap="round"
                    />
                  ))}
                  {counts[i] > 0 && (
                    <line
                      x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth={cell * 0.45}
                      className="cursor-pointer" style={{ pointerEvents: "stroke" }}
                      onClick={() => cycle(i)}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {islands.map(([x, y, n], i) => {
            const done = have[i] === n, over = have[i] > n;
            return (
              <button
                key={i}
                type="button"
                data-island={i}
                aria-label={fill(ui.island, { n, have: have[i] })}
                aria-pressed={selected === i}
                onPointerDown={onPointerDown(i)}
                onKeyDown={onKeyDown(i)}
                disabled={solved}
                className={`absolute flex items-center justify-center rounded-full border-2 font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${
                  solved ? "bg-emerald-700 border-emerald-700 text-white"
                  : done ? "bg-black border-black text-white"
                  : over ? "bg-white border-red-600 text-red-600"
                  : "bg-white border-black text-black"
                } ${selected === i ? "ring-4 ring-gray-300" : ""}`}
                style={{ left: c(x) - r, top: c(y) - r, width: r * 2, height: r * 2, fontSize: Math.max(12, cell * 0.36) }}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {solved ? (
        <Solved ui={ui} lines={[fill(ui.solvedTime, { time: formatTime(elapsed) })]} />
      ) : (
        <Actions ui={ui} onUndo={undo} canUndo={history.length > 0} onReset={reset} />
      )}
    </div>
  );
}
