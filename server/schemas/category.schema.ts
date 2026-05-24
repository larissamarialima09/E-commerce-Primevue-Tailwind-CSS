import { z } from 'zod'

export const categoryQueryPaginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    size: z.coerce.number().int().positive().max(100).default(10),
  }),
})

export const categoryParamsSchema = z.object({
  params: z.object({
    id: z.uuid('ID da categoria deve ser um UUID valido.'),
  }),
})

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Nome da categoria deve ter pelo menos 3 caracteres.'),
  }),
})

export const updateCategorySchema = z.object({
  params: categoryParamsSchema.shape.params,
  body: createCategorySchema.shape.body,
})
