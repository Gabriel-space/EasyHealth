<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold">⚙️ Configurações</h1>
        <p class="text-gray-500 mt-1">Gerencie suas preferências e dados do sistema</p>
      </div>
    </div>

    <!-- Tabs -->
    <div role="tablist" class="tabs tabs-boxed bg-base-100 shadow-lg p-2">
      <a 
        role="tab" 
        class="tab"
        :class="{ 'tab-active': abaAtiva === 'perfil' }"
        @click="abaAtiva = 'perfil'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Perfil
      </a>
      <a 
        role="tab" 
        class="tab"
        :class="{ 'tab-active': abaAtiva === 'notificacoes' }"
        @click="abaAtiva = 'notificacoes'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Notificações
      </a>
      <a 
        role="tab" 
        class="tab"
        :class="{ 'tab-active': abaAtiva === 'seguranca' }"
        @click="abaAtiva = 'seguranca'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Segurança
      </a>
      <a 
        role="tab" 
        class="tab"
        :class="{ 'tab-active': abaAtiva === 'sistema' }"
        @click="abaAtiva = 'sistema'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Sistema
      </a>
    </div>

    <!-- Conteúdo das Abas -->
    
    <!-- ABA PERFIL -->
    <div v-if="abaAtiva === 'perfil'" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Informações do Perfil</h2>
        
        <div class="flex items-center gap-6 mb-8">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-24">
              <span class="text-4xl">{{ perfil.nome[0]?.toUpperCase() }}</span>
            </div>
          </div>
          <div>
            <button class="btn btn-primary btn-sm">Alterar Avatar</button>
            <p class="text-sm text-gray-500 mt-2">JPG, PNG ou GIF (máx. 2MB)</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Nome Completo</span>
            </label>
            <input type="text" v-model="perfil.nome" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Email</span>
            </label>
            <input type="email" v-model="perfil.email" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Telefone</span>
            </label>
            <input type="tel" v-model="perfil.telefone" placeholder="(00) 00000-0000" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">CPF</span>
            </label>
            <input type="text" v-model="perfil.cpf" placeholder="000.000.000-00" class="input input-bordered" />
          </div>

          <div class="form-control md:col-span-2">
            <label class="label">
              <span class="label-text font-semibold">Cargo/Função</span>
            </label>
            <select v-model="perfil.cargo" class="select select-bordered">
              <option>Administrador</option>
              <option>Médico</option>
              <option>Recepcionista</option>
              <option>Enfermeiro</option>
            </select>
          </div>
        </div>

        <div class="card-actions justify-end mt-6">
          <button class="btn btn-ghost">Cancelar</button>
          <button class="btn btn-primary" @click="salvarPerfil">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>

    <!-- ABA NOTIFICAÇÕES -->
    <div v-if="abaAtiva === 'notificacoes'" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Preferências de Notificação</h2>
        
        <div class="space-y-6">
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input type="checkbox" v-model="notificacoes.email" class="checkbox checkbox-primary" />
              <div>
                <span class="label-text font-semibold">Notificações por Email</span>
                <p class="text-sm text-gray-500">Receba atualizações importantes por email</p>
              </div>
            </label>
          </div>

          <div class="divider"></div>

          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input type="checkbox" v-model="notificacoes.novasReservas" class="checkbox checkbox-primary" />
              <div>
                <span class="label-text font-semibold">Novas Reservas</span>
                <p class="text-sm text-gray-500">Seja notificado quando houver novas reservas</p>
              </div>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input type="checkbox" v-model="notificacoes.cancelamentos" class="checkbox checkbox-primary" />
              <div>
                <span class="label-text font-semibold">Cancelamentos</span>
                <p class="text-sm text-gray-500">Alerta sobre reservas canceladas</p>
              </div>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input type="checkbox" v-model="notificacoes.lembretes" class="checkbox checkbox-primary" />
              <div>
                <span class="label-text font-semibold">Lembretes Diários</span>
                <p class="text-sm text-gray-500">Resumo diário das reservas agendadas</p>
              </div>
            </label>
          </div>

          <div class="divider"></div>

          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-4">
              <input type="checkbox" v-model="notificacoes.marketing" class="checkbox checkbox-primary" />
              <div>
                <span class="label-text font-semibold">Comunicações de Marketing</span>
                <p class="text-sm text-gray-500">Novidades, dicas e ofertas especiais</p>
              </div>
            </label>
          </div>
        </div>

        <div class="card-actions justify-end mt-6">
          <button class="btn btn-primary" @click="salvarNotificacoes">Salvar Preferências</button>
        </div>
      </div>
    </div>

    <!-- ABA SEGURANÇA -->
    <div v-if="abaAtiva === 'seguranca'" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Segurança e Privacidade</h2>
        
        <div class="space-y-6">
          <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Sua senha deve ter no mínimo 8 caracteres</span>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Senha Atual</span>
            </label>
            <input type="password" v-model="seguranca.senhaAtual" placeholder="••••••••" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Nova Senha</span>
            </label>
            <input type="password" v-model="seguranca.novaSenha" placeholder="••••••••" class="input input-bordered" />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Confirmar Nova Senha</span>
            </label>
            <input type="password" v-model="seguranca.confirmarSenha" placeholder="••••••••" class="input input-bordered" />
          </div>

          <div class="divider"></div>

          <div class="space-y-4">
            <h3 class="font-semibold text-lg">Autenticação em Dois Fatores</h3>
            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-4">
                <input type="checkbox" v-model="seguranca.two_factor" class="toggle toggle-primary" />
                <div>
                  <span class="label-text font-semibold">Ativar 2FA</span>
                  <p class="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                </div>
              </label>
            </div>
          </div>

          <div class="divider"></div>

          <div class="space-y-4">
            <h3 class="font-semibold text-lg">Sessões Ativas</h3>
            <div class="overflow-x-auto">
              <table class="table table-zebra">
                <thead>
                  <tr>
                    <th>Dispositivo</th>
                    <th>Local</th>
                    <th>Último Acesso</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Chrome - Windows
                      </div>
                    </td>
                    <td>Fortaleza, BR</td>
                    <td>Agora</td>
                    <td><span class="badge badge-success">Atual</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="card-actions justify-end mt-6">
          <button class="btn btn-primary" @click="alterarSenha">Alterar Senha</button>
        </div>
      </div>
    </div>

    <!-- ABA SISTEMA -->
    <div v-if="abaAtiva === 'sistema'" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-6">Configurações do Sistema</h2>
        
        <div class="space-y-6">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Tema</span>
            </label>
            <select v-model="sistema.tema" class="select select-bordered">
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Idioma</span>
            </label>
            <select v-model="sistema.idioma" class="select select-bordered">
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Fuso Horário</span>
            </label>
            <select v-model="sistema.timezone" class="select select-bordered">
              <option value="America/Fortaleza">América/Fortaleza (GMT-3)</option>
              <option value="America/Sao_Paulo">América/São Paulo (GMT-3)</option>
              <option value="America/Manaus">América/Manaus (GMT-4)</option>
            </select>
          </div>

          <div class="divider"></div>

          <div class="space-y-4">
            <h3 class="font-semibold text-lg">Dados e Privacidade</h3>
            
            <button class="btn btn-outline btn-block justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar Meus Dados
            </button>

            <button class="btn btn-outline btn-warning btn-block justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpar Dados do Cache
            </button>

            <button class="btn btn-outline btn-error btn-block justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Excluir Minha Conta
            </button>
          </div>

          <div class="divider"></div>

          <div class="space-y-4">
            <h3 class="font-semibold text-lg">Informações do Sistema</h3>
            <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-title">Versão</div>
                <div class="stat-value text-primary text-2xl">1.0.0</div>
              </div>
              <div class="stat">
                <div class="stat-title">Último Backup</div>
                <div class="stat-value text-2xl">Hoje</div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-actions justify-end mt-6">
          <button class="btn btn-primary" @click="salvarSistema">Salvar Configurações</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toastVisible" class="toast toast-top toast-end">
      <div class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Localbase from "localbase";

