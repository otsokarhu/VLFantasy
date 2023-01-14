import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  id: string;
}

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
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});


export default mongoose.model<User>('User', userSchema);