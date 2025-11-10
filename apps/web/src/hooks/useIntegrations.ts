import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { integrationApi } from "@/services/IntegrationService";
import {
  Integration,
  UserIntegration,
  ConnectIntegrationData,
  UpdateIntegrationData,
} from "@/types/integration";
import { toast } from "sonner";
import i18n from "@/il8n";

// Query keys for cache management
export const integrationKeys = {
  all: ["integrations"] as const,
  lists: () => [...integrationKeys.all, "list"] as const,
  userIntegrations: () => [...integrationKeys.all, "user"] as const,
};

/**
 * Hook to fetch all available integrations
 */
export function useIntegrations() {
  return useQuery({
    queryKey: integrationKeys.lists(),
    queryFn: integrationApi.getIntegrations,
    staleTime: 300000, // 5 minutes - integrations don't change often
    gcTime: 600000, // 10 minutes
  });
}

/**
 * Hook to fetch user's connected integrations
 */
export function useUserIntegrations() {
  return useQuery({
    queryKey: integrationKeys.userIntegrations(),
    queryFn: integrationApi.getUserIntegrations,
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
  });
}

/**
 * Hook to connect a new integration
 */
export function useConnectIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ConnectIntegrationData) =>
      integrationApi.connectIntegration(data),
    onSuccess: (newIntegration) => {
      // Invalidate user integrations to refetch
      queryClient.invalidateQueries({
        queryKey: integrationKeys.userIntegrations(),
      });

      // Optimistically add to cache
      queryClient.setQueryData<UserIntegration[]>(
        integrationKeys.userIntegrations(),
        (old) => {
          return old ? [...old, newIntegration] : [newIntegration];
        }
      );

      toast.success(
        i18n.t("integrations.toast.connectSuccess") ||
          "Integration connected successfully"
      );
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          i18n.t("integrations.toast.connectError") ||
          "Failed to connect integration"
      );
    },
  });
}

/**
 * Hook to update integration
 */
export function useUpdateIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateIntegrationData }) =>
      integrationApi.updateIntegration(id, data),
    onSuccess: (updatedIntegration) => {
      // Update in cache
      queryClient.setQueryData<UserIntegration[]>(
        integrationKeys.userIntegrations(),
        (old) => {
          return old
            ? old.map((integration) =>
                integration.id === updatedIntegration.id
                  ? updatedIntegration
                  : integration
              )
            : [updatedIntegration];
        }
      );

      toast.success(
        i18n.t("integrations.toast.updateSuccess") ||
          "Integration updated successfully"
      );
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          i18n.t("integrations.toast.updateError") ||
          "Failed to update integration"
      );
    },
  });
}

/**
 * Hook to disconnect integration
 */
export function useDisconnectIntegration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => integrationApi.disconnectIntegration(id),
    onSuccess: (_, disconnectedId) => {
      // Remove from cache
      queryClient.setQueryData<UserIntegration[]>(
        integrationKeys.userIntegrations(),
        (old) => {
          return old
            ? old.filter((integration) => integration.id !== disconnectedId)
            : [];
        }
      );

      toast.success(
        i18n.t("integrations.toast.disconnectSuccess") ||
          "Integration disconnected successfully"
      );
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          i18n.t("integrations.toast.disconnectError") ||
          "Failed to disconnect integration"
      );
    },
  });
}

/**
 * Hook to test integration connection
 */
export function useTestIntegration() {
  return useMutation({
    mutationFn: (id: string) => integrationApi.testIntegration(id),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(
          result.message ||
            i18n.t("integrations.toast.testSuccess") ||
            "Connection test successful"
        );
      } else {
        toast.error(
          result.message ||
            i18n.t("integrations.toast.testError") ||
            "Connection test failed"
        );
      }
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          i18n.t("integrations.toast.testError") ||
          "Failed to test connection"
      );
    },
  });
}
