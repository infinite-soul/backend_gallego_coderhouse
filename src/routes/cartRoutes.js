import { Router } from 'express'
import * as controller from '../controllers/cartControllers.js'

const router = Router ()

router.get('/', controller.getCart)
router.get('/:id', controller.getCartById)
router.post('/', controller.createCart)
router.post('/:id/prod/:productId', controller.saveProductToCart)
router.delete('/:id/prod/:productId', controller.deleteProductInCart)
router.delete('/:id', controller.cleanCart)
router.put ('/:id/prod/:productId', controller.updateQuantityInCart)
router.put ('/:id', controller.updateCart)

export default router