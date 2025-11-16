<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="card bg-gradient-to-br from-blue-900 text-neutral-content shadow-xl">
      <div class="card-body">
        <h1 class="text-3xl font-bold">Bem-vindo, {{ nomeUsuario }}! 👋</h1>
        <p class="text-lg opacity-90">Sistema de Gerenciamento de Reservas</p>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="stat bg-base-100 shadow-lg rounded-lg">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div class="stat-title">Total de Reservas</div>
        <div class="stat-value text-primary">{{ stats.total }}</div>
        <div class="stat-desc">Todas as reservas ativas</div>
      </div>

      <div class="stat bg-base-100 shadow-lg rounded-lg">
        <div class="stat-figure text-warning">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="stat-title">Pendentes</div>
        <div class="stat-value text-warning">{{ stats.pendentes }}</div>
        <div class="stat-desc">Aguardando confirmação</div>
      </div>

      <div class="stat bg-base-100 shadow-lg rounded-lg">
        <div class="stat-figure text-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="stat-title">Confirmadas</div>
        <div class="stat-value text-success">{{ stats.confirmadas }}</div>
        <div class="stat-desc">Reservas confirmadas</div>
      </div>

      <div class="stat bg-base-100 shadow-lg rounded-lg">
        <div class="stat-figure text-info">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="stat-title">Hoje</div>
        <div class="stat-value text-info">{{ stats.hoje }}</div>
        <div class="stat-desc">Reservas para hoje</div>
      </div>
    </div>

    <!-- Ações Rápidas -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Ações Rápidas</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button class="btn btn-primary btn-lg" @click="novaReserva">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nova Reserva
          </button>
          
          <button class="btn btn-secondary btn-lg" @click="verReservas">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Ver Reservas
          </button>
          
          <button class="btn btn-accent btn-lg" @click="verHistorico">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Histórico
          </button>
        </div>
      </div>
    </div>

    <!-- Próximas Reservas -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Próximas Reservas</h2>
        
        <div v-if="proximasReservas.length === 0" class="text-center py-8 text-gray-500">
          Nenhuma reserva próxima
        </div>
        
        <div v-else class="space-y-3">
          <div v-for="reserva in proximasReservas" :key="reserva.id" 
               class="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition cursor-pointer"
               @click="verReservas">
            <div class="flex items-center gap-4">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-12">
                  <span class="text-xl">{{ reserva.nome[0] }}</span>
                </div>
              </div>
              <div>
                <p class="font-bold">{{ reserva.nome }}</p>
                <p class="text-sm opacity-70">{{ reserva.endereco?.cidade || 'Sem cidade' }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ formatarData(reserva.endereco?.data) }}</p>
              <span class="badge" :class="reserva.confirmada ? 'badge-success' : 'badge-warning'">
                {{ reserva.confirmada ? 'Confirmada' : 'Pendente' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

const router = useRouter();
let db = new Localbase("db");

onMounted(() => {
  carregarEstatisticas();
});

const stats = ref({
  total: 0,
  pendentes: 0,
  confirmadas: 0,
  hoje: 0
});

const proximasReservas = ref([]);

const usuarioLogado = computed(() => {
  const user = localStorage.getItem('usuarioLogado');
  return user ? JSON.parse(user) : null;
});

const nomeUsuario = computed(() => usuarioLogado.value?.nome?.split(' ')[0] || 'Usuário');

const carregarEstatisticas = async () => {
  try {
    const todasReservas = await db.collection("reservas").get();
    const reservasAtivas = todasReservas.filter(r => !r.arquivada);
    
    stats.value.total = reservasAtivas.length;
    stats.value.pendentes = reservasAtivas.filter(r => !r.confirmada).length;
    stats.value.confirmadas = reservasAtivas.filter(r => r.confirmada).length;
    
    const hoje = new Date().toISOString().split('T')[0];
    stats.value.hoje = reservasAtivas.filter(r => r.endereco?.data === hoje).length;
    
    proximasReservas.value = reservasAtivas
      .sort((a, b) => new Date(a.endereco?.data) - new Date(b.endereco?.data))
      .slice(0, 5);
      
  } catch (error) {
    console.error("Erro ao carregar estatísticas:", error);
  }
};

const novaReserva = () => router.push({ name: "reservas.add" });
const verReservas = () => router.push({ name: "reservas.index" });
const verHistorico = () => router.push({ name: "historico.index" });

const formatarData = (data) => {
  if (!data) return "Sem data";
  if (data.includes("/")) return data;
  try {
    return new Date(data).toLocaleDateString("pt-BR");
  } catch {
    return data;
  }
};
</script>