import { UserRowSchema } from '@nx-flutter-fastify-terraform/api/database';
import { Static, Type } from '@sinclair/typebox';

export const UserCreateSchema = Type.Omit(UserRowSchema, [
  'id',
  'is_active',
  'is_admin',
  'last_login',
  'created_at',
  'updated_at',
  'deleted_at',
]);

export const UserResponseSchema = Type.Omit(UserRowSchema, ['password']);

export const LoginSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

export const TokenSchema = Type.Object({
  token: Type.String(),
});
export const RolesArray = Type.Array(Type.String());
export const RolesSchema = Type.Object({
  roles: RolesArray,
});
export const UserWRolesSchema = Type.Union([UserResponseSchema, RolesSchema]);

export type UserCreate = Static<typeof UserCreateSchema>;
export type Login = Static<typeof LoginSchema>;
export type UserRow = Static<typeof UserRowSchema>;
export type UserResponse = Static<typeof UserResponseSchema>;
export type TokenResponse = Static<typeof TokenSchema>;
export type Roles = Static<typeof RolesArray>;
export type UserWRoles = Static<typeof UserWRolesSchema>;
