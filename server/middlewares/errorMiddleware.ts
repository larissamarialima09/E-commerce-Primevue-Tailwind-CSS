import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../errors/app-error.js'

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Erro de validacao.',
      errors: error.issues,
    })
    return
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message })
    return
  }

  res.status(500).json({ message: 'Erro interno do servidor.' })
}
