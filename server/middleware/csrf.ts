import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { randomBytes } from 'crypto';

const csrfPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // Generate CSRF token
  fastify.addHook('onRequest', async (request, reply) => {
    if (request.method === 'GET') {
      const token = randomBytes(32).toString('hex');
      reply.header('X-CSRF-Token', token);
    }
  });

  // Validate CSRF token
  fastify.addHook('onRequest', async (request, reply) => {
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const token = request.headers['x-csrf-token'];
      const storedToken = request.headers['x-csrf-token'];

      if (!token || token !== storedToken) {
        reply.code(403).send({ error: 'Invalid CSRF token' });
      }
    }
  });
});

export default csrfPlugin;