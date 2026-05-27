import { categories } from '../data/categories.js'
import type { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category.dto.js'
import type { Category } from '../entities/category.entity.js'

export interface CategoryPagination {
  page: number
  size: number
}

export const categoriesRepository = {
  findAll({ page, size }: CategoryPagination): Category[] {
    const start = (page - 1) * size

    return categories.slice(start, start + size)
  },

  count(): number {
    return categories.length
  },

  findById(id: string): Category | undefined {
    return categories.find((category) => category.id === id)
  },

  findByName(name: string): Category | undefined {
    const normalizedName = name.trim().toLowerCase()

    return categories.find((category) => category.name.trim().toLowerCase() === normalizedName)
  },

  create(data: CreateCategoryDTO): Category {
    const category: Category = {
      id: crypto.randomUUID(),
      name: data.name,
    }

    categories.push(category)

    return category
  },

  update(id: string, data: UpdateCategoryDTO): Category | undefined {
    const category = this.findById(id)

    if (!category) {
      return undefined
    }

    category.name = data.name

    return category
  },

  delete(id: string): boolean {
    const index = categories.findIndex((category) => category.id === id)

    if (index < 0) {
      return false
    }

    categories.splice(index, 1)

    return true
  },
}
