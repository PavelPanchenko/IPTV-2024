import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tv2, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
      
      {/* Glass effect with subtle gradient */}
      <div className="relative bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-[12px] border-b border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
            >
              <Tv2 className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-teal-300 transition-all duration-300">
                StreamVerse
              </span>
            </Link>
            
            {/* Navigation */}
            <div className="flex items-center space-x-1">
              <Link 
                to="/pricing" 
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/pricing'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {t('nav.pricing')}
              </Link>

              {user ? (
                <div className="flex items-center ml-4 space-x-1">
                  <Link 
                    to="/dashboard" 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      location.pathname === '/dashboard'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-white/[0.03] text-emerald-400 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white'
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>{t('nav.dashboard')}</span>
                  </Link>
                  
                  <button 
                    onClick={logout}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title={t('nav.logout')}
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  state={{ from: location }}
                  className="flex items-center space-x-2 ml-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                >
                  <User className="h-4 w-4" />
                  <span>{t('nav.signIn')}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}