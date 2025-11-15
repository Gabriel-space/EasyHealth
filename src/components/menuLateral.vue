<template>
  <div class="p-2 space-y-2">
    <!-- Menu Principal -->
    <div class="menu-title px-4 py-2">
      <span class="text-xs font-semibold opacity-60">MENU PRINCIPAL</span>
    </div>
    
    <ul class="menu">
      <li>
        <router-link 
          :to="{name:'dashboard'}"
          class="flex items-center gap-3"
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </router-link>
      </li>

      <li>
        <router-link 
          :to="{name:'reservas.index'}"
          class="flex items-center gap-3"
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>Reservas</span>
          <span class="badge badge-success badge-sm ml-auto">{{ stats.pendentes }}</span>
        </router-link>
      </li>

      <li>
        <router-link 
          :to="{name:'historico.index'}"
          class="flex items-center gap-3"
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Histórico</span>
          <span class="badge badge-success badge-sm ml-auto">{{ stats.confirmadas }}</span>
        </router-link>
      </li>
    

    <!-- Seção de Gestão -->
    
    
      <li>
        <a class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>??</span>
          <span class="badge badge-ghost badge-sm ml-auto">Em breve</span>
        </a>
      </li>

      <li>
        <a class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 " />
          </svg>
          <span>??</span>
          <span class="badge badge-ghost badge-sm ml-auto">Em breve</span>
        </a>
      </li>

      <li>
        <a class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Relatórios</span>
          <span class="badge badge-ghost badge-sm ml-auto">Em breve</span>
        </a>
      </li>
    

    

    
      

      <li>
        <a class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Ajuda</span>
        </a>
      </li>
    </ul>

    <!-- Estatísticas Rápidas -->
    <div class="mt-4 p-4 bg-base-200 rounded-box">
      <div class="text-xs font-semibold opacity-60 mb-3">ESTATÍSTICAS</div>
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm">Total</span>
          <span class="badge badge-neutral">{{ stats.total }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm">Hoje</span>
          <span class="badge badge-info">{{ stats.hoje }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Localbase from "localbase";

let db = new Localbase("db");

const stats = ref({
  total: 0,
  pendentes: 0,
  confirmadas: 0,
  hoje: 0
});

onMounted(() => {
  carregarEstatisticas();
  // Atualiza a cada 30 segundos
  setInterval(carregarEstatisticas, 30000);
});

const carregarEstatisticas = async () => {
  try {
    const todasReservas = await db.collection("reservas").get();
    const reservasAtivas = todasReservas.filter(r => !r.arquivada);
    
    stats.value.total = reservasAtivas.length;
    stats.value.pendentes = reservasAtivas.filter(r => !r.confirmada).length;
    stats.value.confirmadas = reservasAtivas.filter(r => r.confirmada).length;
    
    const hoje = new Date().toISOString().split('T')[0];
    stats.value.hoje = reservasAtivas.filter(r => r.endereco?.data === hoje).length;
      
  } catch (error) {
    console.error("Erro ao carregar estatísticas:", error);
  }
};
</script>