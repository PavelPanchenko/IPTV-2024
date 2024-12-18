import React from 'react';
import { Tv, Heart, Loader, X } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

export default function FavoriteChannels() {
  const { favorites, removeFromFavorites, isLoading, error } = useFavorites();
  const navigate = useNavigate();

  // Show only the first 4 favorite channels
  const displayedFavorites = favorites.slice(0, 4);

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-emerald-500" />
          <h2 className="text-xl font-semibold">Favorite Channels</h2>
        </div>
        <span className="text-sm text-gray-400">
          {favorites.length} favorite channels
        </span>
      </div>

      {displayedFavorites.length === 0 ? (
        <div className="text-center py-4 text-gray-400">
          <p>No favorite channels yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayedFavorites.map((channel) => (
            <div
              key={channel.id}
              className="bg-gray-700/50 rounded-lg p-4 flex flex-col justify-between hover:bg-gray-700 transition group cursor-pointer"
              onClick={() => navigate(`/watch/${channel.id}`)}
            >
              <div className="flex items-center justify-between">
                <Tv className="h-5 w-5 text-emerald-500" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromFavorites(channel.id);
                  }}
                  className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition"
                  title="Remove from favorites"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4">
                <p className="font-medium">{channel.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-400">{channel.category}</p>
                  <span className={`text-sm px-2 py-1 rounded ${
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
          ))}
        </div>
      )}
    </div>
  );
}