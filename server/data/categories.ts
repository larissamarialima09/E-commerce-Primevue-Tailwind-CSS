import { Category } from '../entities/category.entity.js'

export const categories: Category[] = [
  Category.create({
    id: '11111111-1111-4111-8111-111111111111',
    name: 'Eletronicos',
  }),
  Category.create({
    id: '22222222-2222-4222-8222-222222222222',
    name: 'Perifericos',
  }),
]
