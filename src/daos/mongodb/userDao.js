import { UserModel } from "./models/userModel.js";

export const registerUser = async (user) => {

    try {
        const { email, role } = user
        const existUser = await UserModel.findOne({ email })

        if (!existUser) {
            if (role === "admin" && email === 'adminCoder@coder.com') {
                const newUser = await UserModel.create(user);
                console.log(`User ${newUser.email} created`);
                return newUser;
            } else if (role === "admin" && email !== 'adminCoder@coder.com') {
                return console.log('Email not authorized for admin role');;
            } else {
                const newUser = await UserModel.create(user);
                console.log(`User ${newUser.email} created`);
                return newUser;
            }
        } else {
            console.log(`The user ${existUser.email} exists`);
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (user) => {

    try {
        const { email, password } = user
        //console.log(password);
        const userExist = await UserModel.findOne({ email })
        if (userExist.password == password) {
            return userExist;
        }
        else {
            return false
        };
    } catch (error) {
        console.log(error);
    }
}

const userSession = (req, res, next) => {
    if (req.session && req.session.user) {
      res.locals.user = req.session.user;
    }
    next();
  };
  
  export default userSession;