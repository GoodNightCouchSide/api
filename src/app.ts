import mongoose from 'mongoose'
import http from 'http'
import createServer from './server'
import { config } from './config/config'
import Logging from './library/Logging'

mongoose
  .connect(config.mongo.url + '?authSource=admin', { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('connected to mongodb')
    const app = createServer()
    http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on Port ${config.server.port}`))
  })
  .catch((error) => {
    Logging.error('Unable to connect to mongodb')
    Logging.error(error)
  })
