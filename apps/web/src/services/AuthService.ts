import { apiRequest } from "./apiClient";
import { 
  RegisterFormData, 
  LoginFormData, 
  AuthResponse, 
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ValidateResetTokenResponse 
} from "@/types/auth";
import { authCookies } from "@/utils/cookies";
import Cookies from 'js-cookie';

// Auth token management utilities
export const authTokens = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    return authCookies.getToken() || null;
  },

  set: (token: string): void => {
    if (typeof window !== "undefined") {
      authCookies.setToken(token);
    }
  },

  remove: (): void => {
    if (typeof window !== "undefined") {
      authCookies.clear();
      Cookies.remove("auth_user", { path: "/" });
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
      const data = Cookies.get("auth_user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  set: (user: AuthResponse["user"]): void => {
    if (typeof window !== "undefined") {
      Cookies.set("auth_user", JSON.stringify(user), {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
    }
  },

  remove: (): void => {
    if (typeof window !== "undefined") {
      Cookies.remove("auth_user", { path: "/" });
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

  /**
   * Request password reset email
   */
  forgotPassword: async (data: ForgotPasswordFormData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/forgot-password", data);
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordFormData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/reset-password", {
      token: data.token,
      newPassword: data.newPassword,
    });
  },

  /**
   * Validate password reset token
   */
  validateResetToken: async (token: string): Promise<ValidateResetTokenResponse> => {
    return apiRequest.get<ValidateResetTokenResponse>(`/auth/validate-reset-token?token=${token}`);
  },
};
