import React, { useState, useEffect } from 'react';
import { Settings, History, Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SubscriptionManager from '../components/SubscriptionManager';
import BalanceManager from '../components/BalanceManager';
import RecentlyWatched from '../components/RecentlyWatched';
import FavoritesModal from '../components/FavoritesModal';
import WatchHistoryModal from '../components/WatchHistoryModal';
import ContinueWatching from '../components/ContinueWatching';
import PlaylistDownloader from '../components/PlaylistDownloader';
import SettingsModal from '../components/SettingsModal';
import ReferralSystem from '../components/ReferralSystem';

export default function Dashboard() {
  const { user } = useAuth();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan;

  useEffect(() => {
    const storedPlan = sessionStorage.getItem('selectedPlan');
    if (storedPlan) {
      sessionStorage.removeItem('selectedPlan');
    }
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.username}!</h1>
          <p className="text-gray-300">Manage your subscription and watch your favorite content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <ContinueWatching />
          <button 
            onClick={() => setShowFavorites(true)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition flex items-center"
          >
            <Heart className="h-5 w-5 text-emerald-500 mr-3" />
            <span>Favorites</span>
          </button>
          <button 
            onClick={() => setShowHistory(true)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition flex items-center"
          >
            <History className="h-5 w-5 text-emerald-500 mr-3" />
            <span>Watch History</span>
          </button>
          <button 
            onClick={() => setShowSettings(true)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition flex items-center"
          >
            <Settings className="h-5 w-5 text-emerald-500 mr-3" />
            <span>Settings</span>
          </button>
        </div>

        <div className="space-y-8">
          <ReferralSystem />
          
          <BalanceManager />
          
          <SubscriptionManager initialPlan={selectedPlan} />
          
          <PlaylistDownloader />
          
          <RecentlyWatched />
        </div>

        <FavoritesModal 
          isOpen={showFavorites} 
          onClose={() => setShowFavorites(false)} 
        />
        <WatchHistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
        />
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </div>
    </div>
  );
}