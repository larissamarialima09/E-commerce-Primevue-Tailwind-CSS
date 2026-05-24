import type { NextFunction, Request, Response } from 'express'

export function validateBody(req: Request, res: Response, next: NextFunction): void {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'O corpo da requisição é obrigatório.' })
    return
  }

  next()
}
