import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import config from './config';
import authPlugin from './plugins/auth';
import swaggerPlugin from './plugins/swagger';
import rateLimitPlugin from './plugins/rate-limit';
import websocketPlugin from './plugins/websocket';
import queuePlugin from './plugins/queue';
import cachePlugin from './plugins/cache';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
fastify.register(cors, {
  origin: config.cors.origin,
  credentials: true,
});

fastify.register(jwt, {
  secret: config.jwt.secret,
});

fastify.register(authPlugin);
fastify.register(swaggerPlugin);
fastify.register(rateLimitPlugin);
fastify.register(websocketPlugin);
fastify.register(queuePlugin);
fastify.register(cachePlugin);

// Health check route
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({
      port: config.server.port,
      host: config.server.host,
    });
    fastify.log.info(`Server listening on ${config.server.host}:${config.server.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();