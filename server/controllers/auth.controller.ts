import type { Request, Response } from 'express'
import type { LoginDTO } from '../dtos/auth.dto.js'
import { authService } from '../services/auth.service.js'

export function login(req: Request<unknown, unknown, LoginDTO>, res: Response): void {
  const result = authService.login(req.body)

  if (!result.ok) {
    res.status(result.status).json({ message: result.message })
    return
  }

  res.status(200).json(result.data)
}
