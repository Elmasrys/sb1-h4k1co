import { useState, useCallback } from 'react';
import { AtlasService } from '../lib/atlas';
import { useKnowledgeBase } from './useKnowledgeBase';

export function useAtlas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addEVEActivity } = useKnowledgeBase();

  const chat = useCallback(async (
    message: string,
    onProgress?: (chunk: string) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const atlas = AtlasService.getInstance();
      if (!atlas.isInitialized()) {
        throw new Error('Please configure your API key in Settings first.');
      }

      // Log the user's message
      await addEVEActivity('atlas', {
        type: 'chat',
        description: `User message: ${message}`,
        timestamp: new Date()
      });

      const response = await atlas.chat(message, onProgress);

      // Log Atlas's response
      await addEVEActivity('atlas', {
        type: 'chat',
        description: `Atlas response: ${response}`,
        timestamp: new Date()
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An unexpected error occurred while communicating with Atlas';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [addEVEActivity]);

  const performAction = useCallback(async (
    action: {
      type: string;
      description: string;
      parameters?: Record<string, any>;
    }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const atlas = AtlasService.getInstance();
      if (!atlas.isInitialized()) {
        throw new Error('Please configure your API key in Settings first.');
      }

      // Log the action request
      await addEVEActivity('atlas', {
        type: action.type,
        description: action.description,
        timestamp: new Date()
      });

      // Perform the action
      const result = await atlas.performAction(action);

      // Log the action result
      await addEVEActivity('atlas', {
        type: `${action.type}_completed`,
        description: `Completed: ${action.description}`,
        result,
        timestamp: new Date()
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to perform action';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [addEVEActivity]);

  return {
    chat,
    performAction,
    loading,
    error
  };
}