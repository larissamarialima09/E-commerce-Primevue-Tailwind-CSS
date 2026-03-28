<template>
  <main class="p-6 bg-black min-h-screen flex flex-col items-center">
    <section class="cart-summary w-full max-w-4xl bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
      <h1 class="text-2xl font-bold mb-8 text-white flex items-center gap-3">
        <i class="pi pi-shopping-cart text-emerald-500"></i>
        Meu Carrinho
      </h1>
      
      <div v-if="store.cart.list.length === 0" class="py-20 text-center flex flex-col items-center">
        <i class="pi pi-box text-6xl text-zinc-800 mb-4"></i>
        <p class="text-zinc-500 italic text-lg">O seu carrinho ainda está vazio.</p>
        <RouterLink to="/products" class="mt-6">
          <Button label="Voltar à Loja" icon="pi pi-arrow-left" severity="success" outlined />
        </RouterLink>
      </div>
        
      <div 
        v-for="(item, index) in store.cart.list" 
        :key="index" 
        class="mb-6 pb-6 border-b border-zinc-800 flex flex-col md:flex-row gap-6 last:border-b-0"
      >
        <div class="w-24 h-24 bg-white rounded-lg flex-shrink-0 overflow-hidden shadow-lg shadow-emerald-500/10">
          <img 
            :src="item.product.image" 
            :alt="item.product.name" 
            class="w-full h-full object-contain p-2" 
          />
        </div>

        <div class="flex flex-1 justify-between items-start">
          <div class="flex flex-col gap-2">
            <h2 class="text-white font-bold text-xl">{{ item.product.name }}</h2>
            <div class="flex items-center gap-4 text-zinc-400">
              <span class="bg-zinc-800 px-3 py-1 rounded text-sm text-zinc-200">
                Qtd: <strong>{{ item.quantity }}</strong>
              </span>
              <span class="text-sm">Preço unitário: R$ {{ item.product.price }},00</span>
            </div>
            
            <div class="flex gap-2 mt-2">
              <Button 
                icon="pi pi-minus" 
                class="p-button-sm p-button-secondary bg-zinc-800 border-none" 
                @click="store.cart.decItem(item.product.id)" 
                v-if="item.quantity > 1"
              />
              <Button 
                icon="pi pi-plus" 
                class="p-button-sm p-button-secondary bg-zinc-800 border-none" 
                @click="store.cart.addItem(item.product)" 
              />
            </div>
          </div>

          <div class="flex flex-col items-end gap-6">
            <Button 
              icon="pi pi-trash" 
              severity="danger" 
              text 
              label="Remover"
              class="p-0 text-xs font-semibold" 
              @click="confirmExclude(item.product.id)"
            />

            <div class="text-right">
              <p class="text-emerald-500 text-2xl font-black leading-none">
                R$ {{ item.product.price * item.quantity }},00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="store.cart.list.length > 0" class="mt-10 pt-10 border-t-2 border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-center md:text-left">
          <p class="text-zinc-500 text-sm uppercase tracking-widest mb-1">Total de itens: {{ store.cart.total }}</p>
          <h3 class="text-white text-2xl font-bold">Valor Total da Compra</h3>
        </div>
        <div class="text-right">
          <p class="text-emerald-400 text-5xl font-black shadow-emerald-500/20 drop-shadow-md">
            R$ {{ store.cart.price }},00
          </p>
          <Button label="Finalizar Pedido" icon="pi pi-check" class="mt-4 bg-emerald-600 border-none w-full" />
        </div>
      </div>
    </section>

    <ConfirmDialog />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from '@/store'
import Button from 'primevue/button'
import ConfirmDialog from 'primevue/confirmdialog'

export default defineComponent({
  name: 'CartView',
  components: { 
    Button, 
    ConfirmDialog 
  },
  data() {
    return { 
      store 
    }
  },
  methods: {
    confirmExclude(productId: number) {
      this.$confirm.require({
        message: 'Tem certeza que deseja remover este produto do carrinho?',
        header: 'Confirmar Exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim, remover',
        rejectLabel: 'Cancelar',
        acceptClass: 'p-button-danger',
        accept: () => {
          store.cart.excludeItem(productId);
        }
      });
    }
  }
})
</script>