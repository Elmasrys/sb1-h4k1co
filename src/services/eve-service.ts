import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase-types';
import { EVE } from '../types/eve';
import { KnowledgeBase } from '../lib/knowledge-base';

export class EVEService {
  private static knowledgeBase: KnowledgeBase;
  private static retryAttempts = 3;
  private static retryDelay = 1000;

  static {
    this.knowledgeBase = KnowledgeBase.getInstance();
  }

  private static async retry<T>(operation: () => Promise<T>): Promise<T> {
    let lastError;
    for (let i = 0; i < this.retryAttempts; i++) {
      try {
        return await operation();
      } catch (err) {
        lastError = err;
        if (i < this.retryAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * (i + 1)));
        }
      }
    }
    throw lastError;
  }

  static async logAction(eveId: string, action: any) {
    return this.retry(async () => {
      try {
        const { data: loggedAction, error } = await supabase
          .from('eve_actions')
          .insert({
            ...action,
            eve_id: eveId,
          })
          .select()
          .single();

        if (error) throw error;

        // Add action to knowledge base with retry mechanism
        await this.retry(async () => {
          await this.knowledgeBase.addDocument(
            JSON.stringify({
              action: action.type,
              description: action.description,
              result: action.result,
              metadata: action.metadata
            }),
            {
              type: 'eve_action',
              eve_id: eveId,
              action_id: loggedAction.id
            }
          );
        });

        return loggedAction;
      } catch (err) {
        console.error('Error logging EVE action:', err);
        throw new Error('Failed to log EVE action');
      }
    });
  }

  // Rest of the service implementation...
}