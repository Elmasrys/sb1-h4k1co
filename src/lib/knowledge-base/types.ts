import { z } from 'zod';

export interface Document {
  id: string;
  content: string;
  metadata: Record<string, any>;
  embedding?: number[];
  created_at: Date;
  updated_at: Date;
}

export interface SearchResult {
  id: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;
}

export interface SearchOptions {
  limit?: number;
  filters?: Record<string, any>;
  type?: string;
}

export const DocumentSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  metadata: z.record(z.any()).optional(),
});

export type DocumentInput = z.infer<typeof DocumentSchema>;