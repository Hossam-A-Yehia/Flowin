import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { flowApi } from "@/services/FlowService";
import {
  Flow,
  FlowWithNodes,
  CreateFlowData,
  UpdateFlowData,
  ExecuteFlowData,
  FlowExecution,
} from "@/types/flow";
import { toast } from "sonner";
import i18n from "@/il8n";

// Query keys for cache management
export const flowKeys = {
  all: ["flows"] as const,
  lists: () => [...flowKeys.all, "list"] as const,
  list: (filters?: any) => [...flowKeys.lists(), filters] as const,
  details: () => [...flowKeys.all, "detail"] as const,
  detail: (id: string) => [...flowKeys.details(), id] as const,
  executions: (id: string) => [...flowKeys.detail(id), "executions"] as const,
  execution: (executionId: string) => ["execution", executionId] as const,
};

/**
 * Hook to fetch all flows
 */
export function useFlows() {
  return useQuery({
    queryKey: flowKeys.lists(),
    queryFn: flowApi.getFlows,
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes (formerly cacheTime)
  });
}

/**
 * Hook to fetch a single flow by ID
 */
export function useFlow(id: string, enabled = true) {
  return useQuery({
    queryKey: flowKeys.detail(id),
    queryFn: () => flowApi.getFlow(id),
    enabled: enabled && !!id,
    staleTime: 30000,
    gcTime: 300000,
  });
}

/**
 * Hook to fetch flow executions
 */
export function useFlowExecutions(id: string, limit?: number) {
  return useQuery({
    queryKey: [...flowKeys.executions(id), limit],
    queryFn: () => flowApi.getFlowExecutions(id, limit),
    enabled: !!id,
    staleTime: 10000, // 10 seconds - more frequent updates for executions
    gcTime: 60000, // 1 minute
  });
}

/**
 * Hook to fetch a single execution
 */
export function useExecution(executionId: string, enabled = true) {
  return useQuery({
    queryKey: flowKeys.execution(executionId),
    queryFn: () => flowApi.getExecution(executionId),
    enabled: enabled && !!executionId,
    staleTime: 5000, // 5 seconds
    refetchInterval: (query) => {
      const data = query.state.data as FlowExecution | undefined;
      // Auto-refresh if execution is pending or running
      if (data?.status === "pending" || data?.status === "running") {
        return 2000; // 2 seconds
      }
      return false;
    },
  });
}

/**
 * Hook to create a new flow
 */
export function useCreateFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFlowData) => flowApi.createFlow(data),
    onSuccess: (newFlow) => {
      // Invalidate flows list to refetch
      queryClient.invalidateQueries({ queryKey: flowKeys.lists() });
      
      // Optimistically add to cache
      queryClient.setQueryData<Flow[]>(flowKeys.lists(), (old) => {
        return old ? [newFlow, ...old] : [newFlow];
      });

      toast.success(i18n.t('flows.toast.createSuccess') || "Flow created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || i18n.t('flows.toast.createError') || "Failed to create flow");
    },
  });
}

/**
 * Hook to update a flow
 */
export function useUpdateFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFlowData }) =>
      flowApi.updateFlow(id, data),
    onSuccess: (updatedFlow, variables) => {
      // Update the specific flow in cache
      queryClient.setQueryData<FlowWithNodes>(
        flowKeys.detail(variables.id),
        (old) => {
          return old ? { ...old, ...updatedFlow } : updatedFlow as any;
        }
      );

      // Update in the list
      queryClient.setQueryData<Flow[]>(flowKeys.lists(), (old) => {
        return old
          ? old.map((flow) =>
              flow.id === variables.id ? { ...flow, ...updatedFlow } : flow
            )
          : [updatedFlow];
      });

      toast.success(i18n.t('flows.toast.updateSuccess') || "Flow updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || i18n.t('flows.toast.updateError') || "Failed to update flow");
    },
  });
}

/**
 * Hook to delete a flow
 */
