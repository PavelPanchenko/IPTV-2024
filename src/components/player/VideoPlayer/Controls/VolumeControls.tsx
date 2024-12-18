import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlsProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
}

export default function VolumeControls({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute
}: VolumeControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={onToggleMute}
        className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={onVolumeChange}
        className="w-20 accent-emerald-500"
      />
    </div>
  );
}