import mongoose, { Schema, Document } from "mongoose";

export interface Runner extends Document {
  name: string;
  team: string;
  id: string;
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
});

export default mongoose.model<Runner>("Runner", runnerSchema);