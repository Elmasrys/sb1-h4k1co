import { z } from 'zod';

export const TaskModelSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  status: z.enum(['pending', 'scheduled', 'in_progress', 'completed', 'failed', 'cancelled']),
  assigned_to: z.string().uuid(),
  created_by: z.string().uuid(),
  created_at: z.date(),
  scheduled_for: z.date().optional(),
  started_at: z.date().optional(),
  completed_at: z.date().optional(),
  deadline: z.date().optional(),
  dependencies: z.array(z.string().uuid()).optional(),
  result: z.any().optional(),
  error: z.string().optional(),
  metadata: z.object({
    type: z.enum(['analysis', 'communication', 'decision', 'action']),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    required_capabilities: z.array(z.string()).optional(),
    estimated_duration: z.number().optional(),
    retry_count: z.number().optional(),
    max_retries: z.number().optional(),
    context: z.record(z.any()).optional()
  })
});

export type TaskModel = z.infer<typeof TaskModelSchema>;