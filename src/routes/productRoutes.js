import { Router } from "express";
import passport from "passport";
import * as controller from "../controllers/productControllers.js";
import { ckeckAdminRole } from "../middlewares/roleValidator.js";

const router = Router();

// DTO
router.route('/dto/:id')
  .get(passport.authenticate('jwt'), ckeckAdminRole, controller.getByIdDTO);

router.route('/dto')
  .post(passport.authenticate('jwt'), ckeckAdminRole, controller.createProdDTO);

// MOCKS
router.route('/mockingproducts')
  .post(controller.createProductsMocks);

router.route('/getmockingproducts')
  .get(passport.authenticate('jwt'), controller.getProductsMocks);

// Resto de APIs
router.route('/')
  .get(passport.authenticate('jwt'), controller.getproduct)
  .post(passport.authenticate('jwt'), ckeckAdminRole, controller.addProduct);

router.route('/:id')
  .get(passport.authenticate('jwt'), controller.getProductById)
  .put(passport.authenticate('jwt'), ckeckAdminRole, controller.updateProduct)
  .delete(passport.authenticate('jwt'), ckeckAdminRole, controller.deleteProduct);

export default router;
