<template>
  <div class="flex h-screen bg-base-200">
    <!-- Sidebar -->
    <div 
      class="transition-all duration-300 ease-in-out relative"
      :class="sidebarAberto ? 'w-64' : 'w-0'"
    >
      <div v-show="sidebarAberto" class="h-full bg-base-100 shadow-xl flex flex-col">
        <!-- Logo -->
        <logo />
        
        <!-- Menu -->
        <div class="flex-1 overflow-y-auto">
          <menu-lateral />
        </div>

        <!-- Rodapé do Sidebar (Colapsável) -->
        <div class="border-t border-base-300">
          <!-- Toggle Button -->
          <button 
            @click="userInfoAberto = !userInfoAberto"
            class="w-full p-3 hover:bg-base-200 transition-colors flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div class="avatar placeholder">
                <div class="card bg-blue-800 text-primary-content rounded-full w-10">
                  <span class="text-sm">{{ inicialUsuario }}</span>
                </div>
              </div>
              <div class="flex-1 min-w-0 text-left">
                <p class="text-sm font-semibold truncate">{{ nomeUsuario }}</p>
                <p class="text-xs text-gray-500 truncate">{{ emailUsuario }}</p>
              </div>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 transition-transform duration-200" 
              :class="{ 'rotate-180': userInfoAberto }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Menu Expansível -->
          <div 
            class="overflow-hidden transition-all duration-300"
            :style="{ maxHeight: userInfoAberto ? '200px' : '0' }"
          >
            <div class="p-3 pt-0 space-y-2">
              
              <button @click="abrirConfiguracoes" class="btn btn-ghost btn-sm btn-block justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configurações
              </button>

              <div class="divider my-1"></div>
            </div>
          </div>
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

    
    </div>
  </div>

  <!-- Modal de Confirmação de Logout -->
  <dialog ref="logoutModal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Confirmar Saída</h3>
      <p class="py-4">Tem certeza que deseja sair do sistema? Todas as alterações não salvas serão perdidas.</p>
      <div class="modal-action">
        <button class="btn" @click="fecharModal">Cancelar</button>
        <button class="btn btn-error" @click="confirmarLogout">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
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
const userInfoAberto = ref(false);
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