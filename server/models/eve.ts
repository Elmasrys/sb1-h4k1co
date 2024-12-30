import { z } from 'zod';

export const EVEModelSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  role: z.string().min(1),
  status: z.enum(['active', 'busy', 'idle']),
  type: z.enum(['orchestrator', 'specialist', 'support']),
  capabilities: z.array(z.string()),
  parent_id: z.string().uuid().nullable(),
  performance: z.object({
    efficiency: z.number(),
    accuracy: z.number(),
    tasks_completed: z.number()
  }),
  models: z.array(z.object({
    provider: z.enum(['openai', 'anthropic']),
    model: z.string(),
    purpose: z.string()
  })),
  created_at: z.date(),
  updated_at: z.date()
});

export type EVEModel = z.infer<typeof EVEModelSchema>;