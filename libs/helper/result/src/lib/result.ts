import { R } from '@mobily/ts-belt';
import { Static, Type } from '@sinclair/typebox';
import { FastifyReply } from 'fastify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export interface Error {
  code: StatusCodes;
  reason: string;
  messages: string[];
}

export const ErrorSchema = Type.Object({
  error: Type.String(),
  message: Type.String(),
});

export type ResponseError = Static<typeof ErrorSchema>;

export type Result<T> = R.Result<T, Error>;

function parseStatusCode(message: string) {
  const badRequestKeywords = [
    'invalid input syntax for type',
    'violates foreign key constraint',
    'received unexpected keys:',
    'parse error:',
  ];
  if (badRequestKeywords.some((kw) => message.includes(kw))) {
    return StatusCodes.BAD_REQUEST;
  }
  if (message.includes('Auth Failure:')) {
    return StatusCodes.UNAUTHORIZED;
  }
  return StatusCodes.INTERNAL_SERVER_ERROR;
}

export function toError(err: unknown): Error {
  if (err instanceof Error) {
    const statusCode = parseStatusCode(err.message);
    return {
      code: statusCode,
      reason: err.name,
      messages: [err.message],
    };
  } else {
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: ReasonPhrases.INTERNAL_SERVER_ERROR,
      messages: [`${err}`],
    };
  }
}

export function sendResult<T>(
  result: Result<T>,
  reply: FastifyReply,
  code = 200
): void {
  R.match(
    result,
    (value) => {
      if (value === undefined) {
        reply.code(StatusCodes.NOT_FOUND).send({
          error: ReasonPhrases.NOT_FOUND,
          message: 'entity not found',
        });
      }
      reply.code(code).send(value);
    },
    (error) =>
      reply.code(error.code).send({
        error: error.reason,
        message: error.messages.join('\n'),
      })
  );
}
