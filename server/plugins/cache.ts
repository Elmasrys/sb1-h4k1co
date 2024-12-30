import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Redis } from 'ioredis';

declare module 'fastify' {
  interface FastifyInstance {
    cache: CacheService;
  }
}

class CacheService {
  private redis: Redis;
  private defaultTTL: number;

  constructor(config: { host: string; port: number; defaultTTL?: number }) {
    this.redis = new Redis({
      host: config.host,
      port: config.port,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });

    this.defaultTTL = config.defaultTTL || 3600; // 1 hour default
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.error('Cache get error:', err);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await this.redis.setex(key, ttl, serialized);
      } else {
        await this.redis.setex(key, this.defaultTTL, serialized);
      }
    } catch (err) {
      console.error('Cache set error:', err);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (err) {
      console.error('Cache delete error:', err);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.redis.flushall();
    } catch (err) {
      console.error('Cache clear error:', err);
    }
  }

  async quit(): Promise<void> {
    await this.redis.quit();
  }
}

const cachePlugin: FastifyPluginAsync = fp(async (fastify) => {
  const cache = new CacheService({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    defaultTTL: parseInt(process.env.CACHE_TTL || '3600'),
  });

  fastify.decorate('cache', cache);

  fastify.addHook('onClose', async () => {
    await cache.quit();
  });
});

export default cachePlugin;