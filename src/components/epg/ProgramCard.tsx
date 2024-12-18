import React from 'react';
import { Clock, Play } from 'lucide-react';
import { Program } from './types';
import { isCurrentlyAiring } from './utils';

interface ProgramCardProps {
  program: Program;
  view: 'grid' | 'list';
  onClick: () => void;
}

export default function ProgramCard({ program, view, onClick }: ProgramCardProps) {
  if (view === 'list') {
    return (
      <div
        onClick={onClick}
        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300"
      >
        <div className="relative w-40 h-24 flex-shrink-0">
          <img
            src={program.thumbnail}
            alt={program.title}
            className="w-full h-full object-cover rounded-lg"
          />
          {isCurrentlyAiring(program.startTime, program.endTime) && (
            <LiveBadge />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{program.title}</h3>
          <TimeAndCategory program={program} />
          <p className="text-sm text-gray-400 line-clamp-2">{program.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-white/5 rounded-lg overflow-hidden hover:bg-white/10"
    >
      <div className="relative aspect-video">
        <img
          src={program.thumbnail}
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {isCurrentlyAiring(program.startTime, program.endTime) && (
          <LiveBadge />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold mb-1">{program.title}</h3>
          <TimeAndCategory program={program} />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}

function LiveBadge() {
  return (
    <div className="absolute top-2 right-2 flex items-center space-x-1 bg-emerald-500 px-2 py-1 rounded text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      <span>LIVE</span>
    </div>
  );
}

function TimeAndCategory({ program }: { program: Program }) {
  return (
    <div className="flex items-center text-sm text-gray-300 space-x-2">
      <Clock className="h-4 w-4" />
      <span>{program.startTime} - {program.endTime}</span>
      <span>•</span>
      <span>{program.category}</span>
    </div>
  );
}