import { FastifyPluginAsync } from 'fastify';
import { AppOptions } from './option';

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opt
): Promise<void> => {
  fastify.get('/', (_, reply) => {
    reply.code(200).send({ root: 'root api' });
  });
};

export default app;
export { app };
