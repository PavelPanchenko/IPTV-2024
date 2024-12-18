import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, List, Calendar } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  isVideoReady: boolean;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  onPlayPause: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onPreviousChannel: () => void;
  onNextChannel: () => void;
  onToggleChannelList: () => void;
  onToggleEPG: () => void;
  hasPreviousChannel: boolean;
  hasNextChannel: boolean;
}

export default function PlayerControls({
  isPlaying,
  isVideoReady,
  volume,
  isMuted,
  isFullscreen,
  onPlayPause,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onPreviousChannel,
  onNextChannel,
  onToggleChannelList,
  onToggleEPG,
  hasPreviousChannel,
  hasNextChannel
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
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

        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousChannel}
            className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
            disabled={!hasPreviousChannel}
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={onNextChannel}
            className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
            disabled={!hasNextChannel}
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

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
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleEPG}
          className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
          title="Show TV Guide"
        >
          <Calendar className="h-5 w-5" />
        </button>
        <button
          onClick={onToggleChannelList}
          className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
        >
          <List className="h-5 w-5" />
        </button>
        <button 
          onClick={onToggleFullscreen}
          className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}