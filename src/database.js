import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbUrl = process.env.DATABASE_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error);
    }
}