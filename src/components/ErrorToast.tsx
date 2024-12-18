import React from 'react';
import { X } from 'lucide-react';

interface ErrorToastProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorToast({ message, onClose }: ErrorToastProps) {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} className="hover:text-red-100">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}