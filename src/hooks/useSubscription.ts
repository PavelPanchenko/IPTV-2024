import { useState, useEffect } from 'react';
import { subscriptionPlans } from '../data/plans';

export interface CurrentSubscription {
  subscribed: boolean;
  plan?: typeof subscriptionPlans.basic;
  endDate?: string;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<CurrentSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      // Mock data loading
      setSubscription({
        subscribed: true,
        plan: subscriptionPlans.basic,
        endDate: '2024-12-31'
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribe = async (plan: keyof typeof subscriptionPlans, duration: 'monthly' | 'quarterly' | 'yearly') => {
    try {
      setError(null);
      // Mock subscription update
      setSubscription({
        subscribed: true,
        plan: subscriptionPlans[plan],
        endDate: '2024-12-31'
      });
      return { endDate: '2024-12-31' };
    } catch (err: any) {
      setError('Failed to update subscription');
      throw err;
    }
  };

  return {
    subscription,
    isLoading,
    error,
    subscribe,
    refresh: loadSubscriptionData
  };
}