import React, { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, List, Calendar } from 'lucide-react';
import { useChannelManager } from '../hooks/useChannelManager';
import EPGModal from './EPGModal';
import KeyboardShortcuts from './KeyboardShortcuts';
import ChannelListSidebar from './ChannelListSidebar';
import type { Channel } from '../types/channel';

interface VideoPlayerProps {
  channel: Channel;
  onChannelChange: (channel: Channel) => void;
  allChannels: Channel[];
  favorites: number[];
  onToggleFavorite: (channelId: number) => void;
}

export default function VideoPlayer({ 
  channel, 
  onChannelChange, 
  allChannels,
  favorites,
  onToggleFavorite 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
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
    }, 3000);
  };

  const handlePlayPause = () => {
    if (!isVideoReady) return;
    setIsPlaying(!isPlaying);
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
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90
          });
          
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

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group"
      ref={playerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !showChannelList && !showEPG && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full aspect-video bg-black"
        playsInline
      />

      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setIsPlaying(true);
              }}
              className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePlayPause}
              disabled={!isVideoReady}
              className="w-10 h-10 rounded-full bg-emerald-500/20 hover:bg-emerald-500 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlaying ? 
                <Pause className="h-5 w-5 text-emerald-500 group-hover:text-white" /> : 
                <Play className="h-5 w-5 text-emerald-500 group-hover:text-white" />
              }
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => channelManager.previousChannel && handleChannelChange(channelManager.previousChannel)}
                className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
                disabled={!channelManager.previousChannel}
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                onClick={() => channelManager.nextChannel && handleChannelChange(channelManager.nextChannel)}
                className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
                disabled={!channelManager.nextChannel}
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleToggleMute}
                className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEPG(true)}
              className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
              title="Show TV Guide"
            >
              <Calendar className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowChannelList(!showChannelList)}
              className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
            >
              <List className="h-5 w-5" />
            </button>
            <button 
              onClick={handleToggleFullscreen}
              className="w-8 h-8 rounded-full hover:bg-gray-800/50 transition flex items-center justify-center"
            >
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {showChannelList && (
        <ChannelListSidebar
          channels={channelManager.filterChannels(searchTerm)}
          currentChannel={channel}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onChannelSelect={handleChannelChange}
          onClose={() => setShowChannelList(false)}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}

      {showEPG && (
        <EPGModal
          isOpen={showEPG}
          onClose={() => setShowEPG(false)}
          channelName={channel.name}
        />
      )}

      {showShortcuts && (
        <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  );
}