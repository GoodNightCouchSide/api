import { Request, Response } from 'express'
import Joi from 'joi'
import { IArtist, TYPES } from '../models/ArtistModel'
import GenreModel from '../models/GenreModel'
import genre from './GenreSeeding'

const ARTISTS = {
  APTERA: {
    name: 'Aptera',
    type: TYPES.BAND,
    description: `Hailing from Brazil, Italy, Belgium, and the US, Aptera have risen from the seas 
    to join forces in Berlin. Playing a mix of sludge, doom, blues, and classic metal glued 
    together with some punk grit, Aptera is a guttural cry that will lure you to your destruction.`,
    genre: [genre.SLUDGE.name, genre.METAL.name, genre.DOOM.name]
  },
  JINJER: {
    name: 'Jinjer',
    type: TYPES.BAND,
    description: `Jinjer ist eine ukrainische Metal-Band, die 2009 in Donezk gegründet wurde. 
    Die Band zog 2014 aufgrund des Kriegs in der Ost-Ukraine nach Lwiw.`,
    genre: [genre.METALCORE.name, genre.DJENT.name, genre.DEATH_METAL.name, genre.GROOVE_METAL.name]
  }
}

const ALL_ARTISTS_KEYS = Object.keys(ARTISTS)

const seedingArtist = async (req: Request, res: Response) => {
  const { body = [] } = req
  const test = body.concat(
    Object.values(ARTISTS).filter((item) => {
      return (
        body.findIndex((bodyItem: IArtist) => {
          return item.name === bodyItem.name
        }) === -1
      )
    })
  )
  Promise.all(
    test.map(async (artist: IArtist) => {
      await GenreModel.findOne({ name: artist })
    })
  ).then((result) => {
    res.json(result)
  })
  //   Promise.all(
  //     Object.values(ARTISTS).map((artist) => {
  //       return Promise.all(
  //         artist.genre.map((item) => {
  //           return GenreModel.findOne({ name: item }).then((genre) => genre?._id)
  //         })
  //       ).then((genres) => {
  //         artist.genre = genres
  //         return ArtistModel.create(artist).then((artist) => artist)
  //       })
  //     })
  //   ).then((artists) => {
  //     res.status(CREATED).json(artists)
  //   })
}

const seedingArtistsSchema = {
  body: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().required()
      })
    )
    .unique((a, b) => a.name === b.name)
    .messages({
      'array.unique': 'contains a duplicate value, name has to unique'
    })
}

export default { seedingArtist, ALL_ARTISTS_KEYS, ...ARTISTS, seedingArtistsSchema }
