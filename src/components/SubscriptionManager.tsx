import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Tv, Play } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';
import { formatDate } from '../utils';
import { subscriptionPlans } from '../data/plans';
import { basicChannels, adultChannels, sportChannels, vipChannels } from '../data/channels';
import PlanCard from './subscription/PlanCard';
import ChannelList from './ChannelList';
import type { Channel } from '../types/channel';

export default function SubscriptionManager() {
  const { subscription, subscribe, isLoading, error } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [duration, setDuration] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [isChanging, setIsChanging] = useState(false);
  const [showChannels, setShowChannels] = useState<string | null>(null);
  const [isChannelListOpen, setIsChannelListOpen] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-emerald-500"></div>
      </div>
    );
  }

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    try {
      await subscribe(selectedPlan, duration);
      setIsChanging(false);
      setSelectedPlan(null);
      setShowChannels(null);
    } catch (err) {
      // Error is handled by useSubscription hook
    }
  };

  const getPrice = (plan: string) => {
    const planData = subscriptionPlans[plan as keyof typeof subscriptionPlans];
    switch (duration) {
      case 'monthly':
        return planData.monthlyPrice;
      case 'quarterly':
        return planData.quarterlyPrice;
      case 'yearly':
        return planData.yearlyPrice;
    }
  };

  const getChannelsForPlan = (planKey: keyof typeof subscriptionPlans) => {
    switch (planKey) {
      case 'basic':
        return basicChannels;
      case 'adult':
        return adultChannels;
      case 'sport':
        return sportChannels;
      case 'vip':
        return vipChannels;
      default:
        return basicChannels;
    }
  };

  const handleViewChannels = (planKey: string) => {
    const channels = getChannelsForPlan(planKey as keyof typeof subscriptionPlans);
    setSelectedChannels(channels);
    setIsChannelListOpen(true);
  };

  const handleWatchChannel = (channel: Channel) => {
    navigate(`/watch/${channel.id}`);
  };

  if (!isChanging && subscription?.subscribed) {
    const currentChannels = getChannelsForPlan(subscription.plan?.name.toLowerCase() as keyof typeof subscriptionPlans);
    
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Current Subscription</h3>
            <p className="text-gray-400 mt-1">
              Valid until {formatDate(subscription.endDate!)}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleViewChannels(subscription.plan?.name.toLowerCase())}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-500 rounded-md hover:bg-emerald-500/30 transition flex items-center space-x-2"
            >
              <Tv className="h-4 w-4" />
              <span>Watch Channels</span>
            </button>
            <button
              onClick={() => setIsChanging(true)}
              className="px-4 py-2 bg-emerald-500 rounded-md hover:bg-emerald-600 transition"
            >
              Change Plan
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <p className="font-medium text-emerald-500">{subscription.plan?.name} Plan</p>
            <ul className="mt-2 space-y-1">
              {subscription.plan?.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-sm text-gray-400 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <CreditCard className="h-12 w-12 text-emerald-500" />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Available Channels:</h4>
          {currentChannels.slice(0, 4).map((channel) => (
            <button
              key={channel.id}
              onClick={() => handleWatchChannel(channel)}
              className="w-full group flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-emerald-500/10 transition"
            >
              <div className="flex items-center space-x-3">
                <Tv className="h-4 w-4 text-emerald-500" />
                <div className="text-left">
                  <p className="font-medium group-hover:text-emerald-500 transition">{channel.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{channel.category}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      channel.quality === '4K' 
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : channel.quality === 'HD'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {channel.quality}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-emerald-500 opacity-0 group-hover:opacity-100 transition">
                  Watch Now
                </span>
                <Play className="h-4 w-4 text-emerald-500" />
              </div>
            </button>
          ))}
          {currentChannels.length > 4 && (
            <button
              onClick={() => handleViewChannels(subscription.plan?.name.toLowerCase())}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm"
            >
              View all {currentChannels.length} channels
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Change Subscription</h3>
        <p className="text-gray-400">Select your new plan and billing cycle</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Billing Cycle</label>
        <div className="flex space-x-4">
          {(['monthly', 'quarterly', 'yearly'] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setDuration(cycle)}
              className={`px-4 py-2 rounded-md transition ${
                duration === cycle
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 mb-6">
        {Object.entries(subscriptionPlans).map(([key, plan]) => (
          <PlanCard
            key={key}
            planKey={key}
            name={plan.name}
            description={plan.description}
            price={getPrice(key)}
            features={plan.features}
            duration={duration}
            isSelected={selectedPlan === key}
            channels={getChannelsForPlan(key as keyof typeof subscriptionPlans)}
            onSelect={() => setSelectedPlan(key)}
            onViewChannels={() => handleViewChannels(key)}
            onWatchChannel={handleWatchChannel}
            showChannels={showChannels === key}
          />
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSubscribe}
          disabled={!selectedPlan}
          className={`flex-1 py-2 rounded-md transition ${
            selectedPlan
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          Confirm Change
        </button>
        {subscription?.subscribed && (
          <button
            onClick={() => {
              setIsChanging(false);
              setShowChannels(null);
            }}
            className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>

      <ChannelList
        channels={selectedChannels}
        isOpen={isChannelListOpen}
        onClose={() => setIsChannelListOpen(false)}
      />
    </div>
  );
}