import { useEffect } from 'react';
import type { VideoPlayerControls } from '../types';

export function useKeyboardControls({
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
}: VideoPlayerControls) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (isVideoReady) {
            handlePlayPause();
          }
          break;
        case 'KeyM':
          handleToggleMute();
          break;
        case 'KeyF':
          handleToggleFullscreen();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const newVolumeUp = Math.min(1, volume + 0.1);
          handleVolumeChange({
            target: { value: newVolumeUp.toString() }
          } as React.ChangeEvent<HTMLInputElement>);
          break;
        case 'ArrowDown':
          e.preventDefault();
          const newVolumeDown = Math.max(0, volume - 0.1);
          handleVolumeChange({
            target: { value: newVolumeDown.toString() }
          } as React.ChangeEvent<HTMLInputElement>);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (channelManager.previousChannel) {
            handleChannelChange(channelManager.previousChannel);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (channelManager.nextChannel) {
            handleChannelChange(channelManager.nextChannel);
          }
          break;
        case 'KeyL':
          setShowChannelList(prev => !prev);
          break;
        case 'KeyE':
          setShowEPG(prev => !prev);
          break;
        case 'Slash':
          if (e.shiftKey) {
            setShowShortcuts(prev => !prev);
          }
          break;
        case 'Escape':
          if (showChannelList) {
            setShowChannelList(false);
          } else if (showEPG) {
            setShowEPG(false);
          } else if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
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
  ]);
}