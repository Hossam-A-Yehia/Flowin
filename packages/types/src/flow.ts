// src/flow.ts
export interface Flow {
  id: string;
  name: string;
  status: 'active' | 'paused';
  steps: Step[];
}
export interface Step {
  id: string;
  type: string;
  config: Record<string, any>;
}
