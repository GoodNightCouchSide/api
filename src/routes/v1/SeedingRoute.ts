import express from 'express'
import venues from '../../__seeding__/VenueSeeding'

const router = express.Router()

router.route('/venue').post(venues.seedingVenues)

export = router
