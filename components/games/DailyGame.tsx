'use client';

import { useMemo } from 'react';
import { gameLibrary, getDailyGame } from '@/lib/games';
import GameBoard from './GameBoard';
import CountdownTimer from './CountdownTimer';
import type { Locale } from '@/lib/i18n';

interface DailyGameProps {
  locale: Locale;
}

export default function DailyGame({ locale }: DailyGameProps) {
  const dailyGame = useMemo(() => {
    return getDailyGame(gameLibrary);
  }, []);

  const handleSolve = () => {
    // Optional: Add celebration or analytics
    console.log('Game solved!');
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

