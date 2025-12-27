'use client';

import { useState, useCallback, useEffect } from 'react';
import type { GameConfig, ColorCell } from '@/lib/games';

interface ColorFlowProps {
  config: GameConfig;
  onSolve?: () => void;
}

export default function ColorFlow({ config, onSolve }: ColorFlowProps) {
  const initialCells = (config.board.initialState.cells as ColorCell[]).map(c => ({ ...c }));
  const colors = config.board.initialState.colors as string[];
  const solutionCells = config.solution.cells as ColorCell[];
  
  const [cells, setCells] = useState<ColorCell[]>(() => {
    // Initialize all cells
    const allCells: ColorCell[] = [];
    for (let y = 0; y < config.board.height; y++) {
      for (let x = 0; x < config.board.width; x++) {
        const existing = initialCells.find(c => c.x === x && c.y === y);
        allCells.push(existing || { x, y, color: null });
      }
    }
    return allCells;
  });
  
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const getCell = useCallback((x: number, y: number): ColorCell | undefined => {
    return cells.find(c => c.x === x && c.y === y);
  }, [cells]);

  const checkSolution = useCallback(() => {
    for (const solutionCell of solutionCells) {
      const cell = getCell(solutionCell.x, solutionCell.y);
      if (!cell || cell.color !== solutionCell.color) {
        return false;
      }
    }
    return true;
  }, [cells, solutionCells, getCell]);

  const handleCellClick = useCallback((x: number, y: number) => {
    if (isSolved) return;
    
    const cell = getCell(x, y);
    if (!cell || cell.locked) return;

    setCells(prev => prev.map(c => {
      if (c.x === x && c.y === y) {
        if (selectedColor) {
          return { ...c, color: selectedColor };
        } else {
          // Cycle through colors
          const currentIndex = colors.indexOf(c.color || '');
          const nextIndex = (currentIndex + 1) % colors.length;
          return { ...c, color: colors[nextIndex] || null };
        }
      }
      return c;
    }));
  }, [selectedColor, colors, getCell, isSolved]);

  const handleReset = useCallback(() => {
    const allCells: ColorCell[] = [];
    for (let y = 0; y < config.board.height; y++) {
      for (let x = 0; x < config.board.width; x++) {
        const existing = initialCells.find(c => c.x === x && c.y === y);
        allCells.push(existing ? { ...existing } : { x, y, color: null });
      }
    }
    setCells(allCells);
    setSelectedColor(null);
    setIsSolved(false);
  }, [initialCells, config.board.height, config.board.width]);

  useEffect(() => {
    if (checkSolution() && !isSolved) {
      setIsSolved(true);
      onSolve?.();
    }
  }, [cells, checkSolution, isSolved, onSolve]);

  const cellSize = 50;
  const boardWidth = config.board.width * cellSize;
  const boardHeight = config.board.height * cellSize;

  const getColorClass = (color: string | null) => {
    if (!color) return 'bg-white';
    const colorMap: Record<string, string> = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="w-full">
      {/* Color selector */}
      <div className="flex justify-center gap-2 mb-4">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(selectedColor === color ? null : color)}
            className={`w-10 h-10 rounded border-2 transition-all ${
              getColorClass(color)
            } ${
              selectedColor === color ? 'border-black scale-110 ring-2 ring-black' : 'border-gray-300'
            }`}
            aria-label={`Select ${color} color`}
          />
        ))}
        <button
          onClick={() => setSelectedColor(null)}
          className={`w-10 h-10 rounded border-2 transition-all bg-white ${
            selectedColor === null ? 'border-black scale-110 ring-2 ring-black' : 'border-gray-300'
          }`}
          aria-label="Cycle colors"
        >
          <span className="text-xs">Cycle</span>
        </button>
      </div>

      <div className="relative mx-auto border-2 border-gray-300" style={{ width: boardWidth, height: boardHeight }}>
        <div className="grid" style={{
          gridTemplateColumns: `repeat(${config.board.width}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${config.board.height}, ${cellSize}px)`
        }}>
          {cells.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(cell.x, cell.y)}
              disabled={cell.locked || isSolved}
              className={`border border-gray-200 transition-all hover:opacity-80 ${
                cell.locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
              } ${getColorClass(cell.color)} ${
                isSolved ? 'ring-2 ring-green-500' : ''
              }`}
              style={{ width: cellSize, height: cellSize }}
              aria-label={`Cell at ${cell.x}, ${cell.y}, color ${cell.color || 'empty'}`}
            />
          ))}
        </div>
      </div>

      {isSolved && (
        <div className="mt-4 text-center">
          <p className="text-green-600 font-medium">Solved!</p>
        </div>
      )}

      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

