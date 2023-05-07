import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/createToken',
      name: 'create token',
      beforeEnter: (to, from) => {
        if (localStorage.getItem('token')) {
          return true
        }
        return { path: '/' }
      },
      component: () => import('../views/CreateTokenView.vue')
    },
    {
      path: '/cardInfo',
      name: 'card info',
      beforeEnter: (to, from) => {
        if (localStorage.getItem('token')) {
          return true
        }
        return { path: '/' }
      },
      component: () => import('../views/CardInfoView.vue')
    }
  ]
})

export default router
