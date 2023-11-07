import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmail, getUserByID, loginUser, registerUser } from "../daos/mongodb/userDao.js";

const strategyOptions = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
};

const register = async (req, email, password, done) => {
    try {
        const user = await getUserByEmail(email);
        if (user) return done(null, false);
        const newUser = await registerUser(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, email, password, done) => {
    try {
        const user = { email, password };
        const userLogin = await loginUser(user);

        if (!userLogin) return done(null, false, { message: "Login falló" });
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
    }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await getUserByID(id);
    return done(null, user);
});
