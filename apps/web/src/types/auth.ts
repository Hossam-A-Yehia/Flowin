export interface RegisterFormData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  plan: string;
  image?: string;
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ValidateResetTokenResponse {
  valid: boolean;
  email: string;
  expiresAt: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
