import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Extend matchers
expect.extend({});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
vi.mock('../config/environment', () => ({
  environmentService: {
    get: vi.fn(),
    getAll: vi.fn(),
    isDevelopment: () => true,
    isProduction: () => false,
    isTest: () => true,
    validate: () => true,
  },
}));

// Mock Supabase client
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
    from: vi.fn(),
  },
}));