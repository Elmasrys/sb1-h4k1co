import { useState, useCallback } from 'react';
import { EVEService } from '../services/eve-service';
import { Database } from '../lib/supabase-types';
import { useEVEStore } from '../store/eveStore';

type EVEAction = Database['public']['Tables']['eve_actions']['Row'];

export function useEVEActions(eveId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logAction = useCallback(async (
    action: Omit<Database['public']['Tables']['eve_actions']['Insert'], 'eve_id'>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const loggedAction = await EVEService.logAction(eveId, action);
      useEVEStore.getState().logAction({
        ...loggedAction,
        created_at: new Date(loggedAction.created_at),
        completed_at: loggedAction.completed_at ? new Date(loggedAction.completed_at) : undefined,
      });
      return loggedAction;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [eveId]);

  const getActions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await EVEService.getActions(eveId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [eveId]);

  return {
    logAction,
    getActions,
    loading,
    error,
  };
}