<template>
  <main class="p-6 bg-black min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <i class="pi pi-shopping-bag text-emerald-500"></i>
        Nossos Produtos
      </h1>

      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in store.products"
          :key="product.id"
          class="cursor-pointer transition-transform hover:scale-105"
        >
          <ProductCard :product="product" @click="goToDetail(product)" @addItem="addItem" />
        </div>
      </section>

      <div v-if="store.products.length === 0" class="text-center py-20">
        <p class="text-zinc-500">Nenhum produto encontrado no momento.</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '@/store'
import { Product } from '@/model/product.model'
import ProductCard from '@/components/card/ProductCard.vue'

export default defineComponent({
  name: 'ProductsPage',
  components: {
    ProductCard,
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    addItem(product: Product) {
      store.cart.addItem(product)
    },

    goToDetail(product: Product) {
      this.$router.push({
        name: 'product-detail',
        params: { id: product.id.toString() },
      })
    },
  },
})
</script>
