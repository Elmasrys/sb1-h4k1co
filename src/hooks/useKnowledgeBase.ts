import { useState, useCallback } from 'react';
import { KnowledgeBase, SearchOptions, SearchResult } from '../lib/knowledge-base';

export function useKnowledgeBase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const knowledgeBase = KnowledgeBase.getInstance();

  const addDocument = useCallback(async (
    content: string,
    metadata: Record<string, any> = {}
  ) => {
    setLoading(true);
    setError(null);
    try {
      await knowledgeBase.addDocument(content, metadata);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add document';
      setError(message);
      console.error('Error adding document:', err);
      // Don't throw here to prevent UI disruption
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (
    query: string,
    options: SearchOptions = {}
  ): Promise<SearchResult[]> => {
    setLoading(true);
    setError(null);
    try {
      const results = await knowledgeBase.search(query, options);
      return results;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
      setError(message);
      console.error('Error searching documents:', err);
      return []; // Return empty results instead of throwing
    } finally {
      setLoading(false);
    }
  }, []);

  const addEVEActivity = useCallback(async (
    eveId: string,
    activity: {
      type: string;
      description: string;
      timestamp: Date;
      result?: any;
    }
  ) => {
    try {
      await knowledgeBase.addDocument(
        activity.description,
        {
          type: 'eve_activity',
          eve_id: eveId,
          activity_type: activity.type,
          timestamp: activity.timestamp.toISOString(),
          result: activity.result
        }
      );
    } catch (err) {
      console.error('Failed to log EVE activity:', err);
      // Don't throw to prevent disrupting the main flow
    }
  }, []);

  return {
    addDocument,
    search,
    addEVEActivity,
    loading,
    error
  };
}