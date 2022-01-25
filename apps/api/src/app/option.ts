import { Kysely } from 'kysely';
import { Database } from '@nx-flutter-fastify-terraform/api/database';

export interface AppOptions {
  db: Kysely<Database>;
}
