import { products } from '../data/products.js'
import type { ProductFiltersDTO } from '../dtos/product.dto.js'
import type { Product } from '../entities/product.entity.js'

export const productRepository = {
  getAllProducts(filters: ProductFiltersDTO): Product[] {
    const start = (filters.page - 1) * filters.size
    const filteredProducts = filters.category
      ? products.filter((product) => product.categoryId === filters.category)
      : products

    return filteredProducts.slice(start, start + filters.size)
  },

  getProductById(id: string): Product | null {
    return products.find((product) => product.id === id) ?? null
  },

  findByName(name: string): Product | undefined {
    const normalizedName = name.trim().toLowerCase()

    return products.find((product) => product.name.trim().toLowerCase() === normalizedName)
  },

  existsByCategoryId(categoryId: string): boolean {
    return products.some((product) => product.categoryId === categoryId)
  },

  createProduct(product: Product): Product {
    products.push(product)

    return product
  },

  updateProduct(product: Product): Product | null {
    const index = products.findIndex((item) => item.id === product.id)

    if (index < 0) {
      return null
    }

    products[index] = product

    return product
  },

  deleteProduct(id: string): Product | null {
    const index = products.findIndex((product) => product.id === id)

    if (index < 0) {
      return null
    }

    const [product] = products.splice(index, 1)

    return product ?? null
  },
}

export const productsRepository = productRepository
