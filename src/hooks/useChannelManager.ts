import { useState, useCallback } from 'react';
import type { Channel } from '../types/channel';

export function useChannelManager(initialChannels: Channel[]) {
  const [channels] = useState<Channel[]>(initialChannels);
  const [currentChannelId, setCurrentChannelId] = useState<number>(
    channels[0]?.id || 0
  );

  const getCurrentChannel = useCallback(() => {
    return channels.find(ch => ch.id === currentChannelId) || channels[0];
  }, [channels, currentChannelId]);

  const getNextChannel = useCallback(() => {
    const currentIndex = channels.findIndex(ch => ch.id === currentChannelId);
    return channels[currentIndex + 1];
  }, [channels, currentChannelId]);

  const getPreviousChannel = useCallback(() => {
    const currentIndex = channels.findIndex(ch => ch.id === currentChannelId);
    return channels[currentIndex - 1];
  }, [channels, currentChannelId]);

  const changeChannel = useCallback((channelId: number) => {
    setCurrentChannelId(channelId);
  }, []);

  const filterChannels = useCallback((searchTerm: string) => {
    return channels.filter(ch =>
      ch.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [channels]);

  return {
    channels,
    currentChannel: getCurrentChannel(),
    nextChannel: getNextChannel(),
    previousChannel: getPreviousChannel(),
    changeChannel,
    filterChannels
  };
}