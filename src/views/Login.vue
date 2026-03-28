<template>
  <div class="flex items-center justify-center min-h-[80vh]">
    <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md">
      <h2 class="text-2xl font-bold text-white mb-6 text-center">Acesso Admin</h2>
      <div class="flex flex-col gap-4">
        <InputText v-model="email" placeholder="Email (admin@teste.com)" class="w-full bg-zinc-950 border-zinc-800" />
        <Password v-model="password" placeholder="Senha (123)" :feedback="false" toggleMask class="w-full" inputClass="w-full bg-zinc-950 border-zinc-800" />
        <Button label="Entrar" @click="handleLogin" class="bg-emerald-600 border-none mt-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = () => {
  if (email.value === 'admin@teste.com' && password.value === '123') {
    localStorage.setItem('isAuth', 'true');
    localStorage.setItem('userRole', 'admin');
    router.push('/admin/dashboard');
  } else {
    alert('Dados inválidos! Use admin@teste.com / 123');
  }
};
</script>