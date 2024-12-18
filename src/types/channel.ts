export interface Channel {
  id: number;
  name: string;
  category: string;
  quality: 'HD' | '4K' | 'SD';
  url: string;
  subscription_level?: string;
}