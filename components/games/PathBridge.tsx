'use client';

import { useState, useCallback, useEffect } from 'react';
import type { GameConfig, Island, Bridge } from '@/lib/games';

interface PathBridgeProps {
  config: GameConfig;
  onSolve?: () => void;
}

export default function PathBridge({ config, onSolve }: PathBridgeProps) {
  const islands = config.board.initialState.islands as Island[];
  const solutionBridges = config.solution.bridges as Bridge[];
  
  const [bridges, setBridges] = useState<Bridge[]>([]);
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const getIslandAt = useCallback((x: number, y: number): Island | undefined => {
    return islands.find(island => island.x === x && island.y === y);
  }, [islands]);

  const getBridgeCount = useCallback((island: Island): number => {
    return bridges.filter(bridge => 
      (bridge.from.x === island.x && bridge.from.y === island.y) ||
      (bridge.to.x === island.x && bridge.to.y === island.y)
    ).length;
  }, [bridges]);

  const bridgesMatch = useCallback((b1: Bridge, b2: Bridge): boolean => {
    return (
      (b1.from.x === b2.from.x && b1.from.y === b2.from.y && b1.to.x === b2.to.x && b1.to.y === b2.to.y) ||
      (b1.from.x === b2.to.x && b1.from.y === b2.to.y && b1.to.x === b2.from.x && b1.to.y === b2.from.y)
    );
  }, []);

  const checkSolution = useCallback(() => {
    if (bridges.length !== solutionBridges.length) return false;
    
    for (const solutionBridge of solutionBridges) {
      const found = bridges.some(bridge => bridgesMatch(bridge, solutionBridge));
      if (!found) return false;
    }

    // Check all islands have correct bridge count
    for (const island of islands) {
      if (getBridgeCount(island) !== island.bridges) return false;
    }

    return true;
  }, [bridges, solutionBridges, islands, getBridgeCount, bridgesMatch]);

  const handleIslandClick = useCallback((island: Island) => {
    if (isSolved) return;

    if (selectedIsland === null) {
      setSelectedIsland(island);
    } else {
      if (selectedIsland.x === island.x && selectedIsland.y === island.y) {
        setSelectedIsland(null);
        return;
      }

      // Check if islands are adjacent (horizontal or vertical)
      const isAdjacent = 
        (Math.abs(selectedIsland.x - island.x) === 1 && selectedIsland.y === island.y) ||
        (selectedIsland.x === island.x && Math.abs(selectedIsland.y - island.y) === 1);

      if (isAdjacent) {
        const newBridge: Bridge = {
          from: { x: selectedIsland.x, y: selectedIsland.y },
          to: { x: island.x, y: island.y }
        };

        // Check if bridge already exists
        const exists = bridges.some(bridge => bridgesMatch(bridge, newBridge));
        
        if (exists) {
          // Remove bridge
          setBridges(prev => prev.filter(bridge => !bridgesMatch(bridge, newBridge)));
        } else {
          // Add bridge
          setBridges(prev => [...prev, newBridge]);
        }
      }
      
      setSelectedIsland(null);
    }
  }, [selectedIsland, bridges, bridgesMatch, isSolved]);

  const handleReset = useCallback(() => {
    setBridges([]);
    setSelectedIsland(null);
    setIsSolved(false);
  }, []);

  // Check solution whenever bridges change
  useEffect(() => {
    if (checkSolution() && !isSolved) {
      setIsSolved(true);
      onSolve?.();
    }
  }, [bridges, checkSolution, isSolved, onSolve]);

  const cellSize = 60;
  const boardWidth = config.board.width * cellSize;
  const boardHeight = config.board.height * cellSize;

  return (
    <div className="w-full">
      <div className="relative mx-auto" style={{ width: boardWidth, height: boardHeight }}>
        {/* SVG for bridges */}
        <svg 
          className="absolute inset-0 pointer-events-none"
          width={boardWidth}
          height={boardHeight}
        >
          {bridges.map((bridge, index) => {
            const fromX = bridge.from.x * cellSize + cellSize / 2;
            const fromY = bridge.from.y * cellSize + cellSize / 2;
            const toX = bridge.to.x * cellSize + cellSize / 2;
            const toY = bridge.to.y * cellSize + cellSize / 2;
            
            return (
              <line
                key={index}
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="#000"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Grid cells */}
        <div className="grid" style={{ 
          gridTemplateColumns: `repeat(${config.board.width}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${config.board.height}, ${cellSize}px)`
        }}>
          {Array.from({ length: config.board.width * config.board.height }).map((_, index) => {
            const x = index % config.board.width;
            const y = Math.floor(index / config.board.width);
            const island = getIslandAt(x, y);
            const isSelected = selectedIsland?.x === island?.x && selectedIsland?.y === island?.y;
            const buttonClass = `w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold transition-all relative ${isSelected ? 'bg-gray-200 border-black scale-110' : 'bg-white border-black hover:bg-gray-50'} ${isSolved ? 'bg-green-100' : ''}`;
            
            return (
              <div
                key={index}
                className="border border-gray-200 flex items-center justify-center"
                style={{ width: cellSize, height: cellSize }}
              >
                {island && (
                  <div className="relative">
                    <button
                      onClick={() => handleIslandClick(island)}
                      className={buttonClass}
                      aria-label={`Island at ${x}, ${y} needs ${island.bridges} bridges`}
                    >
                      <span className="text-sm">{island.bridges}</span>
                    </button>
                    {getBridgeCount(island) > 0 && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getBridgeCount(island)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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

