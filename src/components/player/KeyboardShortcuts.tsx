import React from 'react';
import { X } from 'lucide-react';

interface KeyboardShortcutsProps {
  onClose: () => void;
}

export default function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const shortcuts = [
    { key: 'Space', description: 'Play/Pause' },
    { key: 'M', description: 'Mute/Unmute' },
    { key: 'F', description: 'Toggle Fullscreen' },
    { key: '↑', description: 'Volume Up' },
    { key: '↓', description: 'Volume Down' },
    { key: '←', description: 'Previous Channel' },
    { key: '→', description: 'Next Channel' },
    { key: 'L', description: 'Channel List' },
    { key: 'E', description: 'TV Guide' },
    { key: 'Esc', description: 'Close/Exit' }
  ];

  return (
    <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {shortcuts.map(({ key, description }) => (
            <div key={key} className="flex items-center space-x-3">
              <kbd className="px-2 py-1 bg-gray-700 rounded text-sm font-mono">
                {key}
              </kbd>
              <span className="text-gray-300">{description}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Press '?' to toggle this help menu
        </p>
      </div>
    </div>
  );
}