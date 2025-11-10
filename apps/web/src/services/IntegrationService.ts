import { apiRequest } from "./apiClient";
import {
  Integration,
  UserIntegration,
  ConnectIntegrationData,
  UpdateIntegrationData,
} from "@/types/integration";

export const integrationApi = {
  /**
   * Get all available integrations
   */
  getIntegrations: async (): Promise<Integration[]> => {
    return apiRequest.get<Integration[]>("/integrations");
  },

  /**
   * Get user's connected integrations
   */
  getUserIntegrations: async (): Promise<UserIntegration[]> => {
    return apiRequest.get<UserIntegration[]>("/integrations/user");
  },

  /**
   * Connect a new integration
   */
  connectIntegration: async (
    data: ConnectIntegrationData
  ): Promise<UserIntegration> => {
    return apiRequest.post<UserIntegration>("/integrations/connect", data);
  },

  /**
   * Update integration credentials
   */
  updateIntegration: async (
    id: string,
    data: UpdateIntegrationData
  ): Promise<UserIntegration> => {
    return apiRequest.put<UserIntegration>(`/integrations/${id}`, data);
  },

  /**
   * Disconnect an integration
   */
  disconnectIntegration: async (id: string): Promise<{ message: string }> => {
    return apiRequest.delete<{ message: string }>(`/integrations/${id}`);
  },

  /**
   * Test integration connection
   */
  testIntegration: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    return apiRequest.post<{ success: boolean; message: string }>(
      `/integrations/${id}/test`
    );
  },
};
