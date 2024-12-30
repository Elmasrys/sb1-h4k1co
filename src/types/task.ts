import { z } from 'zod';
import { EVE } from './eve';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string; // EVE ID
  createdBy: string; // EVE ID
  createdAt: Date;
  scheduledFor?: Date;
  startedAt?: Date;
  completedAt?: Date;
  deadline?: Date;
  dependencies?: string[]; // Task IDs
  result?: any;
  error?: string;
  metadata: {
    type: 'analysis' | 'communication' | 'decision' | 'action';
    category?: string;
    tags?: string[];
    requiredCapabilities?: string[];
    estimatedDuration?: number; // in minutes
    retryCount?: number;
    maxRetries?: number;
    context?: Record<string, any>;
  };
}

export const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  scheduledFor: z.date().optional(),
  deadline: z.date().optional(),
  dependencies: z.array(z.string()).optional(),
  metadata: z.object({
    type: z.enum(['analysis', 'communication', 'decision', 'action']),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    requiredCapabilities: z.array(z.string()).optional(),
    estimatedDuration: z.number().optional(),
    maxRetries: z.number().optional(),
    context: z.record(z.any()).optional(),
  }),
});