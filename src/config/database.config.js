import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbUri = process.env.MONGO_URI;

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(mongodbUri);

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
