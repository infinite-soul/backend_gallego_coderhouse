import { Router } from "express";
import passport from "passport";
import { logoutUserC } from "../controllers/userControllers.js";

const router = Router();


router.post("/register", passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/error-register",
    passReqToCallback: true,
}));


router.post("/login", passport.authenticate("login", {
    successRedirect: "/products?page=1",
    failureRedirect: "/error-login",
    passReqToCallback: true,
}));


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
