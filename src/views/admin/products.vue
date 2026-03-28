<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-white">Gerenciar Produtos</h1>
      <Button 
        label="Novo Produto" 
        icon="pi pi-plus" 
        class="p-button-success bg-emerald-600 border-none hover:bg-emerald-700" 
      />
    </div>
    
    <div class="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
      <DataTable 
        :value="products" 
        stripedRows 
        class="p-datatable-sm"
        responsiveLayout="stack" 
        breakpoint="960px"
        :pt="{
          thead: { class: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
          tbody: { class: 'bg-zinc-900 border-zinc-800' },
          column: {
              headercell: { class: 'bg-zinc-800 text-zinc-400 border-zinc-700 py-4 font-semibold text-sm' },
              bodycell: { class: 'py-4 border-zinc-800 text-zinc-300' }
          }
        }"
      >
        <Column field="name" header="Nome" sortable></Column>
        
        <Column field="price" header="Preço" sortable>
          <template #body="slotProps">
            <span>
              R$ {{ slotProps.data.price.toFixed(2) }}
            </span>
          </template>
        </Column>

        <Column header="Ações">
          <template #body>
            <div class="flex gap-3">
              <Button icon="pi pi-pencil" text severity="info" label="Editar" class="p-0 text-sm" />
              <Button icon="pi pi-trash" text severity="danger" label="Excluir" class="p-0 text-sm" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const products = ref([
  { id: 1, name: 'Teclado Gamer', price: 200.00 },
  { id: 2, name: 'Mouse RGB', price: 150.00 },
]);
</script>