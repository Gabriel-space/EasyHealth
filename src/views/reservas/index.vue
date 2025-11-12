<template>
  <div class="mb-2">
    <breadcrumbs>
      <template v-slot:model> Reservas </template>
      <template v-slot:action> Lista de Reservas </template>
    </breadcrumbs>
  </div>
  
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex justify-between items-center mb-5">
        <h2 class="text-2xl font-bold">Reservas</h2>
        <button class="btn btn-primary" @click="adicionar">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nova Reserva
        </button>
      </div>

      <!-- Mensagem quando não há reservas -->
      <div v-if="reservas.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p class="text-lg mb-2">Nenhuma reserva encontrada</p>
        <p class="text-sm text-gray-500">Clique em "Nova Reserva" para começar</p>
      </div>

      <!-- Tabela de reservas -->
      <div v-else class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Endereço</th>
              <th>Data</th>
              <th>Telefones</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reserva in reservas" :key="reserva.id" class="hover">
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
                    Nº {{ reserva.endereco?.numero || 'S/N' }}
                  </span>
                </div>
              </td>
              
              <td>
                <span class="badge badge-primary">
                  {{ formatarData(reserva.endereco?.data) }}
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
                  <button class="btn btn-sm btn-success" @click="confirmar(reserva.id)" :disabled="reserva.confirmada">
                    {{ reserva.confirmada ? '✓ Confirmado' : 'Confirmar' }}
                  </button>
                  <button class="btn btn-sm btn-info" @click="editar(reserva.id)">
                    Editar
                  </button>
                  <button class="btn btn-sm btn-error" @click="excluir(reserva.id)">
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
import { useRouter } from "vue-router";
import Localbase from "localbase";

const router = useRouter();
let db;

onMounted(() => {
  db = new Localbase("db");
  capturarReservas();
});

const reservas = ref([]);
const toastVisible = ref(false);
const toastMessage = ref("");

const capturarReservas = async () => {
  try {
    reservas.value = await db.collection("reservas").get();
  } catch (error) {
    console.error("Erro ao capturar reservas:", error);
  }
};

const adicionar = () => {
  router.push({ name: "reservas.add" });
};

const editar = (id) => {
  router.push({ name: "reservas.edit", params: { id } });
};

const confirmar = async (id) => {
  try {
    await db.collection("reservas").doc({ id }).update({ confirmada: true });
    await capturarReservas();
    mostrarToast("Reserva confirmada com sucesso!");
  } catch (error) {
    console.error("Erro ao confirmar:", error);
  }
};

const excluir = async (id) => {
  if (!confirm("Tem certeza que deseja excluir esta reserva?")) return;
  
  try {
    await db.collection("reservas").doc({ id }).delete();
    await capturarReservas();
    mostrarToast("Reserva excluída com sucesso!");
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

const mostrarToast = (mensagem) => {
  toastMessage.value = mensagem;
  toastVisible.value = true;
  setTimeout(() => toastVisible.value = false, 3000);
};
</script>