import { Static, Type } from '@sinclair/typebox';

import { Nullable } from './generics';

export const UserRowSchema = Type.Object({
  id: Type.String(),
  mcom_id: Nullable(Type.String()),
  mdiv_id: Nullable(Type.String()),
  muser_id: Type.String(),
  muser_email: Type.String({ format: 'email' }),
  muser_detname: Type.String(),
  muser_extphone: Type.String(),
  muser_password: Type.String(),
  muser_lastlogin: Type.String(),
  muser_status: Type.Boolean(),
  muser_entdate: Type.String(),
  muser_entuser_id: Nullable(Type.String()),
  muser_moddate: Type.String(),
  muser_moduser_id: Nullable(Type.String()),
});

export type UserRow = Static<typeof UserRowSchema>;
