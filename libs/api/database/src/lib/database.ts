import { Kysely } from 'kysely';
import { UserRow } from './user.row';

export interface Database {
  users: UserRow;
}

export type KyselyDatabase = Kysely<Database>;
