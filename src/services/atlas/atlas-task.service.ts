import { AtlasBaseService } from './atlas-base.service';
import { Task } from '../../types/task';
import { EVE } from '../../types/eve';
import { TaskQueue } from '../../lib/task-queue';

export class AtlasTaskService extends AtlasBaseService {
  private static instance: AtlasTaskService | null = null;
  private taskQueue: TaskQueue;

  private constructor() {
    super();
    this.taskQueue = new TaskQueue();
  }

  public static getInstance(): AtlasTaskService {
    if (!AtlasTaskService.instance) {
      AtlasTaskService.instance = new AtlasTaskService();
    }
    return AtlasTaskService.instance;
  }

  public async createEVE(eveData: Partial<EVE>): Promise<EVE> {
    await this.validateCompany();

    const eve: EVE = {
      id: Date.now().toString(),
      name: eveData.name || 'New EVE',
      role: eveData.role || 'Specialist',
      status: 'idle',
      type: eveData.type || 'specialist',
      capabilities: eveData.capabilities || [],
      performance: {
        efficiency: 0,
        accuracy: 0,
        tasks_completed: 0
      },
      models: eveData.models || []
    };

    this.activeEVEs.set(eve.id, eve);
    return eve;
  }

  public async createTask(taskData: Omit<Task, 'id' | 'status' | 'createdAt'>): Promise<Task> {
    await this.validateCompany();

    if (!taskData.assignedTo || !this.activeEVEs.has(taskData.assignedTo)) {
      throw new Error('Invalid EVE assignment');
    }

    return await this.taskQueue.addTask(taskData);
  }

  public async getTaskQueue(eveId: string): Promise<Task[]> {
    return await this.taskQueue.getTasks(eveId);
  }

  public async updateTaskStatus(
    taskId: string,
    status: Task['status'],
    result?: any
  ): Promise<void> {
    await this.taskQueue.updateTaskStatus(taskId, status, result);
  }

  public async reassignTask(taskId: string, newEVEId: string): Promise<void> {
    if (!this.activeEVEs.has(newEVEId)) {
      throw new Error('Invalid EVE assignment');
    }
    await this.taskQueue.reassignTask(taskId, newEVEId);
  }
}