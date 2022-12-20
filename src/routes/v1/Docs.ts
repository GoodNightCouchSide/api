import express, { Request, Response } from 'express'
import swaggerJSDoc, { Options } from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'
import yaml from 'js-yaml'
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
router.get('/swagger.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(specs)
})
router.get('/swagger.yaml', (req: Request, res: Response) => {
  const yamlSpec = yaml.dump(specs)
  res.setHeader('Content-Type', 'text/plain')
  res.status(200).send(yamlSpec)
})

export = router
