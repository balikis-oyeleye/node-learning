import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "./logger.js";

dotenv.config();

const mongodbUri = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(mongodbUri);

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    logger.error(`${err.message} - ${err.stack}`);
    process.exit(1);
  }
};

export default connectDatabase;
