import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { AUTH_CONFIG } from '../config/constants';

const sessionPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // Register JWT plugin
  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET!,
    sign: {
      expiresIn: AUTH_CONFIG.SESSION_DURATION,
    },
  });

  // Add authentication hook
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      if (request.routeOptions.url.startsWith('/api')) {
        await request.jwtVerify();
      }
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });

  // Add user to request
  fastify.decorateRequest('user', null);
  fastify.addHook('onRequest', async (request) => {
    if (request.user) {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (token) {
        request.user = await fastify.jwt.decode(token);
      }
    }
  });
});

export default sessionPlugin;