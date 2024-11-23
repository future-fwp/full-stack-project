export interface User {
  id: string;
  email: string;
  username: string;
  password?: string;
  avatarUrl?: string;
  createdAt: Date;
}

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
  category: string;
  userId: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}