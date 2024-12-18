import type { Channel } from '@/types/channel';

export interface VideoPlayerProps {
  channel: Channel;
  onChannelChange: (channel: Channel) => void;
  allChannels: Channel[];
  favorites: number[];
  onToggleFavorite: (channelId: number) => void;
}

export interface ControlsProps {
  isPlaying: boolean;
  isVideoReady: boolean;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  showControls: boolean;
  channelManager: {
    previousChannel: Channel | null;
    nextChannel: Channel | null;
  };
  onPlayPause: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onChannelChange: (channel: Channel) => void;
  onToggleChannelList: () => void;
  onToggleEPG: () => void;
}

export interface VideoContainerProps {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export interface VideoPlayerControls {
  isVideoReady: boolean;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  showChannelList: boolean;
  showEPG: boolean;
  channelManager: {
    previousChannel: Channel | null;
    nextChannel: Channel | null;
  };
  handlePlayPause: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleMute: () => void;
  handleToggleFullscreen: () => void;
  handleChannelChange: (channel: Channel) => void;
  setShowChannelList: (value: boolean | ((prev: boolean) => boolean)) => void;
  setShowEPG: (value: boolean | ((prev: boolean) => boolean)) => void;
  setShowShortcuts: (value: boolean | ((prev: boolean) => boolean)) => void;
}