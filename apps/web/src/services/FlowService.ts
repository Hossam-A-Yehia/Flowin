import { apiRequest } from "./apiClient";
import {
  Flow,
  FlowWithNodes,
  CreateFlowData,
  UpdateFlowData,
  ExecuteFlowData,
  FlowExecution,
} from "@/types/flow";

export const flowApi = {
  /**
   * Get all user flows
   */
  getFlows: async (): Promise<Flow[]> => {
    return apiRequest.get<Flow[]>("/flows");
  },

  /**
   * Get specific flow by ID with full details
   */
  getFlow: async (id: string): Promise<FlowWithNodes> => {
    return apiRequest.get<FlowWithNodes>(`/flows/${id}`);
  },

  /**
   * Create a new flow
   */
  createFlow: async (data: CreateFlowData): Promise<Flow> => {
    return apiRequest.post<Flow>("/flows", data);
  },

  /**
   * Update an existing flow
   */
  updateFlow: async (id: string, data: UpdateFlowData): Promise<Flow> => {
    return apiRequest.put<Flow>(`/flows/${id}`, data);
  },

  /**
   * Delete a flow
   */
  deleteFlow: async (id: string): Promise<{ message: string }> => {
    return apiRequest.delete<{ message: string }>(`/flows/${id}`);
  },

  /**
   * Activate a flow
   */
  activateFlow: async (id: string): Promise<Flow> => {
    return apiRequest.patch<Flow>(`/flows/${id}/activate`);
  },

  /**
   * Deactivate a flow
   */
  deactivateFlow: async (id: string): Promise<Flow> => {
    return apiRequest.patch<Flow>(`/flows/${id}/deactivate`);
  },

  /**
   * Duplicate a flow
   */
  duplicateFlow: async (
    id: string,
    newName?: string
  ): Promise<Flow> => {
    return apiRequest.post<Flow>(`/flows/${id}/duplicate`, { name: newName });
  },

  /**
   * Execute a flow manually
   */
  executeFlow: async (
    id: string,
    data?: ExecuteFlowData
  ): Promise<{ message: string; executionId: string }> => {
    return apiRequest.post<{ message: string; executionId: string }>(
      `/flows/${id}/execute`,
      data
    );
  },

  /**
   * Get execution logs for a flow
   */
  getFlowExecutions: async (
    id: string,
    limit?: number
  ): Promise<FlowExecution[]> => {
    const url = limit ? `/flows/${id}/executions?limit=${limit}` : `/flows/${id}/executions`;
    return apiRequest.get<FlowExecution[]>(url);
  },

  /**
   * Get specific execution details
   */
  getExecution: async (executionId: string): Promise<FlowExecution> => {
    return apiRequest.get<FlowExecution>(`/flows/executions/${executionId}`);
  },

  /**
   * Retry a failed execution
   */
  retryExecution: async (
    executionId: string
  ): Promise<{ message: string; executionId: string }> => {
    return apiRequest.post<{ message: string; executionId: string }>(
      `/flows/executions/${executionId}/retry`
    );
  },
};
