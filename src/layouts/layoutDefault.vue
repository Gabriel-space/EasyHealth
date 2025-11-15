<template>
  <div class="flex h-screen bg-base-200">
    <!-- Sidebar -->
    <div 
      class="transition-all duration-300 ease-in-out"
      :class="sidebarAberto ? 'w-64' : 'w-0'"
    >
      <div v-show="sidebarAberto" class="h-full bg-base-100 shadow-xl flex flex-col">
        <!-- Logo -->
        <logo />
        
        <!-- Menu -->
        <div class="flex-1 overflow-y-auto">
          <menu-lateral />
        </div>

        <!-- Rodapé do Sidebar -->
        <div class="p-4 border-t border-base-300">
          <div class="flex items-center gap-3 mb-3">
            <div class="avatar placeholder">
              <div class="bg-primary text-primary-content rounded-full w-10">
                <span class="text-sm">{{ inicialUsuario }}</span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold truncate">{{ nomeUsuario }}</p>
              <p class="text-xs text-gray-500 truncate">{{ emailUsuario }}</p>
            </div>
          </div>
          
          <button @click="logout" class="btn btn-error btn-sm btn-block">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Navbar -->
      <nav-bar v-model:estaAberto="sidebarAberto" />
      
      <!-- Área de Conteúdo -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>

      <!-- Rodapé -->
      <footer class="footer footer-center p-4 bg-base-100 text-base-content border-t">
        <div class="flex items-center gap-4 text-sm">
          <span>© 2024 EasyHealth - Todos os direitos reservados</span>
          <span class="opacity-60">•</span>
          <a href="#" class="link link-hover">Ajuda</a>
          <span class="opacity-60">•</span>
          <a href="#" class="link link-hover">Privacidade</a>
          <span class="opacity-60">•</span>
          <a href="#" class="link link-hover">Termos</a>
        </div>
      </footer>
    </div>
  </div>

  <!-- Modal de Confirmação de Logout -->
  <dialog ref="logoutModal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Confirmar Saída</h3>
      <p class="py-4">Tem certeza que deseja sair do sistema?</p>
      <div class="modal-action">
        <button class="btn" @click="fecharModal">Cancelar</button>
        <button class="btn btn-error" @click="confirmarLogout">Sair</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import menuLateral from "@/components/menuLateral.vue";
import logo from "@/components/logo.vue";
import navBar from "@/components/navBar.vue";

const router = useRouter();
const sidebarAberto = ref(true);
const logoutModal = ref(null);

const usuarioLogado = computed(() => {
  const user = localStorage.getItem('usuarioLogado');
  return user ? JSON.parse(user) : null;
});

const nomeUsuario = computed(() => usuarioLogado.value?.nome || 'Usuário');
const emailUsuario = computed(() => usuarioLogado.value?.email || 'email@exemplo.com');
const inicialUsuario = computed(() => nomeUsuario.value[0]?.toUpperCase() || 'U');

const logout = () => {
  logoutModal.value?.showModal();
};

const fecharModal = () => {
  logoutModal.value?.close();
};

const confirmarLogout = () => {
  localStorage.removeItem('usuarioLogado');
  router.push({ name: 'login' });
  fecharModal();
};
</script>