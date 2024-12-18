import React from 'react';
import { Play } from 'lucide-react';
import { useHistory } from '../hooks/useHistory';
import { useNavigate } from 'react-router-dom';

export default function ContinueWatching() {
  const { history } = useHistory();
  const navigate = useNavigate();

  const lastWatched = history[0];

  const handleContinueWatching = () => {
    if (lastWatched) {
      navigate(`/watch/${lastWatched.id}`);
    }
  };

  return (
    <button
      onClick={handleContinueWatching}
      disabled={!lastWatched}
      className={`p-4 rounded-lg transition flex items-center ${
        lastWatched
          ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
          : 'bg-gray-800 text-gray-400 cursor-not-allowed'
      }`}
    >
      <Play className="h-5 w-5 mr-3" />
      <span>Continue Watching</span>
    </button>
  );
}