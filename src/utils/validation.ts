import { z } from 'zod';

export class ValidationError extends Error {
  constructor(message: string, public errors?: z.ZodError) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

export const validatePassword = (password: string): boolean => {
  return z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .safeParse(password).success;
};

export const validateApiKey = (key: string, provider: string): boolean => {
  const patterns = {
    openai: /^sk-[A-Za-z0-9]{32,}$/,
    anthropic: /^sk-ant-[A-Za-z0-9]{32,}$/,
    stripe: /^sk_(test|live)_[A-Za-z0-9]{24,}$/
  };

  return patterns[provider as keyof typeof patterns]?.test(key) ?? false;
};