import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { ObjectSchema } from 'joi'
import { ApiError } from '../ApiError'
import { pick } from '../utils'

export interface IValidateSchema {
  params?: ObjectSchema
  query?: ObjectSchema
  body?: ObjectSchema
}

export const ValidateSchema = (schema: IValidateSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body'])
    const object = pick(req, Object.keys(validSchema))
    Object.keys(validSchema).forEach((key) => {
      const { error, value } = validSchema[key].validate(object[key])
      if (error) {
        const errorMessage = error.details.map((details: { message: string }) => details.message).join(', ')
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
      }
      Object.assign(req, value)
    })
    return next()
  }
}
