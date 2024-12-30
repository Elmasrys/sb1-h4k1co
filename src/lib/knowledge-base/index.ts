import { Document, SearchResult, SearchOptions, DocumentInput } from './types';
import { VectorStore } from './vector-store';
import { DocumentSchema } from './types';

class KnowledgeBase {
  private static instance: KnowledgeBase | null = null;
  private vectorStore: VectorStore;

  private constructor() {
    this.vectorStore = new VectorStore();
  }

  public static getInstance(): KnowledgeBase {
    if (!KnowledgeBase.instance) {
      KnowledgeBase.instance = new KnowledgeBase();
    }
    return KnowledgeBase.instance;
  }

  async addDocument(content: string, metadata: Record<string, any> = {}): Promise<void> {
    const input: DocumentInput = { content, metadata };
    const validated = DocumentSchema.parse(input);

    const doc: Document = {
      id: crypto.randomUUID(),
      content: validated.content,
      metadata: validated.metadata || {},
      created_at: new Date(),
      updated_at: new Date()
    };

    await this.vectorStore.addDocument(doc);
  }

  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    return this.vectorStore.search(query, options);
  }

  async updateDocument(id: string, content: string, metadata?: Record<string, any>): Promise<void> {
    const updates: Partial<Document> = {
      content,
      updated_at: new Date()
    };

    if (metadata) {
      updates.metadata = metadata;
    }

    await this.vectorStore.updateDocument(id, updates);
  }

  async deleteDocument(id: string): Promise<void> {
    await this.vectorStore.deleteDocument(id);
  }
}

// Export the class and types
export { KnowledgeBase };
export type { Document, SearchResult, SearchOptions, DocumentInput };