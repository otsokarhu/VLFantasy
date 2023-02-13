import { MONGODB_URI } from './config';
import mongoose from 'mongoose';
import logger from './logger';
import { getError } from './middleware';

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:' + getError(error));
  }
};

export default connectToDb;
