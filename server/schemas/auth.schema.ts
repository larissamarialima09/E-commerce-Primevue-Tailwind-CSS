import { z } from 'zod'

export const loginSchema = z.object({
  body: z.object({
    email: z.email('E-mail invalido.'),
    password: z.string().min(1, 'Senha e obrigatoria.'),
  }),
})
