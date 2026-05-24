import { defineStore } from 'pinia'
import { ref } from 'vue'

interface AuthUser {
  name: string
  email: string
  role: 'admin' | 'customer'
}

interface StoredAccount extends AuthUser {
  password: string
}

const STORAGE_USER_KEY = 'authUser'
const STORAGE_TOKEN_KEY = 'authToken'
const STORAGE_ACCOUNTS_KEY = 'authAccounts'

const defaultAccounts: StoredAccount[] = [
  {
    name: 'Administrador',
    email: 'admin@teste.com',
    password: '123',
    role: 'admin',
  },
  {
    name: 'Cliente',
    email: 'user@teste.com',
    password: '123456',
    role: 'customer',
  },
]

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function toAuthUser(account: StoredAccount): AuthUser {
  return {
    name: account.name,
    email: account.email,
    role: account.role,
  }
}

function loadStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function loadAccounts(): StoredAccount[] {
  const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(defaultAccounts))
    return defaultAccounts
  }

  try {
    const accounts = JSON.parse(raw) as StoredAccount[]
    return accounts.length ? accounts : defaultAccounts
  } catch {
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(defaultAccounts))
    return defaultAccounts
  }
}

function saveAccounts(accounts: StoredAccount[]): void {
  localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts))
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(loadStoredUser())
  const token = ref<string>(localStorage.getItem(STORAGE_TOKEN_KEY) ?? '')
  const isAuthenticated = ref<boolean>(!!token.value)
  const loading = ref(false)

  const persistSession = () => {
    if (user.value && token.value) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user.value))
      localStorage.setItem(STORAGE_TOKEN_KEY, token.value)
    }
  }

  const clearSession = () => {
    localStorage.removeItem(STORAGE_USER_KEY)
    localStorage.removeItem(STORAGE_TOKEN_KEY)
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const normalizedEmail = normalizeEmail(email)
    const account = loadAccounts().find((item) => item.email === normalizedEmail)

    if (!account) {
      loading.value = false
      return { success: false, code: 'ACCOUNT_NOT_FOUND', message: 'Conta não encontrada.' }
    }

    if (account.password !== password) {
      loading.value = false
      return {
        success: false,
        code: 'INVALID_PASSWORD',
        message: 'Senha incorreta. Você pode redefinir a senha.',
      }
    }

    user.value = toAuthUser(account)
    token.value = `fake-jwt-token-${Date.now()}`
    isAuthenticated.value = true
    persistSession()
    loading.value = false

    return { success: true }
  }

  const register = async (name: string, email: string, password: string) => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const normalizedEmail = normalizeEmail(email)
    const accounts = loadAccounts()
    const accountExists = accounts.some((item) => item.email === normalizedEmail)

    if (accountExists) {
      loading.value = false
      return {
        success: false,
        code: 'ACCOUNT_EXISTS',
        message: 'Já existe uma conta cadastrada com este e-mail.',
      }
    }

    const newAccount: StoredAccount = {
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'customer',
    }

    accounts.push(newAccount)
    saveAccounts(accounts)

    user.value = toAuthUser(newAccount)
    token.value = `fake-jwt-token-${Date.now()}`
    isAuthenticated.value = true
    persistSession()
    loading.value = false

    return { success: true }
  }

  const requestPasswordReset = async (email: string) => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 700))

    const normalizedEmail = normalizeEmail(email)
    const accountExists = loadAccounts().some((item) => item.email === normalizedEmail)
    loading.value = false

    if (!accountExists) {
      return { success: false, message: 'Nenhuma conta encontrada para este e-mail.' }
    }

    return {
      success: true,
      message: 'Enviamos as instruções de redefinição de senha para este e-mail.',
    }
  }

  const logout = () => {
    user.value = null
    token.value = ''
    isAuthenticated.value = false
    loading.value = false
    clearSession()
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    requestPasswordReset,
    logout,
  }
})
