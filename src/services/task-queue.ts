import { nanoid } from 'nanoid';
import { Task, TaskSchema } from '../types/task';
import { EVE } from '../types/eve';

export class TaskQueueService {
  private static instance: TaskQueueService | null = null;
  private taskQueue: Map<string, Task[]> = new Map();
  private processingTasks: Map<string, Task> = new Map();
  private queueProcessor: NodeJS.Timer | null = null;

  private constructor() {
    this.initializeQueueProcessor();
  }

  public static getInstance(): TaskQueueService {
    if (!TaskQueueService.instance) {
      TaskQueueService.instance = new TaskQueueService();
    }
    return TaskQueueService.instance;
  }

  private initializeQueueProcessor(): void {
    if (this.queueProcessor) return;

    this.queueProcessor = setInterval(() => {
      this.processNextTasks();
    }, 1000); // Process queue every second
  }

  private async processNextTasks(): Promise<void> {
    const now = new Date();

    for (const [eveId, tasks] of this.taskQueue.entries()) {
      const pendingTasks = tasks.filter(task => 
        task.status === 'pending' && 
        (!task.scheduledFor || task.scheduledFor <= now) &&
        (!task.dependencies?.length || this.areDependenciesMet(task))
      );

      for (const task of pendingTasks) {
        if (!this.processingTasks.has(task.id)) {
          await this.startTaskProcessing(task);
        }
      }
    }
  }

  private areDependenciesMet(task: Task): boolean {
    if (!task.dependencies) return true;
    
    return task.dependencies.every(depId => {
      const depTask = this.findTaskById(depId);
      return depTask && depTask.status === 'completed';
    });
  }

  private findTaskById(taskId: string): Task | null {
    for (const tasks of this.taskQueue.values()) {
      const task = tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return null;
  }

  private async startTaskProcessing(task: Task): Promise<void> {
    this.processingTasks.set(task.id, task);
    this.updateTaskStatus(task.id, 'in_progress');

    try {
      // In a real implementation, we would wait for the EVE to complete the task
      // For now, we'll simulate task completion after a delay
      setTimeout(() => {
        this.completeTask(task.id);
      }, Math.random() * 5000 + 1000);

    } catch (error) {
      console.error(`Error processing task ${task.id}:`, error);
      this.failTask(task.id, error.message);
    }
  }

  async createTask(taskData: Omit<Task, 'id' | 'status' | 'createdAt'>): Promise<Task> {
    const task: Task = {
      ...taskData,
      id: nanoid(),
      status: 'pending',
      createdAt: new Date()
    };

    const queue = this.taskQueue.get(task.assignedTo) || [];
    queue.push(task);
    this.taskQueue.set(task.assignedTo, queue);

    return task;
  }

  async cancelTask(taskId: string): Promise<void> {
    const task = this.findTaskById(taskId);
    if (!task) throw new Error('Task not found');

    this.updateTaskStatus(taskId, 'cancelled');
    this.processingTasks.delete(taskId);
  }

  async getTaskQueue(eveId: string): Promise<Task[]> {
    return this.taskQueue.get(eveId) || [];
  }

  async getTask(taskId: string): Promise<Task | null> {
    return this.findTaskById(taskId);
  }

  async reassignTask(taskId: string, newEveId: string): Promise<void> {
    const task = this.findTaskById(taskId);
    if (!task) throw new Error('Task not found');

    // Remove from old queue
    const oldQueue = this.taskQueue.get(task.assignedTo) || [];
    const newOldQueue = oldQueue.filter(t => t.id !== taskId);
    this.taskQueue.set(task.assignedTo, newOldQueue);

    // Add to new queue
    const newQueue = this.taskQueue.get(newEveId) || [];
    task.assignedTo = newEveId;
    newQueue.push(task);
    this.taskQueue.set(newEveId, newQueue);
  }

  private updateTaskStatus(taskId: string, status: TaskStatus, error?: string): void {
    for (const [eveId, tasks] of this.taskQueue.entries()) {
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        const updatedTask = {
          ...tasks[taskIndex],
          status,
          error,
          completedAt: ['completed', 'failed', 'cancelled'].includes(status) ? new Date() : undefined
        };
        tasks[taskIndex] = updatedTask;
        this.taskQueue.set(eveId, tasks);
        break;
      }
    }
  }

  private completeTask(taskId: string): void {
    this.updateTaskStatus(taskId, 'completed');
    this.processingTasks.delete(taskId);
  }

  private failTask(taskId: string, error: string): void {
    this.updateTaskStatus(taskId, 'failed', error);
    this.processingTasks.delete(taskId);
  }

  // Cleanup method for testing/development
  public destroy(): void {
    if (this.queueProcessor) {
      clearInterval(this.queueProcessor);
      this.queueProcessor = null;
    }
  }
}