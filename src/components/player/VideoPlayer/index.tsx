import React from 'react';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import VideoContainer from './components/VideoContainer';
import ChannelInfo from './components/ChannelInfo';
import Controls from './components/Controls';
import ChannelListSidebar from '@/components/channel/ChannelListSidebar';
import EPGModal from '@/components/epg/EPGModal';
import KeyboardShortcuts from '@/components/player/KeyboardShortcuts';
import type { VideoPlayerProps } from './types';

export default function VideoPlayer(props: VideoPlayerProps) {
  const {
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
  } = useVideoPlayer(props);

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group"
      ref={playerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !showChannelList && !showEPG && setShowControls(false)}
    >
      <VideoContainer
        ref={videoRef}
        isLoading={isLoading}
        error={error}
        onRetry={handleRetry}
      />

      <ChannelInfo channel={props.channel} />

      <Controls
        isPlaying={isPlaying}
        isVideoReady={isVideoReady}
        volume={volume}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        showControls={showControls}
        channelManager={channelManager}
        onPlayPause={handlePlayPause}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
        onToggleFullscreen={handleToggleFullscreen}
        onChannelChange={handleChannelChange}
        onToggleChannelList={() => setShowChannelList(!showChannelList)}
        onToggleEPG={() => setShowEPG(true)}
      />

      {showChannelList && (
        <ChannelListSidebar
          channels={channelManager.filterChannels(searchTerm)}
          currentChannel={props.channel}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onChannelSelect={handleChannelChange}
          onClose={() => setShowChannelList(false)}
          favorites={props.favorites}
          onToggleFavorite={props.onToggleFavorite}
        />
      )}

      {showEPG && (
        <EPGModal
          isOpen={showEPG}
          onClose={() => setShowEPG(false)}
          channelName={props.channel.name}
        />
      )}

      {showShortcuts && (
        <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  );
}