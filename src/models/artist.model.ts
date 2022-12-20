import mongoose, { Document, Schema } from 'mongoose'
import { IGenre } from './genre.model'

export interface IArtist {
  name: string
  type: ArtistType[]
  description: string
  genre: IGenre[]
}

export interface IArtistModel extends IArtist, Document {}

export const TYPES = {
  ORCHESTRA: 'ORCHESTRA',
  BAND: 'BAND'
}

export const ARTIST_TYPES = Object.values(TYPES)

export type ArtistType = 'BAND' | 'ORCHESTRA'

/**
 * @swagger
 * components:
 *  schemas:
 *    Artist:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        genre:
 *          type: array
 *          items:
 *            type: string
 *      example:
 *        id: uuid
 *        name: Artist Name
 */

const ArtistSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    description: { type: String, maxLength: 500 },
    type: { type: String, enum: ARTIST_TYPES }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<IArtistModel>('Artist', ArtistSchema)
