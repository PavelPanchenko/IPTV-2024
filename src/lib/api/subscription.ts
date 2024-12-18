import axios from 'axios';
import type { User } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

export const subscriptionApi = {
  async updateSubscription(plan: string, duration: string): Promise<User> {
    const { data } = await axios.post(`${API_URL}/subscriptions`, { plan, duration });
    return data;
  },

  async getCurrentSubscription(): Promise<User> {
    const { data } = await axios.get(`${API_URL}/subscriptions/current`);
    return data;
  }
};