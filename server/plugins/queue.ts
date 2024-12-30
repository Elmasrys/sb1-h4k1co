import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Queue, Worker, QueueScheduler } from 'bullmq';
import { Redis } from 'ioredis';

declare module 'fastify' {
  interface FastifyInstance {
    taskQueue: Queue;
    analysisQueue: Queue;
    communicationQueue: Queue;
  }
}

const queuePlugin: FastifyPluginAsync = fp(async (fastify) => {
  const connection = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  });

  // Create queues
  const taskQueue = new Queue('tasks', { connection });
  const analysisQueue = new Queue('analysis', { connection });
  const communicationQueue = new Queue('communication', { connection });

  // Initialize schedulers
  new QueueScheduler('tasks', { connection });
  new QueueScheduler('analysis', { connection });
  new QueueScheduler('communication', { connection });

  // Task queue worker
  new Worker('tasks', async (job) => {
    try {
      fastify.log.info(`Processing task: ${job.id}`);
      // Process task based on job data
      await processTask(job.data);
      return { success: true };
    } catch (err) {
      fastify.log.error(`Task processing error: ${err}`);
      throw err;
    }
  }, { connection });

  // Analysis queue worker
  new Worker('analysis', async (job) => {
    try {
      fastify.log.info(`Processing analysis: ${job.id}`);
      // Process analysis based on job data
      await processAnalysis(job.data);
      return { success: true };
    } catch (err) {
      fastify.log.error(`Analysis processing error: ${err}`);
      throw err;
    }
  }, { connection });

  // Communication queue worker
  new Worker('communication', async (job) => {
    try {
      fastify.log.info(`Processing communication: ${job.id}`);
      // Process communication based on job data
      await processCommunication(job.data);
      return { success: true };
    } catch (err) {
      fastify.log.error(`Communication processing error: ${err}`);
      throw err;
    }
  }, { connection });

  // Decorate fastify instance with queues
  fastify.decorate('taskQueue', taskQueue);
  fastify.decorate('analysisQueue', analysisQueue);
  fastify.decorate('communicationQueue', communicationQueue);

  // Cleanup on server shutdown
  fastify.addHook('onClose', async () => {
    await Promise.all([
      taskQueue.close(),
      analysisQueue.close(),
      communicationQueue.close(),
      connection.quit(),
    ]);
  });
});

async function processTask(data: any) {
  // Task processing logic
}

async function processAnalysis(data: any) {
  // Analysis processing logic
}

async function processCommunication(data: any) {
  // Communication processing logic
}

export default queuePlugin;