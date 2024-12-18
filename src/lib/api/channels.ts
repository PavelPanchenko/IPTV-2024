import axios from 'axios';
import type { Channel } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

export const channelsApi = {
  async getChannels(): Promise<Channel[]> {
    const { data } = await axios.get(`${API_URL}/channels`);
    return data;
  },

  async getChannel(id: number): Promise<Channel> {
    const { data } = await axios.get(`${API_URL}/channels/${id}`);
    return data;
  },

  async getWatchlist(): Promise<Channel[]> {
    const { data } = await axios.get(`${API_URL}/channels/watchlist`);
    return data;
  },

  async addToWatchlist(channelId: number): Promise<void> {
    await axios.post(`${API_URL}/channels/watchlist/${channelId}`);
  },

  async removeFromWatchlist(channelId: number): Promise<void> {
    await axios.delete(`${API_URL}/channels/watchlist/${channelId}`);
  },

  async getHistory(): Promise<Channel[]> {
    const { data } = await axios.get(`${API_URL}/channels/history`);
    return data;
  },

  async recordHistory(channelId: number): Promise<void> {
    await axios.post(`${API_URL}/channels/history/${channelId}`);
  }
};