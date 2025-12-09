import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/login.vue'),
      meta: { semLayout: true }
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('@/views/auth/cadastro.vue'),
      meta: { semLayout: true }
    },
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard.vue'),
      meta: { requerAuth: true }
    },
    {
      path: '/reservas',
      meta: { requerAuth: true },
      children: [
        {
          path: '',
          name: 'reservas.index',
          component: () => import('@/views/reservas/index.vue')
        },
        {
          path: 'add',
          name: 'reservas.add',
          component: () => import('@/views/reservas/add.vue')
        },
        {
          path: ':id/edit',
          name: 'reservas.edit',
          component: () => import('@/views/reservas/edit.vue')
        },
        {
          path: 'edit',
          name: 'reservas.editAlt',
          // rota auxiliar caso queira editar reservas em /reservas/edit
          component: () => import('@/views/reservas/edit.vue')
        },
      ]
    },
    {
      path: '/perfil',
      name: 'meuPerfil',
      component: () => import('@/views/auth/MeuPerfil.vue'),
      meta: { requerAuth: true }
    },
    {
      path: '/historico',
      meta: { requerAuth: true },
      children: [
        {
          path: '',
          name: 'historico.index',
          component: () => import('@/views/historico/index.vue')
        }
      ]
    },


  ],
})

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (to.meta.requerAuth && !usuarioLogado) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'cadastro') && usuarioLogado) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router