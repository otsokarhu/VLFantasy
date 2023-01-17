import mongoose, { Schema } from "mongoose";


export interface Runner {
  name: string;
  team: string;
  id: string;
  points: number;
}

export type NewRunner = Omit<Runner, "id">;

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