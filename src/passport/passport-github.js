import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import { getUserByEmail, registerUser } from "../daos/mongodb/userDao.js";
import 'dotenv/config'

const strategyOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: "user:email",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0]?.value;
    if (!email) return done(null, false);

    const user = await getUserByEmail(email);
    if (user) return done(null, user);

    const first_name = profile._json.name || profile._json.login;

    const newUser = await registerUser({
        first_name,
        last_name: " ",
        email,
        password: profile._json.node_id,
        isGithub: true,
    });

    return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
