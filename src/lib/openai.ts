import OpenAI from 'openai';
import { z } from 'zod';

const apiKeySchema = z.string().min(1, 'OpenAI API key is required');

export class OpenAIService {
  private static instance: OpenAIService | null = null;
  private client: OpenAI | null = null;
  private retryCount: number = 0;
  private maxRetries: number = 3;
  private retryDelay: number = 1000; // Start with 1 second delay

  private constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      this.initialize(apiKey);
    }
  }

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  public initialize(apiKey: string): void {
    try {
      apiKeySchema.parse(apiKey);
      this.client = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
        maxRetries: this.maxRetries,
        timeout: 30000, // 30 second timeout
      });
    } catch (error) {
      console.error('Failed to initialize OpenAI client:', error);
      throw new Error('Invalid API key format');
    }
  }

  private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === this.maxRetries || !this.isRetryableError(error)) {
          throw this.formatError(error);
        }
        
        const delay = this.retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.warn(`Retry attempt ${attempt} of ${this.maxRetries}`);
      }
    }
    throw new Error('Max retries exceeded');
  }

  private isRetryableError(error: any): boolean {
    return (
      error?.status === 429 || // Rate limit
      error?.status >= 500 || // Server errors
      error?.message?.includes('timeout') ||
      error?.message?.includes('network') ||
      error?.message?.includes('connection') ||
      error?.message?.includes('ECONNRESET')
    );
  }

  private formatError(error: any): Error {
    let message = 'OpenAI Error: ';
    
    if (error?.response?.data?.error?.message) {
      message += error.response.data.error.message;
    } else if (error?.message?.includes('timeout')) {
      message += 'Request timed out. Please try again.';
    } else if (error?.message?.includes('network') || error?.message?.includes('connection')) {
      message += 'Connection error. Please check your internet connection and try again.';
    } else if (error?.message) {
      message += error.message;
    } else {
      message += 'An unexpected error occurred';
    }

    return new Error(message);
  }

  public async chat(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
    onProgress?: (chunk: string) => void
  ): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    return this.retryOperation(async () => {
      const stream = await this.client!.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages,
        temperature: 0.7,
        max_tokens: 500,
        stream: true
      });

      let fullResponse = '';

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          if (onProgress) {
            onProgress(content);
          }
        }
      }

      if (!fullResponse) {
        throw new Error('No response received from OpenAI');
      }

      return fullResponse;
    });
  }

  public isInitialized(): boolean {
    return !!this.client;
  }
}