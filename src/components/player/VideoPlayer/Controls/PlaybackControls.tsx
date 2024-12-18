import React from 'react';
import { Play, Pause } from 'lucide-react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  isVideoReady: boolean;
  onPlayPause: () => void;
}

export default function PlaybackControls({
  isPlaying,
  isVideoReady,
  onPlayPause
}: PlaybackControlsProps) {
  return (
    <button 
      onClick={onPlayPause}
      disabled={!isVideoReady}
      className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPlaying ? 
        <Pause className="h-5 w-5 text-emerald-500 group-hover:text-white" /> : 
        <Play className="h-5 w-5 text-emerald-500 group-hover:text-white" />
      }
    </button>
  );
}