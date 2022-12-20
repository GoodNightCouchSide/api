import { FilterQuery } from 'mongoose'
import GenreModel, { IGenre } from '../models/genre.model'

const queryGenres = async (query: FilterQuery<IGenre>) => {
  return await GenreModel.paginate(query)
}

export default { queryGenres }
