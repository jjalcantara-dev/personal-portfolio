// "Desbloquea" (sliding blocks): generator and exhaustive solver.
//
// Board N x N. Every block is 1 cell thick and 2 or 3 long; horizontal blocks
// only move left/right, vertical ones only up/down. The red target block is
// horizontal on row EXIT_ROW and wins when it reaches the right edge, where
// the exit is. One move = sliding one block any distance in one direction.
//
// For a random layout we explore every reachable position, measure each one's
// distance to the nearest win (moves are reversible, so one backwards BFS from
// all winning positions does it) and count how many shortest solutions it has.
// Two moves of different blocks that don't interfere can be played in either
// order; counting those orders as different solutions would make every level
// "ambiguous", so shortest solutions are counted up to the order of independent
// moves (each adjacent independent pair only counts in one canonical order).
// That count is never lower than the true number of distinct solutions, so a
// level is only kept when it is exactly 1 and the level needs >= minMoves moves.

export const SIZE = 6;
export const EXIT_ROW = 2;

// Deterministic PRNG so the library can be regenerated identically.
// sfc32 (128-bit state), seeded through splitmix32. A 32-bit generator is not
// enough here: each worker draws hundreds of millions of numbers, and with a
// 2^32 period the streams of nearby seeds overlap and repeat the same boards.
export function rng(seed) {
  let z = seed >>> 0;
  const split = () => {
    z = (z + 0x9e3779b9) >>> 0;
    let t = z;
    t = Math.imul(t ^ (t >>> 16), 0x21f0aaad);
    t = Math.imul(t ^ (t >>> 15), 0x735a2d97);
    return (t ^ (t >>> 15)) >>> 0;
  };
  let a = split(), b = split(), c = split(), d = split();
  return () => {
    const t = (((a + b) >>> 0) + d) >>> 0;
    d = (d + 1) >>> 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) >>> 0;
    c = ((c << 21) | (c >>> 11)) >>> 0;
    c = (c + t) >>> 0;
    return t / 4294967296;
  };
}

// blocks: [{ h: bool, len, fixed, pos }] -> fixed = row (h) or column (v),
// pos = the moving coordinate. Block 0 is the target.
function randomLayout(rand, count) {
  const grid = new Uint8Array(SIZE * SIZE);
  const blocks = [];
  const place = (h, len, fixed, pos) => {
    for (let i = 0; i < len; i++) {
      const x = h ? pos + i : fixed, y = h ? fixed : pos + i;
      if (grid[y * SIZE + x]) return false;
    }
    for (let i = 0; i < len; i++) {
      const x = h ? pos + i : fixed, y = h ? fixed : pos + i;
      grid[y * SIZE + x] = 1;
    }
    blocks.push({ h, len, fixed, pos });
    return true;
  };
  place(true, 2, EXIT_ROW, Math.floor(rand() * 3));
  let tries = 0;
  while (blocks.length < count && tries++ < 400) {
    const h = rand() < 0.5;
    const len = rand() < 0.3 ? 3 : 2;
    const fixed = Math.floor(rand() * SIZE);
    if (h && fixed === EXIT_ROW) continue; // would sit in front of the exit for ever
    place(h, len, fixed, Math.floor(rand() * (SIZE - len + 1)));
  }
  return blocks;
}

// Explore the whole connected state space of a layout.
export function analyse(blocks) {
  const n = blocks.length;
  const key = (p) => p.join(",");
  const start = blocks.map((b) => b.pos);
  const index = new Map([[key(start), 0]]);
  const states = [start];
  const adj = [];
  const grid = new Uint8Array(SIZE * SIZE);

  for (let s = 0; s < states.length; s++) {
    const p = states[s];
    grid.fill(0);
    for (let b = 0; b < n; b++) {
      const { h, len, fixed } = blocks[b];
      for (let i = 0; i < len; i++) grid[h ? fixed * SIZE + p[b] + i : (p[b] + i) * SIZE + fixed] = 1;
    }
    const out = [];
    for (let b = 0; b < n; b++) {
      const { h, len, fixed } = blocks[b];
      const at = (c) => (h ? fixed * SIZE + c : c * SIZE + fixed);
      for (let c = p[b] - 1; c >= 0 && !grid[at(c)]; c--) out.push([b, c]);
      for (let c = p[b] + len; c < SIZE && !grid[at(c)]; c++) out.push([b, c - len + 1]);
    }
    adj[s] = out.map(([b, pos]) => {
      const q = p.slice();
      q[b] = pos;
      const k = key(q);
      let id = index.get(k);
      if (id === undefined) {
        id = states.length;
        index.set(k, id);
        states.push(q);
      }
      return id;
    });
    if (states.length > 400000) return null; // too open: not a tight puzzle
  }

  // Backwards BFS from every winning state.
  const dist = new Int32Array(states.length).fill(-1);
  const ways = new Float64Array(states.length);
  let frontier = [];
  for (let s = 0; s < states.length; s++) {
    if (states[s][0] === SIZE - 2) {
      dist[s] = 0;
      ways[s] = 1;
      frontier.push(s);
    }
  }
  if (!frontier.length) return null;
  for (let d = 0; frontier.length; d++) {
    const next = [];
    for (const s of frontier) {
      for (const t of adj[s]) {
        if (dist[t] === -1) {
          dist[t] = d + 1;
          next.push(t);
        }
        if (dist[t] === d + 1) ways[t] += ways[s];
      }
    }
    frontier = next;
  }
  return { states, adj, dist, ways, index, sets: [] };
}

