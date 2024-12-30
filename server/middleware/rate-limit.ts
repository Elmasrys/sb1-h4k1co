import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';

const rateLimitPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(rateLimit, {
    max: 100, // Max requests per window
    timeWindow: '1 minute',
    allowList: ['127.0.0.1'], // Whitelist localhost
    keyGenerator: (request) => {
      // Use IP and user ID if available for rate limiting
      const ip = request.ip;
      const userId = request.user?.id;
      return userId ? `${ip}-${userId}` : ip;
    },
    errorResponseBuilder: (request, context) => ({
      code: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded, retry in ${context.after}`,
      date: Date.now(),
      expiresIn: context.after,
    }),
  });
});

export default rateLimitPlugin;