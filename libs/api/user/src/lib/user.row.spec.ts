import { UserRow } from '@nx-flutter-fastify-terraform/api/database';
import { expectType } from 'ts-expect';

describe('user types', () => {
  const user = {
    id: 'abc',
    name: 'abc',
    email: 'abc',
    password: 'abc',
    is_active: true,
    is_admin: true,
    last_login: 'abc',
    created_at: 'abc',
    updated_at: 'abc',
    deleted_at: 'abc',
  };

  it('happy path', () => {
    expectType<UserRow>(user);
  });
});
