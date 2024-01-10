import { Router } from "express";
import { login, register, errorLogin, errorRegister } from "../controllers/viewsControllers.js";
import { logoutUserC } from "../controllers/userControllers.js";
import { getproductPaginate } from "../controllers/productControllers.js";
import passport from "passport";


const viewsRouter = Router();

viewsRouter.get('/chat', (req, res) => {
    res.render('chat')
});


viewsRouter.get('/register', register);
viewsRouter.get('/error-register', errorRegister);
viewsRouter.get('/login', login);
viewsRouter.get('/error-login', errorLogin);
viewsRouter.get('/logout', logoutUserC);

viewsRouter.get('/products',  passport.authenticate("jwt") , getproductPaginate);

export default viewsRouter;