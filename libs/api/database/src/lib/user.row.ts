import { Static, Type } from '@sinclair/typebox';

import { Nullable } from './generics';

export const UserRowSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
  is_active: Type.Boolean(),
  is_admin: Type.Boolean(),
  last_login: Nullable(Type.String()),
  created_at: Type.String(),
  updated_at: Type.String(),
  deleted_at: Nullable(Type.String()),
});

export type UserRow = Static<typeof UserRowSchema>;
