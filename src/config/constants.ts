export const APP_CONFIG = {
  APP_NAME: 'mavrika',
  VERSION: '1.0.0',
  API_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

export const AUTH_CONFIG = {
  SESSION_DURATION: '7d',
  REFRESH_THRESHOLD: 24 * 60 * 60 * 1000, // 24 hours
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
} as const;

export const EVE_CONFIG = {
  DEFAULT_MODEL: 'gpt-4-turbo-preview',
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
  PRESENCE_PENALTY: 0.0,
  FREQUENCY_PENALTY: 0.0,
} as const;

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  EVES: '/api/eves',
  TASKS: '/api/tasks',
  DOCUMENTS: '/api/documents',
} as const;