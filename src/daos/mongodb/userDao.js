import { createHash, isValidPassword } from "../../utils.js";
import { createCart } from "./cartDao.js";
import { UserModel } from "./models/userModel.js";

export const registerUser = async (user) => {
    try {
        const { email, password } = user;
        const existUser = await getUserByEmail(email);

        if (existUser) {
            console.log(`El usuario ${existUser.email} ya existe`);
            return false;
        }

        const newCart = await createCart();
        const role = (password === "esAdmin" && email === "esadmincoder@coderhouse.com") ? "admin" : "user";

        const newUser = await UserModel.create({
            ...user,
            password: createHash(password),
            role,
            cart: [{ CartID: newCart.id }]
        });

        console.log(`Usuario ${newUser.email} creado`);
        return newUser;

    } catch (error) {
        console.error(error);
    }
};

export const loginUser = async (user) => {
    try {
        const { email, password } = user;
        const userExist = await getUserByEmail(email);

        if (userExist && isValidPassword(password, userExist)) {
            return userExist;
        } else {
            console.log("Inicio de sesión fallido");
            return false;
        }
    } catch (error) {
        console.error(error);
    }
};

export const getUserByID = async (id) => {
    try {
        const userExist = await UserModel.findById(id);
        return userExist || false;
    } catch (error) {
        console.error(error);
    }
};

export const getUserByEmail = async (email) => {
    try {
        const userExist = await UserModel.findOne({ email });
        return userExist || false;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

