import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './server/.env' });

/**
 * Connect to MongoDB
 */
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error('Unknown error connecting to MongoDB');
    }
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB; 