<template>
  <div class="flex flex-col min-h-screen bg-zinc-950 text-white">
    <nav class="flex items-center border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-50 backdrop-blur-md px-6 py-3">
  
  <div class="flex flex-1 items-center gap-4">
    <span class="text-xl font-black text-emerald-500 tracking-tighter shrink-0">GAMER SHOP</span>
    <RouterLink to="/"><Button label="Home" icon="pi pi-home" text class="text-emerald-500 text-sm" /></RouterLink>
    <RouterLink to="/products"><Button label="Produtos" icon="pi pi-shopping-bag" text class="text-emerald-500 text-sm" /></RouterLink>
  </div>

  <div class="flex-[2] flex justify-center max-w-[500px]">
    <div class="relative w-full group">
      <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500"></i>
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="O que você está procurando?" 
        class="w-full bg-zinc-950 border border-zinc-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 transition-all text-sm"
      />
    </div>
  </div>

  <div class="flex flex-1 justify-end">
    <RouterLink to="/checkout">
      <Button icon="pi pi-shopping-cart" severity="success" rounded />
    </RouterLink>
  </div>
</nav>

    <main class="flex-1 container mx-auto p-6">
      <RouterView />
    </main>
  </div>
</template>

<<script setup lang="ts">
import { ref, provide} from 'vue';
import Button from 'primevue/button';
const searchQuery = ref('');

provide('searchFilters', searchQuery);
</script>