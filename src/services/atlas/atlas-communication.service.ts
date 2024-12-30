import { AtlasBaseService } from './atlas-base.service';
import { EVEMessage } from '../../types/eve';

export class AtlasCommunicationService extends AtlasBaseService {
  private static instance: AtlasCommunicationService | null = null;
  private messageQueue: Map<string, EVEMessage[]> = new Map();

  private constructor() {
    super();
  }

  public static getInstance(): AtlasCommunicationService {
    if (!AtlasCommunicationService.instance) {
      AtlasCommunicationService.instance = new AtlasCommunicationService();
    }
    return AtlasCommunicationService.instance;
  }

  public async sendMessage(
    toEVEId: string,
    content: string,
    options?: {
      type?: EVEMessage['type'];
      priority?: EVEMessage['priority'];
      metadata?: EVEMessage['metadata'];
    }
  ): Promise<EVEMessage> {
    await this.validateOpenAI();
    await this.validateCompany();

    const message: EVEMessage = {
      id: Date.now().toString(),
      from_eve_id: 'atlas',
      to_eve_id: toEVEId,
      content,
      type: options?.type || 'direct',
      priority: options?.priority || 'medium',
      status: 'sent',
      created_at: new Date(),
      metadata: options?.metadata
    };

    const queue = this.messageQueue.get(toEVEId) || [];
    queue.push(message);
    this.messageQueue.set(toEVEId, queue);

    return message;
  }

  public async broadcast(
    content: string,
    options?: {
      filter?: (eve: EVE) => boolean;
      priority?: EVEMessage['priority'];
      metadata?: EVEMessage['metadata'];
    }
  ): Promise<EVEMessage[]> {
    await this.validateOpenAI();
    await this.validateCompany();

    const targetEVEs = Array.from(this.activeEVEs.values())
      .filter(options?.filter || (() => true));

    const messages = await Promise.all(
      targetEVEs.map(eve => this.sendMessage(
        eve.id,
        content,
        {
          type: 'broadcast',
          priority: options?.priority,
          metadata: options?.metadata
        }
      ))
    );

    return messages;
  }

  public async getMessages(eveId: string): Promise<EVEMessage[]> {
    return this.messageQueue.get(eveId) || [];
  }
}