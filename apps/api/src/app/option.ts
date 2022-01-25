import { Kysely } from 'kysely';

import { Database } from './db';

export interface AppOptions {
  db: Kysely<Database>;
}
