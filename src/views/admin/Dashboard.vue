<template>
  <div class="p-2">
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-4 text-white">Dashboard</h1>
      <p class="text-zinc-400">
        Bem-vinda ao painel de controle, 
        <span class="text-emerald-500 font-medium">Larissa!</span>
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-colors group">
        <div class="flex justify-between items-start mb-4">
          <span class="text-zinc-500 font-medium text-sm uppercase tracking-wider">Estoque Total</span>
          <div class="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
            <i class="pi pi-box text-emerald-500"></i>
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-bold text-white">{{ totalProductsInStock }}</span>
          <span class="text-emerald-500 text-xs font-medium">+{{ totalProductsInStock }} este mês</span>
        </div>
      </div>

      <div class="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-blue-500/50 transition-colors">
        <div class="flex justify-between items-start mb-4">
          <span class="text-zinc-500 font-medium text-sm uppercase tracking-wider">Vendas (Mês)</span>
          <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <i class="pi pi-shopping-cart text-blue-500"></i>
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-bold text-white">R$ {{ salesAmount.toFixed(2).replace('.', ',') }}</span>
          <span class="text-blue-500 text-xs font-medium">↑ {{ store.stats.monthlyGrowth }}%</span>
        </div>
      </div>

      <div class="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-purple-500/50 transition-colors">
        <div class="flex justify-between items-start mb-4">
          <span class="text-zinc-500 font-medium text-sm uppercase tracking-wider">Clientes Ativos</span>
          <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <i class="pi pi-users text-purple-500"></i>
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-bold text-white">{{ activeClients }}</span>
          <span class="text-purple-500 text-xs font-medium">Novos: 0</span>
        </div>
      </div>

    </div>

    <div class="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 flex items-center justify-center border-dashed">
      <p class="text-zinc-600 italic">Espaço reservado para o Gráfico de Vendas (Chart.js)</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { store } from '@/store'; 


const totalProductsInStock = computed(() => store.products.length);


const salesAmount = computed(() => store.stats.totalSales);
const activeClients = computed(() => store.stats.activeClients);
</script>