import EventModel, { IEvent } from '../models/event.model'

/**
 * Create a new Event
 * @param {Object} userBody
 * @returns {Promise<IEventModel>}
 */
const createEvent = async (eventBody: IEvent) => {
  return EventModel.create(eventBody)
}

export default { createEvent }
