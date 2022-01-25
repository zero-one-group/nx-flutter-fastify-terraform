import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(db.raw('gen_random_uuid()'))
    )
    .addColumn('name', 'text')
    .addColumn('email', 'text', (col) => col.unique())
    .addColumn('password', 'text')
    .addColumn('is_active', 'boolean', (col) => col.defaultTo(true))
    .addColumn('is_admin', 'boolean', (col) => col.defaultTo(false))
    .addColumn('last_login', 'timestamp', (col) =>
      col.defaultTo(db.raw('NOW()'))
    )
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(db.raw('NOW()'))
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(db.raw('NOW()'))
    )
    .addColumn('deleted_at', 'timestamp')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute();
}
