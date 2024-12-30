import { FastifyPluginAsync } from 'fastify';
import { EVEModelSchema } from '../../models/eve';
import { createEVEHandler } from './handlers/create';
import { getEVEHandler } from './handlers/get';
import { updateEVEHandler } from './handlers/update';
import { deleteEVEHandler } from './handlers/delete';
import { listEVEsHandler } from './handlers/list';

const eveRoutes: FastifyPluginAsync = async (fastify) => {
  // Create EVE
  fastify.post('/', {
    schema: {
      body: EVEModelSchema.omit({ id: true, created_at: true, updated_at: true }),
      response: {
        201: EVEModelSchema
      },
      security: [{ bearerAuth: [] }]
    },
    handler: createEVEHandler
  });

  // Get EVE by ID
  fastify.get('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }
        },
        required: ['id']
      },
      response: {
        200: EVEModelSchema
      },
      security: [{ bearerAuth: [] }]
    },
    handler: getEVEHandler
  });

  // Update EVE
  fastify.patch('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }
        },
        required: ['id']
      },
      body: EVEModelSchema.partial().omit({ id: true, created_at: true, updated_at: true }),
      response: {
        200: EVEModelSchema
      },
      security: [{ bearerAuth: [] }]
    },
    handler: updateEVEHandler
  });

  // Delete EVE
  fastify.delete('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' }
        },
        required: ['id']
      },
      response: {
        204: {
          type: 'null'
        }
      },
      security: [{ bearerAuth: [] }]
    },
    handler: deleteEVEHandler
  });

  // List EVEs
  fastify.get('/', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['orchestrator', 'specialist', 'support'] },
          status: { type: 'string', enum: ['active', 'busy', 'idle'] },
          limit: { type: 'number', minimum: 1, maximum: 100, default: 10 },
          offset: { type: 'number', minimum: 0, default: 0 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: EVEModelSchema
            },
            total: { type: 'number' },
            limit: { type: 'number' },
            offset: { type: 'number' }
          }
        }
      },
      security: [{ bearerAuth: [] }]
    },
    handler: listEVEsHandler
  });
};

export default eveRoutes;