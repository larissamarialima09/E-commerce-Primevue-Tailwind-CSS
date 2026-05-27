import type {
  CreateProductDTO,
  ProductFiltersDTO,
  UpdateProductDTO,
} from '../dtos/product.dto.js'
import type { Product } from '../entities/product.entity.js'
import { categoriesRepository } from '../repositories/categories.repository.js'
import { productsRepository } from '../repositories/products.repository.js'

export type ProductServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string }

type ProductValidationResult = { ok: true } | { ok: false; status: number; message: string }

export const productsService = {
  list(filters: ProductFiltersDTO): Product[] {
    return productsRepository.findAll(filters)
  },

  getById(id: string): ProductServiceResult<Product> {
    const product = productsRepository.findById(id)

    if (!product) {
      return { ok: false, status: 404, message: 'Produto nao encontrado.' }
    }

    return { ok: true, data: product }
  },

  create(data: CreateProductDTO): ProductServiceResult<Product> {
    const validation = this.validateProductData(data)

    if (!validation.ok) {
      return validation
    }

    return { ok: true, data: productsRepository.create(data) }
  },

  update(id: string, data: UpdateProductDTO): ProductServiceResult<Product> {
    const product = productsRepository.findById(id)

    if (!product) {
      return { ok: false, status: 404, message: 'Produto nao encontrado.' }
    }

    const validation = this.validateProductData(data, id)

    if (!validation.ok) {
      return validation
    }

    const updatedProduct = productsRepository.update(id, data)

    return { ok: true, data: updatedProduct as Product }
  },

  delete(id: string): ProductServiceResult<null> {
    const product = productsRepository.findById(id)

    if (!product) {
      return { ok: false, status: 404, message: 'Produto nao encontrado.' }
    }

    productsRepository.delete(id)

    return { ok: true, data: null }
  },

  validateProductData(
    data: CreateProductDTO | UpdateProductDTO,
    productId?: string,
  ): ProductValidationResult {
    const category = categoriesRepository.findById(data.categoryId)

    if (!category) {
      return { ok: false, status: 404, message: 'Categoria informada nao existe.' }
    }

    const existingProduct = productsRepository.findByName(data.name)

    if (existingProduct && existingProduct.id !== productId) {
      return { ok: false, status: 409, message: 'Ja existe um produto com esse nome.' }
    }

    return { ok: true }
  },
}
