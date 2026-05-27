import type { User } from '../entities/user.entity.js'

export const users: User[] = [
  {
    id: '33333333-3333-4333-8333-333333333333',
    name: 'Administrador',
    email: 'admin@teste.com',
    password: '123',
    role: 'admin',
  },
  {
    id: '44444444-4444-4444-8444-444444444444',
    name: 'Cliente',
    email: 'user@teste.com',
    password: '123456',
    role: 'customer',
  },
]
