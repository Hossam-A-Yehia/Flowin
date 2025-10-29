import axios, { AxiosResponse } from 'axios';
import { ApiError } from '@/types/auth';

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear token and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API errors consistently
export const handleApiError = (error: any, defaultMessage: string): ApiError => {
  return {
    message: error.response?.data?.message || defaultMessage,
    statusCode: error.response?.status || 500,
    error: error.response?.data?.error,
  };
};

// Generic API request wrapper with error handling
export const apiRequest = {
  get: async <T>(url: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.get(url);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error, 'Request failed');
    }
  },

  post: async <T, D = any>(url: string, data?: D): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.post(url, data);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error, 'Request failed');
    }
  },

  put: async <T, D = any>(url: string, data?: D): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.put(url, data);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error, 'Request failed');
    }
  },

  patch: async <T, D = any>(url: string, data?: D): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.patch(url, data);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error, 'Request failed');
    }
  },

  delete: async <T>(url: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await apiClient.delete(url);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error, 'Request failed');
    }
  },
};
