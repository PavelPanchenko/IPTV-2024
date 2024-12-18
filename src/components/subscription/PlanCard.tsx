import React from 'react';
import { Check, List, Play, Tv } from 'lucide-react';
import { formatPrice } from '@/utils';
import type { Channel } from '@/types/channel';

interface PlanCardProps {
  planKey: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  duration: string;
  isSelected?: boolean;
  channels: Channel[];
  onSelect: () => void;
  onViewChannels: () => void;
  onWatchChannel?: (channel: Channel) => void;
  showChannels?: boolean;
}

export default function PlanCard({
  planKey,
  name,
  description,
  price,
  features,
  duration,
  isSelected,
  channels,
  onSelect,
  onViewChannels,
  onWatchChannel,
  showChannels = false
}: PlanCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg cursor-pointer transition ${
        isSelected
          ? 'bg-emerald-500/20 border-2 border-emerald-500'
          : 'bg-gray-700 border-2 border-transparent hover:border-emerald-500/50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{name}</h4>
        <p className="font-bold">{formatPrice(price)}/{duration}</p>
      </div>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      
      {!showChannels ? (
        <>
          <ul className="space-y-1 mb-4">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-center">
                <Check className="h-4 w-4 mr-2 text-emerald-500" />
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewChannels();
            }}
            className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition flex items-center justify-center space-x-2"
          >
            <List className="h-4 w-4" />
            <span>View Channels</span>
          </button>
        </>
      ) : (
        <div className="space-y-2">
          {channels.slice(0, 4).map((channel) => (
            <button
              key={channel.id}
              className="w-full group flex items-center justify-between p-2 rounded-lg hover:bg-emerald-500/10 transition"
              onClick={(e) => {
                e.stopPropagation();
                onWatchChannel?.(channel);
              }}
            >
              <div className="flex items-center space-x-3">
                <Tv className="h-4 w-4 text-emerald-500" />
                <div className="text-left">
                  <p className="font-medium group-hover:text-emerald-500 transition">{channel.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{channel.category}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
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
              <div className="flex items-center space-x-2">
                <span className="text-xs text-emerald-500 opacity-0 group-hover:opacity-100 transition">
                  Watch Now
                </span>
                <Play className="h-4 w-4 text-emerald-500" />
              </div>
            </button>
          ))}
          {channels.length > 4 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewChannels();
              }}
              className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition text-sm"
            >
              View all {channels.length} channels
            </button>
          )}
        </div>
      )}
    </div>
  );
}