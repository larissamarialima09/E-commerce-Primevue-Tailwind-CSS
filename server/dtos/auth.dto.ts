import type { User } from '../entities/user.entity.js'

export interface LoginDTO {
  email: string
  password: string
}

export interface AuthUserDTO extends Omit<User, 'password'> {}

export interface LoginResponseDTO {
  token: string
  user: AuthUserDTO
}
