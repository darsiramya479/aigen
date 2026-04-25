import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { AUDIO_TRACKS } from '../constants';
import { GlitchText } from './GlitchText';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = AUDIO_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Audio playback failed:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % AUDIO_TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    handleNext();
  };

  return (
    <div className="w-full border border-fuchsia-500 bg-[#0a0a0a] p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
        loop={false}
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Track Info */}
        <div className="flex-1 min-w-0 w-full">
          <div className="text-xs text-cyan-600 mb-1 uppercase tracking-widest">Audio_Subsystem_Active</div>
          <div className="truncate">
            <GlitchText 
              text={currentTrack.title} 
              className={`text-lg ${isPlaying ? 'text-fuchsia-400' : 'text-gray-500'}`} 
            />
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-800 mt-2 relative">
            <div 
              className="absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-100 ease-linear shadow-[0_0_5px_#00ffff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrev}
            className="text-cyan-500 hover:text-fuchsia-400 transition-colors p-2 border border-transparent hover:border-cyan-500/30"
          >
            <SkipBack size={20} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-black transition-all shadow-[0_0_10px_rgba(255,0,255,0.2)] hover:shadow-[0_0_20px_rgba(255,0,255,0.6)]"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          
          <button 
            onClick={handleNext}
            className="text-cyan-500 hover:text-fuchsia-400 transition-colors p-2 border border-transparent hover:border-cyan-500/30"
          >
            <SkipForward size={20} />
          </button>

          <div className="w-px h-8 bg-gray-800 mx-2" />

          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};
