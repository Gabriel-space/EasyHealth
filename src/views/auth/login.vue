<template>
  
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-900">
    
  <!-- Conteúdo Principal -->
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="card w-full max-w-md bg-base-100 shadow-2xl">
        <div class="card-body">
          <!-- Logo -->
          <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-gray mb-2">ReservationSystem</h1>
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
            <button class="btn btn-neutral w-full" :disabled="carregando">
              <span v-if="carregando" class="loading loading-spinner"></span>
              <span v-else>Fazer login</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="divider">OU</div>

          <!-- Link Cadastro -->
          <div class="text-center">
            <p class="text-sm mb-2">Não tem uma conta?</p>
            <router-link :to="{name: 'cadastro'}" class="btn btn-outline btn-block">
              Criar Conta
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Rodapé Completo -->
    <footer class="bg-black backdrop-blur-md text-white border-t border-white/20">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Grid Principal -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Sobre -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="font-bold text-lg">ReservationSystem</span>
            </div>
            <p class="text-sm opacity-90 mb-4">
              Sistema completo de gerenciamento de reservas. Facilite o agendamento e organização da sua estabelecimento.
            </p>
            <div class="flex gap-3">
              <a href="https://instagram.com" target="_blank" class="btn btn-circle btn-sm hover:bg-pink-500 border-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://wa.me/5585999999999" target="_blank" class="btn btn-circle btn-sm hover:bg-green-500 border-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a href="https://t.me/reservationsystem" target="_blank" class="btn btn-circle btn-sm hover:bg-blue-500 border-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" class="btn btn-circle btn-sm hover:bg-blue-600 border-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Links Rápidos -->
          <div>
            <h3 class="font-semibold mb-4">Links Rápidos</h3>
            <ul class="space-y-2 text-sm opacity-90">
              <li><a href="#" class="hover:opacity-100 transition-opacity">→ Dashboard</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">→ Reservas</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">→ Histórico</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">→ Relatórios</a></li>
            </ul>
          </div>

          <!-- Suporte -->
          <div>
            <h3 class="font-semibold mb-4">Suporte</h3>
            <ul class="space-y-2 text-sm opacity-90">
              <li><a href="#" class="hover:opacity-100 transition-opacity">Central de Ajuda</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">Documentação</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">Contato</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">FAQ</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="font-semibold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm opacity-90">
              <li><a href="#" class="hover:opacity-100 transition-opacity">Política de Privacidade</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">Termos de Uso</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">LGPD</a></li>
              <li><a href="#" class="hover:opacity-100 transition-opacity">Acessibilidade</a></li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <div class="divider opacity-30 my-6"></div>

        <!-- Copyright -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-90">
          <div class="flex items-center gap-2">
            <span>© 2024 ReservationSystem™</span>
            <span>•</span>
            <span>Todos os direitos reservados</span>
          </div>
          <div class="flex items-center gap-2">
            <span>Versão 1.0.0</span>
            <span>•</span>
          </div>
        </div>
      </div>
    </footer>
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