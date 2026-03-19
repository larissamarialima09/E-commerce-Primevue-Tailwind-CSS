<script lang="ts">
import { defineComponent } from 'vue'
import { Product } from './model/product.model'
import  Cart  from './model/cart.model'
import ProductCard from './components/card/ProductCard.vue'
import type { CartItem } from "./model/cartItem.model"
import type { Category } from "./model/category.model"
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import ConfirmDialog from 'primevue/confirmdialog'


export default defineComponent({
    components: { ProductCard, Button, InputNumber, ConfirmDialog},

   data() {
    const gamer = { id: 1, title: "Gamer"};
    return {
    cart: new Cart(),
       products:[ 
        new Product( 1, "Teclado gamer","Teclado mecânico com iluminação RGB", 200, gamer,
         "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTuK64YTZ06Tn3uUcUzI3JqHuTXlDK-K1RKeRLtvnQpWyI40QMBx_pQoBP1fhwlNtkmRF1m2SqQLV_r_E6dAD8MYwmzST1uZ-dnObo4kFByk97bIpvlcXkc07-Yl3sFL0jzvTwuQSxRtUI&usqp=CAc.jpg" 
        ),
        new Product(2, "Mouse gamer", "Mouse gamer RGB com alta precisão", 150, gamer,
         "https://cdn.awsli.com.br/2500x2500/1318/1318167/produto/373743013/m991-rgb-1-7a89vvqfqv.jpg"
        ),
       ],
        cartItems: [] as CartItem[]
     }
  },
   methods: {

    addItem(product: Product) {
      this.cart.addItem(product)
    },

    decItem(id: number) {
      this.cart.decItem(id)
    },

    excludeItem(productId) {
      this.$confirm.require({
        message: 'Deseja remover este item do carrinho?',
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Sim, excluir',
        rejectLabel: 'Cancelar',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.cart.excludeItem(productId);
        }
      });
    }

  },

  computed: {

    totalItems(): number {
      return this.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )
    },
    totalPrice(): number {
      return this.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      )
    }

  }

})
</script>

<template>
  <main class="p-6 bg-black min-h-screen flex flex-col items-start">
    
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @addItem="addItem" 
      />
    </section>

    <hr class="my-10 border-gray-800 w-full max-w-4xl" />

    <section class="cart-summary w-full max-w-4xl bg-gray-900/40 p-6 rounded-2xl border border-gray-800 ml-0">
      <h1 class="text-2xl font-bold mb-8 text-white">Carrinho</h1>
      
      <div v-if="cart.list.length === 0" class="py-4">
        <p class="text-gray-500 italic">Seu carrinho ainda está vazio. Acrescente os produtos!</p>
      </div>
        
      <div 
        v-for="(item, index) in cart.list" 
        :key="index" 
        class="mb-6 pb-6 border-b border-gray-800 flex gap-6 last:border-b-0"
      >
        <div class="w-24 h-24 bg-white rounded-lg flex-shrink-0 overflow-hidden">
          <img 
            :src="item.product.image" 
            :alt="item.product.name" 
            class="w-full h-full object-contain p-2" 
          />
        </div>

        <div class="flex flex-1 justify-between items-start">
          <div class="flex flex-col gap-1">
            <h2 class="text-white font-bold text-lg">{{ item.product.name }}</h2>
            <p class="text-gray-400 text-base font-medium">Quantidade: <span class="text-white text-base">{{ item.quantity }}</span></p>
            
            <div class="mt-3">
              <Button 
                label="Remover quantidade" 
                class="bg-emerald-500 border-none hover:bg-emerald-600 text-gray-900 font-bold text-xs px-3 py-2"
                @click="decItem(item.product.id)" 
              />
            </div>
          </div>

          <div class="flex flex-col items-end gap-6">
            <Button 
              icon="pi pi-trash" 
              label="Excluir"
              class="p-button-text p-button-danger p-0 text-xs font-semibold" 
              @click="excludeItem(item.product.id)"
            />

            <div class="text-right">
              <p class="text-white text-xl font-bold leading-none">R$ {{ item.product.price * item.quantity }},00</p>
              <p class="text-gray-500 text-base ">Valor do item: R$ {{ item.product.price }},00</p>
            </div>
          </div>
        </div>
      </div>

        <div>
          <p class="text-gray-500 text-base uppercase tracking-wider">Total de itens: {{ cart.total }}</p>
          <h3 class="text-white text-xl font-bold">Valor Total</h3>
        </div>
        <div class="text-right">
          <p class="text-white-400 text-4xl font-black">R$ {{ cart.price }},00</p>
        </div>
      
    </section>

    <ConfirmDialog></ConfirmDialog>
  </main>
</template>