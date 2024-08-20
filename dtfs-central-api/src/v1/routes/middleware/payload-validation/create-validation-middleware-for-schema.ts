import util from 'util';
import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { API_ERROR_CODE, ApiErrorCode, ApiErrorResponseBody } from '@ukef/dtfs2-common';

const getFormattedZodErrors = (error: ZodError): string[] => error.issues.map(({ path, message, code }) => `${path.join('.')}: ${message} (${code})`);

const getErrorCode = (error: ZodError): ApiErrorCode => {
  const foundErrorCode: ApiErrorCode | undefined = error.issues.reduce(
    (errorCode, { message }) => {
      if (errorCode) {
        return errorCode;
      }

      switch (message) {
        case API_ERROR_CODE.INVALID_AUDIT_DETAILS:
          return API_ERROR_CODE.INVALID_AUDIT_DETAILS;
        default:
          return undefined;
      }
    },
    undefined as ApiErrorCode | undefined,
  );
  return foundErrorCode ?? API_ERROR_CODE.INVALID_PAYLOAD;
};

export const createValidationMiddlewareForSchema =
  <TSchema extends AnyZodObject>(schema: TSchema) =>
  (req: Request, res: Response<ApiErrorResponseBody>, next: NextFunction) => {
    console.info({ stepDescription: 'createValidationMiddlewareForSchema', schema });
    const { success, error, data } = schema.safeParse(req.body);
    console.info(
      util.inspect(
        { stepDescription: 'handleExpressValidatorResult', schemaPassResults: { success, error, data } },
        { showHidden: false, depth: null, colors: true },
      ),
    );

    if (success) {
      console.info({
        stepDescription: 'createValidationMiddlewareForSchema passed, calling next and assigning body',
        oldBody: req.body as unknown,
        newBody: data,
      });

      req.body = data;
      return next();
    }

    const formattedErrors = getFormattedZodErrors(error);
    const errorCode = getErrorCode(error);

    console.error('Payload validation error occurred:', formattedErrors);
    return res.status(HttpStatusCode.BadRequest).send({
      status: HttpStatusCode.BadRequest,
      message: formattedErrors,
      code: errorCode,
    });
  };
