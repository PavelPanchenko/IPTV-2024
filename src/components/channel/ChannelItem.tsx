import React from 'react';
import { Tv, Play } from 'lucide-react';
import { Channel } from '../../types/channel';

interface ChannelItemProps {
  channel: Channel;
  onClick: (channelId: number) => void;
}

const ChannelItem = React.memo(({ channel, onClick }: ChannelItemProps) => {
  return (
    <div
      onClick={() => onClick(channel.id)}
      className="p-4 hover:bg-white/10 transition cursor-pointer transform hover:scale-[1.02] duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Tv className="h-5 w-5 text-emerald-500" />
          <div>
            <p className="font-medium">{channel.name}</p>
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
        <Play className="h-5 w-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
});

ChannelItem.displayName = 'ChannelItem';

export default ChannelItem;