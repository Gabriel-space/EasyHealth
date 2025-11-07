import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/dashboard.vue'),
    },
    {
      path: '/reservas',
      children: [
        { path: '', name: 'reservas.index', component: () => import('@/views/reservas/index.vue')},
        { path: 'add', name: 'reservas.add', component: () => import('@/views/reservas/add.vue')},
        { path: ':id/edit', component: () => import('@/views/reservas/edit.vue')},
        { path: ':id/show', component: () => import('@/views/reservas/show.vue')},
      ]
    }
  ],
})

export default router
