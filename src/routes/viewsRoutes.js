import { Router } from "express";
import { login, register, errorLogin, errorRegister } from "../controllers/viewsControllers.js";
import { logoutUserC } from "../controllers/userControllers.js";
import { getproductPaginate } from "../controllers/productControllers.js";


const router = Router();


router.get('/chat', (req, res) => {
    res.render('chat');
});


router.get('/register', register);
router.get('/error-register', errorRegister);
router.get('/login', login);
router.get('/error-login', errorLogin);


router.get('/logout', logoutUserC);


router.get('/products', getproductPaginate);


export default router;