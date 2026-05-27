import { Product } from '../entities/product.entity.js'

export const products: Product[] = [
  Product.create({
    id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    name: 'Teclado gamer',
    categoryId: '11111111-1111-4111-8111-111111111111',
    price: 200,
    stock: 10,
  }),
  Product.create({
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    name: 'Mouse gamer',
    categoryId: '11111111-1111-4111-8111-111111111111',
    price: 150,
    stock: 15,
  }),
]
