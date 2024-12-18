import { useState, useEffect } from 'react';
import { Channel } from '../types';

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChannels = async () => {
    try {
      setIsLoading(true);
      const data = await channelsApi.getChannels();
      setChannels(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  return {
    channels,
    isLoading,
    error,
    refreshChannels: loadChannels
  };
}