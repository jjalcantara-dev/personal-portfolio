'use client';

import { gameLibrary, getDailyGame } from '@/lib/games';
import GameBoard from './GameBoard';
import CountdownTimer from './CountdownTimer';
import type { Locale } from '@/lib/i18n';

interface DailyGameProps {
  locale: Locale;
}

export default function DailyGame({ locale }: DailyGameProps) {
  const dailyGame = getDailyGame(gameLibrary);

  const handleSolve = () => {
    // Optional: Add celebration or analytics
  };

  return (
    <div className="w-full">
      <GameBoard 
        config={dailyGame} 
        locale={locale === 'es' ? 'es' : 'en'}
        onSolve={handleSolve}
      />
      <CountdownTimer locale={locale === 'es' ? 'es' : 'en'} />
    </div>
  );
}

