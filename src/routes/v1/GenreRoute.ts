import express from 'express'
import { ValidateSchema } from '../../library/middlewares/ValidateSchema'
import GenreController from '../../controllers/GenreController'
import genreValidations from '../../validations/genre.validations'

const router = express.Router()

/**
 * @swagger
 * tags:
 *  name: Genre
 *  description: Genre
 */

/**
 * @swagger
 * /genre:
 *  get:
 *      tags: [Genre]
 *      summary: Get All Genres
 *      description: Get All Genres
 *      responses:
 *          "200":
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Genre'
 */
router.route('/').get(ValidateSchema(genreValidations.getGenres), GenreController.getAllGenres)

export = router
