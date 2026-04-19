import type { GameLibrary } from './types';

export const gameLibrary: GameLibrary = {
  games: [
    // --- HARD (8x8) ---
    {
      id: 'block-slide-001',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 8, height: 8,
        initialState: {
          blocks: [
            { id: 'target', x: 0, y: 4, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 0, y: 2, width: 3, height: 1, color: 'blue' },
            { id: 'v1', x: 3, y: 1, width: 1, height: 4, color: 'green' },
            { id: 'h2', x: 4, y: 0, width: 3, height: 1, color: 'yellow' },
            { id: 'v2', x: 2, y: 3, width: 1, height: 3, color: 'purple' },
            { id: 'h3', x: 4, y: 2, width: 2, height: 1, color: 'orange' },
            { id: 'v3', x: 5, y: 3, width: 1, height: 3, color: 'pink' },
            { id: 'h4', x: 0, y: 6, width: 3, height: 1, color: 'cyan' },
            { id: 'v4', x: 4, y: 4, width: 1, height: 3, color: 'lime' },
            { id: 'h5', x: 5, y: 6, width: 2, height: 1, color: 'indigo' },
            { id: 'v5', x: 6, y: 1, width: 1, height: 2, color: 'teal' },
            { id: 'h6', x: 0, y: 7, width: 4, height: 1, color: 'magenta' },
            { id: 'h7', x: 5, y: 7, width: 2, height: 1, color: 'brown' },
          ],
          exit: { x: 6, y: 4 }
        }
      },
      solution: { moves: [] }
    },
    // --- MEDIUM (7x7) ---
    {
      id: 'block-slide-002',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 7, height: 7,
        initialState: {
          blocks: [
            { id: 'target', x: 1, y: 3, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 0, y: 0, width: 3, height: 1, color: 'blue' },
            { id: 'v1', x: 0, y: 1, width: 1, height: 2, color: 'green' },
            { id: 'h2', x: 1, y: 1, width: 2, height: 1, color: 'yellow' },
            { id: 'v2', x: 3, y: 0, width: 1, height: 4, color: 'purple' },
            { id: 'h3', x: 4, y: 0, width: 2, height: 1, color: 'orange' },
            { id: 'v3', x: 4, y: 1, width: 1, height: 3, color: 'pink' },
            { id: 'h4', x: 5, y: 2, width: 2, height: 1, color: 'cyan' },
            { id: 'h5', x: 0, y: 5, width: 2, height: 1, color: 'lime' },
            { id: 'v4', x: 2, y: 4, width: 1, height: 2, color: 'indigo' },
            { id: 'h6', x: 4, y: 5, width: 2, height: 1, color: 'teal' }
          ],
          exit: { x: 5, y: 3 }
        }
      },
      solution: { moves: [] }
    },
    // --- HARD (8x8) ---
    {
      id: 'block-slide-003',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 8, height: 8,
        initialState: {
          blocks: [
            { id: 'target', x: 0, y: 3, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 0, y: 1, width: 3, height: 1, color: 'blue' },
            { id: 'v1', x: 2, y: 2, width: 1, height: 3, color: 'green' },
            { id: 'h2', x: 3, y: 0, width: 3, height: 1, color: 'yellow' },
            { id: 'v2', x: 3, y: 1, width: 1, height: 3, color: 'purple' },
            { id: 'h3', x: 4, y: 2, width: 3, height: 1, color: 'orange' },
            { id: 'v3', x: 5, y: 3, width: 1, height: 3, color: 'pink' },
            { id: 'h4', x: 0, y: 5, width: 4, height: 1, color: 'cyan' },
            { id: 'v4', x: 4, y: 3, width: 1, height: 3, color: 'lime' },
            { id: 'h5', x: 4, y: 6, width: 3, height: 1, color: 'indigo' },
            { id: 'v5', x: 6, y: 0, width: 1, height: 2, color: 'teal' },
            { id: 'h6', x: 0, y: 6, width: 3, height: 1, color: 'magenta' },
            { id: 'v6', x: 6, y: 4, width: 1, height: 2, color: 'brown' },
          ],
          exit: { x: 6, y: 3 }
        }
      },
      solution: { moves: [] }
    },
    // --- MEDIUM (7x7) ---
    {
      id: 'block-slide-004',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 7, height: 7,
        initialState: {
          blocks: [
            { id: 'target', x: 0, y: 3, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 2, y: 0, width: 2, height: 1, color: 'blue' },
            { id: 'v1', x: 2, y: 1, width: 1, height: 3, color: 'green' },
            { id: 'h2', x: 3, y: 2, width: 2, height: 1, color: 'yellow' },
            { id: 'v2', x: 5, y: 0, width: 1, height: 4, color: 'purple' },
            { id: 'h3', x: 0, y: 5, width: 3, height: 1, color: 'orange' },
            { id: 'v3', x: 3, y: 4, width: 1, height: 2, color: 'pink' },
            { id: 'h4', x: 4, y: 4, width: 2, height: 1, color: 'cyan' },
            { id: 'h5', x: 5, y: 5, width: 2, height: 1, color: 'lime' }
          ],
          exit: { x: 5, y: 3 }
        }
      },
      solution: { moves: [] }
    },
    // --- HARD (8x8) ---
    {
      id: 'block-slide-005',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 8, height: 8,
        initialState: {
          blocks: [
            { id: 'target', x: 0, y: 4, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 0, y: 2, width: 2, height: 1, color: 'blue' },
            { id: 'v1', x: 2, y: 2, width: 1, height: 3, color: 'green' },
            { id: 'h2', x: 3, y: 1, width: 3, height: 1, color: 'yellow' },
            { id: 'v2', x: 3, y: 2, width: 1, height: 3, color: 'purple' },
            { id: 'h3', x: 4, y: 3, width: 2, height: 1, color: 'orange' },
            { id: 'v3', x: 5, y: 4, width: 1, height: 2, color: 'pink' },
            { id: 'v4', x: 4, y: 4, width: 1, height: 3, color: 'cyan' },
            { id: 'h4', x: 0, y: 6, width: 4, height: 1, color: 'lime' },
            { id: 'h5', x: 5, y: 6, width: 2, height: 1, color: 'indigo' },
            { id: 'v5', x: 6, y: 0, width: 1, height: 3, color: 'teal' },
            { id: 'h6', x: 0, y: 7, width: 3, height: 1, color: 'magenta' },
            { id: 'v6', x: 7, y: 2, width: 1, height: 2, color: 'brown' },
          ],
          exit: { x: 6, y: 4 }
        }
      },
      solution: { moves: [] }
    },
    // --- MEDIUM (7x7) ---
    {
      id: 'block-slide-006',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 7, height: 7,
        initialState: {
          blocks: [
            { id: 'target', x: 2, y: 3, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 0, y: 0, width: 3, height: 1, color: 'blue' },
            { id: 'v1', x: 0, y: 1, width: 1, height: 3, color: 'green' },
            { id: 'h2', x: 1, y: 1, width: 2, height: 1, color: 'yellow' },
            { id: 'v2', x: 3, y: 0, width: 1, height: 4, color: 'purple' },
            { id: 'h3', x: 4, y: 0, width: 2, height: 1, color: 'orange' },
            { id: 'v3', x: 4, y: 1, width: 1, height: 3, color: 'pink' },
            { id: 'h4', x: 5, y: 2, width: 2, height: 1, color: 'cyan' },
            { id: 'h5', x: 0, y: 5, width: 2, height: 1, color: 'lime' },
            { id: 'v4', x: 2, y: 4, width: 1, height: 2, color: 'indigo' },
            { id: 'h6', x: 4, y: 5, width: 2, height: 1, color: 'teal' }
          ],
          exit: { x: 5, y: 3 }
        }
      },
      solution: { moves: [] }
    },
    // --- HARD (8x8) ---
    {
      id: 'block-slide-007',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 8, height: 8,
        initialState: {
          blocks: [
            { id: 'target', x: 0, y: 3, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 2, y: 0, width: 3, height: 1, color: 'blue' },
            { id: 'v1', x: 2, y: 1, width: 1, height: 4, color: 'green' },
            { id: 'h2', x: 3, y: 1, width: 2, height: 1, color: 'yellow' },
            { id: 'v2', x: 5, y: 0, width: 1, height: 4, color: 'purple' },
            { id: 'h3', x: 3, y: 3, width: 2, height: 1, color: 'orange' },
            { id: 'v3', x: 3, y: 4, width: 1, height: 3, color: 'pink' },
            { id: 'h4', x: 4, y: 4, width: 3, height: 1, color: 'cyan' },
            { id: 'v4', x: 7, y: 0, width: 1, height: 2, color: 'lime' },
            { id: 'h5', x: 0, y: 5, width: 3, height: 1, color: 'indigo' },
            { id: 'h6', x: 4, y: 6, width: 2, height: 1, color: 'teal' },
            { id: 'v5', x: 6, y: 5, width: 1, height: 2, color: 'magenta' },
            { id: 'h7', x: 0, y: 7, width: 2, height: 1, color: 'brown' },
          ],
          exit: { x: 6, y: 3 }
        }
      },
      solution: { moves: [] }
    },
    // --- MEDIUM (7x7) ---
    {
      id: 'block-slide-008',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 7, height: 7,
        initialState: {
          blocks: [
            { id: 'target', x: 1, y: 3, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 0, y: 0, width: 3, height: 1, color: 'blue' },
            { id: 'v1', x: 0, y: 1, width: 1, height: 2, color: 'green' },
            { id: 'h2', x: 1, y: 1, width: 2, height: 1, color: 'yellow' },
            { id: 'v2', x: 3, y: 0, width: 1, height: 4, color: 'purple' },
            { id: 'h3', x: 4, y: 0, width: 2, height: 1, color: 'orange' },
            { id: 'v3', x: 4, y: 1, width: 1, height: 3, color: 'pink' },
            { id: 'h4', x: 5, y: 2, width: 2, height: 1, color: 'cyan' },
            { id: 'h5', x: 0, y: 5, width: 2, height: 1, color: 'lime' },
            { id: 'v4', x: 2, y: 4, width: 1, height: 2, color: 'indigo' },
            { id: 'h6', x: 4, y: 5, width: 2, height: 1, color: 'teal' }
          ],
          exit: { x: 5, y: 3 }
        }
      },
      solution: { moves: [] }
    },
    // --- HARD (8x8) ---
    {
      id: 'block-slide-009',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 8, height: 8,
        initialState: {
          blocks: [
            { id: 'target', x: 0, y: 4, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 0, y: 2, width: 2, height: 1, color: 'blue' },
            { id: 'v1', x: 2, y: 2, width: 1, height: 3, color: 'green' },
            { id: 'h2', x: 3, y: 1, width: 3, height: 1, color: 'yellow' },
            { id: 'v2', x: 3, y: 2, width: 1, height: 3, color: 'purple' },
            { id: 'h3', x: 4, y: 3, width: 2, height: 1, color: 'orange' },
            { id: 'v3', x: 5, y: 4, width: 1, height: 2, color: 'pink' },
            { id: 'v4', x: 4, y: 4, width: 1, height: 3, color: 'cyan' },
            { id: 'h4', x: 0, y: 6, width: 4, height: 1, color: 'lime' },
            { id: 'h5', x: 5, y: 6, width: 2, height: 1, color: 'indigo' },
            { id: 'v5', x: 6, y: 0, width: 1, height: 3, color: 'teal' },
            { id: 'h6', x: 0, y: 7, width: 3, height: 1, color: 'magenta' },
            { id: 'v6', x: 7, y: 2, width: 1, height: 2, color: 'brown' },
          ],
          exit: { x: 6, y: 4 }
        }
      },
      solution: { moves: [] }
    },
    // --- MEDIUM (7x7) ---
    {
      id: 'block-slide-010',
      type: 'block-slide',
      title: { en: 'Block Slide', es: 'Deslizar Bloques' },
      instruction: {
        en: 'Move the red block to the exit by sliding other blocks. All blocks can move in any direction (up, down, left, right).',
        es: 'Mueve el bloque rojo a la salida deslizando otros bloques. Todos los bloques pueden moverse en cualquier dirección (arriba, abajo, izquierda, derecha).'
      },
      board: {
        width: 7, height: 7,
        initialState: {
          blocks: [
            { id: 'target', x: 0, y: 3, width: 2, height: 1, color: 'red', isTarget: true },
            { id: 'h1', x: 2, y: 0, width: 2, height: 1, color: 'blue' },
            { id: 'v1', x: 2, y: 1, width: 1, height: 3, color: 'green' },
            { id: 'h2', x: 3, y: 2, width: 2, height: 1, color: 'yellow' },
            { id: 'v2', x: 5, y: 0, width: 1, height: 4, color: 'purple' },
            { id: 'h3', x: 0, y: 5, width: 3, height: 1, color: 'orange' },
            { id: 'v3', x: 3, y: 4, width: 1, height: 2, color: 'pink' },
            { id: 'h4', x: 4, y: 4, width: 2, height: 1, color: 'cyan' },
            { id: 'h5', x: 5, y: 5, width: 2, height: 1, color: 'lime' }
          ],
          exit: { x: 5, y: 3 }
        }
      },
      solution: { moves: [] }
    }
  ]
};
