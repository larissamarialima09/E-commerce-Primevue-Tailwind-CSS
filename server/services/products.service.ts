import type {
  CreateProductDTO,
  ProductFiltersDTO,
  UpdateProductDTO,
} from '../dtos/product.dto.js'
import { Product } from '../entities/product.entity.js'
import { AppError } from '../errors/app-error.js'
import { categoryRepository } from '../repositories/categories.repository.js'
import { productRepository } from '../repositories/products.repository.js'

export class ProductService {
  getAll(filters: ProductFiltersDTO): Product[] {
    return productRepository.getAllProducts(filters)
  }

  getById(id: string): Product {
    const product = productRepository.getProductById(id)

    if (!product) {
      throw new AppError('Produto nao encontrado.', 404)
    }

    return product
  }

  create(data: CreateProductDTO): Product {
    const category = categoryRepository.getCategoryById(data.categoryId)

    if (!category) {
      throw new AppError('Categoria informada nao existe.', 404)
    }

    const product = Product.create(data)
    const existingProduct = productRepository.findByName(product.name)

    if (existingProduct) {
      throw new AppError('Ja existe um produto com esse nome.', 409)
    }

    return productRepository.createProduct(product)
  }

  update(id: string, data: UpdateProductDTO): Product {
    const currentProduct = productRepository.getProductById(id)

    if (!currentProduct) {
      throw new AppError('Produto nao encontrado.', 404)
    }

    if (currentProduct.categoryId !== data.categoryId) {
      const category = categoryRepository.getCategoryById(data.categoryId)

      if (!category) {
        throw new AppError('Categoria informada nao existe.', 404)
      }
    }

    const product = Product.create({ ...data, id })
    const existingProduct = productRepository.findByName(product.name)

    if (existingProduct && existingProduct.id !== id) {
      throw new AppError('Ja existe um produto com esse nome.', 409)
    }

    const updatedProduct = productRepository.updateProduct(product)

    if (!updatedProduct) {
      throw new AppError('Produto nao encontrado.', 404)
    }

    return updatedProduct
  }

  delete(id: string): void {
    const product = productRepository.getProductById(id)

    if (!product) {
      throw new AppError('Produto nao encontrado.', 404)
    }

    productRepository.deleteProduct(id)
  }
}

export const productsService = new ProductService()
