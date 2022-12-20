import mongoose, { Document, Schema } from 'mongoose'

export interface IVenue {
  name: string
  address: {
    street: string
    buildingNumber: string
    zip: number
    city: string
  }
  description: string
}

export interface IVenueSchema extends IVenue, Document {}

const VenueSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  address: {
    street: { type: String },
    buildingNumber: { type: String },
    zip: { type: String },
    city: { type: String }
  },
  description: { type: String }
})

export default mongoose.model<IVenueSchema>('Venue', VenueSchema)
