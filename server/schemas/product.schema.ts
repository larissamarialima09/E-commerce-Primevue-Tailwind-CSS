import { z } from 'zod'

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Nome do produto deve ter pelo menos 3 caracteres.'),
    price: z.number().positive('Preco deve ser positivo.'),
    stock: z.number().int().nonnegative('Estoque nao pode ser negativo.'),
    categoryId: z.uuid('ID da categoria deve ser um UUID valido.'),
  }),
})

export const productQuerySchema = z.object({
  query: z.object({
    category: z.uuid('Filtro de categoria deve ser um UUID valido.').optional(),
    page: z.coerce.number().int().positive().default(1),
    size: z.coerce.number().int().positive().max(100).default(10),
  }),
})

export const productParamsSchema = z.object({
  params: z.object({
    id: z.uuid('ID do produto deve ser um UUID valido.'),
  }),
})

export const updateProductSchema = z.object({
  params: productParamsSchema.shape.params,
  body: createProductSchema.shape.body,
})
