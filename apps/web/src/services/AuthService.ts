import { apiRequest } from "./apiClient";
import { RegisterFormData, LoginFormData, AuthResponse } from "@/types/auth";

// Auth token management utilities
export const authTokens = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  },

  set: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  },

  remove: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  },

  isValid: (): boolean => {
    return !!authTokens.get();
  },
};

// User data management utilities
export const userData = {
  get: (): AuthResponse["user"] | null => {
    if (typeof window === "undefined") return null;
    try {
      const data = localStorage.getItem("auth_user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  set: (user: AuthResponse["user"]): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_user", JSON.stringify(user));
    }
  },

  remove: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user");
    }
  },
};

// Pure API functions (no side effects)
export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    return apiRequest.post<AuthResponse>("/auth/register", data);
  },

  /**
   * Login user
   */
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    return apiRequest.post<AuthResponse>("/auth/login", data);
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<AuthResponse["user"]> => {
    return apiRequest.get<AuthResponse["user"]>("/auth/me");
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiRequest.post<void>("/auth/logout");
    } catch (error) {
      console.log(error);
    }
  },
};
