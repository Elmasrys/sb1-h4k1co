import { z } from 'zod';

export interface EVE {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'busy' | 'idle';
  type: 'orchestrator' | 'specialist' | 'support';
  capabilities: string[];
  parent?: string;
  children?: EVE[];
  performance: {
    efficiency: number;
    accuracy: number;
    tasks_completed: number;
  };
  models: {
    provider: 'openai' | 'anthropic';
    model: string;
    purpose: string;
  }[];
}

export interface EVEAction {
  id: string;
  eve_id: string;
  type: 'task' | 'communication' | 'decision';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  description: string;
  created_at: Date;
  completed_at?: Date;
  result?: any;
  metadata?: Record<string, any>;
}

export interface EVEMessage {
  id: string;
  from_eve_id: string;
  to_eve_id: string;
  content: string;
  type: 'direct' | 'broadcast' | 'task' | 'status_update';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'sent' | 'delivered' | 'read' | 'processed';
  created_at: Date;
  delivered_at?: Date;
  read_at?: Date;
  processed_at?: Date;
  metadata?: {
    task_id?: string;
    requires_response?: boolean;
    response_deadline?: Date;
    context?: Record<string, any>;
  };
}

export const MessageSchema = z.object({
  content: z.string().min(1),
  type: z.enum(['direct', 'broadcast', 'task', 'status_update']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  metadata: z.object({
    task_id: z.string().optional(),
    requires_response: z.boolean().optional(),
    response_deadline: z.date().optional(),
    context: z.record(z.any()).optional(),
  }).optional(),
});