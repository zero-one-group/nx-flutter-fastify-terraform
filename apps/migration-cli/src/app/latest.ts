import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';
import * as path from 'path';
import type { CommandBuilder } from 'yargs';

type Options = {
  option: string;
};

export const command = 'latest';
export const desc = 'Migrate latest migration using Kysely';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs.positional('latest', { type: 'string', demandOption: true });

export const handler = async () => {
  await migrateToLatest();
  process.exit(0);
};

export async function migrateToLatest() {
  const pgOptions = {
    connectionString:
      process.env['DATABSE_URL'] ||
      'postgresql://postgres:postgres@localhost:5432/api?schema=public',
  };

  const db = new Kysely({
    dialect: new PostgresDialect(pgOptions),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider(
      // Path to the folder that contains all your migrations.
      path.join(__dirname, 'migrations')
    ),
  });

  const { error, results } = await migrator.migrateToLatest();

  // Destroy the `Kysely` instance to make the script exit faster.
  await db.destroy();

  if (results?.length !== 0) {
    results?.forEach((it) => {
      if (it.status === 'Success') {
        console.log(
          `migration "${it.migrationName}" was executed successfully`
        );
      } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    });
  } else {
    console.log('nothing to migrate');
  }

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }
}
