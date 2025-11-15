<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-accent p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-2xl">
      <div class="card-body">
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold mb-2">Criar Conta</h1>
          <p class="text-gray-500">Cadastre-se no EasyHealth</p>
        </div>

        <form @submit.prevent="fazerCadastro">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Nome Completo</span>
            </label>
            <input
              type="text"
              placeholder="Seu nome"
              class="input input-bordered"
              v-model="form.nome"
              required
            />
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              class="input input-bordered"
              v-model="form.email"
              required
            />
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-semibold">Senha</span>
            </label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              class="input input-bordered"
              v-model="form.senha"
              minlength="6"
              required
            />
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text font-semibold">Confirmar Senha</span>
            </label>
            <input
              type="password"
              placeholder="Digite a senha novamente"
              class="input input-bordered"
              v-model="form.confirmarSenha"
              required
            />
          </div>

          <!-- Sucesso/Erro -->
          <div v-if="sucesso" class="alert alert-success mt-4">
            <span>Conta criada com sucesso! Redirecionando...</span>
          </div>
          <div v-if="erro" class="alert alert-error mt-4">
            <span>{{ erro }}</span>
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-info" :disabled="carregando">
              <span v-if="carregando" class="loading loading-spinner"></span>
              {{ carregando ? 'Cadastrando...' : 'Criar Conta' }}
            </button>
          </div>
        </form>

        <div class="divider">OU</div>
        <div class="text-center">
          <p class="text-sm">Já tem uma conta?</p>
          <button class="btn btn-ghost btn-sm" @click="irParaLogin">
            Fazer login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

const router = useRouter();
let db;
db = new Localbase("db");

const form = reactive({
  nome: "",
  email: "",
  senha: "",
  confirmarSenha: ""
});

const carregando = ref(false);
const erro = ref("");
const sucesso = ref(false);

const fazerCadastro = async () => {
  erro.value = "";

  // Validações
  if (form.senha !== form.confirmarSenha) {
    erro.value = "As senhas não coincidem";
    return;
  }

  if (form.senha.length < 6) {
    erro.value = "A senha deve ter no mínimo 6 caracteres";
    return;
  }

  carregando.value = true;

  try {
    // Verifica se email já existe
    const usuarios = await db.collection("usuarios").get();
    const emailExiste = usuarios.some(u => u.email === form.email);

    if (emailExiste) {
      erro.value = "Este email já está cadastrado";
      carregando.value = false;
      return;
    }

    // Cria novo usuário
    const novoUsuario = {
      id: Date.now().toString(),
      nome: form.nome,
      email: form.email,
      senha: form.senha, // Em produção, use hash!
      criadoEm: new Date().toISOString()
    };

    await db.collection("usuarios").add(novoUsuario);

    sucesso.value = true;

    // Faz login automático
    setTimeout(() => {
      localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
      router.push({ name: "dashboard" });
    }, 1500);

  } catch (error) {
    erro.value = "Erro ao criar conta. Tente novamente.";
    console.error(error);
  } finally {
    carregando.value = false;
  }
};

const irParaLogin = () => {
  router.push({ name: "login" });
};
</script>