import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'
import { authMiddleware } from '../middlewares/authenticate.js'
import { authorize } from '../middlewares/authorize.js'
import { productsService } from '../services/products.service.js'

export const productsRouter = Router()

const productController = new ProductController(productsService)
const protectedAdminRoute = [authMiddleware, authorize('admin')]

productsRouter.get('/', productController.getAll)
productsRouter.get('/:id', productController.getById)
productsRouter.post('/', protectedAdminRoute, productController.create)
productsRouter.put('/:id', protectedAdminRoute, productController.update)
productsRouter.delete('/:id', protectedAdminRoute, productController.delete)
