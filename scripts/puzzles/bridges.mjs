// "Puentes" (bridges between islands): generator and solution counter.
//
// Rules: every island shows how many bridges touch it. Bridges are straight,
// horizontal or vertical, join two islands that see each other, there are at
// most 2 between the same pair, they never cross an island or another bridge,
// and in the end every island is connected to every other.
//
// A level is built by growing a random connected set of islands and bridges,
// reading off the numbers and running the solver, which counts solutions up
// to 2. Only levels with exactly one solution are kept. The solver also
// reports how many guesses it needed after plain deduction, used to rank
// difficulty.

import { rng } from "./slide.mjs";

const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function randomLevel(rand, W, H, target) {
  const cell = new Int16Array(W * H).fill(-1); // island id
  const used = new Uint8Array(W * H); // covered by a bridge
  const islands = [];
  const bridges = new Map(); // "i,j" -> count

  const addIsland = (x, y) => {
    cell[y * W + x] = islands.length;
    islands.push({ x, y });
    return islands.length - 1;
  };
  const lineFree = (x0, y0, dx, dy, len) => {
    for (let k = 1; k < len; k++) {
      const c = (y0 + dy * k) * W + (x0 + dx * k);
      if (cell[c] >= 0 || used[c]) return false;
    }
    return true;
  };
  const lay = (a, b, n) => {
    const A = islands[a], B = islands[b];
    const dx = Math.sign(B.x - A.x), dy = Math.sign(B.y - A.y);
    for (let x = A.x + dx, y = A.y + dy; x !== B.x || y !== B.y; x += dx, y += dy) used[y * W + x] = 1;
    const k = a < b ? `${a},${b}` : `${b},${a}`;
    bridges.set(k, Math.min(2, (bridges.get(k) || 0) + n));
  };
  const crowded = (x, y) =>
    DIRS.some(([dx, dy]) => {
      const nx = x + dx, ny = y + dy;
      return nx >= 0 && ny >= 0 && nx < W && ny < H && cell[ny * W + nx] >= 0;
    });

  addIsland(Math.floor(rand() * W), Math.floor(rand() * H));
  for (let tries = 0; islands.length < target && tries < 3000; tries++) {
    const from = Math.floor(rand() * islands.length);
    const [dx, dy] = DIRS[Math.floor(rand() * 4)];
    const len = 2 + Math.floor(rand() * 4);
    const { x, y } = islands[from];
    const nx = x + dx * len, ny = y + dy * len;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
    if (cell[ny * W + nx] >= 0 || used[ny * W + nx] || crowded(nx, ny)) continue;
    if (!lineFree(x, y, dx, dy, len)) continue;
    const id = addIsland(nx, ny);
    lay(from, id, rand() < 0.45 ? 2 : 1);
  }
  if (islands.length < target) return null;

  // Extra bridges between islands that already see each other: cycles make
  // the numbers less obvious.
  for (let a = 0; a < islands.length; a++) {
    for (const [dx, dy] of DIRS) {
      let x = islands[a].x + dx, y = islands[a].y + dy, len = 1;
      while (x >= 0 && y >= 0 && x < W && y < H && cell[y * W + x] < 0 && !used[y * W + x]) { x += dx; y += dy; len++; }
      if (x < 0 || y < 0 || x >= W || y >= H || cell[y * W + x] < 0 || len < 2) continue;
      const b = cell[y * W + x];
      if (a < b && !bridges.has(`${a},${b}`) && rand() < 0.35) lay(a, b, rand() < 0.3 ? 2 : 1);
    }
  }

  const need = islands.map(() => 0);
  for (const [k, n] of bridges) {
    const [a, b] = k.split(",").map(Number);
    need[a] += n;
    need[b] += n;
  }
  return { islands: islands.map((p, i) => ({ ...p, n: need[i] })), bridges };
}

// Every pair of islands that see each other along a row or column.
function buildEdges(islands, W, H) {
  const at = new Map(islands.map((p, i) => [p.y * W + p.x, i]));
  const edges = [];
  for (let a = 0; a < islands.length; a++) {
    for (const [dx, dy] of [[1, 0], [0, 1]]) {
      let x = islands[a].x + dx, y = islands[a].y + dy;
      const cells = [];
      while (x < W && y < H && !at.has(y * W + x)) { cells.push(y * W + x); x += dx; y += dy; }
      if (x < W && y < H && cells.length) edges.push({ a, b: at.get(y * W + x), cells, h: dy === 0 });
    }
  }
  const crosses = edges.map(() => []);
  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      if (edges[i].h === edges[j].h) continue;
      const s = new Set(edges[i].cells);
      if (edges[j].cells.some((c) => s.has(c))) { crosses[i].push(j); crosses[j].push(i); }
    }
  }
  return { edges, crosses };
}

