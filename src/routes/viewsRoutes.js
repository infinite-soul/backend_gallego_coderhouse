import { Router } from "express";
import { login, register, errorLogin, errorRegister } from "../controllers/viewsControllers.js";
import { logoutUserC } from "../controllers/userControllers.js";
import { getproductPaginate } from "../controllers/productControllers.js";


const router = Router();

// Ruta para mostrar la página de chat
router.get('/chat', (req, res) => {
    res.render('chat');
});

// Rutas relacionadas con el registro y autenticación de usuarios
router.get('/register', register);
router.get('/error-register', errorRegister);
router.get('/login', login);
router.get('/error-login', errorLogin);

// Ruta para cerrar sesión
router.get('/logout', logoutUserC);

// Ruta para mostrar productos paginados
router.get('/products', getproductPaginate);


export default router;