<template>
  <main class="min-h-screen bg-black text-white">
    <section class="relative h-[500px] flex items-center justify-center overflow-hidden border-b border-zinc-800">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-emerald-950/20 z-0"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div class="relative z-10 text-center px-6">
        <span class="text-emerald-500 font-black tracking-[0.3em] uppercase text-sm mb-4 block">
          Upgrade your setup
        </span>
        <h1 class="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
          GAMER <span class="text-emerald-500">SHOP</span>
        </h1>
        <p class="text-zinc-400 max-w-xl mx-auto text-lg mb-10 leading-relaxed">
          Os periféricos de alta performance que você precisa para dominar o jogo.
        </p>
        <div class="flex justify-center">
          <Button label="Ver Todos os Produtos" icon="pi pi-shopping-bag" class="p-4 bg-emerald-600 border-none font-bold" @click="scrollToProducts" />
        </div>
      </div>
    </section>

    <section id="products-section" class="max-w-7xl mx-auto px-6 py-20">
      <div class="flex items-end justify-between mb-12">
        <div>
          <h2 class="text-3xl font-black mb-2 italic">
            {{ searchQuery ? 'RESULTADOS DA BUSCA' : 'NOSSOS PRODUTOS' }}
          </h2>
          <div class="h-1 w-12 bg-emerald-500"></div>
        </div>
        <RouterLink v-if="!searchQuery" to="/products" class="text-zinc-500 hover:text-emerald-500 text-sm font-bold transition-colors">
          VER GALERIA COMPLETA <i class="pi pi-arrow-right text-[10px] ml-1"></i>
        </RouterLink>
      </div>

      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="transform transition-all duration-300 hover:-translate-y-2"
        >
          <ProductCard 
            :product="product" 
            @click="goToDetail(product)"
          />
        </div>
      </div>

      <div v-else class="text-center py-20 bg-zinc-900/20 rounded-xl border border-dashed border-zinc-800">
        <i class="pi pi-search text-4xl text-zinc-700 mb-4 block"></i>
        <p class="text-zinc-500">Nenhum produto encontrado para "{{ searchQuery }}"</p>
        <Button label="Limpar busca" link class="mt-4 text-emerald-500" @click="clearSearch" />
      </div>
    </section>

    <footer class="border-t border-zinc-900 py-12 bg-zinc-950/50">
      <div class="max-w-7xl mx-auto px-6 text-center text-zinc-600 text-sm">
        <p>&copy; 2026 Gamer Shop.</p>
      </div>
    </footer>
  </main>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, Ref } from 'vue'
import { store } from '@/store'
import { Product } from '@/model/product.model'
import ProductCard from '@/components/card/ProductCard.vue'
import Button from 'primevue/button'

export default defineComponent({
  name: 'HomeView',
  components: { ProductCard, Button },
  
  setup() {
    
    const searchQuery = inject<Ref<string>>('searchFilters', ref(''))

    const filteredProducts = computed(() => {

      if (!searchQuery.value) {
        return store.products.slice(0, 2)
      }
      
      const term = searchQuery.value.toLowerCase()
      return store.products.filter(product => 
        product.name.toLowerCase().includes(term)
      )
    })

    return {
      searchQuery,
      filteredProducts
    }
  },

  methods: {
    goToDetail(product: Product): void {
      this.$router.push({ name: 'product-detail', params: { id: product.id } })
    },
    clearSearch() {
      
      this.searchQuery = ''
    },
    scrollToProducts() {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }
})
</script>