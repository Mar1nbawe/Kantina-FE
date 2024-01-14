import { createRouter, createWebHistory } from 'vue-router'

import  MapView  from '../views/MapView.vue'
import LoginPageVue from '@/components/LoginPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
      {
          path: "/",
          component: LoginPageVue
      },
      {
          path: '/map',
          component : MapView
      }
  ]
})

export default router
