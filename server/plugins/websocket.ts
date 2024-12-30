import fp from 'fastify-plugin';
import websocket from '@fastify/websocket';
import { FastifyPluginAsync } from 'fastify';
import { WebSocket } from 'ws';
import { Redis } from 'ioredis';
import { z } from 'zod';

const MessageSchema = z.object({
  type: z.enum(['task_update', 'eve_status', 'system_alert']),
  payload: z.any(),
  timestamp: z.string().datetime(),
});

declare module 'fastify' {
  interface FastifyInstance {
    wsClients: Map<string, WebSocket>;
    wsRedis: Redis;
  }
}

const websocketPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // Initialize Redis for pub/sub
  const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  });

  // Store WebSocket clients
  const clients = new Map<string, WebSocket>();

  // Decorate fastify instance with WebSocket clients and Redis
  fastify.decorate('wsClients', clients);
  fastify.decorate('wsRedis', redis);

  // Register WebSocket plugin
  await fastify.register(websocket);

  // WebSocket route
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    const { socket } = connection;
    const clientId = req.headers['x-client-id'] as string;

    if (!clientId) {
      socket.close(1008, 'Client ID required');
      return;
    }

    // Store client connection
    clients.set(clientId, socket);

    // Subscribe to Redis channels
    const subscriber = redis.duplicate();
    subscriber.subscribe('system_events', 'task_updates', 'eve_status');

    subscriber.on('message', (channel, message) => {
      try {
        const parsedMessage = JSON.parse(message);
        MessageSchema.parse(parsedMessage);
        socket.send(message);
      } catch (err) {
        fastify.log.error('Invalid message format:', err);
      }
    });

    // Handle client messages
    socket.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        MessageSchema.parse(message);
        
        // Broadcast message to relevant subscribers
        await redis.publish('system_events', JSON.stringify(message));
      } catch (err) {
        fastify.log.error('Error processing message:', err);
      }
    });

    // Cleanup on disconnect
    socket.on('close', () => {
      clients.delete(clientId);
      subscriber.quit();
    });
  });

  // Cleanup on server shutdown
  fastify.addHook('onClose', async () => {
    for (const client of clients.values()) {
      client.close();
    }
    await redis.quit();
  });
});

export default websocketPlugin;