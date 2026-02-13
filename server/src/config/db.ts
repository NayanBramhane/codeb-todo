import mongoose from 'mongoose';
import { seedDatabase } from '../utils/seed.js';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    await seedDatabase();
  } catch (error) {
    console.error('Database connection failed:\n', error);
    process.exit(1); // stop app if DB fails
  }
};
