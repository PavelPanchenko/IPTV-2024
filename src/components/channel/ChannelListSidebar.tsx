import React from 'react';
import { X, Search, Heart } from 'lucide-react';
import { Channel } from '../../types/channel';

interface ChannelListSidebarProps {
  channels: Channel[];
  currentChannel: Channel;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onChannelSelect: (channel: Channel) => void;
  onClose: () => void;
  favorites: number[];
  onToggleFavorite: (channelId: number) => void;
}

export default function ChannelListSidebar({
  channels,
  currentChannel,
  searchTerm,
  onSearchChange,
  onChannelSelect,
  onClose,
  favorites,
  onToggleFavorite
}: ChannelListSidebarProps) {
  const isFavorite = (channelId: number) => favorites.includes(channelId);

  return (
    <div className="absolute top-0 right-0 h-full w-80 bg-gray-900/95 backdrop-blur-sm border-l border-white/10">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Channels</h3>
            {/* Улучшенная кнопка закрытия */}
            <button 
              onClick={onClose}
              className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-emerald-500/20 transition-all duration-200 group relative"
              title="Close channel list"
            >
              <X className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-8 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Close (Esc)
              </span>
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-800/50 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {channels.map(ch => (
            <div
              key={ch.id}
              onClick={() => onChannelSelect(ch)}
              className={`group p-4 hover:bg-white/5 transition cursor-pointer ${
                ch.id === currentChannel.id ? 'bg-emerald-500/10 border-l-2 border-emerald-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${ch.id === currentChannel.id ? 'text-emerald-500' : ''}`}>
                    {ch.name}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{ch.category}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      ch.quality === '4K' 
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : ch.quality === 'HD'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {ch.quality}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(ch.id);
                  }}
                  className={`p-1.5 rounded-full transition ${
                    isFavorite(ch.id)
                      ? 'text-emerald-500 hover:bg-emerald-500/10'
                      : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Heart className="h-4 w-4" fill={isFavorite(ch.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}