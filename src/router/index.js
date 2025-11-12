import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/reservas'
    },
    {
      path: '/reservas',
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
      ]
    }
  ],
})

export default router