import type { Request, Response } from 'express'
import { categories, type Category } from '../data/categories.js'

export function listCategories(req: Request, res: Response): void {
  const query = res.locals.validated.query as { page: number; size: number }
  const { page, size } = query
  const start = (page - 1) * size
  const paginatedCategories = categories.slice(start, start + size)

  res.status(200).json({
    page,
    size,
    total: categories.length,
    data: paginatedCategories,
  })
}

export function getCategoryById(req: Request<{ id: string }>, res: Response): void {
  const category = categories.find((item) => item.id === req.params.id)

  if (!category) {
    res.status(404).json({ message: 'Categoria nao encontrada.' })
    return
  }

  res.status(200).json(category)
}

export function createCategory(req: Request<unknown, unknown, Pick<Category, 'name'>>, res: Response): void {
  const category: Category = {
    id: crypto.randomUUID(),
    name: req.body.name,
  }

  categories.push(category)
  res.status(201).json(category)
}

export function updateCategory(
  req: Request<{ id: string }, unknown, Pick<Category, 'name'>>,
  res: Response,
): void {
  const category = categories.find((item) => item.id === req.params.id)

  if (!category) {
    res.status(404).json({ message: 'Categoria nao encontrada.' })
    return
  }

  category.name = req.body.name
  res.status(200).json(category)
}

export function deleteCategory(req: Request<{ id: string }>, res: Response): void {
  const index = categories.findIndex((item) => item.id === req.params.id)

  if (index >= 0) {
    categories.splice(index, 1)
  }

  res.status(204).send()
}
