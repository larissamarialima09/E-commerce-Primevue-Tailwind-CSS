export interface Product {
  id: string
  name: string
  categoryId: string
  price: number
}

export const products: Product[] = [
  {
    id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    name: 'Teclado gamer',
    categoryId: '11111111-1111-4111-8111-111111111111',
    price: 200,
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    name: 'Mouse gamer',
    categoryId: '11111111-1111-4111-8111-111111111111',
    price: 150,
  },
]
