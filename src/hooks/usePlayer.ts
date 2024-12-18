import { useState, useEffect } from 'react';
import { Channel } from '../types/channel';

export function usePlayer(id: string | undefined, channels: Channel[]) {
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const channel = channels.find(ch => ch.id === Number(id));
    if (channel) {
      setCurrentChannel(channel);
    }
  }, [id, channels]);

  const handleChannelChange = (channel: Channel) => {
    setCurrentChannel(channel);
  };

  const handleToggleFavorite = (channelId: number) => {
    setFavorites(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      }
      return [...prev, channelId];
    });
  };

  return {
    currentChannel,
    favorites,
    handleChannelChange,
    handleToggleFavorite
  };
}