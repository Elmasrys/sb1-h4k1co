import { nanoid } from 'nanoid';
import { Task, TaskStatus } from './types';
import { EventEmitter } from './events';

export class TaskQueue {
  private tasks: Map<string, Task[]> = new Map();
  private processingTasks: Map<string, Task> = new Map();
  private events: EventEmitter;

  constructor() {
    this.events = new EventEmitter();
  }

  async addTask(task: Omit<Task, 'id' | 'status' | 'createdAt'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: nanoid(),
      status: 'pending',
      createdAt: new Date()
    };

    const queue = this.tasks.get(task.assignedTo) || [];
    queue.push(newTask);
    this.tasks.set(task.assignedTo, queue);

    this.events.emit('taskAdded', newTask);
    return newTask;
  }

  async getTask(taskId: string): Promise<Task | null> {
    for (const tasks of this.tasks.values()) {
      const task = tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return null;
  }

  async getTasks(eveId: string): Promise<Task[]> {
    return this.tasks.get(eveId) || [];
  }

  async updateTaskStatus(taskId: string, status: TaskStatus, result?: any): Promise<void> {
    for (const [eveId, tasks] of this.tasks.entries()) {
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        const updatedTask = {
          ...tasks[taskIndex],
          status,
          result,
          completedAt: ['completed', 'failed', 'cancelled'].includes(status) ? new Date() : undefined
        };
        tasks[taskIndex] = updatedTask;
        this.tasks.set(eveId, tasks);
        this.events.emit('taskUpdated', updatedTask);
        break;
      }
    }
  }

  async cancelTask(taskId: string): Promise<void> {
    const task = await this.getTask(taskId);
    if (!task) throw new Error('Task not found');

    await this.updateTaskStatus(taskId, 'cancelled');
    this.processingTasks.delete(taskId);
    this.events.emit('taskCancelled', task);
  }

  async reassignTask(taskId: string, newEveId: string): Promise<void> {
    const task = await this.getTask(taskId);
    if (!task) throw new Error('Task not found');

    // Remove from old queue
    const oldQueue = this.tasks.get(task.assignedTo) || [];
    const newOldQueue = oldQueue.filter(t => t.id !== taskId);
    this.tasks.set(task.assignedTo, newOldQueue);

    // Add to new queue
    const newQueue = this.tasks.get(newEveId) || [];
    const updatedTask = { ...task, assignedTo: newEveId };
    newQueue.push(updatedTask);
    this.tasks.set(newEveId, newQueue);

    this.events.emit('taskReassigned', { task: updatedTask, previousEveId: task.assignedTo });
  }

  onTaskAdded(handler: (task: Task) => void): () => void {
    return this.events.on('taskAdded', handler);
  }

  onTaskUpdated(handler: (task: Task) => void): () => void {
    return this.events.on('taskUpdated', handler);
  }

  onTaskCancelled(handler: (task: Task) => void): () => void {
    return this.events.on('taskCancelled', handler);
  }

  onTaskReassigned(handler: (data: { task: Task; previousEveId: string }) => void): () => void {
    return this.events.on('taskReassigned', handler);
  }
}