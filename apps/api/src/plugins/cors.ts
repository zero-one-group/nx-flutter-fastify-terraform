import corsPlugin, { FastifyCorsOptions } from 'fastify-cors';
import fp from 'fastify-plugin';

export const cors = fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(corsPlugin, { origin: true });
});
