import { z } from 'zod';

export const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SUPABASE_URL: z.string().url('Invalid Supabase URL').optional(),
  SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required').optional(),
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required').optional(),
  API_URL: z.string().url('Invalid API URL').optional(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

class EnvironmentService {
  private static instance: EnvironmentService;
  private env: Environment;
  private initialized: boolean = false;

  private constructor() {
    this.env = this.loadEnvironment();
    this.initialized = true;
  }

  public static getInstance(): EnvironmentService {
    if (!EnvironmentService.instance) {
      EnvironmentService.instance = new EnvironmentService();
    }
    return EnvironmentService.instance;
  }

  private loadEnvironment(): Environment {
    const env = {
      NODE_ENV: import.meta.env.MODE,
      SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
      OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
      API_URL: import.meta.env.VITE_API_URL,
    };

    const result = EnvironmentSchema.safeParse(env);

    if (!result.success) {
      if (import.meta.env.DEV) {
        console.warn('Environment validation errors:', result.error.errors);
        return env as Environment;
      }
      throw new Error(`Invalid environment: ${result.error.message}`);
    }

    return result.data;
  }

  public get<K extends keyof Environment>(key: K): Environment[K] {
    if (!this.initialized) {
      throw new Error('EnvironmentService not initialized');
    }
    return this.env[key];
  }

  public getAll(): Readonly<Environment> {
    if (!this.initialized) {
      throw new Error('EnvironmentService not initialized');
    }
    return Object.freeze({ ...this.env });
  }

  public isDevelopment(): boolean {
    return this.env.NODE_ENV === 'development';
  }

  public isProduction(): boolean {
    return this.env.NODE_ENV === 'production';
  }

  public isTest(): boolean {
    return this.env.NODE_ENV === 'test';
  }

  public validate(): boolean {
    const result = EnvironmentSchema.safeParse(this.env);
    return result.success;
  }
}

export const environmentService = EnvironmentService.getInstance();