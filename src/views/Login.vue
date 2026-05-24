<template>
  <div class="flex min-h-[85vh] items-center justify-center bg-zinc-950 p-4">
    <Card class="w-full max-w-4xl border border-zinc-800 bg-zinc-900 shadow-xl">
      <template #content>
        <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="flex flex-col justify-between rounded-xl bg-zinc-950/60 p-6">
            <div>
              <h2 class="mb-3 text-3xl font-extrabold text-white">Acesse ou crie sua conta</h2>
              <p class="leading-relaxed text-zinc-400">
                Faça login para continuar comprando ou crie uma conta nova para finalizar seus
                pedidos com segurança.
              </p>
            </div>

            <div class="mt-6 space-y-2 text-sm text-zinc-400">
              <p><span class="font-semibold text-emerald-400">Admin:</span> admin@teste.com / 123</p>
              <p>
                <span class="font-semibold text-emerald-400">Cliente:</span> user@teste.com /
                123456
              </p>
            </div>
          </div>

          <div class="p-2 sm:p-6">
            <div class="mb-6 flex gap-2 rounded-full bg-zinc-950 p-1">
              <button
                type="button"
                class="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition"
                :class="
                  activeTab === 0 ? 'bg-emerald-500 text-black' : 'text-zinc-300 hover:text-white'
                "
                @click="activeTab = 0"
              >
                Login
              </button>
              <button
                type="button"
                class="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition"
                :class="
                  activeTab === 1 ? 'bg-emerald-500 text-black' : 'text-zinc-300 hover:text-white'
                "
                @click="activeTab = 1"
              >
                Criar Conta
              </button>
            </div>

            <form v-if="activeTab === 0" class="space-y-4" @submit.prevent="handleLogin">
              <div>
                <label class="mb-2 block text-sm text-zinc-400">E-mail</label>
                <InputText
                  v-model="loginForm.email"
                  placeholder="seu@email.com"
                  class="w-full border bg-zinc-950 text-white"
                  :class="{ 'border-red-500 ring-1 ring-red-500': v$.loginForm.email.$error }"
                />
                <p
                  v-if="v$.loginForm.email.$dirty && !v$.loginForm.email.required"
                  class="mt-1 text-sm text-red-500"
                >
                  E-mail é obrigatório.
                </p>
                <p
                  v-else-if="v$.loginForm.email.$dirty && !v$.loginForm.email.email"
                  class="mt-1 text-sm text-red-500"
                >
                  E-mail inválido.
                </p>
              </div>

              <div>
                <label class="mb-2 block text-sm text-zinc-400">Senha</label>
                <Password
                  v-model="loginForm.password"
                  :feedback="false"
                  toggleMask
                  placeholder="Sua senha"
                  class="w-full border bg-zinc-950 text-white"
                  inputClass="w-full bg-zinc-950"
                  :class="{ 'border-red-500 ring-1 ring-red-500': v$.loginForm.password.$error }"
                />
                <p
                  v-if="v$.loginForm.password.$dirty && !v$.loginForm.password.required"
                  class="mt-1 text-sm text-red-500"
                >
                  Senha é obrigatória.
                </p>
              </div>

              <button
                type="button"
                class="text-sm font-medium text-emerald-400 hover:text-emerald-300"
                @click="handlePasswordReset"
              >
                Esqueci minha senha
              </button>

              <Button
                label="Entrar"
                type="submit"
                class="mt-2 w-full border-none bg-emerald-600"
                :loading="authStore.loading"
                :disabled="v$.loginForm.$pending || v$.loginForm.$invalid"
              />
            </form>

            <form v-else class="space-y-4" @submit.prevent="handleRegister">
              <div>
                <label class="mb-2 block text-sm text-zinc-400">Nome</label>
                <InputText
                  v-model="registerForm.name"
                  placeholder="Seu nome"
                  class="w-full border bg-zinc-950 text-white"
                  :class="{ 'border-red-500 ring-1 ring-red-500': v$.registerForm.name.$error }"
                />
                <p
                  v-if="v$.registerForm.name.$dirty && !v$.registerForm.name.required"
                  class="mt-1 text-sm text-red-500"
                >
                  Nome é obrigatório.
                </p>
              </div>

              <div>
                <label class="mb-2 block text-sm text-zinc-400">E-mail</label>
                <InputText
                  v-model="registerForm.email"
                  placeholder="seu@email.com"
                  class="w-full border bg-zinc-950 text-white"
                  :class="{ 'border-red-500 ring-1 ring-red-500': v$.registerForm.email.$error }"
                />
                <p
                  v-if="v$.registerForm.email.$dirty && !v$.registerForm.email.required"
                  class="mt-1 text-sm text-red-500"
                >
                  E-mail é obrigatório.
                </p>
                <p
                  v-else-if="v$.registerForm.email.$dirty && !v$.registerForm.email.email"
                  class="mt-1 text-sm text-red-500"
                >
                  E-mail inválido.
                </p>
              </div>

              <div>
                <label class="mb-2 block text-sm text-zinc-400">Senha</label>
                <Password
                  v-model="registerForm.password"
                  :feedback="false"
                  toggleMask
                  placeholder="Mínimo 6 caracteres"
                  class="w-full border bg-zinc-950 text-white"
                  inputClass="w-full bg-zinc-950"
                  :class="{ 'border-red-500 ring-1 ring-red-500': v$.registerForm.password.$error }"
                />
                <p
                  v-if="v$.registerForm.password.$dirty && !v$.registerForm.password.required"
                  class="mt-1 text-sm text-red-500"
                >
                  Senha é obrigatória.
                </p>
                <p
                  v-else-if="v$.registerForm.password.$dirty && !v$.registerForm.password.minLength"
                  class="mt-1 text-sm text-red-500"
                >
                  A senha precisa ter pelo menos 6 caracteres.
                </p>
              </div>

              <div>
                <label class="mb-2 block text-sm text-zinc-400">Confirmar senha</label>
                <Password
                  v-model="registerForm.confirmPassword"
                  :feedback="false"
                  toggleMask
                  placeholder="Repita sua senha"
                  class="w-full border bg-zinc-950 text-white"
                  inputClass="w-full bg-zinc-950"
                  :class="{
                    'border-red-500 ring-1 ring-red-500': v$.registerForm.confirmPassword.$error,
                  }"
                />
                <p
                  v-if="
                    v$.registerForm.confirmPassword.$dirty &&
                    !v$.registerForm.confirmPassword.required
                  "
                  class="mt-1 text-sm text-red-500"
                >
                  Confirmação de senha é obrigatória.
                </p>
                <p
                  v-else-if="
                    v$.registerForm.confirmPassword.$dirty &&
                    !v$.registerForm.confirmPassword.sameAsPassword
                  "
                  class="mt-1 text-sm text-red-500"
                >
                  As senhas não coincidem.
                </p>
              </div>

              <Button
                label="Criar Conta"
                type="submit"
                class="mt-2 w-full border-none bg-emerald-600"
                :loading="authStore.loading"
                :disabled="v$.registerForm.$pending || v$.registerForm.$invalid"
              />
            </form>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const activeTab = ref(0)

