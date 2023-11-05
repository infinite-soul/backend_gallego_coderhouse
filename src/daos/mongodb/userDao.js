import UserModel from './models/userModel.js'; // Importa el modelo de usuario
import { createHash, isValidPassword } from '../../utils.js'; // Importa funciones de hash y validación

export const registerUser = async (user) => {
    try {
        const { email, password } = user;
        const existUser = await getUserByEmail(email);

        if (existUser) {
            console.log(`El usuario ${existUser.email} ya existe`);
            return false;
        }

        const isAdmin = password === "abc123" && email === "adminCoder@coder.com";
        const role = isAdmin ? "admin" : "user";

        const newUser = await UserModel.create({
            ...user,
            password: createHash(password),
            role,
        });

        console.log(`Usuario ${newUser.email} creado`);
        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const loginUser = async (user) => {
    try {
        const { email, password } = user;
        const userExist = await getUserByEmail(email);

        if (!userExist || !isValidPassword(password, userExist)) {
            return false;
        }

        return userExist;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserByID = async (id) => {
    try {
        const userExist = await UserModel.findById(id);
        return userExist || false;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const userExist = await UserModel.findOne({ email });
        return userExist || false;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const userSession = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
};

export default userSession;