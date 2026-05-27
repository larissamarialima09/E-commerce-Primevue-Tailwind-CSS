import type { NextFunction, Request, Response } from 'express'
import {
  CreateProductDTO,
  ProductListDTO,
  ProductResponseDTO,
  UpdateProductDTO,
} from '../dtos/product.dto.js'
import type { ProductService } from '../services/products.service.js'
import {
  createProductSchema,
  productParamsSchema,
  productQuerySchema,
  updateProductSchema,
} from '../schemas/product.schema.js'

export class ProductController {
  constructor(private readonly service: ProductService) {}

  getAll = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { query } = productQuerySchema.parse({ query: req.query })
      const products = this.service.getAll(query)

      res.status(200).json(ProductListDTO.create({ page: query.page, size: query.size, data: products }))
    } catch (error) {
      next(error)
    }
  }

  getById = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { params } = productParamsSchema.parse({ params: req.params })
      const product = this.service.getById(params.id)

      res.status(200).json(ProductResponseDTO.create(product))
    } catch (error) {
      next(error)
    }
  }

  create = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { body } = createProductSchema.parse({ body: req.body })
      const product = this.service.create(CreateProductDTO.create(body))

      res.status(201).json(ProductResponseDTO.create(product))
    } catch (error) {
      next(error)
    }
  }

  update = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { params, body } = updateProductSchema.parse({
        params: req.params,
        body: req.body,
      })
      const product = this.service.update(params.id, UpdateProductDTO.create(body))

      res.status(200).json(ProductResponseDTO.create(product))
    } catch (error) {
      next(error)
    }
  }

  delete = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { params } = productParamsSchema.parse({ params: req.params })

      this.service.delete(params.id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
