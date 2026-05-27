import type { NextFunction, Request, Response } from 'express'
import {
  CategoryListDTO,
  CategoryResponseDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../dtos/category.dto.js'
import type { CategoryService } from '../services/categories.service.js'
import {
  categoryParamsSchema,
  categoryQueryPaginationSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema.js'

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  getAll = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { query } = categoryQueryPaginationSchema.parse({ query: req.query })
      const result = this.service.getAll(query.page, query.size)

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  getById = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { params } = categoryParamsSchema.parse({ params: req.params })
      const category = this.service.getById(params.id)

      res.status(200).json(CategoryResponseDTO.create(category))
    } catch (error) {
      next(error)
    }
  }

  create = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { body } = createCategorySchema.parse({ body: req.body })
      const category = this.service.create(CreateCategoryDTO.create(body))

      res.status(201).json(CategoryResponseDTO.create(category))
    } catch (error) {
      next(error)
    }
  }

  update = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { params, body } = updateCategorySchema.parse({
        params: req.params,
        body: req.body,
      })
      const category = this.service.update(params.id, UpdateCategoryDTO.create(body))

      res.status(200).json(CategoryResponseDTO.create(category))
    } catch (error) {
      next(error)
    }
  }

  delete = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { params } = categoryParamsSchema.parse({ params: req.params })

      this.service.delete(params.id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
