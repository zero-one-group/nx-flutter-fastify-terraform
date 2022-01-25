import { Kysely, PostgresDialect } from 'kysely';

export interface Database {
  users: string;
}

export function connectDatabase(connectionString: string) {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      connectionString,
    }),
  });
}
