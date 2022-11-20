import express from 'express'
import EventController from '../../controllers/Event'

const router = express.Router()

/**
 * @swagger
 * tags:
 *  name: Event
 *  description: Event
 */

/**
 * @swagger
 * /event:
 *  get:
 *      tags: [Event]
 *      summary: Get All Events
 *      description: Get All Events
 *      responses:
 *          "200":
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 */
router.route('/').post(EventController.createEvent).get(EventController.getAllEvents)

router.route('/:eventId').get(EventController.getEvent).patch(EventController.updateEvent).delete(EventController.deleteEvent)

export = router
