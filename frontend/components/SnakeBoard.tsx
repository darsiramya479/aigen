import React from 'react';
import { GRID_SIZE } from '../constants';
import { Point } from '../hooks/useSnakeGame';
import { GlitchText } from './GlitchText';

interface SnakeBoardProps {
  snake: Point[];
  food: Point;
  isGameOver: boolean;
  isPaused: boolean;
  hasStarted: boolean;
  onStart: () => void;
}

export const SnakeBoard: React.FC<SnakeBoardProps> = ({
  snake,
  food,
  isGameOver,
  isPaused,
  hasStarted,
  onStart,
}) => {
  // Create a grid array for rendering
  const grid = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => 0)
  );

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.3)] bg-[#0a0a0a] overflow-hidden">
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)',
          backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
        }}
      />

      {/* Game Entities */}
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
        {grid.map((row, y) =>
          row.map((_, x) => {
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.some((segment, idx) => idx !== 0 && segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={`${x}-${y}`}
                className={`
                  w-full h-full border-[0.5px] border-transparent
                  ${isSnakeHead ? 'bg-cyan-300 shadow-[0_0_10px_#00ffff] z-10' : ''}
                  ${isSnakeBody ? 'bg-cyan-600 opacity-80' : ''}
                  ${isFood ? 'bg-fuchsia-500 shadow-[0_0_15px_#ff00ff] animate-pulse' : ''}
                `}
              />
            );
          })
        )}
      </div>

      {/* Overlays */}
      {!hasStarted && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
          <GlitchText text="SYSTEM_READY" className="text-4xl text-cyan-400 mb-4" />
          <button
            onClick={onStart}
            className="px-6 py-2 border border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-black transition-colors font-bold tracking-widest uppercase"
          >
            INITIATE_SEQUENCE
          </button>
        </div>
      )}

      {isGameOver && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20">
          <GlitchText text="FATAL_ERROR" className="text-5xl text-red-500 mb-2" />
          <p className="text-fuchsia-400 mb-6 animate-pulse">CONNECTION_LOST</p>
          <button
            onClick={onStart}
            className="px-6 py-2 border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-colors font-bold tracking-widest uppercase"
          >
            REBOOT_SYSTEM
          </button>
        </div>
      )}

      {isPaused && hasStarted && !isGameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 backdrop-blur-sm">
          <GlitchText text="SYSTEM_PAUSED" className="text-3xl text-yellow-400" />
        </div>
      )}
    </div>
  );
};
