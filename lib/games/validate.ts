import type { GameConfig, Block } from './types';

/**
 * Validates that the exit position is not occupied by any block
 */
export function validateExitPosition(config: GameConfig): { valid: boolean; error?: string } {
  const blocks = config.board.initialState.blocks as Block[];
  const exit = config.board.initialState.exit as { x: number; y: number };
  const targetBlock = blocks.find(b => b.isTarget);

  if (!targetBlock) {
    return { valid: false, error: 'No target block found' };
  }

  // Check if exit area overlaps with any block
  for (const block of blocks) {
    // Skip the target block itself
    if (block.isTarget) continue;

    // Check if block overlaps with exit area
    const blockRight = block.x + block.width;
    const blockBottom = block.y + block.height;
    const exitRight = exit.x + targetBlock.width;
    const exitBottom = exit.y + targetBlock.height;

    const overlaps = !(
      blockRight <= exit.x ||
      block.x >= exitRight ||
      blockBottom <= exit.y ||
      block.y >= exitBottom
    );

    if (overlaps) {
      return {
        valid: false,
        error: `Exit position (${exit.x}, ${exit.y}) is blocked by block ${block.id} at (${block.x}, ${block.y})`
      };
    }
  }

  return { valid: true };
}

