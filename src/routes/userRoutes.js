import { Router } from "express";
import passport from "passport";
import { login, logoutUserC, current, getAll, createUserMocks, getUsersMocks, loginApi } from "../controllers/userControllers.js";
import { ckeckAdminRole } from "../middlewares/roleValidator.js";

const router = Router();

// Rutas de autenticación
router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/error-register",
    passReqToCallback: true,
  })
);

router.post("/login", login);
router.post("/loginApi", loginApi);
router.get("/logout", logoutUserC);

// Rutas protegidas
router.use(passport.authenticate('jwt'));

router.get("/current", current);

// Verificación de rol de administrador para rutas específicas
router.use(ckeckAdminRole);

router.get("/getuser", getAll);
router.post("/mockingusers", createUserMocks);
router.get("/get-mockingusers", getUsersMocks);

export default router;
