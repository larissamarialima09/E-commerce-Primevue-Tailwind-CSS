import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../services/auth.service.js'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authorization = req.headers.authorization

  if (!authorization?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token JWT nao informado.' })
    return
  }

  const token = authorization.replace('Bearer ', '').trim()
  const payload = verifyToken(token)

  if (!payload) {
    res.status(401).json({ message: 'Token JWT invalido ou expirado.' })
    return
  }

  res.locals.user = payload
  next()
}

export const authenticate = authMiddleware
