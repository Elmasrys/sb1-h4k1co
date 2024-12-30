import { z } from 'zod';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  scheduledFor?: Date;
  startedAt?: Date;
  completedAt?: Date;
  deadline?: Date;
  dependencies?: string[];
  result?: any;
  error?: string;
  metadata: {
    type: 'analysis' | 'communication' | 'decision' | 'action';
    category?: string;
    tags?: string[];
    requiredCapabilities?: string[];
    estimatedDuration?: number;
    retryCount?: number;
    maxRetries?: number;
    context?: Record<string, any>;
  };
}

export const TaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
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