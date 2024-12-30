import { useState, useCallback } from 'react';
import { Task } from '../types/task';
import { TaskQueueService } from '../services/task-queue';

export function useTaskQueue(eveId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const taskQueueService = TaskQueueService.getInstance();

  const createTask = useCallback(async (taskData: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const task = await taskQueueService.createTask(taskData);
      return task;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelTask = useCallback(async (taskId: string) => {
    setLoading(true);
    setError(null);
    try {
      await taskQueueService.cancelTask(taskId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTaskQueue = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queue = await taskQueueService.getTaskQueue(eveId);
      return queue;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [eveId]);

  const getTask = useCallback(async (taskId: string) => {
    setLoading(true);
    setError(null);
    try {
      const task = await taskQueueService.getTask(taskId);
      return task;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reassignTask = useCallback(async (taskId: string, newEveId: string) => {
    setLoading(true);
    setError(null);
    try {
      await taskQueueService.reassignTask(taskId, newEveId);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createTask,
    cancelTask,
    getTaskQueue,
    getTask,
    reassignTask,
    loading,
    error
  };
}