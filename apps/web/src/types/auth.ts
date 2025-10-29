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

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
