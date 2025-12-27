# Daily Logic Games - Design Proposal

## Overview

A collection of 7 original, visual logic games that rotate daily. Each game is deterministic based on the current date, ensuring all users see the same puzzle on the same day.

---

## Game Proposals

### 1. **Path Bridge**
**Type:** Path Planning

**Objective:** Connect all islands with bridges following the number constraints.

**Rules:**
- Each island shows a number indicating how many bridges it needs
- Draw bridges between adjacent islands (horizontal or vertical only)
- Bridges cannot cross each other
- Each bridge connects exactly two islands
- The number on each island must equal the number of bridges connected to it

**Visual:** Grid with numbered islands, click to draw/remove bridges between adjacent islands.

**Example:** 4 islands arranged in a square, each needs 2 bridges → solution: connect each island to its two neighbors.

---

### 2. **Block Slide**
**Type:** Movement Constraint

**Objective:** Move the red block to the exit by sliding other blocks.

**Rules:**
- Blocks can only slide horizontally or vertically (depending on orientation)
- Blocks cannot pass through each other
- The red block must reach the marked exit
- All blocks are rectangular and occupy multiple cells

**Visual:** Grid with colored blocks, click and drag to slide blocks in their allowed direction.

**Example:** 3x3 grid with horizontal and vertical blocks blocking the red block's path to the exit.

---

### 3. **Color Flow**
**Type:** Area Coverage

**Objective:** Fill all cells with colors following adjacency rules.

**Rules:**
- Each colored region must be connected (no isolated cells)
- Adjacent cells of the same color must form a continuous area
- Some cells are pre-colored and cannot be changed
- All cells must be filled
- Each color appears in exactly one connected region

**Visual:** Grid with some pre-colored cells, click cells to cycle through available colors.

**Example:** 5x5 grid with 3 colors, some cells pre-filled, fill remaining cells maintaining connectivity.

---

### 4. **Circuit Connect**
**Type:** Path Planning / Dependency Logic

**Objective:** Connect the power source to all devices using wires.

**Rules:**
- Draw wires from the power source to each device
- Wires cannot cross each other
- Wires can only go horizontally or vertically
- All devices must be connected
- Wires can share paths but must branch correctly

**Visual:** Grid with power source (marked), devices (marked), click to draw wire paths.

**Example:** Power source in top-left, 3 devices scattered, connect all without crossing wires.

---

### 5. **Tile Placement**
**Type:** Area Coverage

**Objective:** Place L-shaped tiles to cover the entire board without overlaps.

**Rules:**
- Each tile is an L-shape (3 cells in L formation)
- Tiles can be rotated (4 orientations)
- Tiles cannot overlap
- All cells must be covered
- Some cells may be blocked (cannot place tiles)

**Visual:** Grid with available L-tiles shown, click to place/remove tiles, rotate with button.

**Example:** 6x6 grid, place 4 L-tiles to cover all cells.

---

### 6. **Sequence Lock**
**Type:** Dependency Logic

**Objective:** Press buttons in the correct sequence to unlock.

**Rules:**
- Buttons have visual dependencies (arrows, numbers, or colors)
- Each button can only be pressed when its dependencies are satisfied
- Press all buttons in the correct order
- Visual clues indicate dependencies (e.g., arrow points from A to B means A before B)

**Visual:** Grid or list of buttons with dependency indicators, click buttons in order.

**Example:** 5 buttons with arrows showing dependencies, find the valid sequence.

---

### 7. **Flow Network**
**Type:** Path Planning

**Objective:** Connect pipes to create a flow from source to all destinations.

**Rules:**
- Place pipe segments (straight, corner, T-junction) on the board
- Source must connect to all destinations
- Pipes must form a continuous path
- Each destination must receive flow
- Pipes cannot cross (they can share cells but must connect properly)

**Visual:** Grid with source and destinations, click to place/rotate pipe segments.

**Example:** Source in center, 4 destinations at corners, place pipe segments to connect all.

---

## Data Structure

### Game Definition

```typescript
type GameType = 
  | 'path-bridge'
  | 'block-slide'
  | 'color-flow'
  | 'circuit-connect'
  | 'tile-placement'
  | 'sequence-lock'
  | 'flow-network';

interface GameConfig {
  id: string;
  type: GameType;
  title: {
    en: string;
    es: string;
  };
  instruction: {
    en: string;
    es: string;
  };
  board: {
    width: number;
    height: number;
    // Game-specific initial state
    initialState: Record<string, any>;
  };
  solution: Record<string, any>; // Game-specific solution
}

interface GameLibrary {
  games: GameConfig[];
}
```

### Example Game Data

