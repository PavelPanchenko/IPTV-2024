import React from 'react';
import { Channel } from '../../../types/channel';

interface ChannelInfoProps {
  channel: Channel;
}

export default function ChannelInfo({ channel }: ChannelInfoProps) {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">{channel.name}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <span>{channel.category}</span>
            <span>•</span>
            <span className={`px-2 py-0.5 rounded ${
              channel.quality === '4K' 
                ? 'bg-emerald-500/20 text-emerald-500'
                : channel.quality === 'HD'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'bg-gray-500/20 text-gray-400'
            }`}>
              {channel.quality}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}