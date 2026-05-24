import type { Category } from './category.model'

export class Product {
  id: number
  name: string
  description: string
  price: number
  category: Category
  image: string

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    category: Category,
    image: string,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.category = category
    this.image = image
  }
}
