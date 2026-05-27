import type { Category } from '../entities/category.entity.js'

export interface CreateCategoryDTO {
  name: string
}

export interface UpdateCategoryDTO extends CreateCategoryDTO {}

export interface CategoryListDTO {
  page: number
  size: number
  total: number
  data: Category[]
}
