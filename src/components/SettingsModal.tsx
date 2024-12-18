import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Settings, CreditCard } from 'lucide-react';
import AccountSettings from './settings/AccountSettings';
import PaymentSettings from './settings/PaymentSettings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('account');

  if (!isOpen) return null;

  const menuItems = [
    { id: 'account', icon: Settings, label: t('settings.tabs.account') },
    { id: 'payment', icon: CreditCard, label: t('settings.tabs.payment') }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />;
      case 'payment':
        return <PaymentSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-5xl h-[80vh] overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-700 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{t('settings.title')}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}