let db = new Localbase("db");

const abaAtiva = ref("perfil");
const toastVisible = ref(false);
const toastMessage = ref("");

const perfil = reactive({
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  cargo: "Administrador"
});

const notificacoes = reactive({
  email: true,
  novasReservas: true,
  cancelamentos: true,
  lembretes: false,
  marketing: false
});

const seguranca = reactive({
  senhaAtual: "",
  novaSenha: "",
  confirmarSenha: "",
  two_factor: false
});

const sistema = reactive({
  tema: "light",
  idioma: "pt-BR",
  timezone: "America/Fortaleza"
});

onMounted(() => {
  carregarDados();
});

const carregarDados = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
  perfil.nome = usuario.nome || "";
  perfil.email = usuario.email || "";
};

const salvarPerfil = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  usuario.nome = perfil.nome;
  usuario.email = perfil.email;
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  mostrarToast("Perfil atualizado com sucesso!");
};

const salvarNotificacoes = () => {
  mostrarToast("Preferências de notificação salvas!");
};

const alterarSenha = () => {
  if (seguranca.novaSenha !== seguranca.confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }
  mostrarToast("Senha alterada com sucesso!");
  seguranca.senhaAtual = "";
  seguranca.novaSenha = "";
  seguranca.confirmarSenha = "";
};

const salvarSistema = () => {
  mostrarToast("Configurações do sistema salvas!");
};

const mostrarToast = (mensagem) => {
  toastMessage.value = mensagem;
  toastVisible.value = true;
  setTimeout(() => toastVisible.value = false, 3000);
};
</script>