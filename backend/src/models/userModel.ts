import mongoose, { Schema } from 'mongoose';
import { UserZod } from '../utils/types';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  fantasyTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FantasyTeam',
  },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

export default mongoose.model<UserZod>('User', userSchema);
