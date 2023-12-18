import { generateToken } from "../jwt/auth.js";
import {
    registerUser,
    loginUser,
    getAll,
    createUsersMock,
    getUsersMocks,
} from "../persistance/daos/mongodb/userDaoMongo.js";
import { getByIdDTO } from "../persistance/repository/user.repository.js";

const handleServiceError = (error) => {
    throw new Error(error.message);
};

export const registerUserService = async (user) => {
    try {
        return await registerUser(user);
    } catch (error) {
        handleServiceError(error);
    }
};

export const loginUserServices = async (user) => {
    try {
        const userExist = await loginUser(user);
        return userExist ? generateToken(userExist) : false;
    } catch (error) {
        handleServiceError(error);
    }
};

export const getAllService = async () => {
    try {
        const cart = await getAll();
        return cart || false;
    } catch (error) {
        handleServiceError(error);
    }
};

export const currentUserResDTOService = async (id) => {
    try {
        const response = await getByIdDTO(id);
        return response || false;
    } catch (error) {
        handleServiceError(error);
    }
};

// MOCKS //

export const createUsersMockService = async (user) => {
    try {
        return await createUsersMock(user);
    } catch (error) {
        handleServiceError(error);
    }
};

export const getUsersMocksService = async () => {
    try {
        const cart = await getUsersMocks();
        return cart || false;
    } catch (error) {
        handleServiceError(error);
    }
};
