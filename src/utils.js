import { dirname } from 'path';
import { fileURLToPath } from 'url';
import MongoStore from 'connect-mongo';
import { connectionString } from './persistance/daos/mongodb/conection.js';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

// Obtener __dirname
export const __dirname = dirname(fileURLToPath(import.meta.url));

// Funciones de manejo de contraseñas
export const createHash = (password) => hashSync(password, genSaltSync(10));

export const isValidPassword = (password, users) => compareSync(password, users.password);

// Configuración de opciones para MongoStore
const secretKey = '1234';

export const mongoStoreParameters = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: secretKey
        }
    }),
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

// Función para respuesta estándar
export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ data });
};
