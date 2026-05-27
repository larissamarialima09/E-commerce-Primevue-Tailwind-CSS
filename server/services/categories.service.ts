import type {
  CategoryListDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../dtos/category.dto.js'
import type { Category } from '../entities/category.entity.js'
import { categoriesRepository } from '../repositories/categories.repository.js'
import { productsRepository } from '../repositories/products.repository.js'

export type CategoryServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string }

export const categoriesService = {
  list(page: number, size: number): CategoryListDTO {
    return {
      page,
      size,
      total: categoriesRepository.count(),
      data: categoriesRepository.findAll({ page, size }),
    }
  },

  getById(id: string): CategoryServiceResult<Category> {
    const category = categoriesRepository.findById(id)

    if (!category) {
      return { ok: false, status: 404, message: 'Categoria nao encontrada.' }
    }

    return { ok: true, data: category }
  },

  create(data: CreateCategoryDTO): CategoryServiceResult<Category> {
    const existingCategory = categoriesRepository.findByName(data.name)

    if (existingCategory) {
      return { ok: false, status: 409, message: 'Ja existe uma categoria com esse nome.' }
    }

    return { ok: true, data: categoriesRepository.create(data) }
  },

  update(id: string, data: UpdateCategoryDTO): CategoryServiceResult<Category> {
    const category = categoriesRepository.findById(id)

    if (!category) {
      return { ok: false, status: 404, message: 'Categoria nao encontrada.' }
    }

    const existingCategory = categoriesRepository.findByName(data.name)

    if (existingCategory && existingCategory.id !== id) {
      return { ok: false, status: 409, message: 'Ja existe uma categoria com esse nome.' }
    }

    const updatedCategory = categoriesRepository.update(id, data)

    return { ok: true, data: updatedCategory as Category }
  },

  delete(id: string): CategoryServiceResult<null> {
    const category = categoriesRepository.findById(id)

    if (!category) {
      return { ok: false, status: 404, message: 'Categoria nao encontrada.' }
    }

    if (productsRepository.existsByCategoryId(id)) {
      return {
        ok: false,
        status: 409,
        message: 'Categoria nao pode ser removida porque possui produtos vinculados.',
      }
    }

    categoriesRepository.delete(id)

    return { ok: true, data: null }
  },
}
