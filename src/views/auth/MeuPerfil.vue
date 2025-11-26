<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="card bg-base-100 shadow-xl max-w-4xl mx-auto">
      <div class="card-body items-center text-center">
        
        <div class="avatar placeholder mb-4">
          <div class="bg-primary text-primary-content rounded-full w-24">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-12 w-12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        <h2 class="card-title text-3xl font-bold">{{ usuario.nome }}</h2>
        
        
        

        <!-- Informações do Usuário -->
        <div class="divider">Informações da Conta</div>
        <div class="space-y-4 w-full text-left">
          <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
            <span class="font-semibold text-sm text-gray-500">Email:</span>
            <span class="font-medium text-lg">{{ usuario.email }}</span>
          </div>
          
          <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
            <span class="font-semibold text-sm text-gray-500">Telefone:</span>
            
          </div>
          
          
          
          <div class="flex justify-between items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
            <span class="font-semibold text-sm text-gray-500">ID de Usuário:</span>
            <span class="font-mono text-sm text-gray-700">{{ usuario.id }}</span>
          </div>
          
         
        </div>

        <!-- Preferências -->
        <div class="divider">Preferências</div>
        <div class="space-y-3 w-full">
          <div class="form-control bg-base-200 p-3 rounded-lg">
            <label class="label cursor-pointer">
              <span class="label-text font-medium">
                <img src="../../assets/images/notificacao.svg" class="h-5 w-5 inline mr-2">
                Notificação
              </span> 
              <input type="checkbox" class="toggle toggle-primary" v-model="usuario.notificacoesEmail" @change="salvarPreferencias" />
            </label>
          </div>
          
          <div class="form-control bg-base-200 p-3 rounded-lg">
            <label class="label cursor-pointer">
              <span class="label-text font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Tema Escuro
              </span> 
              <input type="checkbox" class="toggle toggle-primary" v-model="usuario.temaEscuro" @change="salvarPreferencias" />
            </label>
          </div>

         
        </div>

        <!-- Ações -->
        <div class="card-actions mt-6 w-full gap-2">
          <button class="btn btn-outline btn-primary flex-1" @click="editarPerfil">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar Perfil
          </button>
          <button class="btn btn-primary flex-1" @click="router.push({ name: 'dashboard' })">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const usuario = ref({
  notificacoesEmail: true,
  temaEscuro: false,
  notificacoesPush: false
});

const estatisticas = ref({
  totalTarefas: 0,
  tarefasConcluidas: 0,
  tarefasPendentes: 0
});

// 1. Carregar dados do localStorage
const carregarUsuario = () => {
  const data = localStorage.getItem('usuarioLogado');
  if (data) {
    usuario.value = { ...usuario.value, ...JSON.parse(data) };
    carregarEstatisticas();
  } else {
    router.push({ name: 'login' });
  }
};

// Carregar estatísticas de tarefas
const carregarEstatisticas = () => {
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
  const tarefasUsuario = tarefas.filter(t => t.usuarioId === usuario.value.id);
  
  estatisticas.value.totalTarefas = tarefasUsuario.length;
  estatisticas.value.tarefasConcluidas = tarefasUsuario.filter(t => t.concluida).length;
  estatisticas.value.tarefasPendentes = tarefasUsuario.filter(t => !t.concluida).length;
};

// 2. Formatando a data de cadastro para exibição
const dataCadastroFormatada = computed(() => {
  if (usuario.value.criadoEm) {
    try {
      const date = new Date(usuario.value.criadoEm);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch (e) {
      return 'Data indisponível';
    }
  }
  return 'N/A';
});

// 3. Última atividade
const ultimaAtividadeFormatada = computed(() => {
  if (usuario.value.ultimaAtividade) {
    try {
      const date = new Date(usuario.value.ultimaAtividade);
      return date.toLocaleString('pt-BR', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Não disponível';
    }
  }
  return 'Hoje';
});

// 4. Percentual de tarefas concluídas
const percentualConcluidas = computed(() => {
  if (estatisticas.value.totalTarefas === 0) return 0;
  return Math.round((estatisticas.value.tarefasConcluidas / estatisticas.value.totalTarefas) * 100);
});

// 5. Salvar preferências
const salvarPreferencias = () => {
  localStorage.setItem('usuarioLogado', JSON.stringify(usuario.value));
  
  // Aplicar tema se necessário
  if (usuario.value.temaEscuro) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
};

// 6. Editar perfil
const editarPerfil = () => {
  // Implementar modal ou página de edição
  alert('Funcionalidade de edição em desenvolvimento!');
};

onMounted(() => {
  carregarUsuario();
  // Atualizar última atividade
  usuario.value.ultimaAtividade = new Date().toISOString();
  salvarPreferencias();
});
</script> 