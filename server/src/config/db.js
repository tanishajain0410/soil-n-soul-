import mongoose from 'mongoose';

export const connectDB = async () => {
    // Disable query buffering so Mongoose queries fail immediately if MongoDB is not connected
    mongoose.set('bufferCommands', false);

    if (!process.env.MONGO_URI) {
        console.log('⚠️  No MONGO_URI configured. Running without database (demo mode)');
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        console.log('⚠️  Running without database (demo mode)');
    }
};

