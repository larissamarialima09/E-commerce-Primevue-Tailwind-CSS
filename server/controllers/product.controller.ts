import type { Request, Response } from 'express'
import { products, type Product } from '../data/products.js'

type CreateProductBody = Pick<Product, 'name' | 'price' | 'categoryId'>

export function listProducts(req: Request, res: Response): void {
  const query = res.locals.validated.query as { category?: string }
  const category = query.category
  const filteredProducts = category
    ? products.filter((product) => product.categoryId === category)
    : products

  res.status(200).json({
    category: category ?? null,
    data: filteredProducts,
  })
}

export function createProduct(req: Request<unknown, unknown, CreateProductBody>, res: Response): void {
  const product: Product = {
    id: crypto.randomUUID(),
    name: req.body.name,
    price: req.body.price,
    categoryId: req.body.categoryId,
  }

  products.push(product)
  res.status(201).json(product)
}

export function deleteProduct(req: Request<{ id: string }>, res: Response): void {
  const index = products.findIndex((product) => product.id === req.params.id)

  if (index >= 0) {
    products.splice(index, 1)
  }

  res.status(204).send()
}
