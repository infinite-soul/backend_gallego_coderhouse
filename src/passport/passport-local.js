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
        if (await getUserByEmail(email)) {
            console.log("El usuario ya existe");
            return done(null, false);
        }

        const newUser = await registerUser(req.body);
        console.log(`Usuario ${newUser.email} creado`);
        return done(null, newUser);
    } catch (error) {
        console.error(error);
        return done(error);
    }
};

const login = async (req, email, password, done) => {
    try {
        const user = { email, password };
        const userLogin = await loginUser(user);

        if (!userLogin) {
            console.log("Inicio de sesión fallido");
            return done(null, false);
        }

        return done(null, userLogin);
    } catch (error) {
        console.error(error);
        return done(error);
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
    try {
        const user = await getUserByID(id);
        done(null, user);
    } catch (error) {
        console.error(error);
        done(error);
    }
});
