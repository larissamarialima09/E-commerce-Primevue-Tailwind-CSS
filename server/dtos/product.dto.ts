import type { Product } from '../entities/product.entity.js'

export interface CreateProductDTO {
  name: string
  price: number
  categoryId: string
}

export interface UpdateProductDTO extends CreateProductDTO {}

export interface ProductFiltersDTO {
  category?: string
}

export interface ProductListDTO {
  category: string | null
  data: Product[]
}
