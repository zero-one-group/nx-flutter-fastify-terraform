import 'pg';

import fastify from 'fastify';
import { Kysely } from 'kysely';

import { app } from './app/app';
import { connectDatabase } from './app/db';
import { environment } from './environments/environment';
import { cors, swagger } from './plugins';

import { Database } from './app/db';

const buildServer = (db: Kysely<Database>) => {
  const server = fastify({
    logger: {
      prettyPrint: !environment.production,
    },
  });

  db.raw('select 1')
    .execute()
    .then(() => {
      server.log.info('Database connected');
    })
    .catch((e) => {
      server.log.error(e);
      process.kill(process.pid, 'SIGINT');
    });

  async function closeGracefully(signal: string) {
    server.log.info(`*^!@4=> Received signal to terminate: ${signal}`);

    await db.destroy();
    await server.close();
    process.exit();
  }

  process.on('SIGINT', closeGracefully);
  process.on('SIGTERM', closeGracefully);

  // Register the plugin
  server.register(swagger);
  server.register(cors);

  // Register the app
  server.register(app, { db });

  return server;
};

// Start your server
const db = connectDatabase(environment.databaseUrl);
const server = buildServer(db);

server.listen(
  { port: environment.port, host: environment.host },
  (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(0);
    }
    server.log.info(`Server listening at ${address}`);
    if (!environment.production) {
      server.log.info(`Swagger for testing at: ${address}/docs`);
    }
  }
);
