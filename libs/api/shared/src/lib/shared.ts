import { Type, Static } from '@sinclair/typebox';

export const ParamByIDSchema = Type.Object({
  id: Type.String(),
});

export type ParamByID = Static<typeof ParamByIDSchema>;
