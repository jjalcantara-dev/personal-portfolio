'use client';

import { useState, useCallback, useEffect } from 'react';
import type { GameConfig, Block } from '@/lib/games';

interface BlockSlideProps {
  config: GameConfig;
  onSolve?: () => void;
  locale?: 'en' | 'es';
}

export default function BlockSlide({ config, onSolve, locale = 'en' }: BlockSlideProps) {
  const initialBlocks = (config.board.initialState.blocks as Block[]).map(b => ({ ...b }));
  const exit = config.board.initialState.exit as { x: number; y: number };
  const targetBlock = initialBlocks.find(b => b.isTarget);
  
  
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const getBlockAt = useCallback((x: number, y: number): Block | undefined => {
    return blocks.find(block => 
      x >= block.x && x < block.x + block.width &&
      y >= block.y && y < block.y + block.height
    );
  }, [blocks]);

  const canMove = useCallback((block: Block, direction: 'up' | 'down' | 'left' | 'right'): boolean => {
    let newX = block.x;
    let newY = block.y;

    if (direction === 'left') newX = block.x - 1;
    if (direction === 'right') newX = block.x + 1;
    if (direction === 'up') newY = block.y - 1;
    if (direction === 'down') newY = block.y + 1;

    // Check bounds
    if (newX < 0 || newY < 0) return false;
    if (newX + block.width > config.board.width) return false;
    if (newY + block.height > config.board.height) return false;

    // Check collisions
    for (let x = newX; x < newX + block.width; x++) {
      for (let y = newY; y < newY + block.height; y++) {
        const otherBlock = getBlockAt(x, y);
        if (otherBlock && otherBlock.id !== block.id) {
          return false;
        }
      }
    }

    return true;
  }, [blocks, config.board.width, config.board.height, getBlockAt]);

  const moveBlock = useCallback((blockId: string, direction: 'up' | 'down' | 'left' | 'right') => {
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block;
      
      if (!canMove(block, direction)) return block;

      const newBlock = { ...block };
      if (direction === 'left') newBlock.x -= 1;
      if (direction === 'right') newBlock.x += 1;
      if (direction === 'up') newBlock.y -= 1;
      if (direction === 'down') newBlock.y += 1;

      return newBlock;
    }));
  }, [canMove]);

  const checkSolution = useCallback(() => {
    const targetBlock = blocks.find(b => b.isTarget);
    if (!targetBlock) return false;
    
    // Check if target block completely covers the exit area
    return targetBlock.x === exit.x && targetBlock.y === exit.y;
  }, [blocks, exit]);

  const handleBlockClick = useCallback((block: Block) => {
    if (!isStarted || isSolved) return;
    setSelectedBlock(selectedBlock === block.id ? null : block.id);
  }, [selectedBlock, isSolved, isStarted]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isStarted || !selectedBlock || isSolved) return;

    const directions: Record<string, 'up' | 'down' | 'left' | 'right'> = {
      'ArrowUp': 'up',
      'ArrowDown': 'down',
      'ArrowLeft': 'left',
      'ArrowRight': 'right',
    };

    const direction = directions[e.key];
    if (direction) {
      e.preventDefault();
      moveBlock(selectedBlock, direction);
    }
  }, [selectedBlock, moveBlock, isSolved, isStarted]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (checkSolution() && !isSolved) {
      setIsSolved(true);
      onSolve?.();
    }
  }, [blocks, checkSolution, isSolved, onSolve]);

  // Timer effect
  useEffect(() => {
    if (!isStarted || isSolved || startTime === null) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isSolved, startTime]);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(Date.now());
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = useCallback(() => {
    setBlocks(initialBlocks.map(b => ({ ...b })));
    setSelectedBlock(null);
    setIsSolved(false);
    setIsStarted(false);
    setStartTime(null);
    setElapsedTime(0);
  }, [initialBlocks]);

  // Responsive cell size based on screen width
  const [cellSize, setCellSize] = useState(60);
  
  useEffect(() => {
    const updateCellSize = () => {
      const screenWidth = window.innerWidth;
      // On mobile, calculate cell size to fit the board
      if (screenWidth < 640) {
        // Mobile: use 90% of screen width, minus padding
        const maxWidth = (screenWidth - 32) * 0.9; // 32px for padding
        const calculatedSize = Math.floor(maxWidth / config.board.width);
        // Minimum 40px, maximum 60px on mobile
        setCellSize(Math.max(40, Math.min(60, calculatedSize)));
      } else if (screenWidth < 1024) {
        // Tablet
        setCellSize(50);
      } else {
        // Desktop
        setCellSize(60);
      }
    };
    
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [config.board.width]);
  
  const boardWidth = config.board.width * cellSize;
  const boardHeight = config.board.height * cellSize;


  if (!isStarted) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-6 text-center">
            <p className="text-lg text-gray-700 mb-4">
              {locale === 'es' 
                ? 'Presiona Start para comenzar el puzzle y ver el temporizador.'
                : 'Press Start to begin the puzzle and start the timer.'}
            </p>
          </div>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 active:bg-gray-700 transition-colors font-medium text-lg min-h-[44px] touch-manipulation"
            aria-label={locale === 'es' ? 'Comenzar puzzle' : 'Start puzzle'}
          >
            {locale === 'es' ? 'Start' : 'Start'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Timer */}
      <div className="mb-4 text-center">
        <div className="inline-block px-4 py-2 bg-gray-100 rounded">
          <span className="text-sm text-gray-600 mr-2">
            {locale === 'es' ? 'Tiempo:' : 'Time:'}
          </span>
          <span className="font-mono font-semibold text-lg text-black">
            {formatTime(elapsedTime)}
          </span>
        </div>
      </div>

      <div className="relative mx-auto border-2 border-gray-300 overflow-hidden" style={{ width: boardWidth, height: boardHeight, maxWidth: '100%' }}>
        {/* Grid background */}
        <div className="grid absolute inset-0" style={{
          gridTemplateColumns: `repeat(${config.board.width}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${config.board.height}, ${cellSize}px)`
        }}>
          {Array.from({ length: config.board.width * config.board.height }).map((_, index) => {
            const x = index % config.board.width;
            const y = Math.floor(index / config.board.width);
            // Show exit area matching the target block size
            // Hide exit background when target block is solved to avoid green line in the middle
            const isExit = targetBlock && 
              x >= exit.x && x < exit.x + targetBlock.width &&
              y >= exit.y && y < exit.y + targetBlock.height;
            const exitClass = isExit && !isSolved ? 'bg-green-200' : '';
            
            return (
              <div
                key={index}
                className={`border border-gray-100 ${exitClass}`}
                style={{ width: cellSize, height: cellSize }}
              />
            );
          })}
        </div>

        {/* Blocks - rendered cell by cell for partial translucency */}
        {blocks.map(block => {
          const isSelected = selectedBlock === block.id;
          const isTargetSolved = isSolved && block.isTarget;
          const borderClass = isSelected ? 'border-black' : 'border-gray-400';
          const scaleClass = isSelected ? 'scale-105' : '';
          const shadowClass = isSelected ? 'shadow-lg' : '';
          const zIndex = isSelected ? 20 : (block.isTarget ? 15 : 10);
          
          // Render each cell of the block individually
          const cells = [];
          for (let bx = 0; bx < block.width; bx++) {
            for (let by = 0; by < block.height; by++) {
              const cellX = block.x + bx;
              const cellY = block.y + by;
              
              // Check if this specific cell is over the exit area
              const isOverExit = targetBlock && !block.isTarget && 
                cellX >= exit.x && cellX < exit.x + targetBlock.width &&
                cellY >= exit.y && cellY < exit.y + targetBlock.height;
              
              // Make only cells over exit translucent so green shows through
              // When solved, target block turns green smoothly
              const cellColorClass = block.isTarget 
                ? (isTargetSolved ? 'bg-green-500' : 'bg-red-500')
                : isOverExit 
                  ? 'bg-gray-300 bg-opacity-50' 
                  : 'bg-gray-500';
              
              // Option 2: Subtle diagonal pattern - thinner, lighter lines
              const diagonalPattern = isOverExit && !block.isTarget ? {
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(34, 197, 94, 0.25) 6px, rgba(34, 197, 94, 0.25) 8px)',
              } : {};
              
              // Only show border on outer edges
              const isLeftEdge = bx === 0;
              const isRightEdge = bx === block.width - 1;
              const isTopEdge = by === 0;
              const isBottomEdge = by === block.height - 1;
              
              const cellBorderClass = 
                (isLeftEdge ? 'border-l-2 ' : '') +
                (isRightEdge ? 'border-r-2 ' : '') +
                (isTopEdge ? 'border-t-2 ' : '') +
                (isBottomEdge ? 'border-b-2 ' : '') +
                borderClass;
              
              cells.push(
                <div
                  key={`${block.id}-${bx}-${by}`}
                  className={`absolute ${cellColorClass} ${cellBorderClass} transition-all duration-500 cursor-pointer ${scaleClass} ${shadowClass}`}
                  style={{
                    left: cellX * cellSize,
                    top: cellY * cellSize,
                    width: cellSize,
                    height: cellSize,
                    zIndex: zIndex,
                    ...diagonalPattern,
                  }}
                  onClick={() => handleBlockClick(block)}
                  aria-label={block.isTarget ? 'Target block' : `Block ${block.id}`}
                />
              );
            }
          }
          
          return <div key={block.id}>{cells}</div>;
        })}
      </div>

      {selectedBlock && !isSolved && (
        <div className="mt-6">
          {/* Mobile: Touch controls */}
          <div className="md:hidden mb-4">
            <p className="text-center text-sm text-gray-600 mb-3">
              {locale === 'es' ? 'Mueve el bloque con los botones:' : 'Move the block with the buttons:'}
            </p>
            <div className="flex flex-col items-center gap-2">
              {/* Up button */}
              <button
                onClick={() => moveBlock(selectedBlock, 'up')}
                className="w-14 h-14 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-lg flex items-center justify-center transition-colors touch-manipulation"
                aria-label={locale === 'es' ? 'Mover arriba' : 'Move up'}
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              {/* Middle row: Left, Down, Right */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => moveBlock(selectedBlock, 'left')}
                  className="w-14 h-14 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-lg flex items-center justify-center transition-colors touch-manipulation"
                  aria-label={locale === 'es' ? 'Mover izquierda' : 'Move left'}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveBlock(selectedBlock, 'down')}
                  className="w-14 h-14 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-lg flex items-center justify-center transition-colors touch-manipulation"
                  aria-label={locale === 'es' ? 'Mover abajo' : 'Move down'}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveBlock(selectedBlock, 'right')}
                  className="w-14 h-14 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-lg flex items-center justify-center transition-colors touch-manipulation"
                  aria-label={locale === 'es' ? 'Mover derecha' : 'Move right'}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Desktop: Keyboard hint */}
          <div className="hidden md:block text-center text-sm text-gray-600">
            <p>{locale === 'es' ? 'Usa las teclas de flecha para mover el bloque seleccionado' : 'Use arrow keys to move the selected block'}</p>
          </div>
        </div>
      )}

      {isSolved && (
        <div className="mt-4 text-center">
          <p className="text-green-600 font-medium text-lg mb-2">
            {locale === 'es' ? '¡Resuelto!' : 'Solved!'}
          </p>
          <p className="text-sm text-gray-600">
            {locale === 'es' 
              ? `Tiempo total: ${formatTime(elapsedTime)}`
              : `Total time: ${formatTime(elapsedTime)}`}
          </p>
        </div>
      )}

      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={handleReset}
          className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-50 active:bg-gray-100 transition-colors min-h-[44px] touch-manipulation font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

