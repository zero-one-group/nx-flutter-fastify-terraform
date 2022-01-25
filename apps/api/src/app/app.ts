import { FastifyPluginAsync } from 'fastify';
import { AppOptions } from './option';
import { userRoute } from '@nx-flutter-fastify-terraform/api/user';

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opt
): Promise<void> => {
  fastify.get('/', (_, reply) => {
    reply.code(200).send({ root: 'root api' });
  });

  fastify.register(userRoute, {
    db: opt.db,
    prefix: '/api/v1/users',
  });
};

export default app;
export { app };
