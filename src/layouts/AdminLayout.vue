<template>
  <div class="flex min-h-screen bg-zinc-950 text-zinc-300 font-sans">
    <aside class="w-64 border-r border-zinc-800 bg-zinc-900/30 p-6 flex flex-col">
      <div class="flex items-center gap-2 mb-10">
        <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <span class="pi pi-lock text-black font-bold"></span>
        </div>
        <h2 class="text-xl font-bold text-white">Admin</h2>
      </div>

      <nav class="flex flex-col gap-2 flex-1">
        <RouterLink 
          to="/admin/dashboard" 
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors"
          active-class="bg-emerald-500/10 text-emerald-500 font-semibold"
        >
          <i class="pi pi-chart-bar"></i> Dashboard
        </RouterLink>
        
        <RouterLink 
          to="/admin/products" 
          class="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors"
          active-class="bg-emerald-500/10 text-emerald-500 font-semibold"
        >
          <i class="pi pi-box"></i> Produtos
        </RouterLink>
      </nav>

      <div class="mt-auto pt-6 border-t border-zinc-800 flex flex-col gap-4">
        <RouterLink to="/" class="text-zinc-500 hover:text-white flex items-center gap-2 text-sm transition-colors">
          <i class="pi pi-arrow-left"></i> Voltar para Loja
        </RouterLink>

        <button 
          @click="handleLogout" 
          class="text-zinc-500 hover:text-red-400 flex items-center gap-2 text-sm w-full text-left transition-colors"
        >
          <i class="pi pi-sign-out"></i> Sair do Painel
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col">
      <header class="h-16 border-b border-zinc-800 flex items-center px-8 bg-zinc-900/10">
        <Breadcrumb :model="breadcrumbItems" class="bg-transparent border-none p-0 text-sm">
          <template #item="{ item }">
            <span class="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">
              {{ item.label }}
            </span>
          </template>
        </Breadcrumb>
      </header>

      <section class="p-8 overflow-y-auto">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Importado useRouter aqui
import Breadcrumb from 'primevue/breadcrumb';

const route = useRoute();
const router = useRouter(); // Inicializado aqui

const breadcrumbItems = computed(() => {
  const pathArray = route.path.split('/').filter(p => p);
  return pathArray.map(path => ({ 
    label: path.replace(/-/g, ' ') 
  }));
});

// FUNÇÃO DE LOGOUT
const handleLogout = () => {
  localStorage.removeItem('isAuth');
  localStorage.removeItem('userRole');
  router.push('/'); // Redireciona para a Home
};
</script>