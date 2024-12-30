import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { createClient } from '@supabase/supabase-js';
import config from '../config';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string;
      email: string;
      role: string;
    } | null;
  }
}

const authPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const supabase = createClient(config.supabase.url, config.supabase.anonKey);

  fastify.decorateRequest('user', null);

  fastify.addHook('onRequest', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      request.user = null;
      return;
    }

    try {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        reply.code(401).send({ error: 'Invalid or expired token' });
        return;
      }

      request.user = {
        id: user.id,
        email: user.email!,
        role: user.role || 'user',
      };
    } catch (err) {
      request.log.error(err, 'Auth verification failed');
      reply.code(401).send({ error: 'Authentication failed' });
    }
  });
});

export default authPlugin;