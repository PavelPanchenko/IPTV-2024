import axios from 'axios';
import type { User } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

export const userApi = {
  async getCurrentUser(): Promise<User> {
    const { data } = await axios.get(`${API_URL}/users/me`);
    return data;
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const { data } = await axios.patch(`${API_URL}/users/me`, updates);
    return data;
  },

  async addBalance(amount: number): Promise<User> {
    const { data } = await axios.post(`${API_URL}/users/balance`, { amount });
    return data;
  },

  async getReferralCode(): Promise<string> {
    const { data } = await axios.get(`${API_URL}/users/referral-code`);
    return data.referral_code;
  }
};