import React from 'react';
import { SkipBack, SkipForward } from 'lucide-react';

interface NavigationControlsProps {
  channelManager: any;
  onChannelChange: (channel: any) => void;
}

export default function NavigationControls({
  channelManager,
  onChannelChange
}: NavigationControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => channelManager.previousChannel && onChannelChange(channelManager.previousChannel)}
        className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
        disabled={!channelManager.previousChannel}
      >
        <SkipBack className="h-5 w-5" />
      </button>

      <button
        onClick={() => channelManager.nextChannel && onChannelChange(channelManager.nextChannel)}
        className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
        disabled={!channelManager.nextChannel}
      >
        <SkipForward className="h-5 w-5" />
      </button>
    </div>
  );
}