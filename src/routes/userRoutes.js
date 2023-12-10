import { Router } from "express";
import passport from "passport";
import { logoutUserC } from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/register", passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/error-register",
    passReqToCallback: true,
}));

router.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            const errorMessage = info && info.message ? encodeURIComponent(info.message) : "";
            return res.redirect(`/login?error=${errorMessage}`);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/products?page=1');
        });
    })(req, res, next);
});

router.get('/login', (req, res) => {
    const errorMessage = req.query.error || "";
    res.render('login', { error: errorMessage });
});

router.get('/register-github', passport.authenticate('github', {
    scope: ['user:email']
}));

router.get('/profile-github', passport.authenticate("github", {
    scope: ["user:email"],
    failureRedirect: "/error-login",
    successRedirect: "/products",
}));

router.get("/logout", logoutUserC);

export default router;
