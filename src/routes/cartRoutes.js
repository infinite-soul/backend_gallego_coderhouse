import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js';
import passport from 'passport';

const router = Router();

router.use(passport.authenticate("jwt"));

router.route('/:id/purchase')
  .post(controller.generateOrder);

router.route('/purchase')
  .post(controller.generateOrder);

router.route('/:id/prod/:productId')
  .post(controller.saveProductToCart)
  .delete(controller.deleteProductInCart)
  .put(controller.updateQuantityInCart);

router.route('/:id')
  .get(controller.getCartById)
  .post(controller.createCart)
  .delete(controller.cleanCart)
  .put(controller.updateCart);

router.route('/')
  .get(controller.getCart);

export default router;
