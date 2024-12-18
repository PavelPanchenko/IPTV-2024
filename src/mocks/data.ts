import { Channel, SubscriptionPlan, User } from '../types';

export const mockUser: User = {
  id: 1,
  email: "demo@example.com",
  username: "demo",
  subscriptionPlan: "premium",
  subscriptionEndDate: "2024-12-31",
  balance: 50.00
};

export const mockChannels: Channel[] = [
  { id: 1, name: "News 24/7", category: "News", quality: "HD", url: "https://example.com/stream1", subscription_level: "free" },
  { id: 2, name: "Sports Plus", category: "Sports", quality: "4K", url: "https://example.com/stream2", subscription_level: "premium" },
  { id: 3, name: "Movie Central", category: "Movies", quality: "4K", url: "https://example.com/stream3", subscription_level: "premium" },
  { id: 4, name: "Kids Zone", category: "Kids", quality: "HD", url: "https://example.com/stream4", subscription_level: "free" },
  { id: 5, name: "Documentary World", category: "Documentary", quality: "4K", url: "https://example.com/stream5", subscription_level: "ultimate" }
];

export const mockSubscriptionPlans: Record<string, SubscriptionPlan> = {
  essential: {
    name: "Essential",
    monthlyPrice: 7.99,
    quarterlyPrice: 19.99,
    yearlyPrice: 79.99,
    features: [
      "100+ Basic Channels",
      "HD Quality",
      "Watch on 2 Devices",
      "7-Day Replay",
      "24/7 Support"
    ]
  },
  premium: {
    name: "Premium",
    monthlyPrice: 14.99,
    quarterlyPrice: 39.99,
    yearlyPrice: 149.99,
    features: [
      "250+ Premium Channels",
      "4K Ultra HD Quality",
      "Watch on 4 Devices",
      "30-Day Replay",
      "Premium Sports Channels",
      "No Ads"
    ]
  },
  ultimate: {
    name: "Ultimate",
    monthlyPrice: 24.99,
    quarterlyPrice: 64.99,
    yearlyPrice: 239.99,
    features: [
      "400+ Premium Channels",
      "4K Ultra HD Quality",
      "Watch on 6 Devices",
      "90-Day Replay",
      "All Sports Packages",
      "Premium Movie Channels",
      "Exclusive Content"
    ]
  }
};