<template>
  <div class="w-full">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
      <legend class="fieldset-legend">Adicionando reservas</legend>

      <label class="label">Nome</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Nome completo"
        v-model="form.nomeCompleto"
      />

      <label class="label">Data</label>
      <input type="text" class="input w-full" placeholder="__/__/__" v-model="form.data" />

      <label class="label">Número</label>
      <input type="text" class="input w-full" placeholder="Número" v-model="form.numero" />

      <label class="label">Bairro</label>
      <input type="text" class="input w-full" placeholder="Bairro" v-model="form.bairro" />

      <label class="label">CEP</label>
      <input type="text" class="input w-full" placeholder="CEP" v-model="form.cep" />

      <label class="label">Complemento</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Complemento"
        v-model="form.complemento"
      />

      <label class="label">Cidade</label>
      <input type="text" class="input w-full" placeholder="Cidade" v-model="form.cidade" />

      <label class="label">Estado</label>
      <input type="text" class="input w-full" placeholder="Estado" v-model="form.estado" />

      <button class="btn btn-neutral mt-4" @click="adicionarReserva">Adicionar</button>
    </fieldset>
    <div class="toast" v-if="toastVisible">
      <div class="alert alert-info">
        <span
          ><strong>{{ nomeCompletoToast }}</strong> salvo com sucesso.</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Localbase from "localbase";

let db;
onMounted(() => {
  db = new Localbase("db");
});

const toastVisible = ref(false);
const nomeCompletoToast = ref("");
const form = reactive({
  nomeCompleto: "",
  data: "",
  numero: "",
  bairro: "",
  cep: "",
  complemento: "",
  cidade: "",
  estado: "",
});

const adicionarReserva = async () => {
  try {
    await db.collection("reservas").add({
      nome: form.nomeCompleto,
      endereco: {
        data: form.data,
        numero: form.numero,
        bairro: form.bairro,
        cep: form.cep,
        complemento: form.complemento,
        cidade: form.cidade,
        estado: form.estado,
      },
      telefones: [],
    });
    console.log("Reserva adicionado com sucesso!");
    nomeCompletoToast.value = form.nomeCompleto;
    toastVisible.value = true;
  } catch (error) {
    console.error("Erro ao adicionar reserva:", error);
  } finally {
    // Limpar o formulário após a adição
    form.nomeCompleto = "";
    form.data = "";
    form.numero = "";
    form.bairro = "";
    form.cep = "";
    form.complemento = "";
    form.cidade = "";
    form.estado = "";
  }
};
</script>

<style lang="scss" scoped></style>
