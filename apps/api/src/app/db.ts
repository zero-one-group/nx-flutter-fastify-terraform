import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '@nx-flutter-fastify-terraform/api/database';

export function connectDatabase(connectionString: string) {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      connectionString,
    }),
  });
}
