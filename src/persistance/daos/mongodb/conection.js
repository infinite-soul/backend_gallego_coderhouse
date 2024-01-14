import { connect } from 'mongoose';
import config from '../../../utils/config.js';
import { logger } from '../../../utils/logger.js';

export const connectionString = config.mongo.MONGO_ATLAS_URL;

const logError = (error) => {
    logger.error('Error al conectar a la base de datos MongoDB:', error);
    throw error;
};

export const conectionMongoose = async () => {
    try {
        console.log('intentaré conectarme.');
        await connect(connectionString);
        console.log('Conectado a la base de datos MongoDB.');
    } catch (error) {
        logError(error);
    }
};