const loginForm = reactive({
  email: '',
  password: '',
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = {
  loginForm: {
    email: {
      required: helpers.withMessage('E-mail obrigatório', required),
      email: helpers.withMessage('E-mail inválido', email),
    },
    password: {
      required: helpers.withMessage('Senha é obrigatória', required),
    },
  },
  registerForm: {
    name: {
      required: helpers.withMessage('Nome obrigatório', required),
    },
    email: {
      required: helpers.withMessage('E-mail obrigatório', required),
      email: helpers.withMessage('E-mail inválido', email),
    },
    password: {
      required: helpers.withMessage('Senha obrigatória', required),
      minLength: helpers.withMessage('Senha precisa ter pelo menos 6 caracteres', minLength(6)),
    },
    confirmPassword: {
      required: helpers.withMessage('Confirmação obrigatória', required),
      sameAsPassword: helpers.withMessage(
        'As senhas não coincidem',
        sameAs(() => registerForm.password),
      ),
    },
  },
}

const v$ = useVuelidate(rules, { loginForm, registerForm })

const redirectTo = computed(() => route.query.redirect?.toString())

const goToAuthenticatedArea = () => {
  if (redirectTo.value) {
    router.push(redirectTo.value)
    return
  }

  router.push(authStore.user?.role === 'admin' ? { name: 'admin-dashboard' } : { name: 'home' })
}

const handleLogin = async () => {
  v$.value.loginForm.$touch()
  if (v$.value.loginForm.$invalid) return

  const result = await authStore.login(loginForm.email, loginForm.password)

  if (!result.success) {
    toast.add({ severity: 'error', summary: 'Erro', detail: result.message, life: 4000 })
    return
  }

  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado!', life: 3000 })
  goToAuthenticatedArea()
}

const handleRegister = async () => {
  v$.value.registerForm.$touch()
  if (v$.value.registerForm.$invalid) return

  const result = await authStore.register(
    registerForm.name,
    registerForm.email,
    registerForm.password,
  )

  if (!result.success) {
    toast.add({ severity: 'warn', summary: 'Conta já existe', detail: result.message, life: 4500 })
    loginForm.email = registerForm.email
    loginForm.password = ''
    activeTab.value = 0
    return
  }

  toast.add({
    severity: 'success',
    summary: 'Conta criada',
    detail: 'Cadastro realizado com sucesso!',
    life: 3000,
  })
  goToAuthenticatedArea()
}

const handlePasswordReset = async () => {
  v$.value.loginForm.email.$touch()
  if (v$.value.loginForm.email.$invalid) {
    toast.add({
      severity: 'warn',
      summary: 'Informe seu e-mail',
      detail: 'Digite um e-mail válido para redefinir a senha.',
      life: 3500,
    })
    return
  }

  const result = await authStore.requestPasswordReset(loginForm.email)

  toast.add({
    severity: result.success ? 'info' : 'warn',
    summary: result.success ? 'Redefinição enviada' : 'Conta não encontrada',
    detail: result.message,
    life: 4500,
  })
}
</script>
