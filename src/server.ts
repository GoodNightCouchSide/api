import express, { NextFunction, Request, Response } from 'express'
import http from 'http'
import { NOT_FOUND } from 'http-status'
import mongoose from 'mongoose'
import { config } from './config/config'
import { ApiError } from './library/ApiError'
import Logging, { logRequest } from './library/Logging'
import { errorConverter, errorHandler } from './library/middlewares/error'
import { apiRules } from './library/utils'
import v1Api from './routes/v1'

const router = express()

mongoose
  .connect(config.mongo.url + '?authSource=admin', { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('connected to mongodb')
    StartServer()
  })
  .catch((error) => {
    Logging.error('Unable to connect to mongodb')
    Logging.error(error)
  })

const StartServer = () => {
  router.use(express.urlencoded({ extended: true }))
  router.use(express.json())
  router.use(logRequest)
  router.use(apiRules)

  router.use('/v1', v1Api)

  router.use((req: Request, res: Response, next: NextFunction) => next(new ApiError(NOT_FOUND, 'Not found')))
  router.use(errorConverter)
  router.use(errorHandler)

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on Port ${config.server.port}`))
}
