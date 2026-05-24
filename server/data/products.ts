export interface Product {
  id: number
  name: string
  category: string
  price: number
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Teclado gamer',
    category: 'eletronicos',
    price: 200,
  },
  {
    id: 2,
    name: 'Mouse gamer',
    category: 'eletronicos',
    price: 150,
  },
  {
    id: 3,
    name: 'Cadeira gamer',
    category: 'moveis',
    price: 799,
  },
]
