import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';
import { FastifyPluginAsync } from 'fastify';
import config from '../config';

const rateLimitPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(rateLimit, {
    max: config.rateLimit.max,
    timeWindow: config.rateLimit.timeWindow,
    errorResponseBuilder: (req, context) => ({
      code: 429,
      error: 'Too Many Requests',
      message: `Rate limit exceeded, retry in ${context.after}`,
      date: Date.now(),
      expiresIn: context.after,
    }),
  });
});

export default rateLimitPlugin;