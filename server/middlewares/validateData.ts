import type { NextFunction, Request, Response } from 'express'
import type { ZodTypeAny } from 'zod'

interface ValidatedData {
  body?: unknown
  params?: Record<string, string>
  query?: Request['query']
}

export function validateData(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    })

    if (!result.success) {
      res.status(400).json({
        message: 'Erro de validacao.',
        errors: result.error.issues,
      })
      return
    }

    const data = result.data as ValidatedData

    res.locals.validated = data

    if (data.body) {
      req.body = data.body
    }

    if (data.params) {
      req.params = data.params
    }

    next()
  }
}
