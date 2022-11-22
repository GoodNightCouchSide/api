import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test', 'stage').required(),
    MONGODB_URL: Joi.string()
      .when('NODE_ENV', {
        is: 'test',
        then: Joi.optional(),
        otherwise: Joi.required()
      })
      .description('Mongo DB url'),
    SERVER_PORT: Joi.number().positive().default(5000)
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const serverPort = Number(envVars.SERVER_PORT)

export const config = {
  mongo: {
    url: envVars.MONGODB_URL
  },
  server: {
    port: serverPort,
    swaggerUrl: `http://localhost:${serverPort}`
  }
}
