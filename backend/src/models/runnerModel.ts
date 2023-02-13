import mongoose, { Schema } from 'mongoose';
import { RunnerZod } from '../utils/types';

const runnerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  runnerPhoto: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

runnerSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<RunnerZod>('Runner', runnerSchema);
