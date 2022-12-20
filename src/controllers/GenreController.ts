import { Request, Response } from 'express'
import { OK } from 'http-status'
import { pick } from '../library/utils'
import GenreService from '../services/GenreService'

const getAllGenres = async (req: Request, res: Response) => {
  const query = pick(req.query, ['name'])
  const genres = await GenreService.queryGenres(query)
  res.status(OK).json(genres)
}

export default { getAllGenres }
