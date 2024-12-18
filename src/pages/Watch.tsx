import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from '../hooks/usePlayer';
import VideoPlayer from '../components/player/VideoPlayer';
import { basicChannels } from '../data/channels';

export default function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentChannel, 
    favorites, 
    handleChannelChange, 
    handleToggleFavorite 
  } = usePlayer(id, basicChannels);

  if (!currentChannel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Channel not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VideoPlayer
          channel={currentChannel}
          onChannelChange={handleChannelChange}
          allChannels={basicChannels}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}