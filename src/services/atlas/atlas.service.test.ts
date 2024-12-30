import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AtlasService } from './atlas.service';
import { OpenAIService } from '../../lib/openai';
import { KnowledgeBase } from '../../lib/knowledge-base';

vi.mock('../../lib/openai');
vi.mock('../../lib/knowledge-base');

describe('AtlasService', () => {
  let atlas: AtlasService;

  beforeEach(() => {
    vi.clearAllMocks();
    atlas = AtlasService.getInstance();
  });

  it('should initialize with empty context', () => {
    expect(atlas).toBeDefined();
  });

  it('should process messages correctly', async () => {
    const mockResponse = 'Test response';
    vi.spyOn(OpenAIService.prototype, 'chat').mockResolvedValue(mockResponse);
    vi.spyOn(KnowledgeBase.prototype, 'search').mockResolvedValue([]);

    const response = await atlas.chat('test message');
    expect(response).toBe(mockResponse);
  });

  it('should handle errors gracefully', async () => {
    vi.spyOn(OpenAIService.prototype, 'chat').mockRejectedValue(new Error('API Error'));

    await expect(atlas.chat('test message')).rejects.toThrow('API Error');
    expect(atlas.getLastError()).toBeDefined();
  });

  it('should maintain context size limit', async () => {
    vi.spyOn(OpenAIService.prototype, 'chat').mockResolvedValue('response');
    vi.spyOn(KnowledgeBase.prototype, 'search').mockResolvedValue([]);

    // Send 12 messages (more than the 10 message limit)
    for (let i = 0; i < 12; i++) {
      await atlas.chat(`message ${i}`);
    }

    // Verify context is trimmed
    const context = (atlas as any).context;
    expect(context.length).toBeLessThanOrEqual(10);
  });
});