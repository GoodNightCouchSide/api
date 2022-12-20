import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR, OK } from 'http-status'
import { ApiError } from '../library/ApiError'
import GenreModel from '../models/genre.model'

const GENRES = {
  ROCK: {
    name: 'Rock'
  },
  JAZZ: {
    name: 'Jazz'
  },
  HEAVY_METAL: {
    name: 'Heavy Metal'
  },
  PUNK: {
    name: 'Punk'
  },
  SKA: {
    name: 'Ska'
  },
  ELECTRONIC: {
    name: 'Electronic'
  },
  BLUES: {
    name: 'Blues'
  },
  HARDCORE: {
    name: 'Hardcore'
  },
  RAP: {
    name: 'Rap'
  },
  FUNK: {
    name: 'Funk'
  },
  SLUDGE: {
    name: 'Sludge'
  },
  DOOM: {
    name: 'Doom'
  },
  METAL: {
    name: 'Metal'
  },
  METALCORE: {
    name: 'Metalcore'
  },
  DJENT: {
    name: 'Dejent'
  },
  DEATH_METAL: {
    name: 'Death Metal'
  },
  GROOVE_METAL: {
    name: 'Groove Metal'
  }
}

const ALL_GENRES_KEYS = Object.keys(GENRES)

const seedingGenres = (req: Request, res: Response) => {
  Promise.all(
    Object.values(GENRES).map((genre) => {
      return GenreModel.findOneAndUpdate({ name: genre.name }, genre, { new: true, upsert: true })
    })
  )
    .then((result) => {
      res.status(OK).json(result)
    })
    .catch((err) => {
      return new ApiError(INTERNAL_SERVER_ERROR, err)
    })
}

export default { seedingGenres, ALL_GENRES_KEYS, ...GENRES }