export function useDeleteFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => flowApi.deleteFlow(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.setQueryData<Flow[]>(flowKeys.lists(), (old) => {
        return old ? old.filter((flow) => flow.id !== deletedId) : [];
      });

      // Remove detail cache
      queryClient.removeQueries({ queryKey: flowKeys.detail(deletedId) });

      toast.success(i18n.t('flows.toast.deleteSuccess') || "Flow deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || i18n.t('flows.toast.deleteError') || "Failed to delete flow");
    },
  });
}

/**
 * Hook to activate a flow
 */
export function useActivateFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => flowApi.activateFlow(id),
    onSuccess: (updatedFlow, id) => {
      // Update cache
      queryClient.setQueryData<FlowWithNodes>(flowKeys.detail(id), (old) => {
        return old ? { ...old, ...updatedFlow } : updatedFlow as any;
      });

      queryClient.setQueryData<Flow[]>(flowKeys.lists(), (old) => {
        return old
          ? old.map((flow) =>
              flow.id === id ? { ...flow, ...updatedFlow } : flow
            )
          : [updatedFlow];
      });

      toast.success(i18n.t('flows.toast.toggleActiveSuccess') || "Flow activated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || i18n.t('flows.toast.toggleError') || "Failed to activate flow");
    },
  });
}

/**
 * Hook to deactivate a flow
 */
export function useDeactivateFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => flowApi.deactivateFlow(id),
    onSuccess: (updatedFlow, id) => {
      // Update cache
      queryClient.setQueryData<FlowWithNodes>(flowKeys.detail(id), (old) => {
        return old ? { ...old, ...updatedFlow } : updatedFlow as any;
      });

      queryClient.setQueryData<Flow[]>(flowKeys.lists(), (old) => {
        return old
          ? old.map((flow) =>
              flow.id === id ? { ...flow, ...updatedFlow } : flow
            )
          : [updatedFlow];
      });

      toast.success(i18n.t('flows.toast.togglePausedSuccess') || "Flow deactivated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || i18n.t('flows.toast.toggleError') || "Failed to deactivate flow");
    },
  });
}

/**
 * Hook to duplicate a flow
 */
export function useDuplicateFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, newName }: { id: string; newName?: string }) =>
      flowApi.duplicateFlow(id, newName),
    onSuccess: (newFlow) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: flowKeys.lists() });

      toast.success(i18n.t('flows.toast.duplicateSuccess') || "Flow duplicated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || i18n.t('flows.toast.duplicateError') || "Failed to duplicate flow");
    },
  });
}

export function useExecuteFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: ExecuteFlowData }) =>
      flowApi.executeFlow(id, data),
    onSuccess: (_, variables) => {
      // Invalidate executions to refetch
      queryClient.invalidateQueries({
        queryKey: flowKeys.executions(variables.id),
      });

      toast.success(i18n.t('flows.toast.executeSuccess') || "Flow execution started");
    },
    onError: (error: any) => {
      toast.error(error.message || i18n.t('flows.toast.executeError') || "Failed to execute flow");
    },
  });
}

/**
 * Hook to retry a failed execution
 */
export function useRetryExecution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (executionId: string) => flowApi.retryExecution(executionId),
    onSuccess: (_, executionId) => {
      // Invalidate execution cache
      queryClient.invalidateQueries({
        queryKey: flowKeys.execution(executionId),
      });

      toast.success(i18n.t('flows.toast.retrySuccess') || "Execution retry started");
    },
    onError: (error: any) => {
      toast.error(error.message || i18n.t('flows.toast.retryError') || "Failed to retry execution");
    },
  });
}

/**
 * Hook to toggle flow active status
 */
export function useToggleFlowStatus() {
  const activateMutation = useActivateFlow();
  const deactivateMutation = useDeactivateFlow();

  return {
    toggle: (id: string, currentStatus: boolean) => {
      if (currentStatus) {
        return deactivateMutation.mutate(id);
      } else {
        return activateMutation.mutate(id);
      }
    },
    isLoading: activateMutation.isPending || deactivateMutation.isPending,
  };
}
