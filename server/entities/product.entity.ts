import { AppError } from '../errors/app-error.js'

interface ProductProps {
  id?: string
  name: string
  categoryId: string
  price: number
  stock: number
}

export class Product {
  id: string
  name: string
  categoryId: string
  price: number
  stock: number

  private constructor(props: Required<ProductProps>) {
    this.id = props.id
    this.name = props.name
    this.categoryId = props.categoryId
    this.price = props.price
    this.stock = props.stock
  }

  static create(props: ProductProps): Product {
    const name = props.name.trim()

    if (name.length < 3) {
      throw new AppError('Nome do produto deve ter pelo menos 3 caracteres.')
    }

    if (props.price <= 0) {
      throw new AppError('Preco deve ser positivo.')
    }

    if (props.stock < 0) {
      throw new AppError('Estoque nao pode ser negativo.')
    }

    return new Product({
      id: props.id ?? crypto.randomUUID(),
      name,
      categoryId: props.categoryId,
      price: props.price,
      stock: props.stock,
    })
  }
}
