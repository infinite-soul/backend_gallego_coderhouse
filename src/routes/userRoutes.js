import { Router } from "express";
import { loginUserC, logoutUserC, registerUserC } from "../controllers/userControllers.js";

const router = Router();

router.post('/register', registerUserC);
router.post('/login', loginUserC)
router.get('/logout', logoutUserC)

export default router;