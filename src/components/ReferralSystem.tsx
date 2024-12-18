import React, { useState } from 'react';
import { Share2, Copy, Users, Coins, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils';

export default function ReferralSystem() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/register?ref=${user?.referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Share2 className="h-6 w-6 text-emerald-500" />
          <div>
            <h3 className="text-xl font-semibold">Referral Program</h3>
            <p className="text-sm text-gray-400">Earn 10% from your referrals' deposits</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-emerald-500" />
          <span className="text-sm text-gray-400">Total earnings:</span>
          <span className="font-semibold text-emerald-500">
            {formatPrice(user?.referralEarnings || 0)}
          </span>
        </div>
      </div>

      <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <p className="text-sm text-gray-400 mb-2">Your referral link:</p>
            <div className="bg-gray-800 rounded px-4 py-2 text-sm font-mono break-all">
              {referralLink}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-emerald-500" />
            <h4 className="font-medium">How it works</h4>
          </div>
          <p className="text-sm text-gray-400">
            Share your referral link with friends and earn 10% from their deposits
          </p>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Share2 className="h-5 w-5 text-emerald-500" />
            <h4 className="font-medium">Share & Earn</h4>
          </div>
          <p className="text-sm text-gray-400">
            Your friends get access to premium IPTV, you get passive income
          </p>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="h-5 w-5 text-emerald-500" />
            <h4 className="font-medium">Instant Rewards</h4>
          </div>
          <p className="text-sm text-gray-400">
            Earnings are instantly credited to your balance
          </p>
        </div>
      </div>
    </div>
  );
}