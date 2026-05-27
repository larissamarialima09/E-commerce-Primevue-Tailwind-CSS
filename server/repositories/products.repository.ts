import { products } from '../data/products.js'
import type { CreateProductDTO, ProductFiltersDTO, UpdateProductDTO } from '../dtos/product.dto.js'
import type { Product } from '../entities/product.entity.js'

export const productsRepository = {
  findAll(filters: ProductFiltersDTO = {}): Product[] {
    if (!filters.category) {
      return products
    }

    return products.filter((product) => product.categoryId === filters.category)
  },

  findById(id: string): Product | undefined {
    return products.find((product) => product.id === id)
  },

  findByName(name: string): Product | undefined {
    const normalizedName = name.trim().toLowerCase()

    return products.find((product) => product.name.trim().toLowerCase() === normalizedName)
  },

  existsByCategoryId(categoryId: string): boolean {
    return products.some((product) => product.categoryId === categoryId)
  },

  create(data: CreateProductDTO): Product {
    const product: Product = {
      id: crypto.randomUUID(),
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
    }

    products.push(product)

    return product
  },

  update(id: string, data: UpdateProductDTO): Product | undefined {
    const product = this.findById(id)

    if (!product) {
      return undefined
    }

    product.name = data.name
    product.price = data.price
    product.categoryId = data.categoryId

    return product
  },

  delete(id: string): boolean {
    const index = products.findIndex((product) => product.id === id)

    if (index < 0) {
      return false
    }

    products.splice(index, 1)

    return true
  },
}
