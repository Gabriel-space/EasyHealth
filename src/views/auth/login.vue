<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-2xl">
      <div class="card-body">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🏥</div>
          <h1 class="text-4xl font-bold text-primary mb-2">EasyHealth</h1>
          <p class="text-gray-500">Entre na sua conta</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="fazerLogin" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Email</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="seu@email.com"
                class="input input-bordered w-full pl-10"
                v-model="form.email"
                required
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Senha</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                :type="mostrarSenha ? 'text' : 'password'"
                placeholder="••••••••"
                class="input input-bordered w-full pl-10 pr-10"
                v-model="form.senha"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="mostrarSenha = !mostrarSenha"
              >
                <svg v-if="!mostrarSenha" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Erro -->
          <div v-if="erro" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ erro }}</span>
          </div>

          <!-- Botão -->
          <button class="btn btn-primary w-full" :disabled="carregando">
            <span v-if="carregando" class="loading loading-spinner"></span>
            <span v-else>Fazer login</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="divider">OU</div>

        <!-- Link Cadastro -->
        <div class="text-center">
          <p class="text-sm mb-2">Já tem uma conta?</p>
          <router-link :to="{name: 'cadastro'}" class="btn btn-outline btn-block">
            Criar Conta
          </router-link>
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
let db = new Localbase("db");

const form = reactive({
  email: "",
  senha: ""
});

const carregando = ref(false);
const erro = ref("");
const mostrarSenha = ref(false);

const fazerLogin = async () => {
  erro.value = "";
  carregando.value = true;

  try {
    const usuarios = await db.collection("usuarios").get();
    
    const usuario = usuarios.find(
      u => u.email === form.email && u.senha === form.senha
    );

    if (!usuario) {
      erro.value = "Email ou senha incorretos";
      carregando.value = false;
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    router.push({ name: "dashboard" });
    
  } catch (error) {
    erro.value = "Erro ao fazer login. Tente novamente.";
    console.error(error);
  } finally {
    carregando.value = false;
  }
};
</script>