import { z } from 'zod'

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Nome do produto deve ter pelo menos 3 caracteres.'),
    price: z.number().positive('Preco deve ser positivo.'),
    categoryId: z.uuid('ID da categoria deve ser um UUID valido.'),
  }),
})

export const productQuerySchema = z.object({
  query: z.object({
    category: z.uuid('Filtro de categoria deve ser um UUID valido.').optional(),
  }),
})

export const productParamsSchema = z.object({
  params: z.object({
    id: z.uuid('ID do produto deve ser um UUID valido.'),
  }),
})
