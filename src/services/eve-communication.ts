import { EVE, EVEMessage, MessageSchema } from '../types/eve';
import { useEVEStore } from '../store/eveStore';
import { z } from 'zod';

export class EVECommunicationService {
  private messageQueue: Map<string, EVEMessage[]>;
  private messageHandlers: Map<string, ((message: EVEMessage) => Promise<void>)[]>;

  constructor() {
    this.messageQueue = new Map();
    this.messageHandlers = new Map();
  }

  async sendMessage(
    fromEVE: EVE,
    toEVE: EVE,
    content: string,
    options?: {
      type?: EVEMessage['type'];
      priority?: EVEMessage['priority'];
      metadata?: EVEMessage['metadata'];
    }
  ): Promise<EVEMessage> {
    const message: EVEMessage = {
      id: Date.now().toString(),
      from_eve_id: fromEVE.id,
      to_eve_id: toEVE.id,
      content,
      type: options?.type || 'direct',
      priority: options?.priority || 'medium',
      status: 'sent',
      created_at: new Date(),
      metadata: options?.metadata
    };

    const queue = this.messageQueue.get(toEVE.id) || [];
    queue.push(message);
    this.messageQueue.set(toEVE.id, queue);

    // Notify handlers
    const handlers = this.messageHandlers.get(toEVE.id) || [];
    await Promise.all(handlers.map(handler => handler(message)));

    return message;
  }

  async broadcast(
    fromEVE: EVE,
    content: string,
    options?: {
      filter?: (eve: EVE) => boolean;
      priority?: EVEMessage['priority'];
      metadata?: EVEMessage['metadata'];
    }
  ): Promise<EVEMessage[]> {
    const eves = useEVEStore.getState().eves;
    const targetEVEs = options?.filter ? eves.filter(options.filter) : eves;

    const messages = await Promise.all(
      targetEVEs
        .filter(eve => eve.id !== fromEVE.id)
        .map(eve => this.sendMessage(
          fromEVE,
          eve,
          content,
          {
            type: 'broadcast',
            priority: options?.priority || 'medium',
            metadata: options?.metadata
          }
        ))
    );

    return messages;
  }

  registerMessageHandler(
    eveId: string,
    handler: (message: EVEMessage) => Promise<void>
  ): void {
    const handlers = this.messageHandlers.get(eveId) || [];
    handlers.push(handler);
    this.messageHandlers.set(eveId, handlers);
  }

  unregisterMessageHandler(
    eveId: string,
    handler: (message: EVEMessage) => Promise<void>
  ): void {
    const handlers = this.messageHandlers.get(eveId) || [];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
      this.messageHandlers.set(eveId, handlers);
    }
  }

  async getMessages(eveId: string): Promise<EVEMessage[]> {
    return this.messageQueue.get(eveId) || [];
  }

  async markMessageAsRead(message: EVEMessage): Promise<void> {
    const queue = this.messageQueue.get(message.to_eve_id) || [];
    const index = queue.findIndex(m => m.id === message.id);
    if (index > -1) {
      queue[index] = {
        ...queue[index],
        status: 'read',
        read_at: new Date()
      };
      this.messageQueue.set(message.to_eve_id, queue);
    }
  }

  async markMessageAsProcessed(message: EVEMessage): Promise<void> {
    const queue = this.messageQueue.get(message.to_eve_id) || [];
    const index = queue.findIndex(m => m.id === message.id);
    if (index > -1) {
      queue[index] = {
        ...queue[index],
        status: 'processed',
        processed_at: new Date()
      };
      this.messageQueue.set(message.to_eve_id, queue);
    }
  }
}