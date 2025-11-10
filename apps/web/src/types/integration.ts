export type AuthType = "OAUTH2" | "API_KEY" | "WEBHOOK" | "BASIC_AUTH";

export interface Integration {
  id: string;
  name: string;
  displayName: string;
  category: string;
  authType: AuthType;
  isActive: boolean;
  description?: string;
  iconUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserIntegration {
  id: string;
  userId: string;
  integrationId: string;
  integration: Integration;
  credentials: Record<string, any>;
  isConnected: boolean;
  lastSync?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectIntegrationData {
  integrationId: string;
  credentials: Record<string, any>;
}

export interface UpdateIntegrationData {
  credentials?: Record<string, any>;
  isConnected?: boolean;
}
