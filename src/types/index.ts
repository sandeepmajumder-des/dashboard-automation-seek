export interface Task {
  id: string;
  name: string;
  description?: string;
  url?: string;
  status: 'draft' | 'deployed' | 'paused';
  trigger?: TriggerConfig;
  guardrails?: GuardrailConfig[];
  steps?: TaskStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TriggerConfig {
  type: 'url' | 'element' | 'event' | 'manual';
  condition?: string;
  selector?: string;
}

export interface GuardrailConfig {
  id: string;
  name: string;
  enabled: boolean;
  type: 'validation' | 'confirmation' | 'restriction';
  config?: Record<string, unknown>;
}

export interface TaskStep {
  id: string;
  type: 'click' | 'input' | 'navigate' | 'wait' | 'custom';
  selector?: string;
  value?: string;
  description?: string;
}

export type TabType = 'capture' | 'define' | 'trigger' | 'guardrails' | 'preview';
