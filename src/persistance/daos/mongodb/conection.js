import { connect } from 'mongoose';
import config from '../../../utils/config.js';

export const connectionString = config.MONGO_ATLAS_URL;

export const conectionMongoose = async () => {
    try {
        await connect(connectionString);
        console.log('Conectado a la base de datos MongoDB.');
    } catch (error) {
        console.error('Error al conectar a la base de datos MongoDB:', error.message);
    }
};
