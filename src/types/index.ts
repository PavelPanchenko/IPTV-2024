export interface User {
  id: number;
  email: string;
  username: string;
  subscriptionPlan: string;
  subscriptionEndDate: string | null;
  balance: number;
  referralCode: string;
  referredBy?: string;
  referralEarnings: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  referralCode?: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Channel {
  id: number;
  name: string;
  category: string;
  quality: 'HD' | '4K' | 'SD';
  url: string;
  subscription_level: string;
}

export interface SubscriptionPlan {
  name: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  yearlyPrice: number;
  features: string[];
}

export interface CurrentSubscription {
  subscribed: boolean;
  plan?: SubscriptionPlan;
  endDate?: string;
}