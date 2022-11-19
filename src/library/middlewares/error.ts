import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Error } from 'mongoose';
import { ApiError } from '../ApiError';
import Logging from '../Logging';

export const errorConverter = (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  console.log(error);
  if (!(error instanceof ApiError)) {
    const statusCode = error instanceof Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = String(httpStatus[statusCode]);
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;
  //   if (config.env === 'production' && !err.isOperational) {
  //     statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  //     message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  //   }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message

    // ...(config.env === 'development' && { stack: err.stack })
  };

  //   if (config.env === 'development') {
  Logging.error(err);
  //   }

  res.status(statusCode).send(response);
};
