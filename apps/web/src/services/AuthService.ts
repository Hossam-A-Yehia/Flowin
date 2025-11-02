import { apiRequest } from "./apiClient";
import { 
  RegisterFormData, 
  LoginFormData, 
  AuthResponse,
  Auth2FAResponse,
  RegisterResponse,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ValidateResetTokenResponse,
  SendEmailVerificationData,
  VerifyEmailData,
  SendPhoneVerificationData,
  VerifyPhoneData,
  ResendVerificationData,
  VerificationStatusResponse,
  Get2FAStatusResponse,
  Enable2FAData,
  Enable2FAResponse,
  Disable2FAData,
  RegenerateBackupCodesResponse,
  ApiKey,
  CreateApiKeyData,
  CreateApiKeyResponse,
  ToggleApiKeyResponse
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
  register: async (data: RegisterFormData): Promise<RegisterResponse> => {
    return apiRequest.post<RegisterResponse>("/auth/register", data);
  },

  /**
   * Login user
   */
  login: async (data: LoginFormData): Promise<AuthResponse | Auth2FAResponse> => {
    return apiRequest.post<AuthResponse | Auth2FAResponse>("/auth/login", data);
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

  /**
   * Send email verification link
   */
  sendEmailVerification: async (data: SendEmailVerificationData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/verify/email/send", data);
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (data: VerifyEmailData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/verify/email/confirm", data);
  },

  /**
   * Send phone verification code
   */
  sendPhoneVerification: async (data: SendPhoneVerificationData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/verify/phone/send", data);
  },

  /**
   * Verify phone with code
   */
  verifyPhone: async (data: VerifyPhoneData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/verify/phone/confirm", data);
  },

  /**
   * Add phone and send verification (authenticated)
   */
  addPhoneAndSendVerification: async (data: SendPhoneVerificationData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/verify/phone/add-and-send", data);
  },

  /**
   * Verify own phone number (authenticated)
   */
  verifyMyPhone: async (data: VerifyPhoneData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/verify/phone/verify-mine", data);
  },

  /**
   * Resend verification (email or phone)
   */
  resendVerification: async (data: ResendVerificationData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/verify/resend", data);
  },

  /**
   * Get verification status
   */
  getVerificationStatus: async (): Promise<VerificationStatusResponse> => {
    return apiRequest.get<VerificationStatusResponse>("/auth/verify/status");
  },

  /**
   * Get 2FA status
   */
  get2FAStatus: async (): Promise<Get2FAStatusResponse> => {
    return apiRequest.get<Get2FAStatusResponse>("/auth/2fa/status");
  },

  /**
   * Enable 2FA
   */
  enable2FA: async (data: Enable2FAData): Promise<Enable2FAResponse> => {
    return apiRequest.post<Enable2FAResponse>("/auth/2fa/enable", data);
  },

  /**
   * Disable 2FA
   */
  disable2FA: async (data: Disable2FAData): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/2fa/disable", data);
  },

  /**
   * Regenerate 2FA backup codes
   */
  regenerateBackupCodes: async (): Promise<RegenerateBackupCodesResponse> => {
    return apiRequest.post<RegenerateBackupCodesResponse>("/auth/2fa/regenerate-backup-codes");
  },

  /**
   * Get all API keys
   */
  getApiKeys: async (): Promise<ApiKey[]> => {
    return apiRequest.get<ApiKey[]>("/auth/api-keys");
  },

  /**
   * Create new API key
   */
  createApiKey: async (data: CreateApiKeyData): Promise<CreateApiKeyResponse> => {
    return apiRequest.post<CreateApiKeyResponse>("/auth/api-keys", data);
  },

  /**
   * Delete API key
   */
  deleteApiKey: async (id: string): Promise<{ message: string }> => {
    return apiRequest.delete<{ message: string }>(`/auth/api-keys/${id}`);
  },

  /**
   * Toggle API key status
   */
  toggleApiKey: async (id: string): Promise<ToggleApiKeyResponse> => {
    return apiRequest.post<ToggleApiKeyResponse>(`/auth/api-keys/${id}/toggle`);
  },

  /**
   * Delete user account
   */
  deleteAccount: async (): Promise<{ message: string }> => {
    return apiRequest.post<{ message: string }>("/auth/delete-account");
  },

  /**
   * Send 2FA code (for login flow)
   */
  send2FACode: async (email: string): Promise<{ message: string; method: string }> => {
    return apiRequest.post<{ message: string; method: string }>("/auth/2fa/send-code", { email });
  },

  /**
   * Verify 2FA code (for login flow)
   */
  verify2FA: async (data: { email: string; code: string }): Promise<AuthResponse> => {
    return apiRequest.post<AuthResponse>("/auth/2fa/verify", data);
  },
};
