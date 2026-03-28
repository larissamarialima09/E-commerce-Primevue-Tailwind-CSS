<template>
  <main class="p-6 lg:p-12 bg-black min-h-screen">
    <div v-if="!product" class="text-center py-20">
      <i class="pi pi-spin pi-spinner text-4xl text-emerald-500"></i>
    </div>

    <div v-else class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      <div class="bg-[#fafafa] rounded-3xl p-0 aspect-square flex items-center justify-center border border-zinc-800 shadow-2xl shadow-emerald-500/5 overflow-hidden">
  <img 
    :src="product.image" 
    :alt="product.name" 
    class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
  />
</div>

      <div class="flex flex-col gap-6">
        <nav class="flex items-center gap-2 text-zinc-500 text-sm">
          <RouterLink to="/products" class="hover:text-emerald-500">Produtos</RouterLink>
          <i class="pi pi-chevron-right text-[10px]"></i>
          <span class="text-zinc-300">{{ product.name }}</span>
        </nav>

        <h1 class="text-4xl lg:text-5xl font-black text-white">{{ product.name }}</h1>
        
        <div class="flex items-center gap-4">
          <span class="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-sm font-bold border border-emerald-500/20">
            Em Estoque
          </span>
          <span class="text-zinc-500 font-mono text-xs uppercase tracking-tighter">SKU: PROD-00{{ product.id }}</span>
        </div>

        <p class="text-zinc-400 text-lg leading-relaxed">
          {{ product.description }}
        </p>

        <hr class="border-zinc-800 my-2" />

        <div class="flex flex-col gap-1">
          <span class="text-zinc-500 text-sm">Preço exclusivo</span>
          <div class="text-5xl font-black text-white">R$ {{ product.price.toFixed(2).replace('.', ',') }}</div>
          <span class="text-emerald-500 text-sm font-medium">ou 10x de R$ {{ (product.price / 10).toFixed(2).replace('.', ',') }} sem juros</span>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mt-6">
          <Button 
            label="ADICIONAR AO CARRINHO" 
            icon="pi pi-shopping-cart" 
            class="p-4 bg-emerald-600 border-none font-bold flex-1 hover:bg-emerald-700 transition-all text-gray-900"
            @click="addToCart"
          />
          <Button 
            icon="pi pi-heart" 
            outlined 
            class="p-4 border-zinc-800 text-white hover:bg-zinc-900 transition-all" 
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store'
import { Product } from '@/model/product.model'
import Button from 'primevue/button'

export default defineComponent({
  name: 'ProductDetail',
  components: { Button },
  data() {
    return {
      
      product: null as Product | null 
    }
  },
  created() {
    this.loadProduct()
  },
  methods: {
    loadProduct(): void {
      const route = useRoute()
      const id = Number(route.params.id)
      
      
      const foundProduct = store.products.find((p: Product) => p.id === id)
      
      if (foundProduct) {
        this.product = foundProduct
      } else {
        
        this.$router.push('/products')
      }
    },
    addToCart(): void {
      
      if (this.product) {
        store.cart.addItem(this.product)
        this.$router.push('/checkout')
      }
    }
  }
})
</script>