import { FilterQuery } from 'mongoose'
import GenreModel, { IGenre } from '../models/GenreModel'

const queryGenres = async (query: FilterQuery<IGenre>) => {
  return await GenreModel.paginate(query)
}

export default { queryGenres }
