import { useCallback } from 'react';
import { useEVEStore } from '../store/eveStore';
import { EVEService } from '../services/eve-service';
import { EVEAction } from '../types/eve';

export function useEVELogger(eveId: string) {
  const logAction = useCallback(async (
    description: string,
    type: EVEAction['type'] = 'task',
    metadata?: Record<string, any>
  ) => {
    try {
      const action = await EVEService.logAction(eveId, {
        type,
        status: 'pending',
        description,
        metadata,
        created_at: new Date().toISOString()
      });

      useEVEStore.getState().logAction({
        ...action,
        created_at: new Date(action.created_at),
        completed_at: action.completed_at ? new Date(action.completed_at) : undefined,
      });

      return action;
    } catch (error) {
      console.error('Error logging EVE action:', error);
      throw error;
    }
  }, [eveId]);

  const updateActionStatus = useCallback(async (
    actionId: string,
    status: EVEAction['status'],
    result?: any
  ) => {
    try {
      const updatedAction = await EVEService.update(actionId, {
        status,
        result,
        completed_at: status === 'completed' || status === 'failed' ? new Date().toISOString() : undefined
      });

      useEVEStore.getState().updateAction(actionId, {
        status,
        result,
        completed_at: updatedAction.completed_at ? new Date(updatedAction.completed_at) : undefined
      });

      return updatedAction;
    } catch (error) {
      console.error('Error updating EVE action:', error);
      throw error;
    }
  }, []);

  return {
    logAction,
    updateActionStatus
  };
}