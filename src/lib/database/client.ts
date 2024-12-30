import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { environmentService } from '../../config/environment';
import { ConnectionError } from './errors';

class DatabaseClient {
  private static instance: DatabaseClient;
  private client;

  private constructor() {
    const url = environmentService.get('SUPABASE_URL');
    const key = environmentService.get('SUPABASE_ANON_KEY');

    if (!url || !key) {
      if (environmentService.isDevelopment()) {
        console.warn('Using mock database client in development');
        this.client = this.createMockClient();
        return;
      }
      throw new ConnectionError('Missing database configuration');
    }

    this.client = createClient<Database>(url, key, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      db: {
        schema: 'public'
      }
    });
  }

  public static getInstance(): DatabaseClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }
    return DatabaseClient.instance;
  }

  private createMockClient() {
    return createClient<Database>(
      'http://localhost:54321',
      'dummy-key',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false
        }
      }
    );
  }

  public getClient() {
    return this.client;
  }

  public async checkConnection(): Promise<boolean> {
    try {
      const { error } = await this.client.from('documents').select('count');
      return !error;
    } catch (err) {
      console.error('Database connection check failed:', err);
      return false;
    }
  }
}

export const databaseClient = DatabaseClient.getInstance();