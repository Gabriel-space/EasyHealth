<template>
  <div class="space-y-8 p-4">
    <div class="card bg-gray-800 text-white shadow-xl">
      <div class="hero-content text-center py-8">
        <div>
          <h1 class="text-4xl font-extrabold mb-2 ">Bem-vindo, {{ nomeUsuario }}!</h1>
          <p class="text-xl opacity-90">Sistema de Gerenciamento de Reservas</p>
        </div>
      </div>
    </div>

    <div class="stats stats-vertical lg:stats-horizontal shadow-xl w-full">
      
      <div class="stat bg-base-100 rounded-lg">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div class="stat-title">Total de Reservas</div>
        <div class="stat-value text-secondary">{{ stats.total }}</div>
        <div class="stat-desc">Todas as reservas ativas</div>
      </div>

      <div class="stat bg-base-100 rounded-lg">
        <div class="stat-figure text-warning">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="stat-title">Pendentes</div>
        <div class="stat-value text-warning">{{ stats.pendentes }}</div>
        <div class="stat-desc">Aguardando confirmação</div>
      </div>

      <div class="stat bg-base-100 rounded-lg">
        <div class="stat-figure text-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="stat-title">Confirmadas</div>
        <div class="stat-value text-success">{{ stats.confirmadas }}</div>
        <div class="stat-desc">Reservas confirmadas</div>
      </div>

      <div class="stat bg-base-100 rounded-lg">
        <div class="stat-figure text-info">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="stat-title">Reservas para Hoje</div>
        <div class="stat-value text-info">{{ stats.hoje }}</div>
        <div class="stat-desc">Chegando ou saindo hoje</div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Ações Rápidas</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button class="btn bg-[#771255] btn-lg text-white" @click="novaReserva">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nova Reserva
          </button>
          
          <button class="btn bg-blue-800 btn-lg text-white" @click="verReservas">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Ver Reservas
          </button>
          
          <button class="btn bg-gray-700 btn-lg text-white " @click="verHistorico">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Histórico
          </button>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Reservas Disponíveis</h2>
        
        <div v-if="proximasReservas.length === 0" class="text-center py-8 text-lg text-gray-500">
          Nenhuma reserva próxima agendada.
        </div>
        
        <ul v-else class="menu bg-base-200 w-full rounded-box p-2">
          <li v-for="reserva in proximasReservas" :key="reserva.id">
            <a class="flex justify-between items-center" @click="verReservas">
              <div class="flex items-center gap-4">
                <div class="avatar placeholder">
                  <div class="card bg-blue-800 text-primary-content rounded-full w-10">
                    <span class="text-lg">{{ reserva.nome[0] }}</span>
                  </div>
                </div>
                <div>
                  <p class="font-bold">{{ reserva.nome }}</p>
                  <p class="text-sm opacity-70">{{ reserva.endereco?.cidade || 'Sem cidade' }}</p>
                </div>
              </div>
              
              <div class="text-right">
                <p class="font-semibold text-lg">{{ formatarData(reserva.endereco?.data) }}</p>
                <span class="badge" 
                      :class="reserva.confirmada ? 'badge-success badge-outline' : 'badge-warning badge-outline'">
                  {{ reserva.confirmada ? 'Confirmada' : 'Pendente' }}
                </span>
              </div>
            </a>
          </li>
        </ul>
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
      .sort((a, b) => {
        // Tratar casos onde a data pode ser nula ou inválida
        const dateA = a.endereco?.data ? new Date(a.endereco.data) : null;
        const dateB = b.endereco?.data ? new Date(b.endereco.data) : null;

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1; // Coloca sem data no final
        if (!dateB) return -1; // Coloca sem data no final
        
        return dateA - dateB;
      })
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
  // Se já estiver no formato DD/MM/AAAA, retorna
  if (data.includes("/")) return data; 
  try {
    // Tenta formatar a string YYYY-MM-DD para o formato local
    return new Date(data + 'T00:00:00').toLocaleDateString("pt-BR", { timeZone: 'UTC' });
  } catch {
    return data; // Retorna o dado original se falhar
  }
};
</script>