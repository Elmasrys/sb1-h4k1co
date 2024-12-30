import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url('Invalid Supabase URL').optional(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required').optional(),
  VITE_OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required').optional(),
  VITE_API_URL: z.string().url('Invalid API URL').optional(),
});

export function validateEnv() {
  const env = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };

  try {
    const validatedEnv = envSchema.parse(env);
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Make environment variables optional for development
      if (import.meta.env.DEV) {
        console.warn('Missing environment variables:', error.errors);
        return env;
      }
      const missingVars = error.errors.map(err => err.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

export function checkRequiredEnvVars() {
  const env = validateEnv();
  const missing = [];

  if (!env.VITE_SUPABASE_URL) missing.push('VITE_SUPABASE_URL');
  if (!env.VITE_SUPABASE_ANON_KEY) missing.push('VITE_SUPABASE_ANON_KEY');
  if (!env.VITE_OPENAI_API_KEY) missing.push('VITE_OPENAI_API_KEY');

  if (missing.length > 0 && !import.meta.env.DEV) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return true;
}