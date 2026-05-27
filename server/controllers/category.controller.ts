import type { Request, Response } from 'express'
import type { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto.js'
import { categoriesService } from '../services/categories.service.js'

export function listCategories(_req: Request, res: Response): void {
  const query = res.locals.validated.query as { page: number; size: number }
  const { page, size } = query

  res.status(200).json(categoriesService.list(page, size))
}

export function getCategoryById(req: Request<{ id: string }>, res: Response): void {
  const result = categoriesService.getById(req.params.id)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(200).json(result.data)
}

export function createCategory(req: Request<unknown, unknown, CreateCategoryDTO>, res: Response): void {
  const result = categoriesService.create(req.body)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(201).json(result.data)
}

export function updateCategory(
  req: Request<{ id: string }, unknown, UpdateCategoryDTO>,
  res: Response,
): void {
  const result = categoriesService.update(req.params.id, req.body)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(200).json(result.data)
}

export function deleteCategory(req: Request<{ id: string }>, res: Response): void {
  const result = categoriesService.delete(req.params.id)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(204).send()
}
