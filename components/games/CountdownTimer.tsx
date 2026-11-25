'use client';

import { useState, useEffect } from 'react';
import { clr } from '@/lib/constants/colors';

interface CountdownTimerProps {
  locale: 'en' | 'es';
}

// Time left until the next puzzle. Puzzles change at 00:00 UTC
// (lib/games/selector.ts), not at the visitor's local midnight.
export default function CountdownTimer({ locale }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextUtcMidnight = new Date(now);
      nextUtcMidnight.setUTCHours(24, 0, 0, 0);

      const diff = nextUtcMidnight.getTime() - now.getTime();
      const hours = Math.floor(diff / 3_600_000);
      const minutes = Math.floor((diff % 3_600_000) / 60_000);
      const seconds = Math.floor((diff % 60_000) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 text-center">
      <p className={`text-sm ${clr.text.muted}`}>
        {locale === 'es' ? 'Próximo puzzle en: ' : 'Next puzzle in: '}
        <span className={`font-mono font-semibold ${clr.text.primary}`}>{timeLeft}</span>
      </p>
    </div>
  );
}
