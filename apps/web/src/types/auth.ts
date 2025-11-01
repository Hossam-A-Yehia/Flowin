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

export interface RegisterResponse {
  message: string;
  email: string;
  requiresVerification: boolean;
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

// Verification types
export interface SendEmailVerificationData {
  email: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface SendPhoneVerificationData {
  phone: string;
}

export interface VerifyPhoneData {
  phone: string;
  code: string;
}

export interface ResendVerificationData {
  type: 'email' | 'phone';
  contact?: string;
}

export interface VerificationStatusResponse {
  email: {
    verified: boolean;
    verifiedAt: string | null;
  };
  phone: {
    number: string | null;
    verified: boolean;
    verifiedAt: string | null;
  };
}
