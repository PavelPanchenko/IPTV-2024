import React, { useState, useRef } from 'react';
import { Tv, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import { Channel } from '../types/channel';
import ChannelItem from './channel/ChannelItem';
import ChannelSearch from './channel/ChannelSearch';
import CategorySelect from './channel/CategorySelect';

interface ChannelListProps {
  channels: Channel[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ChannelList({ channels, isOpen, onClose }: ChannelListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const categories = ['all', ...new Set(channels.map(channel => channel.category))];
  
  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || channel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleWatchChannel = (channelId: number) => {
    navigate(`/watch/${channelId}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Tv className="h-6 w-6 text-emerald-500" />
              <h2 className="text-xl font-semibold">Available Channels</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <ChannelSearch 
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />
            <CategorySelect
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
        
        <div className="h-[calc(80vh-180px)]" ref={listRef}>
          <Virtuoso
            data={filteredChannels}
            itemContent={(_, channel) => (
              <ChannelItem 
                key={channel.id}
                channel={channel}
                onClick={handleWatchChannel}
              />
            )}
            className="channel-list"
          />
        </div>
      </div>
    </div>
  );
}