import { useState, useCallback, useEffect } from 'react';
import { EVE, EVEMessage } from '../types/eve';
import { EVECommunicationService } from '../services/eve-communication';

export function useEVECommunication(eve: EVE) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<EVEMessage[]>([]);
  const communicationService = EVECommunicationService.getInstance();

  useEffect(() => {
    const messageHandler = async (message: EVEMessage) => {
      setMessages(prev => [...prev, message]);
    };

    communicationService.registerMessageHandler(eve.id, messageHandler);
    return () => {
      communicationService.unregisterMessageHandler(eve.id, messageHandler);
    };
  }, [eve.id]);

  const sendMessage = useCallback(async (
    toEVE: EVE,
    content: string,
    options?: {
      type?: EVEMessage['type'];
      priority?: EVEMessage['priority'];
      metadata?: EVEMessage['metadata'];
    }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await communicationService.sendMessage(eve, toEVE, content, options);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [eve]);

  const broadcast = useCallback(async (
    content: string,
    options?: {
      filter?: (eve: EVE) => boolean;
      priority?: EVEMessage['priority'];
      metadata?: EVEMessage['metadata'];
    }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const responses = await communicationService.broadcast(eve, content, options);
      return responses;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [eve]);

  const delegateTask = useCallback(async (
    toEVE: EVE,
    task: string,
    options?: {
      priority?: EVEMessage['priority'];
      deadline?: Date;
      context?: Record<string, any>;
    }
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await communicationService.delegateTask(eve, toEVE, task, options);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [eve]);

  const updateTaskStatus = useCallback(async (
    taskId: string,
    status: 'pending' | 'in_progress' | 'completed' | 'failed',
    result?: any
  ) => {
    setLoading(true);
    setError(null);
    try {
      await communicationService.updateTaskStatus(eve.id, taskId, status, result);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [eve.id]);

  const getMessages = useCallback(async () => {
    try {
      const messages = await communicationService.getMessages(eve.id);
      setMessages(messages);
      return messages;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [eve.id]);

  const markMessageAsRead = useCallback(async (message: EVEMessage) => {
    try {
      await communicationService.markMessageAsRead(message);
      setMessages(prev => prev.map(m => 
        m.id === message.id 
          ? { ...m, status: 'read', read_at: new Date() }
          : m
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const markMessageAsProcessed = useCallback(async (message: EVEMessage) => {
    try {
      await communicationService.markMessageAsProcessed(message);
      setMessages(prev => prev.map(m => 
        m.id === message.id 
          ? { ...m, status: 'processed', processed_at: new Date() }
          : m
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    messages,
    sendMessage,
    broadcast,
    delegateTask,
    updateTaskStatus,
    getMessages,
    markMessageAsRead,
    markMessageAsProcessed,
    loading,
    error
  };
}