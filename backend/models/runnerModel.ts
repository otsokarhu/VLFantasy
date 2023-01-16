import mongoose, { Schema, Document } from "mongoose";

export interface Runner extends Document {
  name: string;
  team: string;
  id: string;
  points: number;
}

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
});

export default mongoose.model<Runner>("Runner", runnerSchema);