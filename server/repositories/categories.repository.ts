import { categories } from '../data/categories.js'
import type { Category } from '../entities/category.entity.js'

export interface CategoryPagination {
  page: number
  size: number
}

export const categoryRepository = {
  getAllCategories({ page, size }: CategoryPagination): Category[] {
    const start = (page - 1) * size

    return categories.slice(start, start + size)
  },

  count(): number {
    return categories.length
  },

  getCategoryById(id: string): Category | null {
    return categories.find((category) => category.id === id) ?? null
  },

  findByName(name: string): Category | undefined {
    const normalizedName = name.trim().toLowerCase()

    return categories.find((category) => category.name.trim().toLowerCase() === normalizedName)
  },

  createCategory(category: Category): Category {
    categories.push(category)

    return category
  },

  updateCategory(category: Category): Category | null {
    const index = categories.findIndex((item) => item.id === category.id)

    if (index < 0) {
      return null
    }

    categories[index] = category

    return category
  },

  deleteCategory(id: string): Category | null {
    const index = categories.findIndex((category) => category.id === id)

    if (index < 0) {
      return null
    }

    const [category] = categories.splice(index, 1)

    return category ?? null
  },
}

export const categoriesRepository = categoryRepository
