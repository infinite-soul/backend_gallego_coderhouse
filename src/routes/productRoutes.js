import { Router } from "express";
import * as controller from "../controllers/productControllers.js"

const router = Router ()

router.get('/', controller.getproduct)
router.get('/:id', controller.getProductById)
router.post('/', controller.addProduct)
router.put('/:id', controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

export default router