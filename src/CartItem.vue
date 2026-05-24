<script lang="ts">
import { defineComponent } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { Product } from '@/model/product.model'

export default defineComponent({
  components: { Card, Button },

  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
})
</script>

<template>
  <Card
    class="shadow-lg rounded-xl p-3"
    :style="{ width: '100%', minWidth: '200px', maxWidth: '420px' }"
  >
    <template #content>
      <div class="flex flex-row items-center gap-3">
        <img
          src="'https://www.google.com/imgres?q=mouse%20gamer%20rgb&imgurl=https%3A%2F%2Fcdn.awsli.com.br%2F2500x2500%2F1318%2F1318167%2Fproduto%2F373743013%2Fm991-rgb-1-7a89vvqfqv.jpg&imgrefurl=https%3A%2F%2Fwww.redragon.store%2Fmouse-gamer-redragon-enlightment-rgb-preto-paw3395-26000-dpi-wireless-9-botoes-programaveis&docid=UtGEYshQ07LMUM&tbnid=-l0GYEeu2-BhcM&vet=12ahUKEwjlzJ38j6iTAxVSq5UCHXwlDrkQnPAOegQIIxAB..i&w=1600&h=1599&hcb=2&ved=2ahUKEwjlzJ38j6iTAxVSq5UCHXwlDrkQnPAOegQIIxAB'"
          class="w-20 rounded"
        />

        <div>
          <h1 class="font-bold">{{ product.name }}</h1>
          <p>R$: {{ product.price }},00</p>
        </div>
      </div>
    </template>

    <template #footer>
      <Button
        label="Remover"
        icon="pi pi-trash"
        class="p-button-danger w-full"
        @click="$emit('removeItem', product)"
      ></Button>
    </template>
  </Card>
</template>
