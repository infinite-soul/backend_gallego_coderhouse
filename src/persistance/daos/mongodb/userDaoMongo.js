import { createHash, isValidPassword } from "../../../utils.js";
import { createCart, createCartTestMocks } from "./cartDaoMongo.js";
import { UserModel } from "./models/userModel.js";
import { fakerES_MX as faker } from "@faker-js/faker";
import { UserModelMocks } from "./models/userModel_Mocks.js";

export const registerUser = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);

    if (existUser) {
      console.log(`El usuario ${existUser.email} ya existe`);
      return false;
    }

    const newCart = await createCart();
    const role = email === "esadmincoder@coderhouse.com" && password === "esAdmin" ? "admin" : "user";

    const newUser = await UserModel.create({
      ...user,
      password: createHash(password),
      role,
      cart: [{ CartID: newCart.id }],
    });

    console.log(`Usuario ${newUser.email} creado`);
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (user) => {
  try {
    const { email, password } = user;
    const userExist = await getUserByEmail(email);

    if (!userExist) return false;

    const passValid = isValidPassword(password, userExist);

    return passValid ? userExist : false;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByID = async (id) => {
  try {
    return await UserModel.findById(id) || false;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAll = async () => {
  try {
    return await UserModel.find({});
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email }) || false;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUsersMock = async (cant = 50) => {
  try {
    const users = [];

    for (let i = 0; i < cant; i++) {
      const user = await UserModelMocks.create({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: Math.floor(Math.random() * 99),
        password: createHash(faker.internet.password()),
      });

      users.push(user);
    }
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUsersMocks = async () => {
  try {
    return await UserModelMocks.find({});
  } catch (error) {
    throw new Error(error.message);
  }
};
