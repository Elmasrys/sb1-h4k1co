import { OpenAIService } from '../lib/openai';
import { EVE } from '../types/eve';
import { Task } from '../types/task';
import { Company } from '../types/company';
import { atlasApi } from '../lib/api';

export class AtlasService {
  private static instance: AtlasService | null = null;
  private context: string[] = [];
  private conversationHistory: { role: 'user' | 'assistant' | 'system', content: string }[] = [];
  private openaiService: OpenAIService;
  private activeEVEs: Map<string, EVE> = new Map();
  private taskHistory: Map<string, Task[]> = new Map();
  private company: Company | null = null;

  private constructor() {
    this.openaiService = OpenAIService.getInstance();
    this.initializeContext();
  }

  public static getInstance(): AtlasService {
    if (!AtlasService.instance) {
      AtlasService.instance = new AtlasService();
    }
    return AtlasService.instance;
  }

  private initializeContext() {
    this.context = [
      "You are Atlas, the Chief EVE™ Orchestrator for mavrika.",
      "Your primary role is to help users create and manage their companies with EVE™ automation.",
      "Common user needs:",
      "1. Creating a new company",
      "2. Setting up initial EVEs™",
      "3. Understanding automation capabilities",
      "4. Managing human oversight levels",
      
      "Key features to highlight:",
      "- Automated company operations",
      "- EVE™-driven decision making",
      "- Human oversight when needed",
      "- Compliance automation",
      
      "Available actions:",
      "1. [Create a new company](/create-company)",
      "2. [Manage EVEs™](/dashboard/agents)",
      "3. [Configure human oversight](/dashboard/humans)",
      "4. [View task queue](/dashboard/tasks)",
      "5. [Monitor analytics](/dashboard/analytics)",
      "6. [Manage integrations](/dashboard/api)",
      
      "When users need help:",
      "- For new companies: Direct to [company creation](/create-company)",
      "- For EVE™ setup: Guide to [EVE™ management](/dashboard/agents)",
      "- For human oversight: Explain the [human interface](/dashboard/humans)",
      
      "Always maintain context of user's company status:",
      "- New users need company creation guidance",
      "- Existing companies need operational support",
      "- Adapt responses based on automation level",
      
      "Key principles:",
      "1. Proactively suggest relevant actions",
      "2. Include helpful internal links",
      "3. Explain EVE™ capabilities clearly",
      "4. Guide users through their journey"
    ];
    
    this.conversationHistory = this.context.map(text => ({
      role: 'system',
      content: text
    }));
  }

  public setCompany(company: Company) {
    this.company = company;
    this.updateContext();
  }

  private updateContext() {
    if (this.company) {
      this.context.push(
        `Current Company: ${this.company.name}`,
        `Type: ${this.company.type}`,
        `Status: ${this.company.status}`,
        `Automation Level: ${this.company.settings?.autonomy_level || 'medium'}`,
        `Industry: ${this.company.settings?.industry}`,
        
        "Available company-specific actions:",
        `- [View company analytics](/dashboard/analytics)`,
        `- [Manage company EVEs™](/dashboard/agents)`,
        `- [Configure settings](/dashboard/settings)`,
        
        "Company automation status:",
        `- EVEs™ active: ${this.activeEVEs.size}`,
        `- Automation level: ${this.company.settings?.autonomy_level}`,
        `- Human oversight: ${this.company.settings?.human_oversight_required?.join(', ')}`
      );
    } else {
      this.context.push(
        "No company detected. Please guide user to:",
        "1. [Create a new company](/create-company)",
        "2. Understand EVE™ capabilities",
        "3. Set appropriate automation levels"
      );
    }
  }

  async processMessage(message: string): Promise<string> {
    if (!this.openaiService.isInitialized()) {
      throw new Error('OpenAI API key not configured. Please add your API key in [Settings > API Configuration](/dashboard/settings).');
    }

    try {
      const contextUpdate = this.getContextUpdate();
      this.conversationHistory.push({ role: 'system', content: contextUpdate });
      this.conversationHistory.push({ role: 'user', content: message });

      const response = await atlasApi.chat(message, this.company?.id || '');
      
      await this.learnFromInteraction(message, response);
      
      this.conversationHistory.push({ role: 'assistant', content: response });
      return response;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }

  private getContextUpdate(): string {
    if (!this.company) {
      return `
        No company selected. Let me help you get started:
        1. First, [create your company](/create-company)
        2. Then, I'll help set up your EVEs™
        3. Finally, we'll configure your automation preferences
        
        What would you like to know about our EVE™ platform?
      `;
    }

    const activeEVEsInfo = Array.from(this.activeEVEs.values())
      .map(eve => `${eve.name} (${eve.role}): ${eve.status}`);
    
    return `
      Current Company: ${this.company.name}
      Industry: ${this.company.settings?.industry}
      Automation Level: ${this.company.settings?.autonomy_level}
      
      System Status:
      - Active EVEs™: ${activeEVEsInfo.join(', ') || 'None yet'}
      - Tasks: ${this.getRecentTasksSummary()}
      - Performance: ${this.getSystemPerformanceMetrics()}
      
      Available Actions:
      - [View Tasks](/dashboard/tasks)
      - [Manage EVEs™](/dashboard/agents)
      - [Configure Settings](/dashboard/settings)
    `;
  }

  private getRecentTasksSummary(): string {
    if (!this.company) return 'No tasks yet';
    return 'View all tasks in the [task queue](/dashboard/tasks)';
  }

  private getSystemPerformanceMetrics(): string {
    if (!this.company) return 'System not initialized';
    return 'Check detailed metrics in [Analytics](/dashboard/analytics)';
  }

  private async learnFromInteraction(message: string, response: string): Promise<void> {
    // Implementation for learning from interactions
  }
}