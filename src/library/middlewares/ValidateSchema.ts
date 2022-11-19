import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { object, ObjectSchema, ValidationError } from 'joi';
import { ApiError } from '../ApiError';
import Logging from '../Logging';
import { pick } from '../utils';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const valideSchema = pick(schema, ['params', 'query', 'body']);
      const object = pick(req, Object.keys(valideSchema));
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      Logging.error(error);
      if (error instanceof ValidationError) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      } else {
        next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message));
      }
    }
  };
};
