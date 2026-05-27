import { Router } from 'express'
import { login } from '../controllers/auth.controller.js'
import { validateData } from '../middlewares/validateData.js'
import { loginSchema } from '../schemas/auth.schema.js'

export const authRouter = Router()

authRouter.post('/login', validateData(loginSchema), login)
