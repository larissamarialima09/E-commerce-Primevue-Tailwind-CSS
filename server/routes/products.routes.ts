import { Router } from 'express'
import { createProduct, deleteProduct, listProducts } from '../controllers/product.controller.js'
import { validateData } from '../middlewares/validateData.js'
import {
  createProductSchema,
  productParamsSchema,
  productQuerySchema,
} from '../schemas/product.schema.js'

export const productsRouter = Router()

productsRouter.get('/', validateData(productQuerySchema), listProducts)
productsRouter.post('/', validateData(createProductSchema), createProduct)
productsRouter.delete('/:id', validateData(productParamsSchema), deleteProduct)
