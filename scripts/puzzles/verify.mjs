// Re-checks every level in lib/games/library.ts from scratch:
//   npm run puzzles:verify
// slide: the stored minMoves is the true optimum and the shortest solution is
// unique (up to the order of independent moves); bridges: exactly one solution.

import { readFileSync } from "node:fs";
import { analyse, canonicalWays, SIZE, EXIT_ROW } from "./slide.mjs";
import { solve } from "./bridges.mjs";

const src = readFileSync(new URL("../../lib/games/library.ts", import.meta.url), "utf8");
const grab = (name) => JSON.parse(src.match(new RegExp(`export const ${name}[^=]*= (\\[.*\\]);`))[1]);
const slideLevels = grab("slideLevels");
const bridgesLevels = grab("bridgesLevels");

let bad = 0;
for (const lvl of slideLevels) {
  const blocks = lvl.blocks.map(([h, len, fixed, pos]) => ({ h: h === 1, len, fixed, pos }));
  const ok0 = blocks[0].h && blocks[0].fixed === EXIT_ROW && blocks.every((b) => b.pos + b.len <= SIZE);
  const a = analyse(blocks);
  const start = 0; // analyse() puts the layout's own position first
  const fine = ok0 && a && a.dist[start] === lvl.minMoves && canonicalWays(a, start) === 1;
  if (!fine) { bad++; console.log(`FAIL ${lvl.id}`); }
}
for (const lvl of bridgesLevels) {
  const islands = lvl.islands.map(([x, y, n]) => ({ x, y, n }));
  const r = solve(islands, lvl.width, lvl.height, 2);
  if (r.count !== 1) { bad++; console.log(`FAIL ${lvl.id}: ${r.count} solutions`); }
}
console.log(`${slideLevels.length} slide + ${bridgesLevels.length} bridges levels checked, ${bad} failed`);
process.exit(bad ? 1 : 0);
