import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Tv2, Zap, Shield, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative">
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Your Ultimate IPTV Experience
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stream your favorite channels in stunning 4K quality. Enjoy live TV, movies, and sports from anywhere, anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-emerald-500/25"
                >
                  <Play className="h-5 w-5" />
                  <span>Go to Dashboard</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-emerald-500/25"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Watching Now</span>
                  </Link>
                  <Link
                    to="/pricing"
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Zap className="h-5 w-5" />
                    <span>View Plans</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose StreamVerse?</h2>
          <p className="text-gray-400">Experience the future of television today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Tv2 className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">4K Streaming</h3>
            <p className="text-gray-400">
              Crystal clear picture quality with support for 4K Ultra HD content
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Zero buffering with our advanced streaming technology
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-400">
              Your streaming activity is protected with end-to-end encryption
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Referral Program</h3>
            <p className="text-gray-400">
              Invite friends and earn 10% from their deposits forever
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}