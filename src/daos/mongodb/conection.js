import mongoose from 'mongoose';
import 'dotenv/config'

export const connectionString = process.env.MONGO_ATLAS_URL; 

try {
    await mongoose.connect(connectionString)
    console.log('Conectado a Mongoose connection')
} catch (error) {
    console.log(error);
}