import { AtlasService } from './atlas';
import { TaskQueueService } from './task-queue';
import { CompanyOrchestrator } from './company-orchestrator';
import { OpenAIService } from '../lib/openai';
import { validateEnv } from '../lib/env';

export class ServiceContainer {
  private static instance: ServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  register<T>(key: string, service: T): void {
    this.services.set(key, service);
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found`);
    }
    return service;
  }

  static initialize() {
    // Validate environment variables first
    validateEnv();

    const container = ServiceContainer.getInstance();
    
    // Initialize OpenAI service first
    const openai = OpenAIService.getInstance();
    container.register('openai', openai);
    
    // Initialize other core services
    const atlas = AtlasService.getInstance();
    container.register('atlas', atlas);

    const taskQueueService = TaskQueueService.getInstance();
    container.register('taskQueue', taskQueueService);

    const companyOrchestrator = new CompanyOrchestrator(
      taskQueueService,
      atlas
    );
    container.register('companyOrchestrator', companyOrchestrator);

    return container;
  }
}