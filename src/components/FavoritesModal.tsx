import React, { useState } from 'react';
import { X, Heart, Search, Loader, Play } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useChannels } from '../hooks/useChannels';
import { Channel } from '../types';
import { useNavigate } from 'react-router-dom';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, addToFavorites, removeFromFavorites, isLoading: favoritesLoading } = useFavorites();
  const { channels, isLoading: channelsLoading } = useChannels();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const isLoading = favoritesLoading || channelsLoading;

  const filteredChannels = channels.filter(channel => 
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFavorite = (channel: Channel) => 
    favorites.some(fav => fav.id === channel.id);

  const toggleFavorite = async (e: React.MouseEvent, channel: Channel) => {
    e.stopPropagation();
    if (isFavorite(channel)) {
      await removeFromFavorites(channel.id);
    } else {
      await addToFavorites(channel.id);
    }
  };

  const handleWatchChannel = (channelId: number) => {
    navigate(`/watch/${channelId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-emerald-500" />
              <h2 className="text-xl font-semibold">Manage Favorites</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredChannels.map(channel => (
                <div
                  key={channel.id}
                  className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition group cursor-pointer"
                  onClick={() => handleWatchChannel(channel.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium">{channel.name}</p>
                      <p className="text-sm text-gray-400">{channel.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm px-2 py-1 rounded ${
                      channel.quality === '4K' 
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : channel.quality === 'HD'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {channel.quality}
                    </span>
                    <button
                      onClick={(e) => toggleFavorite(e, channel)}
                      className={`p-2 rounded-full transition ${
                        isFavorite(channel)
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      <Heart className="h-5 w-5" fill={isFavorite(channel) ? "currentColor" : "none"} />
                    </button>
                    <Play className="h-5 w-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredChannels.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No channels found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}