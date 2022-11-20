import mongoose, { Document, Schema } from 'mongoose'

export interface IEvent {
  name: string
}

export interface IEventModel extends IEvent, Document {}

/**
 * @swagger
 * components:
 *  schemas:
 *    Event:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *      example:
 *        id: uuid
 *        name: Event Name
 */

const EventSchema: Schema = new Schema({
  name: { type: String, required: true }
})

export default mongoose.model<IEventModel>('Event', EventSchema)
