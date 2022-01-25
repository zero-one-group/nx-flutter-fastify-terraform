import { TSchema, Type } from '@sinclair/typebox';

export const Nullable = <T extends TSchema>(type: T) =>
  Type.Union([type, Type.Null()]);
