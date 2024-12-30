import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { FastifyPluginAsync } from 'fastify';

const swaggerPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      info: {
        title: 'mavrika API Documentation',
        description: 'API documentation for the mavrika EVE™ Platform',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    staticCSP: true,
  });
});

export default swaggerPlugin;