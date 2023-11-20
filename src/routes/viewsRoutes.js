import { Router } from "express";
import { login, register, errorLogin, errorRegister, current } from "../controllers/viewsControllers.js";
import { logoutUserC } from "../controllers/userControllers.js";
import { getproductPaginate } from "../controllers/productControllers.js";
import { isAuth } from "../middlewares/auth.js";


const router = Router();

router.get('/chat', (req, res) => {
    res.render('chat')
});

router.get('/register', register);
router.get('/error-register', errorRegister);
router.get('/login', login);
router.get('/error-login', errorLogin);
router.get('/logout', logoutUserC);

router.get('/products', isAuth , getproductPaginate);

router.get('/api/sessions/current', isAuth , current )


export default router;