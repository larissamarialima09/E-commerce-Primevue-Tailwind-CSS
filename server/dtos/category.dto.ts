import type { Category } from '../entities/category.entity.js'

export class CreateCategoryDTO {
  name: string

  protected constructor(name: string) {
    this.name = name
  }

  static create(data: { name: string }): CreateCategoryDTO {
    return new CreateCategoryDTO(data.name)
  }
}

export class UpdateCategoryDTO extends CreateCategoryDTO {
  static create(data: { name: string }): UpdateCategoryDTO {
    return new UpdateCategoryDTO(data.name)
  }
}

export class CategoryResponseDTO {
  id: string
  name: string

  private constructor(category: Category) {
    this.id = category.id
    this.name = category.name
  }

  static create(category: Category): CategoryResponseDTO {
    return new CategoryResponseDTO(category)
  }
}

export class CategoryListDTO {
  page: number
  size: number
  total: number
  data: CategoryResponseDTO[]

  private constructor(page: number, size: number, total: number, data: Category[]) {
    this.page = page
    this.size = size
    this.total = total
    this.data = data.map(CategoryResponseDTO.create)
  }

  static create(props: { page: number; size: number; total: number; data: Category[] }): CategoryListDTO {
    return new CategoryListDTO(props.page, props.size, props.total, props.data)
  }
}
