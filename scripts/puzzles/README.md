# Daily puzzles: level generator

`npm run puzzles` rebuilds `lib/games/library.ts` with 60 levels of each kind.
It uses every CPU core and takes several minutes. The output is deterministic
(fixed seeds, fixed work per worker) and is committed: nothing runs at build
time.

## Desbloquea (`slide.mjs`)

6x6 board. Blocks are 2 or 3 cells long and only move along their own axis;
the red block leaves through the right edge of row 3. One move = one block,
any distance.

For each random layout the generator explores **every** reachable position,
computes each one's distance to a win and counts its shortest solutions. A
level is kept when:

- it needs at least 15 moves (`SLIDE.minMoves` in `generate.mjs`), and
- it has **one** shortest solution, counting moves of different blocks that
  don't interfere as the same solution whatever their order. Without that
  rule no level would qualify: two independent moves can always be swapped.

The 60 hardest are kept.

## Puentes (`bridges.mjs`)

9x9 grid, 24 to 30 islands. A random connected set of islands and bridges is
grown, the numbers are read off, and a solver (constraint propagation plus
search) counts the solutions up to 2. A level is kept when it has **exactly
one** solution and the solver needed at least 5 guesses after plain
deduction, i.e. it takes reasoning by contradiction, not just counting.

## Changing the rules

Tune the constants at the top of `generate.mjs`. Raising `minMoves` or
`minGuesses` makes levels harder but rarer: raise `triesPerWorker` with them,
or the script stops with "Not enough levels".
