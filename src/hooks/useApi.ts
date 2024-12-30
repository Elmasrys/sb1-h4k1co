import { useState, useCallback } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T = any>(options: UseApiOptions<T> = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const { user } = useAuthStore();

  const request = useCallback(async (
    config: AxiosRequestConfig
  ): Promise<T> => {
    try {
      setLoading(true);
      setError(null);

      // Add auth header if user is logged in
      const headers = {
        ...config.headers,
        ...(user && { Authorization: `Bearer ${user.access_token}` }),
      };

      // Add CSRF token if available
      const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }

      const response = await axios({
        ...config,
        headers,
      });

      setData(response.data);
      options.onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      const message = error.response?.data?.message || error.message;
      setError(new Error(message));
      options.onError?.(new Error(message));
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user, options]);

  return {
    request,
    loading,
    error,
    data,
  };
}