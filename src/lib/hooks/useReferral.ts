import { useState } from 'react';
import { userApi } from '@/lib/api/user';

export function useReferral() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReferralLink = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const code = await userApi.getReferralCode();
      return `${window.location.origin}/register?ref=${code}`;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateReferralLink,
    isLoading,
    error
  };
}