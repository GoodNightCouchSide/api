import express, { NextFunction, Request, Response } from 'express'
import { NOT_FOUND } from 'http-status'

import { ApiError } from './library/ApiError'
import { logRequest } from './library/Logging'
import { errorConverter, errorHandler } from './library/middlewares/error'
import { apiRules } from './library/utils'
import v1Api from './routes/v1'

export const app = express()

const createServer = () => {
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(logRequest)
  app.use(apiRules)

  app.use('/v1', v1Api)

  app.use((req: Request, res: Response, next: NextFunction) =>
    next(new ApiError(NOT_FOUND, `Api route '${req.url}' does not exist`))
  )
  app.use(errorConverter)
  app.use(errorHandler)

  return app
}

export default createServer
