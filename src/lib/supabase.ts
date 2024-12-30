import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// In development, allow the app to run without environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  if (import.meta.env.DEV) {
    console.warn('Missing Supabase environment variables');
  } else {
    throw new Error('Missing required environment variables');
  }
}

export const supabase = createClient<Database>(
  supabaseUrl || 'http://localhost:54321',  // Fallback for development
  supabaseAnonKey || 'dummy-key', // Fallback for development
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    db: {
      schema: 'public'
    }
  }
);

// Add error handling for database operations
export const handleDatabaseError = (error: any): never => {
  console.error('Database operation failed:', error);
  throw new Error(error?.message || 'Database operation failed');
};

// Add connection status check
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('documents').select('count');
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Database connection check failed:', err);
    return false;
  }
};