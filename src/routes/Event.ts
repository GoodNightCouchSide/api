import express from 'express'
import EventController from '../controllers/Event'

const router = express.Router()

router.route('/').post(EventController.createEvent).get(EventController.getAllEvents)

router.route('/:eventId').get(EventController.getEvent).patch(EventController.updateEvent).delete(EventController.deleteEvent)

export = router;
