import React from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';
import { SnakeBoard } from './components/SnakeBoard';
import { MusicPlayer } from './components/MusicPlayer';
import { GlitchText } from './components/GlitchText';

const App: React.FC = () => {
  const {
    snake,
    food,
    isGameOver,
    isPaused,
    score,
    resetGame,
    hasStarted
  } = useSnakeGame();

  return (
    <div className="w-full h-full flex flex-col bg-[#020202] border-[3px] border-cyan-900 relative overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]">
      
      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-500" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-fuchsia-500" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-fuchsia-500" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-500" />

      {/* Header */}
      <header className="p-6 border-b border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black/40">
        <div>
          <GlitchText as="h1" text="NEON_SNAKE_OS" className="text-3xl md:text-4xl text-cyan-400 font-bold" />
          <p className="text-xs text-fuchsia-600 tracking-[0.3em] mt-1">v.2.0.4 // UNAUTHORIZED_ACCESS</p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Data_Fragments_Recovered</div>
          <div className="text-4xl font-['VT323'] text-fuchsia-400 drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]">
            {score.toString().padStart(4, '0')}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-8 overflow-y-auto overflow-x-hidden">
        
        {/* Left Sidebar - Instructions/Lore */}
        <aside className="hidden lg:flex flex-col w-64 border border-gray-800 p-4 bg-black/20 text-sm">
          <h3 className="text-cyan-500 border-b border-cyan-900 pb-2 mb-4 uppercase tracking-widest">System_Directives</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex gap-2">
              <span className="text-fuchsia-500">{'>'}</span>
              <span>Navigate the construct using [W,A,S,D] or [ARROW_KEYS].</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fuchsia-500">{'>'}</span>
              <span>Consume magenta data packets to expand memory allocation.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fuchsia-500">{'>'}</span>
              <span>Avoid boundary collision and self-intersection.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-fuchsia-500">{'>'}</span>
              <span>Press [SPACE] to suspend simulation.</span>
            </li>
          </ul>
          
          <div className="mt-auto pt-4 border-t border-gray-800">
            <div className="text-xs text-cyan-700 animate-pulse">
              STATUS: {isGameOver ? 'OFFLINE' : hasStarted ? (isPaused ? 'SUSPENDED' : 'ACTIVE') : 'STANDBY'}
            </div>
          </div>
        </aside>

        {/* Center - Game Board */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Decorative background behind board */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
             <div className="w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(0,255,255,0.1)_0%,transparent_70%)]" />
          </div>
          
          <SnakeBoard
            snake={snake}
            food={food}
            isGameOver={isGameOver}
            isPaused={isPaused}
            hasStarted={hasStarted}
            onStart={resetGame}
          />
        </div>

      </main>

      {/* Footer - Music Player */}
      <footer className="p-6 pt-0">
        <MusicPlayer />
      </footer>

    </div>
  );
};

export default App;
