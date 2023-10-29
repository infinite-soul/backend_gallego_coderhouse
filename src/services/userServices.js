import {registerUser, loginUser } from "../daos/mongodb/userDao.js";

export const registerUserService = async (user) => {
    try {
        const newUser = await registerUser(user);
        return newUser
    } catch (error) {
        console.log(error);
    }
}

export const loginUserServices = async (user) => {
  try {
    const userExist = await loginUser(user);
    return userExist;
  } catch (error) {
    console.log(error);
  }
};