// Number of shortest solutions from `start`, up to the order of independent
// moves. Walks the shortest-path DAG; a step prev -> cur is skipped when both
// moves commute (same result in either order) and are not in canonical order
// (lower block index first). Stops counting at 2.
export function canonicalWays(a, start) {
  const { states, adj, dist } = a;
  const neighbours = (s) => (a.sets[s] ??= new Set(adj[s]));
  const movedBlock = (s, t) => states[s].findIndex((v, i) => v !== states[t][i]);
  const key = (p) => p.join(",");
  const memo = new Map();
  const count = (prev, s) => {
    if (dist[s] === 0) return 1;
    const mk = prev * 1048576 + s;
    if (memo.has(mk)) return memo.get(mk);
    let total = 0;
    const prevBlock = prev < 0 ? -1 : movedBlock(prev, s);
    for (const t of adj[s]) {
      if (dist[t] !== dist[s] - 1) continue;
      const b = movedBlock(s, t);
      if (prev >= 0 && b !== prevBlock && b < prevBlock) {
        // would `b` have worked first, giving the same result? then skip
        const u = states[prev].slice();
        u[b] = states[t][b];
        const ui = a.index.get(key(u));
        if (ui !== undefined && neighbours(prev).has(ui) && neighbours(ui).has(t)) continue;
      }
      total += count(s, t);
      if (total >= 2) break;
    }
    memo.set(mk, total);
    return total;
  };
  return count(-1, start);
}

// Best start in a layout's state space: the farthest position from a win whose
// shortest solution is unique (up to independent move order).
function bestStart(a, minMoves) {
  const order = [];
  for (let s = 0; s < a.states.length; s++) if (a.dist[s] >= minMoves) order.push(s);
  order.sort((x, y) => a.dist[y] - a.dist[x]);
  for (const s of order.slice(0, 40)) if (canonicalWays(a, s) === 1) return s;
  return -1;
}

// The unique optimal solution, as [blockIndex, newPos] steps.
function solutionFrom(a, s) {
  const path = [];
  while (a.dist[s] > 0) {
    const next = a.adj[s].find((t) => a.dist[t] === a.dist[s] - 1);
    const from = a.states[s], to = a.states[next];
    const b = from.findIndex((v, i) => v !== to[i]);
    path.push([b, to[b]]);
    s = next;
  }
  return path;
}

export function generate({ count, minMoves, seed, maxTries = 200000, log = () => {} }) {
  const rand = rng(seed);
  const found = [];
  const seen = new Set();
  for (let t = 0; t < maxTries && found.length < count; t++) {
    const layout = randomLayout(rand, 9 + Math.floor(rand() * 5));
    const a = analyse(layout);
    if (!a) continue;
    const s = bestStart(a, minMoves);
    if (s < 0) continue;
    const pos = a.states[s];
    const blocks = layout.map((b, i) => ({ ...b, pos: pos[i] }));
    const sig = blocks.map((b) => `${b.h ? "h" : "v"}${b.len}${b.fixed}:${b.pos}`).sort().join("|");
    if (seen.has(sig)) continue;
    seen.add(sig);
    found.push({ blocks, minMoves: a.dist[s], solution: solutionFrom(a, s), states: a.states.length });
    log(`slide ${found.length}/${count}: ${a.dist[s]} moves (try ${t})`);
  }
  return found;
}
