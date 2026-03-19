<template>
 <Card
 class="h-full flex flex-col overflow-hidden border border-gray-700"
 :style="{width: '100%', minWidth:'200px',maxWidth: '302px'}" >

     <template #header>
      <div class="w-full h-64 overflow-hidden"> 
   <img 
    :src="product.image" 
    :alt="product.name" 
    class="w-full h-full object-cover" 
  />
   </div>
      </template>

     <template #title>
     <h1 class="font-bold text-lg">{{ product.name }}</h1>
     </template>


    <template #content>
    <p class="text-white-600 mb-2">{{ product.description }}</p>
    <p class="font-bold mt-2">R$: {{ product.price }},00</p>
    </template>

    <template #footer>
    <Button 
     label="Adicionar" 
     @click="$emit('addItem', product)" 
    class="w-full py-3" 
      />

    </template>
 </Card>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import Card from "primevue/card"
import Button from "primevue/button"
import type { Product } from "../models/product.model"

export default defineComponent({
  components: { Card, Button },
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  }

})
</script>

<style scoped>
.image-container {
    width: 100%;
    height: 200px; 
    overflow: hidden;
    background-color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
}
.product-img {
    width: 100%;
    height: 100%;
    object-fit: contain; 
    padding: 10px;
}
:deep(.p-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
}
:deep(.p-card-body) {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>