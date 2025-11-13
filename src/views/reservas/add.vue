<template>
  <div class="w-full">
    <div class="mb-4">
      <breadcrumbs>
        <template v-slot:model> Reservas </template>
        <template v-slot:action> Adicionar </template>
      </breadcrumbs>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Adicionar Nova Reserva</h2>

        <form @submit.prevent="adicionarReserva" class="space-y-4">
          <!-- Nome Completo -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Nome Completo *</span>
            </label>
            <input
              type="text"
              class="input input-bordered w-full"
              :class="{ 'input-error': erros.nomeCompleto }"
              placeholder="Digite o nome completo"
              v-model="form.nomeCompleto"
              required
            />
            <label v-if="erros.nomeCompleto" class="label">
              <span class="label-text-alt text-error">{{ erros.nomeCompleto }}</span>
            </label>
          </div>

          <!-- Data -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Data da Reserva *</span>
            </label>
            <input
              type="date"
              class="input input-bordered w-full"
              :class="{ 'input-error': erros.data }"
              v-model="form.data"
              :min="dataMinima"
              required
            />
            <label v-if="erros.data" class="label">
              <span class="label-text-alt text-error">{{ erros.data }}</span>
            </label>
          </div>

          <div class="divider">Endereço</div>

          <!-- CEP e Número -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="form-control md:col-span-2">
              <label class="label">
                <span class="label-text font-semibold">CEP</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                :class="{ 'input-error': erros.cep }"
                placeholder="00000-000"
                v-model="form.cep"
                @input="formatarCEP"
                maxlength="9"
              />
              <label v-if="erros.cep" class="label">
                <span class="label-text-alt text-error">{{ erros.cep }}</span>
              </label>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Número</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                placeholder="123"
                v-model="form.numero"
              />
            </div>
          </div>

          <!-- Bairro e Cidade -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Bairro</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                placeholder="Centro"
                v-model="form.bairro"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Cidade</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                placeholder="São Paulo"
                v-model="form.cidade"
              />
            </div>
          </div>

          <!-- Estado e Complemento -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Estado</span>
              </label>
              <select class="select select-bordered w-full" v-model="form.estado">
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Complemento</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full"
                placeholder="Apto 101, Bloco A"
                v-model="form.complemento"
              />
            </div>
          </div>

          <div class="divider">Telefones (Opcional)</div>

          <!-- Telefones -->
          <div class="space-y-2">
            <div v-for="(telefone, index) in form.telefones" :key="index" class="flex gap-2">
              <input
                type="tel"
                class="input input-bordered flex-1"
                placeholder="(00) 00000-0000"
                v-model="form.telefones[index]"
                @input="formatarTelefone(index)"
                maxlength="15"
              />
              <button
                type="button"
                class="btn btn-error btn-square"
                @click="removerTelefone(index)"
                v-if="form.telefones.length > 1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              class="btn btn-outline btn-sm"
              @click="adicionarTelefone"
            >
              + Adicionar Telefone
            </button>
          </div>

          <!-- Botões -->
          <div class="card-actions justify-end mt-6 pt-6 border-t">
            <button type="button" class="btn btn-ghost" @click="voltar">
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="salvando"
            >
              <span v-if="salvando" class="loading loading-spinner"></span>
              {{ salvando ? 'Salvando...' : 'Salvar Reserva' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toastVisible" class="toast toast-top toast-end">
      <div :class="['alert', toastTipo === 'success' ? 'alert-success' : 'alert-error']">
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

const router = useRouter();
let db;

onMounted(() => {
  db = new Localbase("db");
});

const salvando = ref(false);
const toastVisible = ref(false);
const toastMessage = ref("");
const toastTipo = ref("success");

const form = reactive({
  nomeCompleto: "",
  data: "",
  numero: "",
  bairro: "",
  cep: "",
  complemento: "",
  cidade: "",
  estado: "",
  telefones: [""]
});

const erros = reactive({
  nomeCompleto: "",
  data: "",
  cep: ""
});

// Data mínima é hoje
const dataMinima = computed(() => {
  const hoje = new Date();
  return hoje.toISOString().split('T')[0];
});

const formatarCEP = (event) => {
  let valor = event.target.value.replace(/\D/g, "");
  if (valor.length > 5) {
    valor = valor.slice(0, 5) + "-" + valor.slice(5, 8);
  }
  form.cep = valor;
  erros.cep = "";
};

const formatarTelefone = (index) => {
  let valor = form.telefones[index].replace(/\D/g, "");
  
  if (valor.length <= 10) {
    // (00) 0000-0000
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else {
    // (00) 00000-0000
    valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  }
  
  form.telefones[index] = valor;
};

const adicionarTelefone = () => {
  form.telefones.push("");
};

const removerTelefone = (index) => {
  form.telefones.splice(index, 1);
};

const validarFormulario = () => {
  let valido = true;
  
  // Limpa erros anteriores
  Object.keys(erros).forEach(key => erros[key] = "");
  
  if (!form.nomeCompleto.trim()) {
    erros.nomeCompleto = "Nome é obrigatório";
    valido = false;
  }
  
  if (!form.data) {
    erros.data = "Data é obrigatória";
    valido = false;
  }
  
  if (form.cep && !/^\d{5}-?\d{3}$/.test(form.cep)) {
    erros.cep = "CEP inválido";
    valido = false;
  }
  
  return valido;
};

const adicionarReserva = async () => {
  if (!validarFormulario()) {
    mostrarToast("Por favor, corrija os erros no formulário", "error");
    return;
  }
  
  salvando.value = true;
  
  try {
    const telefonesValidos = form.telefones.filter(t => t.trim() !== "");
    
    // GERA UM ID ÚNICO
    const novaReserva = {
      id: Date.now().toString(), // ← ADICIONE ESTA LINHA
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
      telefones: telefonesValidos,
      confirmada: false,
      criadoEm: new Date().toISOString()
    };
    
    await db.collection("reservas").add(novaReserva);
    
    mostrarToast(`Reserva de ${form.nomeCompleto} criada com sucesso!`, "success");
    
    setTimeout(() => {
      router.push({ name: "reservas.index" });
    }, 1500);
    
  } catch (error) {
    console.error("Erro ao adicionar reserva:", error);
    mostrarToast("Erro ao salvar reserva. Tente novamente.", "error");
    salvando.value = false;
  }
};

const voltar = () => {
  if (confirm("Deseja sair sem salvar?")) {
    router.push({ name: "reservas.index" });
  }
};

const mostrarToast = (mensagem, tipo = "success") => {
  toastMessage.value = mensagem;
  toastTipo.value = tipo;
  toastVisible.value = true;
  
  setTimeout(() => {
    toastVisible.value = false;
  }, 3000);
};
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>