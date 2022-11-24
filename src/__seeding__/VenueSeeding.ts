import { Request, Response } from 'express'
import { CREATED } from 'http-status'
import Logging from '../library/Logging'
import VenueModel from '../models/VenueModel'

const venues = {
  CASSIOPEIA: {
    name: 'Cassiopeia',
    address: {
      street: 'Revaler Str.',
      buildingNumber: '99',
      city: 'Berlin',
      zip: 10245
    },
    description:
      'Nachtclub mit Subkulturflair & Livemusikprogramm in ehemaliger Industriehalle mit Innenhof.'
  }
}

const ALL_VENUES_KEYS = Object.keys(venues)

const seedingVenues = (req: Request, res: Response) => {
  VenueModel.insertMany(Object.values(venues)).then((response) => {
    const massage = `Insert ${response.length} Venues to the Database`
    Logging.info(massage)
    res.status(CREATED).send({
      massage
    })
  })
}

export default { seedingVenues, ALL_VENUES_KEYS, ...venues }
