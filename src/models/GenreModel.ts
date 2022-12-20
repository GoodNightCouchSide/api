import mongoose, { Document, Schema, PaginateModel } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

export interface IGenre {
  name: string
}

export interface IGenreModel extends IGenre, Document {}

/**
 * @swagger
 * components:
 *  schemas:
 *    Genre:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *      example:
 *        id: uuid
 *        name: Genre Name
 */

const GenreSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }
  },
  {
    timestamps: false
  }
)

GenreSchema.plugin(paginate)

export default mongoose.model<IGenreModel, PaginateModel<IGenreModel>>(
  'Genre',
  GenreSchema,
  'genre'
)
