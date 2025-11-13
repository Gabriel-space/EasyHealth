<template>
  <div class="mb-2">
    <breadcrumbs>
      <template v-slot:model> Histórico </template>
      <template v-slot:action> Reservas Confirmadas </template>
    </breadcrumbs>
  </div>
  
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex justify-between items-center mb-5">
        <div>
          <h2 class="text-2xl font-bold">Histórico de Reservas</h2>
          <p class="text-sm text-gray-500">Reservas já confirmadas</p>
        </div>
        <div class="badge badge-lg badge-primary">
          {{ reservasConfirmadas.length }} confirmadas
        </div>
      </div>

      <!-- Mensagem quando não há histórico -->
      <div v-if="reservasConfirmadas.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg mb-2">Nenhuma reserva confirmada</p>
        <p class="text-sm text-gray-500">As reservas confirmadas aparecerão aqui</p>
      </div>

      <!-- Tabela de histórico -->
      <div v-else class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Endereço</th>
              <th>Data da Reserva</th>
              <th>Data Confirmação</th>
              <th>Telefones</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reserva in reservasConfirmadas" :key="reserva.id" class="hover">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img src="https://i.pinimg.com/736x/be/de/50/bede50853ed66c1dcf6b7c978b95cb6b.jpg" alt="Avatar" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ reserva.nome }}</div>
                    <div class="text-sm opacity-75">
                      {{ reserva.endereco?.cidade || "Sem cidade" }}
                    </div>
                  </div>
                </div>
              </td>
              
              <td>
                <div class="text-sm">
                  <div>{{ reserva.endereco?.bairro || '-' }}</div>
                  <span class="badge badge-ghost badge-sm">
                    {{ reserva.endereco?.numero || 'S/N' }}
                  </span>
                </div>
              </td>
              
              <td>
                <span class="badge badge-primary">
                  {{ formatarData(reserva.endereco?.data) }}
                </span>
              </td>

              <td>
                <span class="badge badge-success">
                  {{ formatarDataHora(reserva.dataConfirmacao) }}
                </span>
              </td>
              
              <td>
                <div v-if="reserva.telefones?.length > 0" class="flex flex-wrap gap-1">
                  <span v-for="(telefone, idx) in reserva.telefones" :key="idx" class="badge badge-sm badge-outline">
                    {{ telefone }}
                  </span>
                </div>
                <span v-else class="text-sm text-gray-400">Sem telefone</span>
              </td>
              
              <td>
                <div class="flex justify-end gap-2">
                  <button class="btn btn-sm btn-error" @click="excluir(reserva.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div v-if="toastVisible" class="toast toast-top toast-end">
    <div class="alert alert-success">
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { ref, onMounted } from "vue";
import Localbase from "localbase";

let db;

onMounted(() => {
  db = new Localbase("db");
  carregarHistorico();
});

const reservasConfirmadas = ref([]);
const toastVisible = ref(false);
const toastMessage = ref("");

const carregarHistorico = async () => {
  try {
    const todasReservas = await db.collection("reservas").get();
    // Filtra apenas as confirmadas e ordena por data de confirmação (mais recente primeiro)
    reservasConfirmadas.value = todasReservas
      .filter(r => r.confirmada === true)
      .sort((a, b) => new Date(b.dataConfirmacao) - new Date(a.dataConfirmacao));
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
  }
};

const excluir = async (id) => {
  if (!confirm("Tem certeza que deseja excluir esta reserva do histórico?")) return;
  
  try {
    await db.collection("reservas").doc({ id }).delete();
    await carregarHistorico();
    mostrarToast("Reserva removida do histórico!");
  } catch (error) {
    console.error("Erro ao excluir:", error);
  }
};

const formatarData = (data) => {
  if (!data) return "Sem data";
  if (data.includes("/")) return data;
  
  try {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  } catch {
    return data;
  }
};

const formatarDataHora = (dataISO) => {
  if (!dataISO) return "N/A";
  
  try {
    const date = new Date(dataISO);
    return date.toLocaleString("pt-BR", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return "N/A";
  }
};

const mostrarToast = (mensagem) => {
  toastMessage.value = mensagem;
  toastVisible.value = true;
  setTimeout(() => toastVisible.value = false, 3000);
};
</script>