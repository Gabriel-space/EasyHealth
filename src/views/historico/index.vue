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
          <p class="text-sm text-gray-500">Reservas confirmadas</p>
        </div>
        <div class="badge badge-lg badge-primary">
          {{ reservasConfirmadas.length }} confirmadas
        </div>
      </div>

      <div v-if="reservasConfirmadas.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-lg mb-2">Nenhuma reserva confirmada</p>
        <p class="text-sm text-gray-500">As reservas confirmadas aparecerão aqui</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Endereço</th>
              <th>Data Reserva</th>
              <th>Confirmação</th>
              <th>Telefones</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reserva in reservasConfirmadas" :key="reserva.id" class="hover">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar placeholder">
                    <div class="bg-success text-success-content rounded-full w-12">
                      <span class="text-xl">{{ reserva.nome[0] }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ reserva.nome }}</div>
                    <div class="text-sm opacity-75">{{ reserva.endereco?.cidade || "Sem cidade" }}</div>
                  </div>
                </div>
              </td>
              
              <td>
                <div class="text-sm">
                  <div>{{ reserva.endereco?.bairro || '-' }}</div>
                  <span class="badge badge-ghost badge-sm">Nº {{ reserva.endereco?.numero || 'S/N' }}</span>
                </div>
              </td>
              
              <td>
                <span class="badge badge-primary">{{ formatarData(reserva.endereco?.data) }}</span>
              </td>

              <td>
                <span class="badge badge-success">{{ formatarDataHora(reserva.dataConfirmacao) }}</span>
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
                  <button class="btn btn-sm btn-info items" @click="desconfirmar(reserva.id)" title="Voltar para Reservas">
                    Desconfirmar
                  </button>
                  <button class="btn btn-sm btn-error" @click="excluir(reserva.id)" title="Excluir permanentemente">
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

  <div v-if="toastVisible" class="toast toast-top toast-end">
    <div class="alert" :class="toastTipo">
      <span>{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { ref, onMounted } from "vue";
import Localbase from "localbase";

let db = new Localbase("db");

onMounted(() => {
  carregarHistorico();
});

const reservasConfirmadas = ref([]);
const toastVisible = ref(false);
const toastMessage = ref("");
const toastTipo = ref("alert-success");

const carregarHistorico = async () => {
  try {
    const todasReservas = await db.collection("reservas").get();
    reservasConfirmadas.value = todasReservas
      .filter(r => r.confirmada === true)
      .sort((a, b) => new Date(b.dataConfirmacao) - new Date(a.dataConfirmacao));
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
  }
};

// NOVA FUNÇÃO: Desconfirmar (volta para reservas ativas)
const desconfirmar = async (id) => {
  if (!confirm("Deseja mover esta reserva de volta para a lista de reservas ativas?")) return;
  
  try {
    await db.collection("reservas").doc({ id }).update({
      confirmada: false,
      dataConfirmacao: null
    });
    await carregarHistorico();
    mostrarToast("Reserva movida de volta para reservas ativas!", "alert-info");
  } catch (error) {
    console.error("Erro ao desconfirmar:", error);
    mostrarToast("Erro ao desconfirmar reserva", "alert-error");
  }
};

// FUNÇÃO CORRIGIDA: Excluir (apaga de verdade)
const excluir = async (id) => {
  if (!confirm("⚠️ ATENÇÃO: Esta ação irá EXCLUIR PERMANENTEMENTE a reserva. Deseja continuar?")) return;
  
  try {
    await db.collection("reservas").doc({ id }).delete();
    await carregarHistorico();
    mostrarToast("Reserva excluída permanentemente!", "alert-success");
  } catch (error) {
    console.error("Erro ao excluir:", error);
    mostrarToast("Erro ao excluir reserva", "alert-error");
  }
};

const formatarData = (data) => {
  if (!data) return "Sem data";
  if (data.includes("/")) return data;
  try {
    return new Date(data).toLocaleDateString("pt-BR");
  } catch {
    return data;
  }
};

const formatarDataHora = (dataISO) => {
  if (!dataISO) return "N/A";
  try {
    return new Date(dataISO).toLocaleString("pt-BR", {
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

const mostrarToast = (mensagem, tipo = "alert-success") => {
  toastMessage.value = mensagem;
  toastTipo.value = tipo;
  toastVisible.value = true;
  setTimeout(() => toastVisible.value = false, 3000);
};
</script>