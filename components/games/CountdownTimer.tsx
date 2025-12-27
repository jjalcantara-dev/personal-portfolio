'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  locale: 'en' | 'es';
}

export default function CountdownTimer({ locale }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // Midnight

      const diff = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (locale === 'es') {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [locale]);

  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        {locale === 'es' ? 'Próximo puzzle en: ' : 'Next puzzle in: '}
        <span className="font-mono font-semibold text-black">{timeLeft}</span>
      </p>
    </div>
  );
}

