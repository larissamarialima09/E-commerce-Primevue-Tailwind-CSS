<template>
  <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all group">
    <div class="aspect-square w-full bg-white overflow-hidden p-4">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
      />
    </div>

    <div class="p-5">
      <span class="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">
        {{ product.category?.title || 'Gamer' }}
      </span>
      <h3 class="text-white font-bold text-lg mt-1 truncate">{{ product.name }}</h3>
      
      <div class="flex items-center justify-between mt-4">
        <p class="text-zinc-400 text-sm">A partir de</p>
        <p class="text-white font-black text-xl">R$ {{ product.price }},00</p>
      </div>
      
      <div class="mt-4 text-center text-xs text-zinc-500 group-hover:text-emerald-400 transition-colors italic">
        Clique para ver mais detalhes
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Product } from '@/model/product.model'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  }
})
</script>