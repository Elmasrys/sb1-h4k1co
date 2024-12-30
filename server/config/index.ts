import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  HOST: z.string().default('localhost'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  ANTHROPIC_API_KEY: z.string(),
  RATE_LIMIT_MAX: z.string().default('100'),
  RATE_LIMIT_TIMEWINDOW: z.string().default('60000'),
});

const env = envSchema.parse(process.env);

export default {
  env: env.NODE_ENV,
  server: {
    port: parseInt(env.PORT, 10),
    host: env.HOST,
  },
  cors: {
    origin: env.CORS_ORIGIN,
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  supabase: {
    url: env.SUPABASE_URL,
    anonKey: env.SUPABASE_ANON_KEY,
  },
  ai: {
    openai: env.OPENAI_API_KEY,
    anthropic: env.ANTHROPIC_API_KEY,
  },
  rateLimit: {
    max: parseInt(env.RATE_LIMIT_MAX, 10),
    timeWindow: parseInt(env.RATE_LIMIT_TIMEWINDOW, 10),
  },
};