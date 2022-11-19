import { Request, Response } from 'express'
import { CREATED, NOT_FOUND, NO_CONTENT, OK } from 'http-status'
import Event from '../models/Event'

const createEvent = (req: Request, res: Response) => {
  const { name } = req.body
  const event = new Event({
    name
  })
  return event
    .save()
    .then((event) => res.status(CREATED).json({ event }))
    .catch((error) => res.status(500).json({ error }))
}
const getEvent = (req: Request, res: Response) => {
  const eventId = req.params.eventId
  return Event.findById(eventId)
    .then((event) => (event ? res.status(OK).json({ event }) : res.status(NOT_FOUND).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }))
}
const getAllEvents = (req: Request, res: Response) => {
  return Event.find()
    .then((events) => res.status(OK).json({ events }))
    .catch((error) => res.status(500).json({ error }))
}
const updateEvent = (req: Request, res: Response) => {
  const eventId = req.params.eventId
  return Event.findById(eventId)
    .then((event) => {
      if (!event) return res.status(NOT_FOUND).json({ message: 'Not found' })
      event.set(req.body)
      event
        .save()
        .then((event) => res.status(OK).json({ event }))
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
const deleteEvent = (req: Request, res: Response) => {
  const eventId = req.params.eventId
  return Event.findByIdAndDelete(eventId)
    .then((event) => (event ? res.status(NO_CONTENT).send() : res.status(NOT_FOUND).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json({ error }))
}

export default { createEvent, getEvent, getAllEvents, updateEvent, deleteEvent }
