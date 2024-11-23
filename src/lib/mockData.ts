import { formatDistanceToNow } from 'date-fns';

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  channel: {
    name: string;
    avatarUrl: string;
    verified: boolean;
  };
  views: number;
  uploadedAt: Date;
  duration: string;
}

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Building a Modern Web Application from Scratch',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1280&h=720&fit=crop',
    channel: {
      name: 'TechMaster',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop',
      verified: true
    },
    views: 254000,
    uploadedAt: new Date('2024-02-15'),
    duration: '15:24'
  },
  {
    id: '2',
    title: 'Learn React in 2024 - Full Course',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1280&h=720&fit=crop',
    channel: {
      name: 'CodePro',
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop',
      verified: true
    },
    views: 487000,
    uploadedAt: new Date('2024-03-01'),
    duration: '2:45:12'
  },
  {
    id: '3',
    title: '10 JavaScript Tips You Need to Know',
    thumbnailUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1280&h=720&fit=crop',
    channel: {
      name: 'DevTips',
      avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=64&h=64&fit=crop',
      verified: false
    },
    views: 128000,
    uploadedAt: new Date('2024-03-10'),
    duration: '8:15'
  }
];

export const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

export const formatUploadDate = (date: Date): string => {
  return formatDistanceToNow(date, { addSuffix: true });
};