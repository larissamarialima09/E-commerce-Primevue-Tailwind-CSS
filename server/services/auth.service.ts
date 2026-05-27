import { createHmac, timingSafeEqual } from 'node:crypto'
import { users } from '../data/users.js'
import type { AuthUserDTO, LoginDTO, LoginResponseDTO } from '../dtos/auth.dto.js'
import type { User } from '../entities/user.entity.js'

interface JwtPayload {
  sub: string
  name: string
  email: string
  role: User['role']
  exp: number
}

export type AuthServiceResult =
  | { ok: true; data: LoginResponseDTO }
  | { ok: false; status: number; message: string }

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-ecommerce'
const JWT_EXPIRES_IN_SECONDS = 60 * 60

function base64UrlEncode(value: string): string {
  return Buffer.from(value).toString('base64url')
}

function sign(data: string): string {
  return createHmac('sha256', JWT_SECRET).update(data).digest('base64url')
}

function removePassword(user: User): AuthUserDTO {
  const { password: _password, ...safeUser } = user

  return safeUser
}

export function createToken(user: User): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }
  const payload: JwtPayload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN_SECONDS,
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = sign(`${encodedHeader}.${encodedPayload}`)

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export function verifyToken(token: string): JwtPayload | null {
  const [encodedHeader, encodedPayload, signature] = token.split('.')

  if (!encodedHeader || !encodedPayload || !signature) {
    return null
  }

  const expectedSignature = sign(`${encodedHeader}.${encodedPayload}`)
  const receivedBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return null
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString()) as JwtPayload

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null
  }

  return payload
}

export const authService = {
  login(data: LoginDTO): AuthServiceResult {
    const email = data.email.trim().toLowerCase()
    const user = users.find((item) => item.email === email)

    if (!user || user.password !== data.password) {
      return { ok: false, status: 401, message: 'E-mail ou senha invalidos.' }
    }

    return {
      ok: true,
      data: {
        token: createToken(user),
        user: removePassword(user),
      },
    }
  },
}
