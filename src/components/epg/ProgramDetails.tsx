import React, { forwardRef } from 'react';
import { X, Play, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Program } from './types';

interface ProgramDetailsProps {
  program: Program;
  onClose: () => void;
}

const ProgramDetails = forwardRef<HTMLDivElement, ProgramDetailsProps>(
  ({ program, onClose }, ref) => {
    return (
      <div ref={ref} className="relative bg-gray-900/95 backdrop-blur-md rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="relative aspect-video">
          <img
            src={program.thumbnail}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-2xl font-bold mb-2">{program.title}</h2>
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{program.startTime} - {program.endTime}</span>
              </div>
              <span>•</span>
              <span>{program.category}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-300 leading-relaxed">{program.description}</p>
          <div className="mt-6 flex space-x-3">
            <button className="flex-1 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Watch Now</span>
            </button>
            <button className="flex-1 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 flex items-center justify-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProgramDetails.displayName = 'ProgramDetails';

export default ProgramDetails;