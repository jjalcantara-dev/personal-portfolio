'use client';

import { useMemo } from 'react';
import type { GameConfig } from '@/lib/games';
import PathBridge from './PathBridge';
import BlockSlide from './BlockSlide';
import ColorFlow from './ColorFlow';

interface GameBoardProps {
  config: GameConfig;
  locale: 'en' | 'es';
  onSolve?: () => void;
}

export default function GameBoard({ config, locale, onSolve }: GameBoardProps) {
  const title = useMemo(() => config.title[locale], [config.title, locale]);
  const instruction = useMemo(() => config.instruction[locale], [config.instruction, locale]);

  const renderGame = () => {
    switch (config.type) {
      case 'path-bridge':
        return <PathBridge config={config} onSolve={onSolve} />;
      case 'block-slide':
        return <BlockSlide config={config} onSolve={onSolve} locale={locale} />;
      case 'color-flow':
        return <ColorFlow config={config} onSolve={onSolve} />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>Game type &quot;{config.type}&quot; not yet implemented.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-light mb-3 text-black">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-gray-700">
          {instruction}
        </p>
      </div>
      
      <div className="flex justify-center">
        {renderGame()}
      </div>
    </div>
  );
}

