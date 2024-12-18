import React from 'react';

export default function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
    </div>
  );
}