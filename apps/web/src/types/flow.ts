// Flow types based on backend DTOs and API responses

export enum TriggerType {
  WEBHOOK = 'webhook',
  SCHEDULE = 'schedule',
  MANUAL = 'manual',
}

export enum NodeType {
  TRIGGER = 'TRIGGER',
  ACTION = 'ACTION',
  CONDITION = 'CONDITION',
  DELAY = 'DELAY',
  AI = 'AI',
  WEBHOOK = 'WEBHOOK',
}

export enum FlowStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  DRAFT = 'draft',
}

export interface FlowNodePosition {
  x: number;
  y: number;
}

export interface FlowNode {
  id: string;
  type: NodeType;
  name: string;
  description?: string;
  config: Record<string, any>;
  position: FlowNodePosition;
  integrationId?: string;
  isEnabled?: boolean;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  condition?: string;
}

export interface Flow {
  id: string;
  name: string;
  description?: string;
  triggerType: TriggerType;
  isActive: boolean;
  nodes: FlowNode[];
  edges: FlowEdge[];
  version: number;
  tags?: string[] | string;
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  lastRun?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId?: string;
}

export interface FlowWithNodes extends Flow {
  flowNodes: any[];
  executions?: FlowExecution[];
}

export interface FlowExecution {
  id: string;
  flowId: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  startedAt: Date | string;
  completedAt?: Date | string;
  duration?: number;
  error?: string;
  logs?: ExecutionLog[];
}

export interface ExecutionLog {
  id: string;
  nodeId: string;
  nodeName: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  startedAt: Date | string;
  completedAt?: Date | string;
  input?: any;
  output?: any;
  error?: string;
}

// Form data types
export interface CreateFlowData {
  name: string;
  description?: string;
  triggerType: TriggerType;
  nodes: FlowNode[];
  edges?: FlowEdge[];
  tags?: string[];
}

export interface UpdateFlowData {
  name?: string;
  description?: string;
  triggerType?: TriggerType;
  isActive?: boolean;
  nodes?: FlowNode[];
  edges?: FlowEdge[];
  tags?: string[];
}

export interface ExecuteFlowData {
  triggerData?: Record<string, any>;
}

// API response types
export interface FlowsListResponse {
  flows: Flow[];
  total: number;
}

export interface FlowResponse {
  flow: Flow;
}

export interface ExecutionResponse {
  execution: FlowExecution;
  message?: string;
}

// Filter and search types
export interface FlowFilters {
  search?: string;
  status?: 'active' | 'paused' | 'all';
  triggerType?: TriggerType | 'all';
  tags?: string[];
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'lastRun';
  sortOrder?: 'asc' | 'desc';
}

// Statistics types
export interface FlowStatistics {
  totalFlows: number;
  activeFlows: number;
  pausedFlows: number;
  totalExecutions: number;
  successRate: number;
  failureRate: number;
}

export function parseTags(tags?: string[] | string | null): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  try {
    return JSON.parse(tags);
  } catch {
    return [];
  }
}
