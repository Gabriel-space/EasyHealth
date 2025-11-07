<template>
  <div class="mb-2">
    <breadcrumbs>
      <template v-slot:model> Reservas </template>
      <template v-slot:action> Lista de Reservas </template>
    </breadcrumbs>
  </div>
  <div class="card w-full bg-base-100 shadow-sm card-border">
    <div class="card-body">
      <div class="overflow-x-auto">
        <div class="flex">
          <div class="flex-1 mb-5 text-2xl">Reservas</div>
          
          <button class="btn btn-info"@click="adicionar">Adicionar</button>
        </div>
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Data</th>
            
              
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="reserva in reservas" :key="reserva.id">
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img
                        src="https://i.pinimg.com/736x/be/de/50/bede50853ed66c1dcf6b7c978b95cb6b.jpg"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ reserva.nome }}</div>
                    <div class="text-sm opacity-50">
                      {{ reserva.endereco.cidade ?? "Cliente sem cidade" }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {{ reserva.endereco.logradouro }} {{ reserva.endereco.numero ?? "S/N" }}
                {{ reserva.endereco.cep }} {{ reserva.endereco.complemento }}
                <br />
                <span class="badge badge-ghost badge-sm"
                  >{{ reserva.endereco.cidade }}/{{ reserva.endereco.estado }}</span
                >
              </td>
              <td>
                <div
                  v-for="telefone in reserva.telefones"
                  :key="telefone"
                  class="badge badge-xs badge-dash flex m-1"
                >
                  {{ telefone }}
                </div>
              </td>
              <th>
                <button class="btn btn-soft btn-success h-6 w-18 "@click="confirmar">Confirmar</button>
                <br><br>
                <button class="btn btn-info h-5 w-17 "@click="editar">Editar</button>
                <br><br>
                <button class="btn btn-outline btn-error h-5 w-17 "@click="deletar">Deletar</button>
              </th>
            </tr>
          </tbody>
          <!-- foot -->
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

let db;
onMounted(() => {
  db = new Localbase("db");
  capturarReservas();
});

const reservas = ref([]);

const capturarReservas = async () => {
  reservas.value = await db.collection("reservas").get();
};

const router = useRouter();

const adicionar = () => {
  router.push({ name: "reservas.add" });
};
</script>

<style lang="scss" scoped></style>
