import { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { useChannelManager } from '@/hooks/useChannelManager';
import { useKeyboardControls } from './useKeyboardControls';
import { CONTROLS_HIDE_DELAY, DEFAULT_VOLUME, VIDEO_PLAYER } from '@/constants';
import type { Channel } from '@/types/channel';
import type { VideoPlayerProps } from '../types';

export function useVideoPlayer({ channel, onChannelChange, allChannels }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showChannelList, setShowChannelList] = useState(false);
  const [showEPG, setShowEPG] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number>();
  const hlsRef = useRef<Hls | null>(null);

  const channelManager = useChannelManager(allChannels);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (!showChannelList && !showEPG) {
        setShowControls(false);
      }
    }, CONTROLS_HIDE_DELAY);
  };

  const handlePlayPause = () => {
    if (!isVideoReady) return;
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleChannelChange = (newChannel: Channel) => {
    if (newChannel.id === channel.id) return;
    onChannelChange(newChannel);
  };

  const handleRetry = () => {
    setError(null);
    setIsPlaying(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !channel.url) return;

    setIsLoading(true);
    setError(null);
    setIsVideoReady(false);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const initializeVideo = async () => {
      try {
        if (Hls.isSupported() && channel.url.includes('.m3u8')) {
          const hls = new Hls(VIDEO_PLAYER.HLS);
          
          hlsRef.current = hls;
          
          hls.loadSource(channel.url);
          hls.attachMedia(video);
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setIsLoading(false);
            setIsVideoReady(true);
            if (isPlaying) {
              video.play().catch(() => {
                setError('Failed to play video');
                setIsPlaying(false);
              });
            }
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              setError('Failed to load video stream');
              setIsLoading(false);
              setIsPlaying(false);
            }
          });

        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = channel.url;
          
          video.addEventListener('loadedmetadata', () => {
            setIsLoading(false);
            setIsVideoReady(true);
            if (isPlaying) {
              video.play().catch(() => {
                setError('Failed to play video');
                setIsPlaying(false);
              });
            }
          });

          video.addEventListener('error', () => {
            setError('Failed to load video');
            setIsLoading(false);
            setIsPlaying(false);
          });
        } else {
          setError('This video format is not supported');
          setIsLoading(false);
          setIsPlaying(false);
        }
      } catch (err) {
        setError('Failed to initialize video player');
        setIsLoading(false);
        setIsPlaying(false);
      }
    };

    initializeVideo();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel.url, isPlaying]);

  useKeyboardControls({
    isVideoReady,
    isPlaying,
    volume,
    isMuted,
    showChannelList,
    showEPG,
    channelManager,
    handlePlayPause,
    handleVolumeChange,
    handleToggleMute,
    handleToggleFullscreen,
    handleChannelChange,
    setShowChannelList,
    setShowEPG,
    setShowShortcuts
  });

  return {
    videoRef,
    playerRef,
    isPlaying,
    volume,
    isMuted,
    isFullscreen,
    showControls,
    showChannelList,
    showEPG,
    showShortcuts,
    searchTerm,
    isLoading,
    error,
    isVideoReady,
    channelManager,
    handleMouseMove,
    handlePlayPause,
    handleVolumeChange,
    handleToggleMute,
    handleToggleFullscreen,
    handleChannelChange,
    setShowChannelList,
    setShowEPG,
    setShowShortcuts,
    setSearchTerm,
    handleRetry,
    setShowControls
  };
}