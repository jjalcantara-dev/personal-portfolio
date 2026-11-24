import type { GameConfig, GameLibrary } from './types';

/**
 * Simple hash function for date string
 */
function hashDate(dateString: string): number {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Selects the daily game deterministically based on the current date
 */
export function getDailyGame(gameLibrary: GameLibrary, date: Date = new Date()): GameConfig {
  // Use hash-based selection for more variety
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const hash = hashDate(dateString);
  const gameIndex = hash % gameLibrary.games.length;
  
  return gameLibrary.games[gameIndex];
}

/**
 * Gets the game date string (YYYY-MM-DD) for a given date
 */
export function getGameDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}


