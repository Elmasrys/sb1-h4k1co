import { AtlasBaseService } from './atlas-base.service';
import { AtlasCommunicationService } from './atlas-communication.service';
import { AtlasTaskService } from './atlas-task.service';
import { EVE } from '../../types/eve';

interface AtlasMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class AtlasService extends AtlasBaseService {
  private static instance: AtlasService | null = null;
  private communicationService: AtlasCommunicationService;
  private taskService: AtlasTaskService;
  private context: AtlasMessage[];
  private lastError: Error | null = null;

  private constructor() {
    super();
    this.communicationService = AtlasCommunicationService.getInstance();
    this.taskService = AtlasTaskService.getInstance();
    this.context = this.initializeContext();
  }

  public static getInstance(): AtlasService {
    if (!AtlasService.instance) {
      AtlasService.instance = new AtlasService();
    }
    return AtlasService.instance;
  }

  private initializeContext(): AtlasMessage[] {
    return [{
      role: 'system',
      content: `You are Atlas, the Chief EVE™ Orchestrator for ${this.company?.name || 'this company'}. Your role is to:
        - Coordinate all EVE™ operations
        - Make strategic decisions
        - Manage resource allocation
        - Ensure alignment with company goals
        
        Key capabilities:
        - EVE™ creation and management
        - Task orchestration
        - Performance monitoring
        - Strategic planning
        
        Always maintain:
        - Strategic alignment
        - Operational efficiency
        - Security compliance
        - Clear communication
        - Audit trails`
    }];
  }

  public async chat(
    message: string,
    onProgress?: (chunk: string) => void
  ): Promise<string> {
    await this.validateOpenAI();

    try {
      const relevantDocs = await this.knowledgeBase.search(message, {
        limit: 5,
        filters: { company_id: this.company?.id }
      });

      const contextEnhancedMessage = `
        Context from knowledge base:
        ${relevantDocs.map(doc => doc.content).join('\n')}

        Company Context:
        ${this.company ? `
          Name: ${this.company.name}
          Industry: ${this.company.settings?.industry}
          Type: ${this.company.type}
          Status: ${this.company.status}
        ` : 'No company context available'}

        Active EVEs:
        ${Array.from(this.activeEVEs.values()).map(eve => 
          `- ${eve.name} (${eve.role}): ${eve.status}`
        ).join('\n')}

        User message:
        ${message}
      `;

      this.context.push({ role: 'user', content: contextEnhancedMessage });

      const response = await this.openai.chat(this.context, onProgress);
      
      await this.processCommands(response);
      
      this.context.push({ role: 'assistant', content: response });

      // Keep context manageable
      if (this.context.length > 10) {
        this.context = [
          this.context[0], // Keep system message
          ...this.context.slice(-9) // Keep last 9 messages
        ];
      }

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process message';
      this.lastError = new Error(errorMessage);
      throw this.lastError;
    }
  }

  private async processCommands(response: string) {
    const commandRegex = /\[(\w+)(?: (.+?))?\]/g;
    let match;

    while ((match = commandRegex.exec(response)) !== null) {
      const [_, command, args] = match;
      await this.executeCommand(command, args);
    }
  }

  private async executeCommand(command: string, args?: string) {
    switch (command) {
      case 'create_eve':
        if (args) {
          const eveData = JSON.parse(args);
          await this.taskService.createEVE(eveData);
        }
        break;

      case 'assign_task':
        if (args) {
          const taskData = JSON.parse(args);
          await this.taskService.createTask(taskData);
        }
        break;

      case 'update_knowledge':
        if (args) {
          const knowledge = JSON.parse(args);
          await this.updateKnowledge(knowledge);
        }
        break;
    }
  }

  private async updateKnowledge(knowledge: {
    content: string;
    metadata?: Record<string, any>;
  }): Promise<void> {
    await this.knowledgeBase.addDocument(knowledge.content, {
      ...knowledge.metadata,
      company_id: this.company?.id
    });
  }

  public getLastError(): Error | null {
    return this.lastError;
  }
}