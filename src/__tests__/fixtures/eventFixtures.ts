import Event, { IEvent } from '../../models/EventModel'

const insertEvents = async (events: Array<IEvent>) => {
  await Event.insertMany(events)
}

const genrateFakeEvents = (n: number) => {
  return new Array(n).fill(null).map(() => ({ name: 'fake event name' }))
}

export default { insertEvents, genrateFakeEvents }
