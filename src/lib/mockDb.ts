import { User, Video } from './types';
import { hash } from 'bcryptjs-react';

interface DB {
  users: User[];
  videos: Video[];
}

export const db: DB = {
  users: [],
  videos: [
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
      duration: '15:24',
      category: 'programming',
      userId: '1'
    },
    // ... existing videos
  ]
};

// Initialize with a test user
hash('password123', 10).then(hashedPassword => {
  db.users.push({
    id: '1',
    email: 'test@example.com',
    username: 'testuser',
    password: hashedPassword,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop',
    createdAt: new Date()
  });
});