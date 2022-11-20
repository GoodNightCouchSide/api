import express from 'express'
import swaggerJSDoc, { Options } from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'
import { version } from '../../../package.json'
import { config } from '../../config/config'

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Good Night Couch Side Rest Api Docs',
      version
    },
    servers: [{ url: `${config.server.swaggerUrl}/v1` }]
  },
  apis: ['./src/routes/v1/*.ts', './src/models/*.ts']
}

const specs = swaggerJSDoc(options)

const router = express.Router()

router.use('/', serve)
router.get(
  '/',
  setup(specs, {
    explorer: true
  })
)

export = router
