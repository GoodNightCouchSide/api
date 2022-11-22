import Joi from 'joi'

const eventSchema = {
  body: Joi.object().keys({
    name: Joi.string().required()
  })
}

export default { eventSchema }
