import type { Request, Response } from 'express'
import type { CreateProductDTO, ProductListDTO, UpdateProductDTO } from '../dtos/product.dto.js'
import { productsService } from '../services/products.service.js'

export function listProducts(_req: Request, res: Response): void {
  const query = res.locals.validated.query as { category?: string }
  const category = query.category
  const response: ProductListDTO = {
    category: category ?? null,
    data: productsService.list({ category }),
  }

  res.status(200).json(response)
}

export function createProduct(req: Request<unknown, unknown, CreateProductDTO>, res: Response): void {
  const result = productsService.create(req.body)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(201).json(result.data)
}

export function getProductById(req: Request<{ id: string }>, res: Response): void {
  const result = productsService.getById(req.params.id)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(200).json(result.data)
}

export function updateProduct(
  req: Request<{ id: string }, unknown, UpdateProductDTO>,
  res: Response,
): void {
  const result = productsService.update(req.params.id, req.body)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(200).json(result.data)
}

export function deleteProduct(req: Request<{ id: string }>, res: Response): void {
  const result = productsService.delete(req.params.id)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(204).send()
}
