export const VIDEO_PLAYER = {
  HLS: {
    enableWorker: true,
    lowLatencyMode: true,
    backBufferLength: 90
  },
  CONTROLS_HIDE_DELAY: 3000,
  DEFAULT_VOLUME: 1,
  QUALITY_LEVELS: ['4K', 'HD', 'SD'] as const,
  KEYBOARD_SHORTCUTS: {
    PLAY_PAUSE: 'Space',
    MUTE: 'KeyM',
    FULLSCREEN: 'KeyF',
    VOLUME_UP: 'ArrowUp',
    VOLUME_DOWN: 'ArrowDown',
    PREV_CHANNEL: 'ArrowLeft',
    NEXT_CHANNEL: 'ArrowRight',
    CHANNEL_LIST: 'KeyL',
    EPG: 'KeyE',
    HELP: 'Slash'
  }
} as const;