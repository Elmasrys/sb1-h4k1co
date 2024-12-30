import axios from 'axios';
import { AppError } from '../utils/error-handling';
import { environmentService } from '../config/environment';

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

export class ApiClient {
  private static instance: ApiClient;
  private client;

  private constructor() {
    this.client = axios.create({
      baseURL: environmentService.get('API_URL'),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      response => response,
      async error => {
        const config = error.config;
        
        // Don't retry if we've hit the max retries or specific error codes
        if (
          config.__retryCount >= MAX_RETRIES ||
          error.response?.status === 401 ||
          error.response?.status === 403 ||
          error.response?.status === 422
        ) {
          throw AppError.fromError(error);
        }

        // Increment retry count
        config.__retryCount = config.__retryCount || 0;
        config.__retryCount++;

        // Calculate delay with exponential backoff
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, config.__retryCount - 1);
        await new Promise(resolve => setTimeout(resolve, delay));

        return this.client(config);
      }
    );
  }

  public async request<T>(config: any): Promise<T> {
    try {
      const response = await this.client(config);
      return response.data;
    } catch (error) {
      throw AppError.fromError(error);
    }
  }

  public async get<T>(url: string, config = {}): Promise<T> {
    return this.request({ ...config, method: 'GET', url });
  }

  public async post<T>(url: string, data?: any, config = {}): Promise<T> {
    return this.request({ ...config, method: 'POST', url, data });
  }

  public async put<T>(url: string, data?: any, config = {}): Promise<T> {
    return this.request({ ...config, method: 'PUT', url, data });
  }

  public async delete<T>(url: string, config = {}): Promise<T> {
    return this.request({ ...config, method: 'DELETE', url });
  }
}

export const apiClient = ApiClient.getInstance();