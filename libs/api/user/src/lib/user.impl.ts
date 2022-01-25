import { UserCreate } from './user.schema';
import { R } from '@mobily/ts-belt';
import { Result, toError } from '@nx-flutter-fastify-terraform/helper/result';
import { Database, UserRow } from '@nx-flutter-fastify-terraform/api/database';
import { Kysely } from 'kysely';

export const createUser = async (
  db: Kysely<Database>,
  user: UserCreate
): Promise<Result<UserRow>> => {
  try {
    const [createdUser] = await db
      .insertInto('users')
      .values({
        id: db.generated,
        is_active: true,
        is_admin: false,
        last_login: null,
        created_at: db.generated,
        updated_at: db.generated,
        deleted_at: null,
        ...user,
      })
      .returningAll()
      .execute();

    return R.Ok(createdUser);
  } catch (err) {
    return R.Error(toError(err));
  }
};

// find user byid
export const findUserById = async (
  db: Kysely<Database>,
  id: string
): Promise<Result<UserRow | undefined>> => {
  try {
    const [user] = await db
      .selectFrom('users')
      .where('id', '=', id)
      .selectAll('users')
      .execute();
    return R.Ok(user);
  } catch (err) {
    return R.Error(toError(err));
  }
};

// find user by email
export const findUserByEmail = async (
  db: Kysely<Database>,
  email: string,
  password: string
): Promise<Result<UserRow | undefined>> => {
  try {
    const [user] = await db
      .selectFrom('users')
      .where('email', '=', email)
      .where('password', '=', password)
      .selectAll('users')
      .execute();
    return R.Ok(user);
  } catch (err) {
    return R.Error(toError(err));
  }
};
