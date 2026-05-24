import { Router } from 'express'
import type { Request, Response } from 'express'
import { validateBody } from '../middlewares/validateBody.js'

interface CreateOrderBody {
  customerName: string
  productIds: number[]
}

interface UpdateOrderStatusBody {
  status: string
}

export const ordersRouter = Router()

ordersRouter.post(
  '/',
  validateBody,
  (req: Request<unknown, unknown, CreateOrderBody>, res: Response): void => {
    res.status(201).json(req.body)
  },
)

ordersRouter.patch(
  '/:id',
  (req: Request<{ id: string }, unknown, UpdateOrderStatusBody>, res: Response): void => {
    res.status(200).json({
      id: req.params.id,
      status: req.body.status,
    })
  },
)

ordersRouter.delete('/:id', (_req: Request<{ id: string }>, res: Response): void => {
  res.status(204).send()
})
