import { compare, hash } from "bcryptjs-react";
import { jwtDecode } from "jwt-decode";
import { db } from "./mockDb";
import axios from 'axios';
import type { ApiResponse, LoginCredentials, RegisterData, User, Video, AuthResponse } from "./types";

const API_URL = 'http://localhost:4000/api/auth';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  async getUsers(): Promise<ApiResponse<{ users: User[] }>> {
    try {
      const response = await axiosInstance.get('/login');
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch users');
      }
      throw error;
    }
  },

  async login({ email, password }: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosInstance.post('/login', { email, password });
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to login');
      }
      throw error;
    }
  },

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosInstance.post('/signup', data);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to register');
      }
      throw error;
    }
  },

  setAuthToken(token: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  clearAuthToken() {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const JWT_SECRET = "your-secret-key"; // In production, use environment variables

const generateToken = (userId: string): string => {
	// Simple JWT mock - in production use a proper JWT library
	return btoa(JSON.stringify({ userId, exp: Date.now() + 24 * 60 * 60 * 1000 }));
};

// Mock API for development
export const api = {
	async login({ email, password }: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
		await delay(500);

		const user = db.users.find((u) => u.email === email);
		if (!user) {
			throw new Error("Invalid credentials");
		}

		const isValid = await compare(password, user.password);
		if (!isValid) {
			throw new Error("Invalid credentials");
		}

		const token = generateToken(user.id);
		const { password: _, ...userWithoutPassword } = user;

		return {
			status: 200,
			data: {
				user: userWithoutPassword,
				token,
			},
		};
	},

	async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
		await delay(500);

		if (db.users.some((u) => u.email === data.email)) {
			throw new Error("Email already exists");
		}

		const hashedPassword = await hash(data.password, 10);
		const newUser: User = {
			id: (db.users.length + 1).toString(),
			email: data.email,
			username: data.username,
			password: hashedPassword,
			createdAt: new Date(),
		};

		db.users.push(newUser);
		const token = generateToken(newUser.id);
		const { password: _, ...userWithoutPassword } = newUser;

		return {
			status: 201,
			data: {
				user: userWithoutPassword,
				token,
			},
		};
	},

	async getVideos(page = 1, limit = 12): Promise<ApiResponse<{ videos: Video[]; total: number }>> {
		await delay(800);
		const start = (page - 1) * limit;
		const end = start + limit;
		const videos = db.videos.slice(start, end);

		return {
			status: 200,
			data: {
				videos,
				total: db.videos.length,
			},
		};
	},

	async getVideosByCategory(category: string): Promise<ApiResponse<Video[]>> {
		await delay(800);
		const videos = db.videos.filter((video) => video.category === category);
		return { data: videos, status: 200 };
	},
};
