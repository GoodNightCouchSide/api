import express from 'express'
import venues from '../../__seeding__/venue.seeding'
import genres from '../../__seeding__/genre.seeding'
import artists from '../../__seeding__/artist.seeding'
import { ValidateSchema } from '../../library/middlewares/ValidateSchema'

const router = express.Router()

router.route('/venue').post(venues.seedingVenues)
router.route('/genre').post(genres.seedingGenres)
router.route('/artist').post(ValidateSchema(artists.seedingArtistsSchema), artists.seedingArtist)

export = router
