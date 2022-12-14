import Event, { IEvent } from '../../models/event.model'

const insertEvents = async (events: Array<IEvent>) => {
  await Event.insertMany(events)
}

const generateFakeEvents = (n: number) => {
  return new Array(n).fill(null).map(() => ({ name: 'fake event name' }))
}

export default { insertEvents, generateFakeEvents: generateFakeEvents }
