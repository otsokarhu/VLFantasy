import mongoose, { Schema } from 'mongoose';
import { FantasyTeamZod } from '../utils/utils';

const fantasyTeamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  runners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Runner',
      default: [],
    },
  ],
  points: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

fantasyTeamSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<FantasyTeamZod>('FantasyTeam', fantasyTeamSchema);
