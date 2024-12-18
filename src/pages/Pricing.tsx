import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { subscriptionPlans } from '../data/plans';
import { formatPrice } from '../utils';
import { Check, List } from 'lucide-react';
import ChannelList from '../components/ChannelList';
import { basicChannels, adultChannels, sportChannels, vipChannels } from '../data/channels';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [selectedChannels, setSelectedChannels] = useState(basicChannels);
  const [isChannelListOpen, setIsChannelListOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getPrice = (plan: typeof subscriptionPlans.basic) => {
    switch (billingCycle) {
      case 'monthly':
        return plan.monthlyPrice;
      case 'quarterly':
        return plan.quarterlyPrice;
      case 'yearly':
        return plan.yearlyPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  const handlePlanSelect = (planKey: keyof typeof subscriptionPlans) => {
    if (!user) {
      sessionStorage.setItem('selectedPlan', JSON.stringify({
        name: subscriptionPlans[planKey].name,
        billingCycle
      }));
      navigate('/login', { state: { from: '/pricing' } });
    } else {
      navigate('/dashboard', { 
        state: { 
          selectedPlan: {
            name: subscriptionPlans[planKey].name,
            billingCycle
          }
        }
      });
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

  const showChannels = (planKey: keyof typeof subscriptionPlans) => {
    setSelectedChannels(getChannelsForPlan(planKey));
    setIsChannelListOpen(true);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Choose Your Plan</h2>
          <p className="mt-3 text-xl text-gray-300">
            Select the perfect plan for your entertainment needs
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative bg-gray-800 rounded-lg p-1 flex">
            {['monthly', 'quarterly', 'yearly'].map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle as 'monthly' | 'quarterly' | 'yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  billingCycle === cycle
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-4">
          {Object.entries(subscriptionPlans).map(([key, plan]) => (
            <div
              key={key}
              className="relative bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-300">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-5xl font-bold text-white">{formatPrice(getPrice(plan))}</span>
                  <span className="text-gray-300">/{billingCycle}</span>
                </p>
                <button 
                  onClick={() => handlePlanSelect(key as keyof typeof subscriptionPlans)}
                  className="mt-8 w-full bg-emerald-500 text-white rounded-lg py-3 px-6 hover:bg-emerald-600 transition"
                >
                  Get Started
                </button>
              </div>
              <div className="px-8 pb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-500 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => showChannels(key as keyof typeof subscriptionPlans)}
                      className="flex items-center text-emerald-500 hover:text-emerald-400 transition"
                    >
                      <List className="h-5 w-5 mr-3" />
                      <span>View Channel List</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChannelList
        channels={selectedChannels}
        isOpen={isChannelListOpen}
        onClose={() => setIsChannelListOpen(false)}
      />
    </div>
  );
}