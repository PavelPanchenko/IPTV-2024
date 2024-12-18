import React, { forwardRef } from 'react';
import { LoadingOverlay } from './LoadingOverlay';
import { ErrorOverlay } from './ErrorOverlay';
import type { VideoContainerProps } from '../types';

export const VideoContainer = forwardRef<HTMLVideoElement, VideoContainerProps>(
  ({ isLoading, error, onRetry }, ref) => {
    return (
      <>
        <video
          ref={ref}
          className="w-full aspect-video bg-black"
          playsInline
        />

        {isLoading && <LoadingOverlay />}
        {error && <ErrorOverlay message={error} onRetry={onRetry} />}
      </>
    );
  }
);

VideoContainer.displayName = 'VideoContainer';