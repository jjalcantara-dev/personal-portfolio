'use client';

import dynamic from 'next/dynamic';
import type { GameConfig } from '@/lib/games';

// Lazy load game components to reduce initial bundle size
const PathBridge = dynamic(() => import('./PathBridge'), { ssr: false });
const BlockSlide = dynamic(() => import('./BlockSlide'), { ssr: false });
const ColorFlow = dynamic(() => import('./ColorFlow'), { ssr: false });

interface GameBoardProps {
  config: GameConfig;
  locale: 'en' | 'es';
  onSolve?: () => void;
}

export default function GameBoard({ config, locale, onSolve }: GameBoardProps) {
  const title = config.title[locale];
  const instruction = config.instruction[locale];

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

