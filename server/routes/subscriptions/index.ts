import { FastifyPluginAsync } from 'fastify';
import { createSubscriptionHandler } from './handlers/create';
import { cancelSubscriptionHandler } from './handlers/cancel';
import { getCurrentSubscriptionHandler } from './handlers/get-current';
import { updateSubscriptionHandler } from './handlers/update';
import { SubscriptionSchema } from '../../../src/types/subscription';

const subscriptionRoutes: FastifyPluginAsync = async (fastify) => {
  // Create subscription
  fastify.post('/', {
    schema: {
      body: SubscriptionSchema,
      response: {
        201: SubscriptionSchema
      }
    },
    handler: createSubscriptionHandler
  });

  // Get current subscription
  fastify.get('/current', {
    schema: {
      response: {
        200: SubscriptionSchema
      }
    },
    handler: getCurrentSubscriptionHandler
  });

  // Update subscription
  fastify.patch('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }
        }
      },
      body: SubscriptionSchema.partial(),
      response: {
        200: SubscriptionSchema
      }
    },
    handler: updateSubscriptionHandler
  });

  // Cancel subscription
  fastify.post('/cancel', {
    handler: cancelSubscriptionHandler
  });
};

export default subscriptionRoutes;