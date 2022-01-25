import { FastifyPluginAsync } from 'fastify';
import {
  UserCreate,
  UserCreateSchema,
  UserResponse,
  UserResponseSchema,
} from './user.schema';

import { createUser, findUserById } from './user.impl';
import { Kysely } from 'kysely';
import { Database } from '@nx-flutter-fastify-terraform/api/database';
import {
  ParamByID,
  ParamByIDSchema,
} from '@nx-flutter-fastify-terraform/api/shared';

import {
  ErrorSchema,
  Result,
  sendResult,
} from '@nx-flutter-fastify-terraform/helper/result';
import { StatusCodes } from 'http-status-codes';

export interface AppOptions {
  db: Kysely<Database>;
}

export const userRoute: FastifyPluginAsync<AppOptions> = async function (
  fastify,
  opt
): Promise<void> {
  fastify.post<{ Body: UserCreate; Reply: UserResponse }>(
    '/',
    {
      schema: {
        body: UserCreateSchema,
        response: {
          201: UserResponseSchema,
          500: ErrorSchema,
        },
      },
    },
    async function (request, reply) {
      const result: Result<UserResponse> = await createUser(
        opt.db,
        request.body
      );
      sendResult(result, reply, StatusCodes.CREATED);
    }
  );

  fastify.get<{ Params: ParamByID; Reply: UserResponse }>(
    '/:id',
    {
      schema: {
        params: ParamByIDSchema,
        response: {
          200: UserResponseSchema,
          404: ErrorSchema,
          500: ErrorSchema,
        },
      },
    },
    async function (request, reply) {
      const result: Result<UserResponse> = await findUserById(
        opt.db,
        request.params.id
      );
      sendResult(result, reply);
    }
  );
};
