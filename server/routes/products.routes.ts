import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from '../controllers/product.controller.js'
import { authenticate } from '../middlewares/authenticate.js'
import { validateData } from '../middlewares/validateData.js'
import {
  createProductSchema,
  productParamsSchema,
  productQuerySchema,
  updateProductSchema,
} from '../schemas/product.schema.js'

export const productsRouter = Router()

productsRouter.get('/', validateData(productQuerySchema), listProducts)
productsRouter.get('/:id', validateData(productParamsSchema), getProductById)
productsRouter.post('/', authenticate, validateData(createProductSchema), createProduct)
productsRouter.put('/:id', authenticate, validateData(updateProductSchema), updateProduct)
productsRouter.delete('/:id', authenticate, validateData(productParamsSchema), deleteProduct)
