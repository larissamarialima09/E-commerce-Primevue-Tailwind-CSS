import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller.js'
import { authMiddleware } from '../middlewares/authenticate.js'
import { authorize } from '../middlewares/authorize.js'
import { categoriesService } from '../services/categories.service.js'

export const categoryRouter = Router()

const categoryController = new CategoryController(categoriesService)
const protectedAdminRoute = [authMiddleware, authorize('admin')]

categoryRouter.get('/', categoryController.getAll)
categoryRouter.get('/:id', categoryController.getById)
categoryRouter.post('/', protectedAdminRoute, categoryController.create)
categoryRouter.put('/:id', protectedAdminRoute, categoryController.update)
categoryRouter.delete('/:id', protectedAdminRoute, categoryController.delete)
