import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectionString } from './daos/mongodb/conection.js';
import MongoStore from 'connect-mongo';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Hashea la contraseña.
 * @param {string} password
 * @returns {string} Contraseña hasheada
 */
export const createHash = (password) => hashSync(password, genSaltSync(10));

/**
 * Compara la contraseña hasheada con la contraseña del usuario.
 * @param {string} password
 * @param {object} user
 * @returns {boolean}
 */
export const isValidPassword = (password, user) => compareSync(password, user.password);

export const mongoStoreParameters = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};