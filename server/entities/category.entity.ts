import { AppError } from '../errors/app-error.js'

interface CategoryProps {
  id?: string
  name: string
}

export class Category {
  id: string
  name: string

  private constructor(props: Required<CategoryProps>) {
    this.id = props.id
    this.name = props.name
  }

  static create(props: CategoryProps): Category {
    const name = props.name.trim()

    if (name.length < 3) {
      throw new AppError('Nome da categoria deve ter pelo menos 3 caracteres.')
    }

    return new Category({
      id: props.id ?? crypto.randomUUID(),
      name,
    })
  }

  rename(name: string): void {
    const renamedCategory = Category.create({ id: this.id, name })
    this.name = renamedCategory.name
  }
}
