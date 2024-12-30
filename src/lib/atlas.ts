import { OpenAIService } from './openai';
import { validateEnv } from './env';
import { KnowledgeBase } from './knowledge-base';
import { EVE } from '../types/eve';
import { Company } from '../types/company';
import { TaskQueue, Task } from './task-queue';

interface AtlasMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AtlasContext {
  company: Company | null;
  activeEVEs: Map<string, EVE>;
  taskQueue: TaskQueue;
  integrations: Map<string, any>;
}

export class AtlasService {
  private static instance: AtlasService | null = null;
  private openai: OpenAIService;
  private knowledgeBase: KnowledgeBase;
  private taskQueue: TaskQueue;
  private context: AtlasMessage[];
  private systemContext: AtlasContext;
  private initialized: boolean = false;
  private lastError: Error | null = null;

  private constructor() {
    this.openai = OpenAIService.getInstance();
    this.knowledgeBase = KnowledgeBase.getInstance();
    this.taskQueue = new TaskQueue();
    this.context = this.initializeContext();
    this.systemContext = {
      company: null,
      activeEVEs: new Map(),
      taskQueue: this.taskQueue,
      integrations: new Map()
    };
    this.initialized = this.openai.isInitialized();
  }

  public static getInstance(): AtlasService {
    if (!AtlasService.instance) {
      AtlasService.instance = new AtlasService();
    }
    return AtlasService.instance;
  }

  private initializeContext(): AtlasMessage[] {
    return [
      {
        role: 'system',
        content: `You are Atlas, the Chief EVE™ Orchestrator for mavrika. Your role is to:
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
      }
    ];
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public setCompany(company: Company) {
    this.systemContext.company = company;
    this.updateContext();
  }

  private async updateContext() {
    if (!this.systemContext.company) return;

    const companyKnowledge = await this.knowledgeBase.search('', {
      type: 'company_info',
      filters: { company_id: this.systemContext.company.id }
    });

    this.context[0] = {
      role: 'system',
      content: `Current Company Context:
        Name: ${this.systemContext.company.name}
        Type: ${this.systemContext.company.type}
        Industry: ${this.systemContext.company.settings?.industry}
        
        Company Knowledge:
        ${companyKnowledge.map(doc => doc.pageContent).join('\n')}
        
        Active EVEs:
        ${Array.from(this.systemContext.activeEVEs.values())
          .map(eve => `- ${eve.name} (${eve.role}): ${eve.status}`)
          .join('\n')}
        
        Current System State:
        - Active EVEs: ${this.systemContext.activeEVEs.size}
        - Pending Tasks: ${await this.getPendingTasksCount()}
        - Integrations: ${this.systemContext.integrations.size}`
    };
  }

  public async chat(
    message: string,
    onProgress?: (chunk: string) => void
  ): Promise<string> {
    if (!this.openai.isInitialized()) {
      throw new Error('OpenAI API key not configured. Please add your API key in Settings.');
    }

    try {
      const relevantDocs = await this.knowledgeBase.search(message, {
        limit: 5,
        filters: { company_id: this.systemContext.company?.id }
      });

      const contextEnhancedMessage = `
        Context from knowledge base:
        ${relevantDocs.map(doc => doc.pageContent).join('\n')}

        User message:
        ${message}
      `;

      this.context.push({ role: 'user', content: contextEnhancedMessage });

      const response = await this.openai.chat(this.context, onProgress);
      
      await this.processCommands(response);
      
      this.context.push({ role: 'assistant', content: response });

      if (this.context.length > 10) {
        this.context = [
          this.context[0],
          ...this.context.slice(-9)
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
          await this.createEVE(eveData);
        }
        break;

      case 'assign_task':
        if (args) {
          const taskData = JSON.parse(args);
          await this.assignTask(taskData);
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

  private async getPendingTasksCount(): Promise<number> {
    let count = 0;
    for (const eveId of this.systemContext.activeEVEs.keys()) {
      const tasks = await this.taskQueue.getTasks(eveId);
      count += tasks.filter(task => task.status === 'pending').length;
    }
    return count;
  }

  public getLastError(): Error | null {
    return this.lastError;
  }

  public getSystemContext(): AtlasContext {
    return { ...this.systemContext };
  }
}