import React from 'react';

interface ErrorOverlayProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorOverlay({ message, onRetry }: ErrorOverlayProps) {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}