import { Kysely } from 'kysely';
import { UserRow } from './user';

export interface Database {
  users: UserRow;
}

export type KyselyDatabase = Kysely<Database>;
