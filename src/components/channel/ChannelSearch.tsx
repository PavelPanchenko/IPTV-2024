import React from 'react';
import { Search } from 'lucide-react';

interface ChannelSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const ChannelSearch = React.memo(({ searchTerm, onSearch }: ChannelSearchProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search channels..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </div>
  );
});

ChannelSearch.displayName = 'ChannelSearch';

export default ChannelSearch;