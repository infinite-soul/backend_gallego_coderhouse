import mongoose from 'mongoose';

//const connectionString = 'mongodb://localhost:27017/backend-coderhouse';

export const connectionString = 'mongodb+srv://lordchingzo:coderhouse@product.n09ozpk.mongodb.net/';

try {
    await mongoose.connect(connectionString)
    console.log('Conectado a Mongoose connection')
} catch (error) {
    console.log(error);
}