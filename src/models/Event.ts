import { string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent {
  name: string;
}

export interface IEventModel extends IEvent, Document {}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true }
});

export default mongoose.model<IEventModel>('Event', EventSchema);
