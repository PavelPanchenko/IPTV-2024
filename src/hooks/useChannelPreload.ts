import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { Channel } from '../types';

export function useChannelPreload(channels: Channel[], currentChannelId: number) {
  const preloadRefs = useRef<{ [key: number]: Hls }>({});

  useEffect(() => {
    // Find current channel index
    const currentIndex = channels.findIndex(ch => ch.id === currentChannelId);
    if (currentIndex === -1) return;

    // Determine next and previous channels
    const nextChannel = channels[currentIndex + 1];
    const prevChannel = channels[currentIndex - 1];

    // Cleanup function to destroy HLS instances
    const cleanup = () => {
      Object.values(preloadRefs.current).forEach(hls => {
        hls.destroy();
      });
      preloadRefs.current = {};
    };

    // Preload next and previous channels
    const preloadChannel = (channel: Channel) => {
      if (!channel?.url || !Hls.isSupported()) return;

      const hls = new Hls({
        maxBufferSize: 0,
        maxBufferLength: 1,
        enableWorker: true,
        lowLatencyMode: true
      });

      const video = document.createElement('video');
      video.muted = true;
      video.preload = 'auto';

      hls.loadSource(channel.url);
      hls.attachMedia(video);
      
      // Store HLS instance for cleanup
      preloadRefs.current[channel.id] = hls;
    };

    // Preload adjacent channels
    if (nextChannel) preloadChannel(nextChannel);
    if (prevChannel) preloadChannel(prevChannel);

    return cleanup;
  }, [channels, currentChannelId]);

  return {
    getPreloadedHls: (channelId: number) => preloadRefs.current[channelId]
  };
}