// Counts solutions (up to `limit`). Domains are bitmasks over {0,1,2}.
export function solve(islands, W, H, limit = 2) {
  const { edges, crosses } = buildEdges(islands, W, H);
  const byIsland = islands.map(() => []);
  edges.forEach((e, i) => { byIsland[e.a].push(i); byIsland[e.b].push(i); });
  const lo = (d) => (d & 1 ? 0 : d & 2 ? 1 : 2);
  const hi = (d) => (d & 4 ? 2 : d & 2 ? 1 : 0);
  const range = (l, h) => ((7 << l) & (7 >> (2 - h)) & 7);

  let guesses = 0;
  const solutions = [];

  const propagate = (dom) => {
    for (let changed = true; changed; ) {
      changed = false;
      for (let i = 0; i < islands.length; i++) {
        let sumLo = 0, sumHi = 0;
        for (const e of byIsland[i]) { sumLo += lo(dom[e]); sumHi += hi(dom[e]); }
        const n = islands[i].n;
        if (sumLo > n || sumHi < n) return false;
        for (const e of byIsland[i]) {
          const l = Math.max(lo(dom[e]), n - (sumHi - hi(dom[e])));
          const h = Math.min(hi(dom[e]), n - (sumLo - lo(dom[e])));
          if (l > h) return false;
          const nd = dom[e] & range(l, h);
          if (!nd) return false;
          if (nd !== dom[e]) { dom[e] = nd; changed = true; }
        }
      }
      for (let e = 0; e < edges.length; e++) {
        if (lo(dom[e]) >= 1) {
          for (const f of crosses[e]) {
            if (!(dom[f] & 1)) return false;
            if (dom[f] !== 1) { dom[f] = 1; changed = true; }
          }
        }
      }
    }
    // Islands must still be able to form one group.
    const parent = islands.map((_, i) => i);
    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    for (let e = 0; e < edges.length; e++) if (hi(dom[e]) > 0) parent[find(edges[e].a)] = find(edges[e].b);
    const root = find(0);
    return islands.every((_, i) => find(i) === root);
  };

  const connected = (dom) => {
    const parent = islands.map((_, i) => i);
    const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    for (let e = 0; e < edges.length; e++) if (lo(dom[e]) > 0) parent[find(edges[e].a)] = find(edges[e].b);
    const root = find(0);
    return islands.every((_, i) => find(i) === root);
  };

  const search = (dom) => {
    if (solutions.length >= limit) return;
    if (!propagate(dom)) return;
    let pick = -1;
    for (let e = 0; e < edges.length; e++) {
      if (dom[e] & (dom[e] - 1)) { if (pick < 0 || (dom[e] === 7) < (dom[pick] === 7)) pick = e; }
    }
    if (pick < 0) {
      if (connected(dom)) solutions.push(edges.map((e, i) => ({ a: e.a, b: e.b, n: lo(dom[i]) })).filter((x) => x.n));
      return;
    }
    guesses++;
    for (const v of [0, 1, 2]) {
      if (!(dom[pick] & (1 << v))) continue;
      const next = dom.slice();
      next[pick] = 1 << v;
      search(next);
    }
  };

  search(new Uint8Array(edges.length).fill(7));
  return { count: solutions.length, solution: solutions[0], guesses };
}

export function generate({ count, W, H, islands: [minI, maxI], minGuesses = 0, seed, maxTries = 100000, log = () => {} }) {
  const rand = rng(seed);
  const found = [];
  for (let t = 0; t < maxTries && found.length < count; t++) {
    const lvl = randomLevel(rand, W, H, minI + Math.floor(rand() * (maxI - minI + 1)));
    if (!lvl) continue;
    const r = solve(lvl.islands, W, H);
    if (r.count !== 1 || r.guesses < minGuesses) continue;
    found.push({ W, H, islands: lvl.islands, solution: r.solution, guesses: r.guesses });
    log(`bridges ${found.length}/${count}: ${lvl.islands.length} islands, ${r.guesses} guesses (try ${t})`);
  }
  return found;
}
