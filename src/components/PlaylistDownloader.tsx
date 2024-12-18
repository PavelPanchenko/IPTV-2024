import React, { useState } from 'react';
import { Download, ChevronDown, Check } from 'lucide-react';
import { Channel } from '../types/channel';
import { useChannels } from '../hooks/useChannels';
import { downloadPlaylist } from '../utils/playlist';

const PLAYLIST_FORMATS = [
  { id: 'm3u8', name: 'M3U8', description: 'Standard playlist format' },
  { id: 'm3u', name: 'M3U - MPEGTS', description: 'MPEG transport stream format' },
  { id: 'enigma', name: 'Enigma2', description: 'For Enigma2 devices' },
  { id: 'kodi', name: 'Kodi', description: 'For Kodi media center' },
  { id: 'ssiptv', name: 'Samsung/LG Smart TV', description: 'For Smart TV (SS IPTV)' },
  { id: 'halva', name: 'Halva IPTV Player', description: 'For Halva IPTV Player' },
  { id: 'spark', name: 'Spark Player', description: 'For Spark IPTV Player' }
];

export default function PlaylistDownloader() {
  const [isOpen, setIsOpen] = useState(false);
  const { channels } = useChannels();
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const handleDownload = (format: string) => {
    downloadPlaylist(channels, format);
    setSelectedFormat(format);
    setTimeout(() => setSelectedFormat(null), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Download className="h-6 w-6 text-emerald-500" />
          <div>
            <h3 className="text-xl font-semibold">Download Playlist</h3>
            <p className="text-sm text-gray-400">Export channels in various formats</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition"
        >
          <span>Select Format</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {PLAYLIST_FORMATS.map((format) => (
            <button
              key={format.id}
              onClick={() => handleDownload(format.id)}
              className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition flex items-center justify-between group"
            >
              <div className="flex-1">
                <p className="font-medium">{format.name}</p>
                <p className="text-sm text-gray-400">{format.description}</p>
              </div>
              {selectedFormat === format.id ? (
                <Check className="h-5 w-5 text-emerald-500" />
              ) : (
                <Download className="h-5 w-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}