import express from 'express'
import venues from '../../__seeding__/VenueSeeding'
import genres from '../../__seeding__/GenreSeeding'
import artists from '../../__seeding__/ArtistSeeding'
import { ValidateSchema } from '../../library/middlewares/ValidateSchema'

const router = express.Router()

router.route('/venue').post(venues.seedingVenues)
router.route('/genre').post(genres.seedingGenres)
router.route('/artist').post(ValidateSchema(artists.seedingArtistsSchema), artists.seedingArtist)

export = router
