import { CategoryListDTO, type CreateCategoryDTO, type UpdateCategoryDTO } from '../dtos/category.dto.js'
import { Category } from '../entities/category.entity.js'
import { AppError } from '../errors/app-error.js'
import { categoryRepository } from '../repositories/categories.repository.js'
import { productsRepository } from '../repositories/products.repository.js'

export class CategoryService {
  getAll(page: number, size: number): CategoryListDTO {
    return CategoryListDTO.create({
      page,
      size,
      total: categoryRepository.count(),
      data: categoryRepository.getAllCategories({ page, size }),
    })
  }

  getById(id: string): Category {
    const category = categoryRepository.getCategoryById(id)

    if (!category) {
      throw new AppError('Categoria nao encontrada.', 404)
    }

    return category
  }

  create(data: CreateCategoryDTO): Category {
    const category = Category.create(data)
    const existingCategory = categoryRepository.findByName(category.name)

    if (existingCategory) {
      throw new AppError('Ja existe uma categoria com esse nome.', 409)
    }

    return categoryRepository.createCategory(category)
  }

  update(id: string, data: UpdateCategoryDTO): Category {
    const category = categoryRepository.getCategoryById(id)

    if (!category) {
      throw new AppError('Categoria nao encontrada.', 404)
    }

    category.rename(data.name)
    const existingCategory = categoryRepository.findByName(category.name)

    if (existingCategory && existingCategory.id !== id) {
      throw new AppError('Ja existe uma categoria com esse nome.', 409)
    }

    const updatedCategory = categoryRepository.updateCategory(category)

    if (!updatedCategory) {
      throw new AppError('Categoria nao encontrada.', 404)
    }

    return updatedCategory
  }

  delete(id: string): void {
    const category = categoryRepository.getCategoryById(id)

    if (!category) {
      throw new AppError('Categoria nao encontrada.', 404)
    }

    if (productsRepository.existsByCategoryId(id)) {
      throw new AppError('Categoria nao pode ser removida porque possui produtos vinculados.', 409)
    }

    categoryRepository.deleteCategory(id)
  }
}

export const categoriesService = new CategoryService()
