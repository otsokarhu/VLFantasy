import { MONGODB_URI } from "./config";
import mongoose from "mongoose";
import logger from "./logger";



const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
    });
    logger.info("Connected to MongoDB");
  } catch (error: any) {
    logger.error("Error connecting to MongoDB:" + error.message);
  }
};

export default connectToDb;