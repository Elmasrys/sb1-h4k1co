import { useQuery as useReactQuery, useMutation as useReactMutation } from '@tanstack/react-query';
import { apiClient } from '../lib/api-client';
import { AppError } from '../utils/error-handling';

export function useQuery<T>(key: string[], url: string, config = {}) {
  return useReactQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        return await apiClient.get<T>(url);
      } catch (error) {
        throw AppError.fromError(error);
      }
    },
    ...config
  });
}

export function useMutation<T, V>(url: string, config = {}) {
  return useReactMutation({
    mutationFn: async (variables: V) => {
      try {
        return await apiClient.post<T>(url, variables);
      } catch (error) {
        throw AppError.fromError(error);
      }
    },
    ...config
  });
}