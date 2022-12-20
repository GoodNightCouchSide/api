import Joi from 'joi'
import { IValidateSchema } from '../library/middlewares/ValidateSchema'

const getGenres: IValidateSchema = {
  params: Joi.object().keys({
    name: Joi.string()
  })
}

export default { getGenres }
