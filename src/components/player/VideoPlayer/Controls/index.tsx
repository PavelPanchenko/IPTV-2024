import React from 'react';
import { Calendar, List, Maximize, Minimize } from 'lucide-react';
import PlaybackControls from './PlaybackControls';
import VolumeControls from './VolumeControls';
import NavigationControls from './NavigationControls';
import { ControlsProps } from '../types';

export default function Controls({
  isPlaying,
  isVideoReady,
  volume,
  isMuted,
  isFullscreen,
  showControls,
  channelManager,
  onPlayPause,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onChannelChange,
  onToggleChannelList,
  onToggleEPG
}: ControlsProps) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <PlaybackControls
            isPlaying={isPlaying}
            isVideoReady={isVideoReady}
            onPlayPause={onPlayPause}
          />

          <NavigationControls
            channelManager={channelManager}
            onChannelChange={onChannelChange}
          />

          <VolumeControls
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />
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
    </div>
  );
}