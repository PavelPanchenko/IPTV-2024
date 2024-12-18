// Basic channels available in the Базовый package
export const basicChannels = [
  {
    id: 1,
    name: 'Первый канал',
    category: 'General',
    quality: 'HD' as const,
    url: 'https://edge1.1internet.tv/dash-live2/streams/1tv-dvr/1tvdash.mpd',
    subscription_level: 'basic'
  },
  {
    id: 2,
    name: 'Россия 1',
    category: 'General',
    quality: 'HD' as const,
    url: 'https://edge2.1internet.tv/dash-live2/streams/russia1/russia1dash.mpd',
    subscription_level: 'basic'
  },
  {
    id: 3,
    name: 'НТВ',
    category: 'General',
    quality: 'HD' as const,
    url: 'https://edge3.1internet.tv/dash-live2/streams/ntv-dvr/ntvdash.mpd',
    subscription_level: 'basic'
  }
];

// Adult channels available in the Взрослый 18+ package
export const adultChannels = [
  ...basicChannels,
  {
    id: 4,
    name: 'Русская ночь',
    category: 'Adult',
    quality: 'HD' as const,
    url: 'https://edge4.1internet.tv/dash-live2/streams/rn/rndash.mpd',
    subscription_level: 'adult'
  },
  {
    id: 5,
    name: 'Playboy TV',
    category: 'Adult',
    quality: '4K' as const,
    url: 'https://edge5.1internet.tv/dash-live2/streams/playboy/playboydash.mpd',
    subscription_level: 'adult'
  }
];

// Sports channels available in the Спортивный package
export const sportChannels = [
  ...basicChannels,
  {
    id: 6,
    name: 'Матч ТВ',
    category: 'Sports',
    quality: '4K' as const,
    url: 'https://edge6.1internet.tv/dash-live2/streams/match/matchdash.mpd',
    subscription_level: 'sport'
  },
  {
    id: 7,
    name: 'Матч Премьер',
    category: 'Sports',
    quality: '4K' as const,
    url: 'https://edge7.1internet.tv/dash-live2/streams/matchpremier/matchpremierdash.mpd',
    subscription_level: 'sport'
  },
  {
    id: 8,
    name: 'Матч Футбол 1',
    category: 'Sports',
    quality: 'HD' as const,
    url: 'https://edge8.1internet.tv/dash-live2/streams/matchfootball1/matchfootball1dash.mpd',
    subscription_level: 'sport'
  }
];

// VIP channels available in the VIP ALL package
export const vipChannels = [
  ...basicChannels,
  ...adultChannels.filter(ch => !basicChannels.find(b => b.id === ch.id)),
  ...sportChannels.filter(ch => !basicChannels.find(b => b.id === ch.id)),
  {
    id: 9,
    name: 'Кинопремьера',
    category: 'Movies',
    quality: '4K' as const,
    url: 'https://edge9.1internet.tv/dash-live2/streams/kinopremiere/kinopremiere.mpd',
    subscription_level: 'vip'
  },
  {
    id: 10,
    name: 'Amedia Premium',
    category: 'Series',
    quality: '4K' as const,
    url: 'https://edge10.1internet.tv/dash-live2/streams/amedia/amediadash.mpd',
    subscription_level: 'vip'
  },
  {
    id: 11,
    name: 'Discovery Channel',
    category: 'Documentary',
    quality: '4K' as const,
    url: 'https://edge11.1internet.tv/dash-live2/streams/discovery/discoverydash.mpd',
    subscription_level: 'vip'
  }
];

export const categories = [
  'All',
  'General',
  'Sports',
  'Movies',
  'Series',
  'Adult',
  'Documentary'
] as const;

export type Category = typeof categories[number];

export interface Channel {
  id: number;
  name: string;
  category: string;
  quality: 'HD' | '4K';
  url: string;
  subscription_level: string;
}