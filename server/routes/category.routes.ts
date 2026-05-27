import { Router } from 'express'
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  updateCategory,
} from '../controllers/category.controller.js'
import { authenticate } from '../middlewares/authenticate.js'
import { validateData } from '../middlewares/validateData.js'
import {
  categoryParamsSchema,
  categoryQueryPaginationSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema.js'

export const categoryRouter = Router()

categoryRouter.get('/', validateData(categoryQueryPaginationSchema), listCategories)
categoryRouter.get('/:id', validateData(categoryParamsSchema), getCategoryById)
categoryRouter.post('/', authenticate, validateData(createCategorySchema), createCategory)
categoryRouter.put('/:id', authenticate, validateData(updateCategorySchema), updateCategory)
categoryRouter.delete('/:id', authenticate, validateData(categoryParamsSchema), deleteCategory)
