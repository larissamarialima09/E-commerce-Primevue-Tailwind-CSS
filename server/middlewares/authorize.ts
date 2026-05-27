import type { NextFunction, Request, Response } from 'express'
import type { User } from '../entities/user.entity.js'

export function authorize(role: User['role']) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const user = res.locals.user as { role?: User['role'] } | undefined

    if (user?.role !== role) {
      res.status(403).json({ message: 'Acesso negado.' })
      return
    }

    next()
  }
}