```typescript
const gameLibrary: GameLibrary = {
  games: [
    {
      id: 'path-bridge-001',
      type: 'path-bridge',
      title: {
        en: 'Path Bridge',
        es: 'Puente de Caminos'
      },
      instruction: {
        en: 'Connect all islands with bridges. Each number shows how many bridges that island needs.',
        es: 'Conecta todas las islas con puentes. Cada número indica cuántos puentes necesita esa isla.'
      },
      board: {
        width: 5,
        height: 5,
        initialState: {
          islands: [
            { x: 1, y: 1, bridges: 2 },
            { x: 3, y: 1, bridges: 2 },
            { x: 1, y: 3, bridges: 2 },
            { x: 3, y: 3, bridges: 2 }
          ]
        }
      },
      solution: {
        bridges: [
          { from: { x: 1, y: 1 }, to: { x: 3, y: 1 } },
          { from: { x: 1, y: 1 }, to: { x: 1, y: 3 } },
          { from: { x: 3, y: 1 }, to: { x: 3, y: 3 } },
          { from: { x: 1, y: 3 }, to: { x: 3, y: 3 } }
        ]
      }
    },
    // ... more games
  ]
};
```

---

## Daily Selection Algorithm

### Concept

The daily game is selected deterministically based on the current date. This ensures:
- Same game for all users on the same day
- No backend or database required
- Predictable rotation
- Easy to add new games

### Implementation

```typescript
function getDailyGame(date: Date, gameLibrary: GameLibrary): GameConfig {
  // Calculate days since a fixed epoch (e.g., Jan 1, 2024)
  const epoch = new Date('2024-01-01');
  const daysSinceEpoch = Math.floor(
    (date.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Use modulo to cycle through games
  const gameIndex = daysSinceEpoch % gameLibrary.games.length;
  
  return gameLibrary.games[gameIndex];
}
```

### Alternative: Hash-based Selection

For more variety and to avoid obvious patterns:

```typescript
function getDailyGame(date: Date, gameLibrary: GameLibrary): GameConfig {
  // Create a date string (YYYY-MM-DD)
  const dateString = date.toISOString().split('T')[0];
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use absolute value and modulo
  const gameIndex = Math.abs(hash) % gameLibrary.games.length;
  
  return gameLibrary.games[gameIndex];
}
```

### Variant Selection (Same Game, Different Difficulty)

For more variety, each game can have multiple variants:

```typescript
interface GameConfig {
  // ... previous fields
  variants: GameVariant[];
}

interface GameVariant {
  difficulty: 'easy' | 'medium' | 'hard';
  board: {
    width: number;
    height: number;
    initialState: Record<string, any>;
  };
  solution: Record<string, any>;
}

function getDailyGame(date: Date, gameLibrary: GameLibrary): GameConfig & { variant: GameVariant } {
  const game = getDailyGame(date, gameLibrary);
  
  // Select variant based on day of week or hash
  const variantIndex = date.getDay() % game.variants.length;
  const variant = game.variants[variantIndex];
  
  return { ...game, variant };
}
```

---

## File Structure

```
lib/
  games/
    index.ts              # Game library and selection logic
    types.ts              # TypeScript types
    path-bridge.ts         # Path Bridge game logic
    block-slide.ts         # Block Slide game logic
    color-flow.ts          # Color Flow game logic
    circuit-connect.ts     # Circuit Connect game logic
    tile-placement.ts      # Tile Placement game logic
    sequence-lock.ts       # Sequence Lock game logic
    flow-network.ts        # Flow Network game logic
  utils/
    game-selector.ts      # Daily game selection function
    date-utils.ts         # Date utilities

components/
  games/
    GameBoard.tsx         # Generic game board component
    PathBridge.tsx        # Path Bridge implementation
    BlockSlide.tsx        # Block Slide implementation
    ColorFlow.tsx         # Color Flow implementation
    CircuitConnect.tsx    # Circuit Connect implementation
    TilePlacement.tsx     # Tile Placement implementation
    SequenceLock.tsx      # Sequence Lock implementation
    FlowNetwork.tsx       # Flow Network implementation
    GameControls.tsx      # Reset, Solution buttons
```

---

## UI/UX Guidelines

### Layout
- Centered game board (max-width: 600px on desktop)
- Title: "Today's Logic Game" / "Puzzle de Lógica de Hoy"
- One-line instruction below title
- Game board below instruction
- Controls (Reset, Solution) below board

### Interactions
- Click to interact (place, move, draw)
- Hover states for clarity
- Subtle transitions (200-300ms)
- Visual feedback on valid/invalid moves

### States
- **Idle:** Board ready for interaction
- **Playing:** User is interacting
- **Solved:** Visual confirmation (subtle animation, checkmark)
- **Invalid:** Brief visual feedback (red flash, shake)

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- Focus indicators
- Color contrast (WCAG AA)

---

## Implementation Phases

### Phase 1: Foundation
1. Create game library structure
2. Implement daily selection algorithm
3. Create generic GameBoard component
4. Implement one game (Path Bridge) as proof of concept

### Phase 2: Core Games
1. Implement remaining 6 games
2. Add game-specific logic and validation
3. Add solution checking
4. Add Reset functionality

### Phase 3: Polish
1. Add subtle animations
2. Improve visual feedback
3. Add "Show Solution" (hidden by default)
4. Mobile optimization
5. Accessibility enhancements

---

## Notes

- All games are client-side only (no backend)
- Solutions are embedded in game config (can be obfuscated if needed)
- Games are deterministic and reproducible
- Easy to add new games by extending the library
- Each game type has its own component for maintainability
- Shared utilities for common operations (validation, state management)


