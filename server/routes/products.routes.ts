import { Router } from 'express'
import type { Request, Response } from 'express'
import { products } from '../data/products.js'

export const productsRouter = Router()

productsRouter.get('/', (req: Request, res: Response): void => {
  const category = req.query.category?.toString().toLowerCase()

  if (!category) {
    res.status(200).json(products)
    return
  }

  const filteredProducts = products.filter((product) => product.category === category)
  res.status(200).json(filteredProducts)
})

productsRouter.get('/:id', (req: Request, res: Response): void => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'O ID do produto deve ser um número.' })
    return
  }

  if (id < 0) {
    res.status(400).json({ message: 'O ID do produto não pode ser negativo.' })
    return
  }

  const product = products.find((item) => item.id === id)

  if (!product) {
    res.status(404).json({ message: 'Produto não encontrado.' })
    return
  }

  res.status(200).json(product)
})
