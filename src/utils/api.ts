import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { AppError } from './error-handling';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      throw new AppError(
        error.response.data?.message || error.message,
        error.response.data?.code || 'API_ERROR',
        error.response.status
      );
    }
    throw new AppError(error.message, 'NETWORK_ERROR');
  }
);

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    throw AppError.fromError(error);
  }
};

export default api;