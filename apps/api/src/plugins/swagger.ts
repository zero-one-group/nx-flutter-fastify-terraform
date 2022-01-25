import fp from 'fastify-plugin';
import swaggerPlugin, { FastifySwaggerOptions } from 'fastify-swagger';

import { environment } from '../environments/environment';

export const swagger = fp<FastifySwaggerOptions>(async (fastify) => {
  fastify.register(swaggerPlugin, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'API Documentation',
        description: 'API Documentation ',
        version: '1.0.0',
      },
      host: `${environment.host}:${environment.port}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      definitions: {},
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    uiConfig: {
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
});
