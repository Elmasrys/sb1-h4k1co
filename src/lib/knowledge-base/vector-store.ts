import { supabase } from '../supabase';
import { Document, SearchResult, SearchOptions } from './types';
import { OpenAIService } from '../openai';

export class VectorStore {
  private openai: OpenAIService;
  private maxRetries = 3;
  private retryDelay = 1000;

  constructor() {
    this.openai = OpenAIService.getInstance();
  }

  private async retry<T>(operation: () => Promise<T>, retries = this.maxRetries): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.retry(operation, retries - 1);
      }
      throw error;
    }
  }

  async addDocument(doc: Document): Promise<void> {
    try {
      if (!doc.content) {
        throw new Error('Document content is required');
      }

      const embedding = await this.generateEmbedding(doc.content).catch(err => {
        console.error('Embedding generation failed:', err);
        return null;
      });

      const { error } = await supabase
        .from('documents')
        .insert({
          content: doc.content,
          metadata: doc.metadata,
          embedding,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (err) {
      console.error('Error adding document:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to add document to vector store');
    }
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    if (!this.openai.isInitialized()) {
      throw new Error('OpenAI API key not configured');
    }

    return this.retry(async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            input: text,
            model: 'text-embedding-3-small'
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
        }

        const result = await response.json();
        if (!result.data?.[0]?.embedding) {
          throw new Error('Invalid response from OpenAI API');
        }

        return result.data[0].embedding;
      } catch (err) {
        console.error('Error generating embedding:', err);
        throw new Error(err instanceof Error ? err.message : 'Failed to generate document embedding');
      }
    });
  }

  // Rest of the class implementation remains the same...
}