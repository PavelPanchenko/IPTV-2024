import { useState, useEffect } from 'react';
import { Channel } from '../types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const data = await channelsApi.getWatchlist();
      setFavorites(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addToFavorites = async (channelId: number) => {
    try {
      await channelsApi.addToWatchlist(channelId);
      await loadFavorites();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeFromFavorites = async (channelId: number) => {
    try {
      await channelsApi.removeFromWatchlist(channelId);
      await loadFavorites();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    refreshFavorites: loadFavorites
  };
}