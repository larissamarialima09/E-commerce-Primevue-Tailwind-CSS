import type { Product } from '../entities/product.entity.js'

export class CreateProductDTO {
  name: string
  price: number
  stock: number
  categoryId: string

  protected constructor(data: { name: string; price: number; stock: number; categoryId: string }) {
    this.name = data.name
    this.price = data.price
    this.stock = data.stock
    this.categoryId = data.categoryId
  }

  static create(data: { name: string; price: number; stock: number; categoryId: string }): CreateProductDTO {
    return new CreateProductDTO(data)
  }
}

export class UpdateProductDTO extends CreateProductDTO {
  static create(data: { name: string; price: number; stock: number; categoryId: string }): UpdateProductDTO {
    return new UpdateProductDTO(data)
  }
}

export interface ProductFiltersDTO {
  category?: string
  page: number
  size: number
}

export class ProductResponseDTO {
  id: string
  name: string
  price: number
  stock: number
  categoryId: string

  private constructor(product: Product) {
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.stock = product.stock
    this.categoryId = product.categoryId
  }

  static create(product: Product): ProductResponseDTO {
    return new ProductResponseDTO(product)
  }
}

export class ProductListDTO {
  page: number
  size: number
  data: ProductResponseDTO[]

  private constructor(page: number, size: number, data: Product[]) {
    this.page = page
    this.size = size
    this.data = data.map(ProductResponseDTO.create)
  }

  static create(props: { page: number; size: number; data: Product[] }): ProductListDTO {
    return new ProductListDTO(props.page, props.size, props.data)
  }
}
