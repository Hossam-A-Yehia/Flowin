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

export interface Auth2FAResponse {
  requires2FA: boolean;
  email: string;
  method: 'email' | 'sms' | null;
  message: string;
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

export interface Get2FAStatusResponse {
  enabled: boolean;
  method: 'email' | 'sms' | null;
  backupCodesCount: number;
}

export interface Enable2FAData {
  method: 'email' | 'sms';
  password: string;
}

export interface Enable2FAResponse {
  message: string;
  backupCodes: string[];
}

export interface Disable2FAData {
  password: string;
}

export interface RegenerateBackupCodesResponse {
  message: string;
  backupCodes: string[]; 
}

// API Key types
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  lastUsed: string | null;
  createdAt: string;
  expiresAt: string | null;
}

export interface CreateApiKeyData {
  name: string;
}

export interface CreateApiKeyResponse {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  createdAt: string;
  expiresAt: string | null;
}

export interface ToggleApiKeyResponse {
  id: string;
  name: string;
  isActive: boolean;
  message: string;
}
