import React, { useState } from 'react';
import { X, History, Search, Loader, Calendar, Trash2 } from 'lucide-react';
import { useHistory } from '../hooks/useHistory';
import { formatDate } from '../utils';

interface WatchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WatchHistoryModal({ isOpen, onClose }: WatchHistoryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { history, clearHistoryItem, isLoading, error } = useHistory();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', ...new Set(history.map(item => item.category))];

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group history items by date
  const groupedHistory = filteredHistory.reduce((groups, item) => {
    const date = new Date(item.watched_at).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, typeof history>);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <History className="h-6 w-6 text-emerald-500" />
              <h2 className="text-xl font-semibold">Watch History</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search in history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : Object.keys(groupedHistory).length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No watch history found
            </div>
          ) : (
            Object.entries(groupedHistory).map(([date, items]) => (
              <div key={date} className="mb-8 last:mb-0">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-lg font-medium">{formatDate(date)}</h3>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.watched_at}`}
                      className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition group"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>{item.category}</span>
                            <span>•</span>
                            <span>{new Date(item.watched_at).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm px-2 py-1 rounded ${
                          item.quality === '4K' 
                            ? 'bg-emerald-500/20 text-emerald-500'
                            : item.quality === 'HD'
                              ? 'bg-blue-500/20 text-blue-500'
                              : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {item.quality}
                        </span>
                        <button
                          onClick={() => clearHistoryItem(item.id)}
                          className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition"
                          title="Remove from history"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}