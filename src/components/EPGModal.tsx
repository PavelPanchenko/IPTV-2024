import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Search, Filter, Tv, X } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';
import ProgramCard from './epg/ProgramCard';
import ProgramDetails from './epg/ProgramDetails';
import type { Program } from './epg/types';

interface EPGModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelName: string;
}

export default function EPGModal({ isOpen, onClose, channelName }: EPGModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const programDetailsRef = useRef(null);

  // Mock EPG data - in real app, this would come from an API
  const programs: Program[] = [
    {
      id: 1,
      title: "Morning News",
      description: "Start your day with the latest news from around the world. Our experienced anchors bring you comprehensive coverage of local and international events.",
      startTime: "06:00",
      endTime: "09:00",
      category: "News",
      thumbnail: "https://images.unsplash.com/photo-1495020689067-958852a7765e"
    },
    {
      id: 2,
      title: "Sports Review",
      description: "Comprehensive coverage of yesterday's sporting events with expert analysis and highlights from major leagues.",
      startTime: "09:00",
      endTime: "10:30",
      category: "Sports",
      thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
    },
    {
      id: 3,
      title: "Cooking Show",
      description: "Learn to cook delicious meals with our expert chef. Today's episode features traditional Italian cuisine.",
      startTime: "10:30",
      endTime: "11:30",
      category: "Lifestyle",
      thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d"
    },
    {
      id: 4,
      title: "Documentary: Ocean Life",
      description: "Explore the mysteries of marine life in this stunning documentary about the world's oceans.",
      startTime: "11:30",
      endTime: "13:00",
      category: "Documentary",
      thumbnail: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['all', ...new Set(programs.map(program => program.category))];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-gray-900/95 backdrop-blur-md rounded-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 scale-in">
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Tv className="h-8 w-8 text-emerald-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{channelName}</h2>
                <p className="text-gray-400 text-sm">Program Guide</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
              />
            </div>
            
            <div className="flex gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
              />
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <div className="flex rounded-lg border border-white/10 overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`px-4 py-3 ${view === 'grid' ? 'bg-emerald-500 text-white' : 'bg-white/5 hover:bg-white/10'} transition-all duration-200`}
                >
                  <Filter className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-3 ${view === 'list' ? 'bg-emerald-500 text-white' : 'bg-white/5 hover:bg-white/10'} transition-all duration-200`}
                >
                  <Calendar className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)] custom-scrollbar">
          <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                view={view}
                onClick={() => setSelectedProgram(program)}
              />
            ))}
          </div>
        </div>
      </div>

      <CSSTransition
        in={!!selectedProgram}
        timeout={300}
        classNames="fade-scale"
        unmountOnExit
        nodeRef={programDetailsRef}
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProgram(null)}
          />
          {selectedProgram && (
            <ProgramDetails
              ref={programDetailsRef}
              program={selectedProgram}
              onClose={() => setSelectedProgram(null)}
            />
          )}
        </div>
      </CSSTransition>
    </div>
  );
}