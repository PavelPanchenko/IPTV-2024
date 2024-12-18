import { useState, useEffect } from 'react';
import type { Channel } from '../types';

interface WatchHistoryItem extends Channel {
  watched_at: string;
}

export function useHistory() {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const data = await channelsApi.getHistory();
      setHistory(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const recordWatch = async (channelId: number) => {
    try {
      await channelsApi.recordHistory(channelId);
      await loadHistory();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const clearHistoryItem = async (channelId: number) => {
    setHistory(prev => prev.filter(item => item.id !== channelId));
  };

  return {
    history,
    isLoading,
    error,
    recordWatch,
    clearHistoryItem,
    refreshHistory: loadHistory
  };
}